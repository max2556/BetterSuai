import { init } from "./app.js";

const filter = {
    url: [
        {
            hostSuffix: "pro.guap.ru"
        },
        {
            hostSuffix: "guap.ru"
        },
    ],
};

chrome.webNavigation.onCompleted.addListener((tab) => {
    console.info("Ради всего... зачем вы зашли на сайт ГУАПа...");
    console.log(tab);

    chrome.scripting.executeScript({
        target: { tabId: tab.tabId ? tab.tabId : -1 },
        func: init,
        args: []
    }).then(() => {
        console.warn("Конец выполнения executeScript");
    });
    // init();
}, filter);