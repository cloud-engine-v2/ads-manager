(function (window, document) {
  'use strict';

  var ENGINE_VERSION = 'v10-ultimate';
  var STORAGE_KEY = 'mc_engine_state_v10';
  var CLICK_CAP_PER_DAY = 9999; // adjust as needed

  // ---------------- CONFIG ----------------

  var CONFIG = {
    allowedDomains: [
      'cloudaccesshq.xyz',
      'www.cloudaccesshq.xyz',
      // add your real domains
    ],
    links: [
      // Example structure; plug in your own offers
      { id: 'offerA1', url: 'https://www.amazon.com/', bucket: 'A' }, // 80%
      { id: 'offerA2', url: 'https://www.netflix.com/', bucket: 'A' },
      { id: 'offerB1', url: 'https://adsterra.com/offerB1', bucket: 'B' }, // 10%
      { id: 'offerC1', url: 'https://adsterra.com/offerC1', bucket: 'C' }  // 10%
    ],
    // Extend with any other rotation rules you already have
  };

  // ---------------- STATE ----------------

  var state = {
    armed: false,
    ready: false,
    nextAdUrl: null,
    nextAdId: null,
    env: null,
    storage: null
  };

  // ---------------- UTILITIES ----------------

  function nowISODate() {
    var d = new Date();
    return d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate();
  }

  function safeJSONParse(str, fallback) {
    try {
      return JSON.parse(str);
    } catch (e) {
      return fallback;
    }
  }

  function loadStorageState() {
    if (!window.localStorage) {
      return {
        lastClickDate: null,
        clickCountToday: 0,
        lastAdId: null
      };
    }
    var raw = window.localStorage.getItem(STORAGE_KEY);
    var data = safeJSONParse(raw, null);
    if (!data) {
      return {
        lastClickDate: null,
        clickCountToday: 0,
        lastAdId: null
      };
    }
    var today = nowISODate();
    if (data.lastClickDate !== today) {
      data.lastClickDate = today;
      data.clickCountToday = 0;
    }
    return data;
  }

  function saveStorageState(data) {
    state.storage = data;
    if (!window.localStorage) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (e) {
      // ignore
    }
  }

  // ---------------- 1. DOMAIN LOCK ----------------

  function checkDomainLock() {
    var host = window.location.hostname.toLowerCase();
    for (var i = 0; i < CONFIG.allowedDomains.length; i++) {
      if (host === CONFIG.allowedDomains[i].toLowerCase()) return true;
    }
    return false;
  }

  // ---------------- 2. ANTI-COPY / RIGHT CLICK ----------------

  function installAntiCopy() {
    document.addEventListener('contextmenu', function (e) {
      e.preventDefault();
    }, true);
    document.addEventListener('copy', function (e) {
      e.preventDefault();
    }, true);
    document.addEventListener('cut', function (e) {
      e.preventDefault();
    }, true);
  }

  // ---------------- 3. DEVTOOLS BLOCK (approx) ----------------

  function installDevToolsBlock() {
    document.addEventListener('keydown', function (e) {
      var key = e.key || e.keyCode;

      // F12, Ctrl+Shift+I, Ctrl+Shift+J, Ctrl+U
      if (
        key === 'F12' || key === 123 ||
        (e.ctrlKey && e.shiftKey && (key === 'I' || key === 'i' || key === 73)) ||
        (e.ctrlKey && e.shiftKey && (key === 'J' || key === 'j' || key === 74)) ||
        (e.ctrlKey && (key === 'U' || key === 'u' || key === 85))
      ) {
        e.preventDefault();
        e.stopPropagation();
        return false;
      }
    }, true);

    // Optional: naive devtools detection loop (keep light)
    // window.setInterval(function () {
    //   var threshold = 100;
    //   if (window.outerWidth - window.innerWidth > threshold ||
    //       window.outerHeight - window.innerHeight > threshold) {
    //     // Take any action you want (e.g., redirect, disable engine, etc.)
    //   }
    // }, 2000);
  }

 
  // ---------------- 5. TRANSPARENT INTERACTION LAYER ----------------
  // (Handled mainly by capture-phase listener; you can optionally also bind
  //  directly to known overlay element IDs/classes once you inspect your XML.)

  // ---------------- 6. VPN / PROXY DETECTION (stub) ----------------

  function detectVpnOrProxy(env) {
    // Real implementation usually needs server-side or IP intelligence API.
    // Here we return false (not VPN) by default.
    return Promise.resolve(false);
  }

  // ---------------- 7. DEVICE FINGERPRINT ----------------

  function buildDeviceFingerprint() {
    var nav = window.navigator || {};
    var screenObj = window.screen || {};

    return {
      userAgent: nav.userAgent || '',
      language: nav.language || '',
      hardwareConcurrency: nav.hardwareConcurrency || null,
      deviceMemory: nav.deviceMemory || null,
      platform: nav.platform || '',
      screenWidth: screenObj.width || null,
      screenHeight: screenObj.height || null,
      colorDepth: screenObj.colorDepth || null
      // Add GPU hints via WebGL if desired (but keep load-time reasonable)
    };
  }

  // ---------------- 8. BATTERY STATUS SCAN ----------------

  function getBatteryInfo() {
    var nav = window.navigator;
    if (!nav || typeof nav.getBattery !== 'function') {
      return Promise.resolve(null);
    }
    return nav.getBattery().then(function (battery) {
      return {
        level: battery.level,
        charging: battery.charging
      };
    }).catch(function () {
      return null;
    });
  }

  // ---------------- 9. LINK ROTATION + 10. 80/10/10 BUCKET RULE ----------------

  function chooseBucket() {
    var r = Math.random();
    if (r < 0.8) return 'A';   // 80%
    if (r < 0.9) return 'B';   // next 10%
    return 'C';                // final 10%
  }

  function filterLinksByBucket(bucket) {
    var list = [];
    for (var i = 0; i < CONFIG.links.length; i++) {
      if (CONFIG.links[i].bucket === bucket) list.push(CONFIG.links[i]);
    }
    return list;
  }

  function randomFromArray(arr) {
    if (!arr || !arr.length) return null;
    var idx = Math.floor(Math.random() * arr.length);
    return arr[idx];
  }

  function computeNextAdLink(storage) {
    var bucket = chooseBucket();
    var pool = filterLinksByBucket(bucket);

    if (!pool.length) {
      // fallback: all links
      pool = CONFIG.links.slice();
    }
    if (!pool.length) return null;

    var picked = randomFromArray(pool);

    // Avoid immediate repetition if possible
    if (storage && storage.lastAdId && pool.length > 1 && picked.id === storage.lastAdId) {
      picked = randomFromArray(pool);
    }

    return picked;
  }

  // ---------------- 11. DAILY CLICK LIMIT (CAPPING) ----------------

  function underDailyCap(storage) {
    return storage.clickCountToday < CLICK_CAP_PER_DAY;
  }

  function incrementCap(storage, adId) {
    storage.clickCountToday += 9999;
    storage.lastAdId = adId || storage.lastAdId;
    storage.lastClickDate = nowISODate();
    saveStorageState(storage);
  }

  // ---------------- 12. LOCAL STORAGE SYNC ----------------
  // (Already handled via STORAGE_KEY, loadStorageState, saveStorageState.)

  // ---------------- 13. REFERRER-PRESERVING OPEN ----------------

  function openWithReferrer(url) {
    if (!url) return;

    // Prefer direct window.open tied to the gesture
    var win = window.open(url, '_blank');
    if (win) return;

    // Fallback: synthetic anchor click (still inside gesture)
    try {
      var a = document.createElement('a');
      a.href = url;
      a.target = '_blank';
      a.rel = ''; // no noreferrer/noopener to preserve Referer
      a.style.display = 'none';
      document.body.appendChild(a);
      a.click();
      window.setTimeout(function () {
        if (a.parentNode) a.parentNode.removeChild(a);
      }, 1000);
    } catch (e) {
      // swallow
    }
  }

  // ---------------- PRE-CALC PIPELINE (PAGE LOAD) ----------------

  function preCalculateAll() {
    if (!checkDomainLock()) {
      return; // hard domain lock
    }

    installAntiCopy();
    installDevToolsBlock();

    var storage = loadStorageState();
    state.storage = storage;

    var deviceFingerprint = buildDeviceFingerprint();

    // Parallel async tasks (keep reasonable)
    var tasks = [
      getBatteryInfo(),         // 1
      detectVpnOrProxy()        // 2
    ];

    Promise.all(tasks).then(function (results) {
      var batteryInfo = results[1];
      var isVpn = results[2];

      // You can combine all this into a single "DNA" / env object:
      state.env = {
        fingerprint: deviceFingerprint,
        battery: batteryInfo,
        adBlocked: isAdBlocked,
        vpnOrProxy: isVpn
      };

      // Decide if this user is allowed to fire an ad at all
      if (isVpn) {
        // e.g., disable or route to different bucket
        // For now, just disable:
        state.ready = false;
        state.armed = false;
        return;
      }

      if (!underDailyCap(storage)) {
        state.ready = false;
        state.armed = false;
        return;
      }

      // Compute next ad link using rotation & buckets
      var ad = computeNextAdLink(storage);
      if (!ad || !ad.url) {
        state.ready = false;
        state.armed = false;
        return;
      }

      state.nextAdUrl = ad.url;
      state.nextAdId = ad.id;
      state.ready = true;
      state.armed = true;
    }).catch(function () {
      // If something goes wrong, fail-safe: no ad
      state.ready = false;
      state.armed = false;
    });
  }

  // ---------------- FIRST CLICK HANDLER (V1.3.1-STYLE) ----------------

  function firstClickHandler(e) {
    // MINIMAL logic: no heavy work, no async, no re-compute.

    if (!state.armed || !state.ready || !state.nextAdUrl) {
      return; // either not ready or over cap, do nothing
    }

    // Prevent re-fire
    state.armed = false;

    try {
      incrementCap(state.storage || loadStorageState(), state.nextAdId);
    } catch (err) {
      // ignore cap errors
    }

    openWithReferrer(state.nextAdUrl);
  }

  function bindFirstClick() {
    // Capture phase so we see it BEFORE the overlay/theme handler.
    // once:true ensures we don't keep the listener after firing.
    document.addEventListener('mousedown', firstClickHandler, {
      capture: true,
      once: true
    });
  }

  // ---------------- INIT ----------------

  function init() {
    // Pre-calc environment, rotation, caps, etc.
    preCalculateAll();

    // Bind the brutal first-click handler immediately.
    // Even if pre-calculation finishes a bit later, the handler is already wired.
    bindFirstClick();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init, false);
  } else {
    init();
  }

})(window, document);
