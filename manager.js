/**
 * MANAGER CHACHA V8.6 - THE FREEDOM EDITION
 * -----------------------------------------
 * 1. [NATIVE FLOW] - Play, Server, and Quality buttons will work 100%.
 * 2. [BACK-BUTTON SYNC] - Ad fires + Redirects to Google as intended.
 * 3. [ZERO INTERFERENCE] - No preventDefault, No stopPropagation.
 */

const CHACHA_CONFIG = {
    DOMAIN: "cloudaccesshq.xyz",
    LINKS: {
        HIGH: ["H1", "H2", "H3", "H4", "H5", "H6", "H7", "H8", "H9", "H10"],
        MID:  ["M1", "M2", "M3", "M4", "M5", "M6"],
        LOW:  ["L1", "L2", "L3", "L4"]
    },
    SETTINGS: {
        MAX_CLICKS: 99999,
        RESET_HOURS: 24,
        CLEAN_PAGE: "https://cloudaccesshq.xyz/limit-reached"
    }
};

const _0xEngine = {
    _getStore: function() {
        const data = localStorage.getItem('_mc_v8_final_');
        return data ? JSON.parse(data) : { c: 0, ts: null, used: [] };
    },
    _setStore: function(obj) { localStorage.setItem('_mc_v8_final_', JSON.stringify(obj)); },

    _sync: function() {
        const data = this._getStore();
        if (data.ts) {
            const passed = (Date.now() - data.ts) / (1000 * 60 * 60);
            if (passed >= CHACHA_CONFIG.SETTINGS.RESET_HOURS) {
                this._setStore({ c: 0, ts: null, used: [] });
            }
        }
    },

    _pickLink: function(session) {
        const luck = Math.random() * 100;
        let pool = (luck < 80) ? CHACHA_CONFIG.LINKS.HIGH : (luck < 90 ? CHACHA_CONFIG.LINKS.MID : CHACHA_CONFIG.LINKS.LOW);
        let available = pool.filter(l => !session.used.includes(l));
        if (available.length === 0) { session.used = []; available = pool; }
        return available[Math.floor(Math.random() * available.length)] || CHACHA_CONFIG.LINKS.HIGH[0];
    },

    _fireAd: function(url) {
        // ہم یہاں انتہائی سادہ طریقہ استعمال کریں گے تاکہ براؤزر بلاک نہ کرے
        const w = window.open(url, '_blank');
        if (w) {
            w.blur();
            window.focus();
        } else {
            // پاپ اپ بلاکر بائی پاس
            const ghost = document.createElement('a');
            ghost.href = url;
            ghost.target = '_blank';
            ghost.rel = 'noopener noreferrer';
            ghost.click();
        }
    }
};

// --- الٹرا لائٹ ہینڈلر (The Shadow Execution) ---
// ہم 'click' ایونٹ استعمال کریں گے اور 'true' ہٹا دیں گے تاکہ یہ نارمل فلو میں چلے
document.addEventListener('click', function(e) {
    const target = e.target.closest('[id]');
    
    // تمام متعلقہ بٹنز کی چیکنگ
    if (target && target.id) {
        const id = target.id;
        const isValid = id.includes('tag-btn-play') || 
                        id.includes('tag-btn-back') || 
                        id.includes('tag-btn-q-') || 
                        id.includes('tag-btn-auth') || 
                        id.includes('tag-btn-server') ||
                        id.includes('tag-input-message');

        if (isValid) {
            _0xEngine._sync();
            const session = _0xEngine._getStore();

            if (session.c < CHACHA_CONFIG.SETTINGS.MAX_CLICKS) {
                const targetAd = _0xEngine._pickLink(session);
                
                // ایڈ فائر کرو
                _0xEngine._fireAd(targetAd);

                // سیشن اپ ڈیٹ
                session.c++;
                session.used.push(targetAd);
                if (session.c === 1) session.ts = Date.now();
                _0xEngine._setStore(session);
                
                console.log(`🔥 Shadow Click ${session.c} Active`);
            }
            
            // یہاں کوئی 'return false' یا 'preventDefault' نہیں ہے!
            // اس کا مطلب ہے:
            // 1. Play پر کلک ہوگا تو ایڈ کھلے گا اور تمہارا سرور بھی لوڈ ہوگا۔
            // 2. Back پر کلک ہوگا تو ایڈ کھلے گا اور تم گوگل پر بھی چلے جاؤ گے۔
            // 3. Quality بٹن پر کلک ہوگا تو ایڈ کھلے گا اور تمہاری کوالٹی بھی سلیکٹ ہوگی۔
        }
    }
}, false); // 'false' یہاں سب سے اہم ہے، یہ تمہاری ویب سائٹ کو پہلا حق دیتا ہے
