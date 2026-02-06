/**
 * MANAGER CHACHA V7.2 - THE SUPERNOVA (FINAL MASTER)
 * -------------------------------------------------
 * 1. [THE TRIPLE BASKET] - 80% High, 10% Mid, 10% Low (Strict Logic)
 * 2. [THE DETECTIVE] - GPU, Battery, VPN, Proxy & Hardware Fingerprinting
 * 3. [THE CHRONOS] - 24H Hard Lock from first click
 * 4. [NO-REPEAT] - Unique link for every single click within session
 * 5. [THE GHOST] - Referrer Masking (Zero Leakage)
 * 6. [THE MONITOR] - Live Firebase & Telegram API reporting
 */

const CHACHA_CONFIG = {
    DOMAIN: "cloudaccesshq.xyz",
    
    // تمہاری 3 بالٹیاں (Baskets)
    // پہلے 10 لنکس ہائی پے والے رکھو، اگلے 6 مڈ، اور آخری 4 لو۔
    LINKS: {
        HIGH: ["https://www.blackbox.ai/", "https://www.blackbox.ai/", "https://www.blackbox.ai/", "https://www.blackbox.ai/", "https://www.blackbox.ai/", "H6", "H7", "H8", "H9", "H10"], // 80%
        MID:  ["M1", "M2", "https://www.blackbox.ai/", "M4", "M5", "M6"],                        // 10%
        LOW:  ["L1", "https://www.blackbox.ai/", "L3", "L4"]                                     // 10%
    },

    APIS: {
        FB_URL: "YOUR_FIREBASE_URL", // فائر بیس کا لنک یہاں ڈالیں
        TG_TOKEN: "YOUR_BOT_TOKEN",   // ٹیلیگرام بوٹ ٹوکن یہاں ڈالیں
        TG_ID: "YOUR_CHAT_ID"         // اپنی ٹیلیگرام چیٹ آئی ڈی یہاں ڈالیں
    },

    SETTINGS: {
        MAX_CLICKS: 6,
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

    // فل پاور ڈیٹیکٹو سسٹم
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
        } catch(e) { return { vpn: false, loc: "Local/Shielded" }; }
    },

    // 80/10/10 رینڈم + نو-ریپیٹ لاجک
    _pickLink: function(session) {
        const luck = Math.random() * 100;
        let pool;

        if (luck < 80) pool = CHACHA_CONFIG.LINKS.HIGH;
        else if (luck < 90) pool = CHACHA_CONFIG.LINKS.MID;
        else pool = CHACHA_CONFIG.LINKS.LOW;

        // چیک کرو کہ اس یوزر نے یہ لنک پہلے تو نہیں دیکھا؟
        let available = pool.filter(l => !session.used.includes(l));
        
        // اگر منتخب پول خالی ہو، تو سب میں سے وہ اٹھاؤ جو ابھی تک استعمال نہ ہوا ہو
        if (available.length === 0) {
            const all = [...CHACHA_CONFIG.LINKS.HIGH, ...CHACHA_CONFIG.LINKS.MID, ...CHACHA_CONFIG.LINKS.LOW];
            available = all.filter(l => !session.used.includes(l));
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
            const msg = `🚀 *SUPERNOVA ALERT* \nIP: ${dna.ip} \nLoc: ${dna.loc} \nClick: ${count}/6 \nLink: ${link}`;
            fetch(`https://api.telegram.org/bot${CHACHA_CONFIG.APIS.TG_TOKEN}/sendMessage?chat_id=${CHACHA_CONFIG.APIS.TG_ID}&text=${encodeURIComponent(msg)}&parse_mode=Markdown`);
        }
    },

    _jump: function(url) {
        const w = window.open('', '_blank');
        if (w) {
            w.opener = null;
            w.document.write(`<html><head><meta name="referrer" content="no-referrer"><meta http-equiv="refresh" content="0; url=${url}"></head></html>`);
            w.document.close();
        } else { window.location.assign(url); }
    }
};

// فائنل ٹرگر
document.addEventListener('click', async (e) => {
    const btn = e.target.closest('[id]');
    const validTags = ['tag-btn-play-main', 'tag-input-message-field', 'tag-btn-back-button', 'tag-btn-server-shift-2', 'tag-btn-q-360', 'tag-btn-q-720', 'tag-btn-q-1080', 'tag-btn-q-4k', 'tag-btn-auth-login', 'tag-btn-auth-send', 'tag-link-community-rules', 'tag-btn-community-showmore'];

    if (btn && validTags.includes(btn.id)) {
        _0xEngine._sync();
        const session = _0xEngine._getStore();

        if (session.c >= CHACHA_CONFIG.SETTINGS.MAX_CLICKS) {
            window.location.href = CHACHA_CONFIG.SETTINGS.CLEAN_PAGE;
            return;
        }

        const dna = await _0xEngine._scan();
        if (dna.vpn) return alert("VPN detected! Please turn it off.");

        if (session.c === 0) session.ts = Date.now();

        const target = _0xEngine._pickLink(session);
        session.c++;
        _0xEngine._setStore(session);

        _0xEngine._report(btn.id, dna, target, session.c);
        _0xEngine._jump(target);
    }
});
