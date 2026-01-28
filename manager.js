// --- ٹیسٹنگ کے لیے 20 لنکس (یہاں ابھی گوگل اور بنگ ڈال رہا ہوں) ---
const directClickLinks = [
    'https://www.google.com', 'https://www.bing.com', 'https://www.wikipedia.org',
    'https://www.google.com', 'https://www.bing.com', 'https://www.wikipedia.org',
    'https://www.google.com', 'https://www.bing.com', 'https://www.wikipedia.org',
    'https://www.google.com', 'https://www.bing.com', 'https://www.wikipedia.org',
    'https://www.google.com', 'https://www.bing.com', 'https://www.wikipedia.org',
    'https://www.google.com', 'https://www.bing.com', 'https://www.wikipedia.org',
    'https://www.google.com', 'https://www.bing.com'
];

// --- فکسڈ ایڈز کی جگہ بھی فی الحال گوگل ڈال دیں ---
const fixedAds = {
    topBanner: 'https://www.google.com',
    sidebar: 'https://www.google.com',
    floatBar: 'https://www.google.com'
};

function getRandomDirectLink() {
    return directClickLinks[Math.floor(Math.random() * directClickLinks.length)];
}

// فکسڈ ڈبوں میں ٹیسٹنگ لنک لوڈ کرنا
window.addEventListener('DOMContentLoaded', () => {
    if(document.getElementById('id-top-banner')) {
        document.getElementById('id-top-banner').innerHTML = `<iframe src="${fixedAds.topBanner}" width="728" height="90" frameborder="0"></iframe>`;
    }
    if(document.getElementById('id-sidebar-box')) {
        document.getElementById('id-sidebar-box').innerHTML = `<iframe src="${fixedAds.sidebar}" width="300" height="250" frameborder="0"></iframe>`;
    }
    if(document.getElementById('id-float-strip')) {
        document.getElementById('id-float-strip').innerHTML = `<iframe src="${fixedAds.floatBar}" width="100%" height="60" frameborder="0"></iframe>`;
    }
});

// بٹنز پر کلک کرنے سے نیا ٹیب کھلے گا
document.addEventListener('click', function(e) {
    if (e.target && (e.target.id === 'play-btn' || e.target.id === 'server-btn' || e.target.classList.contains('q-btn'))) {
        window.open(getRandomDirectLink(), '_blank');
    }
});
