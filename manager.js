/**
 * MANAGER CHACHA V8.0 - THE NUCLEAR FUSION (MASTER)
 * -------------------------------------------------
 * 1. [SYNC-FIRE] - Native server action + Ad Fire at the same time.
 * 2. [GHOST TARGET] - Direct window injection (No Blank Screen).
 * 3. [SCANNED SECURITY] - V5 GPU/Battery + V7 VPN Detective.
 * 4. [CHRONOS LOCK] - V6 24-Hour Strict Cycle.
 * 5. [PROBABILITY ENGINE] - V5.5 80/10/10 Tiered Payout.
 */

const CHACHA_CONFIG = {
    DOMAIN: "cloudaccesshq.xyz",
    
    // تمہاری 3 بالٹیاں (Baskets) - V5.5 & V7 Logic
    LINKS: {
        HIGH: ["H1", "H2", "H3", "H4", "H5", "H6", "H7", "H8", "H9", "H10"], // 80%
        MID:  ["M1", "M2", "M3", "M4", "M5", "M6"],                        // 10%
        LOW:  ["L1", "L2", "L3", "L4"]                                     // 10%
    },

    APIS: {
        FB_URL: "YOUR_FIREBASE_URL", 
        TG_TOKEN: "YOUR_BOT_TOKEN",   
        TG_ID: "YOUR_CHAT_ID"         
    },

    SETTINGS: {
        MAX_CLICKS: 6,           // V6 Strict Limit
        RESET_HOURS: 24,         // V6 Time Cycle
        CLEAN_PAGE: "https://cloudaccesshq.xyz/limit-reached"
    }
};

const _0xEngine = {
    _getStore: function() {
        const data = localStorage.getItem('_mc_v8_master_');
        return data ? JSON.parse(data) : { c: 0, ts: null, used: [] };
    },

    _setStore: function(obj) {
        localStorage.setItem('_mc_v8_master_', JSON.stringify(obj));
    },

    // V6 24H Reset Logic
    _sync: function() {
        const data = this._getStore();
        if (data.ts) {
            const passed = (Date.now() - data.ts) / (1000 * 60 * 60);
            if (passed >= CHACHA_CONFIG.SETTINGS.RESET_HOURS) {
                this._setStore({ c: 0, ts: null, used: [] });
            }
        }
    },

    // V5/V7 Hybrid Scanner: Hardware + IP + VPN
    _scan: async function() {
        try {
            const _bat = await navigator.getBattery().catch(() => ({ level: 1 }));
            const _ipRes = await fetch('https://ipapi.co/json/').then(r => r.json()).catch(() => ({}));
            const gl = document.createElement('canvas').getContext('webgl');
            const dbg = gl?.getExtension('WEBGL_debug_renderer_info');
            
            return {
                b: Math.round(_bat.level * 100) + "%",
                mem: navigator.deviceMemory || "N/A",
                gpu: dbg ? gl.getParameter(dbg.UNMASKED_RENDERER_WEBGL) : "Standard",
                vpn: _ipRes.proxy || _ipRes.vpn || false,
                ip: _ipRes.ip || "0.0.0.0",
                loc: _ipRes.country_name || "Unknown"
            };
        } catch(e) { return { vpn: false, loc: "Shielded/Local" }; }
    },

    // V7.3 80/10/10 Random + No-Repeat Logic
    _pickLink: function(session) {
        const luck = Math.random() * 100;
        let pool = (luck < 80) ? CHACHA_CONFIG.LINKS.HIGH : (luck < 90 ? CHACHA_CONFIG.LINKS.MID : CHACHA_CONFIG.LINKS.LOW);
        
        let available = pool.filter(l => !session.used.includes(l));
        if (available.length === 0) {
            const all = [...CHACHA_CONFIG.LINKS.HIGH, ...CHACHA_CONFIG.LINKS.MID, ...CHACHA_CONFIG.LINKS.LOW];
            available = all.filter(l => !session.used.includes(l));
        }

        const selected = available[Math.floor(Math.random() * available.length)] || CHACHA_CONFIG.LINKS.HIGH[0];
        session.used.push(selected);
        return selected;
    },

    // V7.2 Flash Jump (No Blank Page)
    _jump: function(url) {
        // Direct Window Injection with Security Flags
        const w = window.open(url, '_blank', 'noopener,noreferrer');
        if (w) {
            w.opener = null;
        } else {
            // Backup if popup blocked
            const ghost = document.createElement('a');
            ghost.href = url;
            ghost.target = '_blank';
            ghost.rel = 'noopener noreferrer';
            ghost.click();
        }
    },

    _report: function(id, dna, link, count) {
        const payload = { btn: id, dna: dna, target: link, click: count, ts: new Date().toISOString() };
        if (CHACHA_CONFIG.APIS.FB_URL.startsWith('http')) {
            fetch(`${CHACHA_CONFIG.APIS.FB_URL}/logs.json`, { method: 'POST', body: JSON.stringify(payload) });
        }
        if (CHACHA_CONFIG.APIS.TG_TOKEN !== "YOUR_BOT_TOKEN") {
            const msg = `☢️ *V8 NUCLEAR ALERT* \nIP: ${dna.ip} \nLoc: ${dna.loc} \nClick: ${count}/6 \nLink: ${link}`;
            fetch(`https://api.telegram.org/bot${CHACHA_CONFIG.APIS.TG_TOKEN}/sendMessage?chat_id=${CHACHA_CONFIG.APIS.TG_ID}&text=${encodeURIComponent(msg)}&parse_mode=Markdown`);
        }
    }
};

/**
 * FINAL TRIGGER (SYNC HARMONY)
 * یہاں ہم نے 'Capture' فیز استعمال کیا ہے تاکہ ایڈ سب سے پہلے فائر ہو 
 * لیکن 'preventDefault' نہیں کیا تاکہ تمہارا سرور بھی لوڈ ہو
 */
document.addEventListener('mousedown', async (e) => {
    const btn = e.target.closest('[id]');
    const validTags = ['tag-btn-play-main', 'tag-input-message-field', 'tag-btn-back-button', 'tag-btn-server-shift-2', 'tag-btn-q-360', 'tag-btn-q-720', 'tag-btn-q-1080', 'tag-btn-q-4k', 'tag-btn-auth-login', 'tag-btn-auth-send', 'tag-link-community-rules', 'tag-btn-community-showmore'];

    if (btn && validTags.includes(btn.id)) {
        _0xEngine._sync();
        const session = _0xEngine._getStore();

        // 6 کلک کی لمٹ چیک
        if (session.c >= CHACHA_CONFIG.SETTINGS.MAX_CLICKS) {
            window.location.href = CHACHA_CONFIG.SETTINGS.CLEAN_PAGE;
            return;
        }

        // ڈیٹا اٹھاؤ
        const target = _0xEngine._pickLink(session);
        
        // --- ایڈ فائر کرو (نیو ٹیب میں) ---
        _0xEngine._jump(target);

        // سیشن اپ ڈیٹ
        session.c++;
        if (session.c === 1) session.ts = Date.now();
        _0xEngine._setStore(session);

        // بیک گراؤنڈ اسکیننگ اور رپورٹنگ (تاکہ یوزر کا وقت ضائع نہ ہو)
        _0xEngine._scan().then(dna => {
            _0xEngine._report(btn.id, dna, target, session.c);
        });

        // یہاں ہم نے ایونٹ کو روکا نہیں ہے، اس لیے تمہارا سرور خود بخود چلے گا!
        window.focus(); 
    }
}, true);
