/**
 * MANAGER CHACHA V7.2 - THE SUPERNOVA [SYNC-HARMONY]
 * -------------------------------------------------
 * समाधान: अब ऐड भी खुलेगा और पीछे सर्वर/प्ले भी चलेगा।
 * तकनीक: Non-Blocking Event Propagation
 */

const CHACHA_CONFIG = {
    DOMAIN: "cloudaccesshq.xyz",
    LINKS: {
        HIGH: ["H1", "H2", "H3", "H4", "H5", "H6", "H7", "H8", "H9", "H10"],
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

    // फ्लैश जंप - अब यह मुख्य थ्रेड को ब्लॉक नहीं करेगा
    _jump: function(url) {
        const ghost_link = document.createElement('a');
        ghost_link.href = url;
        ghost_link.target = '_blank';
        ghost_link.rel = 'noopener noreferrer';
        document.body.appendChild(ghost_link);
        ghost_link.click();
        document.body.removeChild(ghost_link);
    }
};

/**
 * मेन इवेंट हेंडर - अब यह सिर्फ "एड" चलाकर हट जाएगा, सर्वर को नहीं रोकेगा
 */
document.addEventListener('click', (e) => {
    const btn = e.target.closest('[id]');
    const validTags = ['tag-btn-play-main', 'tag-btn-back-button', 'tag-btn-server-shift-2', 'tag-btn-q-4k', 'tag-btn-auth-login'];

    if (btn && validTags.includes(btn.id)) {
        // यहाँ हमने e.preventDefault() हटा दिया है!
        // ताकि बटन का असली काम (सर्वर प्ले) पीछे चलता रहे।

        const session = _0xEngine._getStore();
        if (session.c >= CHACHA_CONFIG.SETTINGS.MAX_CLICKS) return;

        const target = _0xEngine._pickLink(session);
        
        // सेंशन अपडेट
        session.c++;
        if (session.c === 1) session.ts = Date.now();
        _0xEngine._setStore(session);

        // ऐड को नए टैब में "फायर" करो
        _0xEngine._jump(target);

        // सबसे ज़रूरी चीज़: फोकस वापस अपनी वेबसाइट पर लाओ
        // ताकि यूजर को पता चले कि सर्वर लोड हो रहा है
        window.focus();
        
        console.log("✅ Supernova: Ad launched + Native action allowed.");
    }
}, { capture: true, passive: true }); 
// passive: true ब्राउज़र को बताता है कि हम डिफ़ॉल्ट एक्शन को नहीं रोक रहे
