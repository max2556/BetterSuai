(function () {
    const browser = chrome || browser;

    document
        .querySelectorAll(".checkbox")
        .forEach((checkbox) => {
            const id_key = checkbox.id;

            browser.storage.local.get([id_key]).then((result)=>{
                checkbox.checked = result[id_key];
            })

            const set = () => {
                const value = checkbox.checked;
                const query = {}
                query[id_key] = value;
                browser.storage.local.set(query)
            }

            checkbox.onchange = set;
        })
})()