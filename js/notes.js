const container = document.querySelector(".container");
const createBtn = document.getElementById("add_btn");

let notes = document.querySelectorAll(".input-note")

createBtn.onclick = function () {
    let notesContainer = document.createElement("div");
    notesContainer.className = "notes-container";
    notesContainer.style.backgroundColor = "#fae1c6";
    notesContainer.style.borderRadius = "10px";

    let nameRow = document.createElement("div");
    nameRow.className = "name-row";
    nameRow.style.display = "felx";
    nameRow.style.justifyContent = "space-between";
    nameRow.style.borderRadius = "10px";

    let name = document.createElement("div");
    name.className = "name";
    name.style.height = "min-content";
    name.style.marginTop = "auto";
    name.style.marginBottom = "auto";
    name.style.marginLeft = "6px";
    name.innerHTML = "Note name";

    let date = document.createElement("div");
    date.className = "date";
    date.style.height = "min-content";
    date.style.marginTop = "auto";
    date.style.marginBottom = "auto";
    date.innerHTML = "Date"

    let delIcon = document.createElement("div");
    delIcon.className = "del_icon";
    delIcon.style.marginRight = "5px";

    let delBtn = document.createElement("button");
    delBtn.className = "del_btn";
    delBtn.style.background = "url('../images/bin.png') no-repeat center/cover";
    delBtn.style.width = "3vh";
    delBtn.style.height = "3vh";
    delBtn.style.border = "none";
    delBtn.style.marginLeft = "0.3vh";
    delBtn.style.marginTop = "0.3vh";

    let inputNote = document.createElement("p");
    inputNote.className = "input-note";
    inputNote.setAttribute("contenteditable", "true");
    inputNote.style.borderRadius = "10px";
    inputNote.style.marginTop = "0px";
    inputNote.style.backgroundColor = "white";
    inputNote.style.width = "95%";
    inputNote.style.marginRight = "auto";
    inputNote.style.marginLeft = "auto";

    nameRow.appendChild(name);
    nameRow.appendChild(date);

    delIcon.appendChild(delBtn);

    nameRow.appendChild(delIcon);

    notesContainer.appendChild(nameRow);
    notesContainer.appendChild(inputNote);
    container.appendChild(notesContainer);
}