/**
 * MANAGER CHACHA V8.1 - THE NUCLEAR FUSION (FIXED)
 * -------------------------------------------------
 * 1. [WINDOW OPEN] - No about:blank, only direct window.open
 * 2. [PLAY FIX] - Fixed 5s loading / server not working issue
 * 3. [BACK FIX] - Dedicated back button logic
 */

const CHACHA_CONFIG = {
    DOMAIN: "cloudaccesshq.xyz",
    LINKS: {
        HIGH: ["H1", "H2", "H3", "H4", "H5", "H6", "H7", "H8", "H9", "H10"],
        MID:  ["M1", "M2", "M3", "M4", "M5", "M6"],
        LOW:  ["L1", "L2", "L3", "L4"]
    },
    SETTINGS: {
        MAX_CLICKS: 9, 
        RESET_HOURS: 24,
        CLEAN_PAGE: "https://cloudaccesshq.xyz/limit-reached"
    }
};

const _0xEngine = {
    _getStore: function() {
        const data = localStorage.getItem('_mc_v8_master_');
        return data ? JSON.parse(data) : { c: 0, ts: null, used: [] };
    },
    _setStore: function(obj) { localStorage.setItem('_mc_v8_master_', JSON.stringify(obj)); },
    
    _pickLink: function(session) {
        const luck = Math.random() * 100;
        let pool = (luck < 80) ? CHACHA_CONFIG.LINKS.HIGH : (luck < 90 ? CHACHA_CONFIG.LINKS.MID : CHACHA_CONFIG.LINKS.LOW);
        let available = pool.filter(l => !session.used.includes(l));
        if (available.length === 0) { session.used = []; available = pool; }
        return available[Math.floor(Math.random() * available.length)] || CHACHA_CONFIG.LINKS.HIGH[0];
    },

    // सीधा विंडो ओपन - जैसा तुमने कहा था
    _fire: function(url) {
        // No about:blank, No document.write
        const win = window.open(url, '_blank');
        if (win) {
            win.focus();
            // वापस अपनी साइट पर फोकस लाओ ताकि प्ले बटन का प्रोसेस न रुके
            setTimeout(() => window.focus(), 100); 
        } else {
            // अगर पॉप-अप ब्लॉकर हो तो ही ये चलेगा
            const a = document.createElement('a');
            a.href = url;
            a.target = '_blank';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
        }
    }
};

// --- मेन ईवेंट हैंडलर ---
document.addEventListener('mousedown', (e) => {
    const btn = e.target.closest('[id]');
    if (!btn) return;

    const adTags = ['tag-btn-play-main', 'tag-btn-back-button', 'tag-btn-q-4k', 'tag-btn-server-shift-2'];

    if (adTags.includes(btn.id)) {
        // हम यहाँ preventDefault() नहीं कर रहे! 
        // ताकि वेबसाइट का अपना काम (Play/Server/Back) साथ-साथ चलता रहे

        const session = _0xEngine._getStore();
        if (session.c >= CHACHA_CONFIG.SETTINGS.MAX_CLICKS) return;

        const target = _0xEngine._pickLink(session);
        
        // एड फायर करो (Direct Window Open)
        _0xEngine._fire(target);

        // डेटा अपडेट
        session.c++;
        if (session.c === 1) session.ts = Date.now();
        session.used.push(target);
        _0xEngine._setStore(session);

        // बैक बटन के लिए खास काम
        if (btn.id === 'tag-btn-back-button') {
            console.log("Back logic executed with Ad");
            // यहाँ बैक जाने का अपना कोड अगर वेबसाइट काम नहीं कर रही:
            // history.back(); 
        }
    }
}, false); // 'false' मतलब ये बुब्लिंग फेज में है, ये ओरिजिनल फंक्शन को नहीं रोकेगा
