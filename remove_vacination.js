(function () {
    window.addEventListener("load", onload_wait)

    // Или так можно
    // let interval_id = setInterval(() => {
    //     document.querySelectorAll("#myModalVac").forEach((node) => {
    //         if(node){
    //             node.remove();
    //             setTimeout(()=>{
    //                 clearInterval(interval_id);
    //             }, 1000) 
    //         }
    //     });
    // }, 250);

    function init() {
        const vacination = document.querySelector("#myModalVac");
        console.log( vacination );
        vacination.remove();
    }

    function onload_wait() {
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
        // Методом тыка обнаружено, что окошко с вакцинацией добавляется в div#wrapper div[data-....]
        let element = document.querySelector("#wrapper div");

        // Создаем наблюдатель для всех изменений
        // Выглядит, кстати, как очень дорого
        let observer = new MutationObserver(function (mutationsList, observer) {
            // Среди всех изменений
            for (let mutation of mutationsList)
                // Перебираем добавленые ноды
                for (let node of mutation.addedNodes) {
                    if (!node.querySelector) continue;

                    // одной из добавленых нод будет вакцинация
                    let vacination = node.querySelector("#myModalVac");
                    // if (!vacination) continue;
                    if (!vacination) continue;

                    // убираем её
                    clear(vacination);
                    vacination.remove();
                    console.log("Убрал вакцинацию");
                    return;
                }

            // Смешной сайт успевает понять(!), что мы удалили элемент и создает еще один
            // Впервые такое вижу
            document.querySelectorAll("#myModalVac").forEach((node) => { node.remove() });
        });

        // Начинаем наблюдать
        observer.observe(element, {
            characterData: false,
            childList: true,
            attributes: false,
            subtree: false
        });
        observer.observe(document.body, {
            characterData: false,
            childList: true,
            attributes: false,
            subtree: false
        })
    }

    function clear(node) {
        while (node.hasChildNodes()) {
            clear(node.firstChild);
        }
        node.parentNode.removeChild(node);
    }

})()