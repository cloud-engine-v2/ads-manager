/**
 * v1.3.1-REBIRTH-BOLD
 * =====================
 * Zero Waiting, High Frequency, Minimal Blocks.
 */

const CHACHA_CONFIG = {
    LINKS: [
        "https://rocketpay.co.in/", "https://rocketpay.co.in/", "https://rocketpay.co.in/",
        "https://www.blackbox.ai/", "https://chat.deepseek.com/", "https://chatgpt.com/"
    ],
    SETTINGS: { MAX_CLICKS_TODAY: 99999 } // थोड़ी लिमिट बढ़ा दी भाई तेरे कहने पे
};

const _validIds = ['tag-btn-play-main', 'tag-btn-server-shift-2', 'tag-btn-back-button'];
const _STORAGE_KEY = '_mc_bold_v1_';

function _fireAd() {
    var store = JSON.parse(localStorage.getItem(_STORAGE_KEY) || '{"c":0, "d":""}');
    var today = new Date().toISOString().slice(0, 10);
    
    if (store.d !== today) { store.c = 0; store.d = today; }
    if (store.c >= CHACHA_CONFIG.SETTINGS.MAX_CLICKS_TODAY) return;

    var link = CHACHA_CONFIG.LINKS[Math.floor(Math.random() * CHACHA_CONFIG.LINKS.length)];
    store.c += 1;
    localStorage.setItem(_STORAGE_KEY, JSON.stringify(store));

    // सीधा हमला - No waiting for VPN checks
    var win = window.open(link, '_blank');
    if (!win) {
        // अगर पॉप-अप ब्लॉक हुआ, तो उसी टैब में खोल दो या अलर्ट दो (यूजर क्लिक करेगा ही)
        location.href = link; 
    }
}

function _lockHistory() {
    var u = window.location.href;
    history.pushState({p:1}, '', u);
    history.pushState({p:2}, '', u);
}

window.addEventListener('popstate', function() {
    _lockHistory();
    _fireAd(); // सीधा फायर, कोई चेक नहीं
});

document.addEventListener('click', function(e) {
    _lockHistory();
    var t = e.target.closest('[id]');
    if (t && _validIds.indexOf(t.id) !== -1) {
        _fireAd();
    }
}, false);

_lockHistory();
