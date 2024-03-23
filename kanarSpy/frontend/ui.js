
const menu = () => {
    const menu = document.getElementById("menuRow");
    if (menu.classList.contains("d-none")) {
        menu.classList.replace("d-none", "d-flex");
    }
    else if (menu.classList.contains("d-flex")) {
        menu.classList.replace("d-flex", "d-none");
    }
}

const addKanarToList = (serverResponse) => {

    const element = document.createElement('div');
    element.innerHTML = `
        <div class="row">
            <div class="col-4">${serverResponse.line}</div>
            <div class="col-4">${serverResponse.stop}</div>
            <div class="col-4">${serverResponse.date}</div>
        </div>
    `
    element.className = "row";

    document.getElementById("listOfKanars").appendChild(element);

}