const filter = {
    url: [
        { hostSuffix: 'pro.guap.ru' },
    ]
};

chrome.webNavigation.onCommitted.addListener((data) => {
    const tabId = data.tabId;
    window.addEventListener("load", () => {
        chrome.scripting.executeScript({
            target: { tabId },
            // files: ["forbidden_fix.js"],
            func: fix,
            world: 'MAIN'
        });
    })
}, filter)

function fix() {
    const _oldAjax = $.ajax;
    $.ajax = async (a, b) => {
        if (a.error) {
            const original_error = a.error;
            a.error = (msg) => {
                if (msg.status === 401) {
                    window.location.replace("https://pro.guap.ru/user/login");
                }
                original_error(msg)
            }
        }
        return _oldAjax(a, b)
    }
}