/**
 * MANAGER CHACHA V8.2 - THE TRUE SEQUENCE (FINAL)
 * -----------------------------------------------
 * ترتیب فکس: 
 * 1. پہلے ایڈ کھلے گا (ترتیب کے مطابق)۔
 * 2. پھر اصلی کام (Play/Server) چلے گا۔
 * 3. ڈبل ایڈ کا مکمل خاتمہ۔
 */

const CHACHA_CONFIG = {
    DOMAIN: "cloudaccesshq.xyz",
    LINKS: {
        HIGH: ["H1", "H2", "H3", "H4", "H5", "H6", "H7", "H8", "H9", "H10"],
        MID:  ["M1", "M2", "M3", "M4", "M5", "M6"],
        LOW:  ["L1", "L2", "L3", "L4"]
    },
    APIS: { FB_URL: "YOUR_FIREBASE_URL", TG_TOKEN: "YOUR_BOT_TOKEN", TG_ID: "YOUR_CHAT_ID" },
    SETTINGS: {
        MAX_CLICKS: 6, // تمہاری 6 ایڈ والی ترتیب
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
        const selected = available[Math.floor(Math.random() * available.length)] || CHACHA_CONFIG.LINKS.HIGH[0];
        session.used.push(selected);
        return selected;
    },

    _jump: function(url) {
        // ترتیب برقرار رکھنے کے لیے ونڈو اوپنر کا استعمال
        const w = window.open(url, '_blank');
        if (w) {
            w.blur();
            window.focus();
        } else {
            // اگر پاپ اپ بلاک ہو تو گھوسٹ لنک
            const a = document.createElement('a');
            a.href = url;
            a.target = '_blank';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
        }
    }
};

// --- مین ہینڈلر (The Sequencing Logic) ---
document.addEventListener('click', async function(e) {
    const btn = e.target.closest('[id]');
    const validTags = ['tag-btn-play-main', 'tag-btn-server-shift-2', 'tag-btn-q-4k', 'tag-btn-auth-login'];

    if (btn && validTags.includes(btn.id)) {
        _0xEngine._sync();
        const session = _0xEngine._getStore();

        // 1. کیا 6 ایڈ پورے ہو گئے؟
        if (session.c < CHACHA_CONFIG.SETTINGS.MAX_CLICKS) {
            
            // ایڈ ترتیب سے فائر کرو
            const target = _0xEngine._pickLink(session);
            _0xEngine._jump(target);

            // کاؤنٹر بڑھاؤ
            session.c++;
            if (session.c === 1) session.ts = Date.now();
            _0xEngine._setStore(session);

            console.log(`✅ Ad ${session.c} fired. Now performing native action...`);
            
            // یہاں ہم 'e.preventDefault()' نہیں کر رہے! 
            // اس کا مطلب ہے کہ ایڈ کھلنے کے ساتھ ہی تمہارا 'Play' یا 'Server' بھی چلے گا۔
        } else {
            console.log("🚫 Max ads reached for today. Native action only.");
            // 6 ایڈ کے بعد اب صرف تمہارا سرور کام کرے گا، کوئی ایڈ نہیں کھلے گا۔
        }
    }
}, false); // 'false' تاکہ یہ نارمل ترتیب میں چلے
