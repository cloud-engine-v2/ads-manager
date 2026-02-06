/**
 * MANAGER CHACHA V7.2 - THE SUPERNOVA (FIXER EDITION)
 * -------------------------------------------------
 * FIXED: Double Ad Issue | FIXED: Blank Screen | FIXED: Primary Tab Hijack
 */

const CHACHA_CONFIG = {
    DOMAIN: "cloudaccesshq.xyz",
    LINKS: {
        HIGH: ["H1", "H2", "H3", "H4", "H5", "H6", "H7", "H8", "H9", "H10"],
        MID:  ["M1", "M2", "M3", "M4", "M5", "M6"],
        LOW:  ["L1", "L2", "L3", "L4"]
    },
    APIS: { FB_URL: "URL", TG_TOKEN: "TOKEN", TG_ID: "ID" },
    SETTINGS: { MAX_CLICKS: 999, RESET_HOURS: 24, CLEAN_PAGE: "https://cloudaccesshq.xyz/limit-reached" }
};

const _0xEngine = {
    _getStore: function() {
        const data = localStorage.getItem('_mc_v7_final_');
        return data ? JSON.parse(data) : { c: 0, ts: null, used: [] };
    },
    _setStore: function(obj) { localStorage.setItem('_mc_v7_final_', JSON.stringify(obj)); },
    
    // سیکیورٹی اسکین کو بیک گراؤنڈ میں منتقل کر دیا گیا ہے
    _scan: async function() {
        try {
            const _bat = await navigator.getBattery().catch(() => ({ level: 1 }));
            const gl = document.createElement('canvas').getContext('webgl');
            const dbg = gl?.getExtension('WEBGL_debug_renderer_info');
            return { b: Math.round(_bat.level * 100) + "%", gpu: dbg ? gl.getParameter(dbg.UNMASKED_RENDERER_WEBGL) : "Standard" };
        } catch(e) { return { gpu: "Standard" }; }
    },

    _pickLink: function(session) {
        const luck = Math.random() * 100;
        let pool = (luck < 80) ? CHACHA_CONFIG.LINKS.HIGH : (luck < 90 ? CHACHA_CONFIG.LINKS.MID : CHACHA_CONFIG.LINKS.LOW);
        let available = pool.filter(l => !session.used.includes(l));
        if (available.length === 0) { session.used = []; available = pool; }
        const selected = available[Math.floor(Math.random() * available.length)] || CHACHA_CONFIG.LINKS.HIGH[0];
        session.used.push(selected);
        return selected;
    },

    // الٹرا فاسٹ ڈائریکٹ جمپ
    _jump: function(url) {
        console.log("🚀 Executing Flash Jump...");
        // ہم ایک فرضی لنک بنا کر اسے کلک کریں گے، یہ window.open سے بھی تیز اور سیکیور ہے
        const ghost_link = document.createElement('a');
        ghost_link.href = url;
        ghost_link.target = '_blank';
        ghost_link.rel = 'noopener noreferrer';
        document.body.appendChild(ghost_link);
        ghost_link.click();
        document.body.removeChild(ghost_link);
    }
};

// ایونٹ ہینڈلر کو 'mousedown' پر منتقل کر دیا گیا تاکہ کلک مکمل ہونے سے پہلے ایکشن ہو
document.addEventListener('mousedown', async (e) => {
    const btn = e.target.closest('[id]');
    const validTags = ['tag-btn-play-main', 'tag-btn-back-button', 'tag-btn-q-4k', 'tag-btn-auth-login'];

    if (btn && validTags.includes(btn.id)) {
        // ۱. ویب سائٹ کے اپنے ہر ایکشن کو فوراً بلاک کرو
        e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation();

        const session = _0xEngine._getStore();
        if (session.c >= CHACHA_CONFIG.SETTINGS.MAX_CLICKS) return;

        // ۲. لنک فوری طور پر اٹھاؤ
        const target = _0xEngine._pickLink(session);
        
        // ۳. ہسٹری اور سیشن اپ ڈیٹ
        session.c++;
        if (session.c === 1) session.ts = Date.now();
        _0xEngine._setStore(session);

        // ۴. ڈائریکٹ فائر (اسکیننگ سے بھی پہلے!)
        _0xEngine._jump(target);

        // ۵. ڈیٹا اسکیننگ اب "جمپ" کے بعد خاموشی سے ہوگی
        _0xEngine._scan().then(dna => {
            // رپورٹنگ سسٹم
            console.log("📊 Background Scan Complete");
        });
    }
}, true); // 'true' کا مطلب ہے کہ یہ ویب سائٹ کے کسی بھی دوسرے اسکرپٹ سے پہلے چلے گا
