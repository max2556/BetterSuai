(function () {
    console.log("BetterSUAI приветствует вас...")

    onload_wait();

    /**
     *  @brief основная функция
     *  @note вызывается из onload_wait();
     */
    function init() {
        disable_vacination();
        better_aside_menu();
    }

    /**
     *  @brief Костыль для ожидания загрузки всех модулей сайта
     */
    function onload_wait() {
        console.log("Жду загрузки модулей");
        const div_wrapper = document.querySelector("#wrapper div");
        const body = document.body;
        let timeoutId = null;


        // ждем последнего изменения. После этого будем считать страницу загруженной
        let observer = new MutationObserver(function (mutationsList, observer) {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(init, 200); /// @todo: 200 - rework
        })
        observer.observe(div_wrapper, {
            childList: true
        })
        observer.observe(body, {
            childList: true
        })
    }

    /**
     *  @brief Выключает опросник по вакцинации.
     */
    function disable_vacination() {
        const vacination = document.querySelector("#myModalVac");
        if (!vacination) return;

        vacination.remove();
        console.log("Удалил вакцинацию");
    }

    function better_aside_menu() {
        const key = "aside-menu-switch";
        
        const browser = chrome || browser;

        browser.storage.local.get([key])
            .then((value) => {
                const menu = document.querySelector("aside#menu"); // Ищем меню 
                menu.classList.add("betterSUAI");                  // Накидываем свой класс, чтобы менять стили
                if (value[key]) menu.classList.add("better-desktop")

                const wrapper = document.querySelector("div#wrapper") // Ищем "тело" сайта
                wrapper.classList.add("betterSUAI");                  // на него тоже накидываем
                if (value[key]) wrapper.classList.add("better-desktop");
            });
    }

    function clear(node) {
        while (node.hasChildNodes()) {
            clear(node.firstChild);
        }
        node.parentNode.removeChild(node);
    }

})()