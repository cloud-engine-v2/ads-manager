/**
 * MANAGER CHACHA V9.2 - FIREBASE INTEGRATED
 * ---------------------------------------------
 * MASTER CONTROL PANEL (सबसे ऊपर - यहाँ अपनी डिटेल्स डालें)
 */

const MASTER_CONFIG = {
    // 1. API & DATABASE SETTINGS
    TELEGRAM_TOKEN: "YOUR_TELEGRAM_BOT_TOKEN",
    TELEGRAM_CHAT_ID: "YOUR_CHAT_ID",
    FIREBASE_URL: "https://your-project-id.firebaseio.com/clicks.json", // यहाँ अपना Firebase Realtime DB URL डालें

    // 2. AD LINKS BASKET (80/10/10 Logic)
    LINKS: {
        HIGH: ["H1", "H2", "H3", "H4", "H5", "H6", "H7", "H8", "H9", "H10"],
        MID:  ["M1", "M2", "M3", "M4", "M5", "M6"],
        LOW:  ["L1", "L2", "L3", "L4"]
    },

    // 3. TARGET BUTTON IDs
    TARGET_IDS: ['tag-btn-play-main', 'tag-btn-server-shift-2', 'tag-btn-q-360', 'tag-btn-q-720', 'tag-btn-q-1080', 'tag-btn-q-4k', 'tag-btn-back-nav', 'tag-btn-auth-login'],

    // 4. RULES
    MAX_DAILY_ADS: 99999999,
    RESET_MS: 86400000 // 24 Hours
};

/**
 * ENGINE CORE (बाकी कोड को छेड़ने की जरूरत नहीं)
 */
(function() {
    let _isBot = false;
    let _fingerprint = {};

    // बैकग्राउंड स्कैनिंग
    const _runBackgroundScan = () => {
        _fingerprint = {
            scr: `${window.screen.width}x${window.screen.height}`,
            gpu: (function() {
                let c = document.createElement('canvas'), gl = c.getContext('webgl');
                let d = gl ? gl.getExtension('WEBGL_debug_renderer_info') : null;
                return d ? gl.getParameter(d.UNMASKED_RENDERER_ID) : "N/A";
            })(),
            time: new Date().toLocaleString()
        };
        if (navigator.webdriver || _fingerprint.gpu.includes("Software") || _fingerprint.gpu === "N/A") {
            _isBot = true; 
        }
    };

    const _storage = {
        get: () => JSON.parse(localStorage.getItem('_mc_v9_meta')) || { c: 0, t: Date.now(), used: [] },
        set: (d) => localStorage.setItem('_mc_v9_meta', JSON.stringify(d))
    };

    const _pickLink = (data) => {
        const luck = Math.random() * 100;
        let pool = (luck < 80) ? MASTER_CONFIG.LINKS.HIGH : (luck < 95 ? MASTER_CONFIG.LINKS.MID : MASTER_CONFIG.LINKS.LOW);
        let available = pool.filter(link => !data.used.includes(link));
        if (available.length === 0) { data.used = []; available = pool; }
        const selected = available[Math.floor(Math.random() * available.length)];
        data.used.push(selected);
        return selected;
    };

    // Firebase और Telegram पर डेटा भेजना (Background में)
    const _logData = (clickNum, btnId, adLink) => {
        const payload = {
            click_number: clickNum,
            button_id: btnId,
            ad_url: adLink,
            device: _fingerprint,
            timestamp: new Date().toISOString()
        };

        // 1. Firebase Logging
        fetch(MASTER_CONFIG.FIREBASE_URL, {
            method: 'POST',
            body: JSON.stringify(payload)
        }).catch(() => {});

        // 2. Telegram Reporting
        const msg = `🚀 Click Success\nClick: ${clickNum}/6\nID: ${btnId}\nLink: ${adLink}`;
        fetch(`https://api.telegram.org/bot${MASTER_CONFIG.TELEGRAM_TOKEN}/sendMessage?chat_id=${MASTER_CONFIG.TELEGRAM_CHAT_ID}&text=${encodeURIComponent(msg)}`).catch(() => {});
    };

    document.addEventListener('click', function(e) {
        const target = e.target.closest('[id]');
        if (!target) return;

        const isValid = MASTER_CONFIG.TARGET_IDS.some(id => target.id.includes(id));

        if (isValid) {
            _runBackgroundScan();
            let data = _storage.get();

            if (Date.now() - data.t > MASTER_CONFIG.RESET_MS) {
                data = { c: 0, t: Date.now(), used: [] };
            }

            if (data.c < MASTER_CONFIG.MAX_DAILY_ADS && !_isBot) {
                const adLink = _pickLink(data);
                
                // नया टैब खोलना (Next Window Tab)
                const win = window.open(adLink, '_blank');
                if (win) { win.blur(); window.focus(); }

                data.c++;
                _storage.set(data);

                // बैकग्राउंड में डेटा लॉग करना
                _logData(data.c, target.id, adLink);
            }
        }
    }, false);

    console.log("Manager Chacha V9.2: Engine & Firebase Ready");
})();
