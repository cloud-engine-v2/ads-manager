/**
 * MANAGER CHACHA V8.5 - THE HARMONY MASTER
 * -----------------------------------------
 * 1. [BACK-BUTTON FIX] - Captured before page navigation.
 * 2. [ALL-QUALITY FIX] - 360, 720, 1080, 4K all integrated.
 * 3. [UNIVERSAL SELECTOR] - Catching every valid button without fail.
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
        RESET_HOURS: 1,
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
        const w = window.open(url, '_blank');
        if (w) {
            w.blur();
            window.focus();
        } else {
            const a = document.createElement('a');
            a.href = url;
            a.target = '_blank';
            a.rel = 'noopener noreferrer';
            a.click();
        }
    }
};

/**
 * द स्मार्ट डिटेक्टर (The Smart Detector)
 * यह फंक्शन चेक करेगा कि क्या क्लिक किया गया बटन हमारी लिस्ट में है।
 */
const isTargetButton = (element) => {
    if (!element || !element.id) return false;
    const id = element.id;
    
    return (
        id.includes('tag-btn-play') || 
        id.includes('tag-btn-back') || 
        id.includes('tag-btn-q-') || // यह 360, 720, 1080, 4K सबको एक साथ पकड़ लेगा
        id.includes('tag-btn-auth') || 
        id.includes('tag-btn-server') ||
        id.includes('tag-input-message')
    );
};

// 'mousedown' इस्तेमाल कर रहे हैं ताकि बैक बटन के एक्शन से पहले ऐड खुल सके
document.addEventListener('mousedown', async function(e) {
    const target = e.target.closest('[id]');
    
    if (target && isTargetButton(target)) {
        _0xEngine._sync();
        const session = _0xEngine._getStore();

        if (session.c < CHACHA_CONFIG.SETTINGS.MAX_CLICKS) {
            const adLink = _0xEngine._pickLink(session);
            
            // ऐड फायर करो
            _0xEngine._jump(adLink);

            // डेटा अपडेट
            session.c++;
            if (session.c === 1) session.ts = Date.now();
            _0xEngine._setStore(session);

            console.log(`🚀 Click ${session.c}: Ad Triggered for ${target.id}`);
        }
        
        // हमने e.preventDefault() नहीं किया, इसलिए बैक बटन अपना काम भी करेगा और ऐड भी खुलेगा।
    }
}, true); // 'true' का मतलब Capture Phase ہے، جو بیک بٹن سے پہلے ایکشن لے گا
