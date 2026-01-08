const ul = document.querySelector(".list");
const addBtn = document.querySelector(".btn-add");
const input = document.querySelector("[data-custom=input]");
addBtn.addEventListener("click", (e) => {
    const newLi = document.createElement("li");
    newLi.textContent = input.value;
    const btnClose = document.createElement("button");
    btnClose.textContent = "x";
    btnClose.dataset.action = "delete";
    ul.append(newLi);
    newLi.append(btnClose);
});
ul.addEventListener("click", (e) => {
    const btnCloseTarget = e.target.closest("[data-action=delete]");
if (btnCloseTarget) {
    btnCloseTarget.closest("li").remove();
    return;
}
const liTarget = e.target.closest("li");
if (liTarget) {
    liTarget.classList.toggle("selected");
}
});