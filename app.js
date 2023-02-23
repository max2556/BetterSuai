export function init() {

    return;
    

    console.info("Начинаю магию улучшения");
    disable_vacination();

    function disable_vacination() {
        const vacination_element = document.querySelector("#myModalVac");
        vacination_element.remove();
        console.info("Убрал вакцинацию")
    }

}




