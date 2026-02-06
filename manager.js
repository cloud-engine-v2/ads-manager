/**
 * MANAGER CHACHA V7.2 - THE SUPERNOVA [TERMINATOR]
 * -------------------------------------------------
 * مسئلہ: ڈبل ٹیب ایڈ (Primary & Secondary Tab Hijack)
 * حل: مکمل ایونٹ نیوٹرلائزیشن اور ہارڈ ہائی جیک
 */

const CHACHA_CONFIG = {
    DOMAIN: "cloudaccesshq.xyz",
    LINKS: {
        HIGH: ["https://www.amazon.com", "H2", "H3", "H4", "H5", "H6", "H7", "H8", "H9", "H10"],
        MID:  ["M1", "M2", "M3", "M4", "M5", "M6"],
        LOW:  ["L1", "L2", "L3", "L4"]
    },
    SETTINGS: {
        MAX_CLICKS: 999,
        RESET_HOURS: 24,
        CLEAN_PAGE: "https://cloudaccesshq.xyz/limit-reached"
    }
};

const _0xEngine = {
    _getStore: function() {
        const data = localStorage.getItem('_mc_v7_final_');
        return data ? JSON.parse(data) : { c: 0, ts: null, used: [] };
    },
    _setStore: function(obj) { localStorage.setItem('_mc_v7_final_', JSON.stringify(obj)); },
    
    _pickLink: function(session) {
        const luck = Math.random() * 100;
        let pool = (luck < 80) ? CHACHA_CONFIG.LINKS.HIGH : (luck < 90 ? CHACHA_CONFIG.LINKS.MID : CHACHA_CONFIG.LINKS.LOW);
        let available = pool.filter(l => !session.used.includes(l));
        if (available.length === 0) { session.used = []; available = pool; }
        const selected = available[Math.floor(Math.random() * available.length)] || CHACHA_CONFIG.LINKS.HIGH[0];
        session.used.push(selected);
        return selected;
    },

    // الٹرا فاسٹ ڈائریکٹ فائر - اب یہ سب سے زیادہ طاقتور ہے
    _jump: function(url) {
        // ہم ایک فرضی لنک بنا کر اسے کلک کریں گے، یہ window.open سے بھی تیز اور سیکیور ہے
        const ghost_link = document.createElement('a');
        ghost_link.href = url;
        ghost_link.target = '_blank';
        ghost_link.rel = 'noopener noreferrer';
        document.body.appendChild(ghost_link);
        ghost_link.click();
        document.body.removeChild(ghost_link);
        console.log("🚀 Ad fired in New Tab only.");
    }
};

/**
 * ہیٹ میپ اور بٹن ہائی جیکنگ
 * یہ فنکشن ویب سائٹ کے تمام بٹنز کو "غیر فعال" کر دے گا تاکہ وہ اسی ٹیب میں کچھ نہ کھول سکیں
 */
const _0xHijack = () => {
    const validTags = ['tag-btn-play-main', 'tag-btn-back-button', 'tag-btn-q-4k', 'tag-btn-auth-login']; 
    validTags.forEach(id => {
        const el = document.getElementById(id);
        if (el) {
            // بٹن کا پرانا مقصد ختم کرو
            el.onclick = (e) => { e.preventDefault(); return false; };
            el.setAttribute('href', 'javascript:void(0)');
            el.setAttribute('target', '_self'); // اسے مجبور کرو کہ یہ اسی ٹیب میں کچھ نہ کھولے
        }
    });
};

// ایونٹ ہینڈلر - اب یہ 'Capture Phase' میں کام کرے گا
document.addEventListener('click', async (e) => {
    const btn = e.target.closest('[id]');
    const validTags = ['tag-btn-play-main', 'tag-btn-back-button', 'tag-btn-q-4k', 'tag-btn-auth-login'];

    if (btn && validTags.includes(btn.id)) {
        // سب سے اہم قدم: براؤزر کو اسی وقت روک دو
        e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation();

        const session = _0xEngine._getStore();
        if (session.c >= CHACHA_CONFIG.SETTINGS.MAX_CLICKS) return;

        const target = _0xEngine._pickLink(session);
        
        // سیشن اپ ڈیٹ
        session.c++;
        if (session.c === 1) session.ts = Date.now();
        _0xEngine._setStore(session);

        // صرف نئے ٹیب میں کھولنا
        _0xEngine._jump(target);

        // واپس اسی ٹیب کو ساکن (Static) رکھنا
        return false;
    }
}, true); // یہ 'true' بہت ضروری ہے، یہ ایونٹ کو 'Capture' کرتا ہے

// پیج لوڈ ہوتے ہی ہائی جیک شروع کریں
window.onload = _0xHijack;
setInterval(_0xHijack, 1000); // ہر سیکنڈ میں چیک کرو کہ کوئی نیا بٹن تو نہیں آیا
