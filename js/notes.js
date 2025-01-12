const container = document.querySelector(".container");
const createBtn = document.getElementById("add_btn");

let notes = document.querySelectorAll(".input-note")

function getRandomHexColor () {
    return '#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0');
    //padstart adauga zerouri pana cand numarul are 6 cifre
}

function updateStorage () {
    let notesContainer1 = document.querySelector(".notes-container1");
    if (notesContainer1) {
        localStorage.setItem("notes", notesContainer1.innerHTML);
    }
}

// window.onload = function () {
//     let notesContainer = document.querySelector(".notes-container");
//     notesContainer.innerHTML = localStorage.getItem("notes");
// }

createBtn.onclick = function () {
    let notesContainer1 = document.createElement("div");
    notesContainer1.className = "notes-container1";
    notesContainer1.style.backgroundColor = getRandomHexColor();
    notesContainer1.style.borderRadius = "10px";

    let nameRow = document.createElement("div");
    nameRow.className = "name-row";
    nameRow.style.display = "flex";
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

    let notesContainer = document.querySelector(".notes-container");
    notesContainer1.appendChild(nameRow);
    notesContainer1.appendChild(inputNote);
    notesContainer.appendChild(notesContainer1);
    updateStorage();
}

// delBtn.onclick() = function () {
//     let notesContainer = document.getElementById("del-Btn");
//     notesContainer.innerHTML = "blabla";
// }
let notesContainer1 = document.querySelector(".notes-container1");
notesContainer1.addEventListener("click", function(e) {
    // if (e.target.tagName)
})