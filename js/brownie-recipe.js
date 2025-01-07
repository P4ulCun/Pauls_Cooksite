// dropdown functionality

let navButton = document.getElementById("nav-button");
let navMenu = document.querySelector(".menu");

navButton.onclick = function() {
    if (navMenu.className === "menu") {
        navMenu.className = "menu, responsive";
    }
    else {
        navMenu.className = "menu";
    }
}

// search dropdown functionality

let searchBtn = document.getElementById("search-dropdown");
let searchMenu = document.querySelector(".search-container");

searchBtn.onclick = function() {
    if (searchMenu.className === "search-container") {
        searchMenu.className = "search-container, responsive-search";
    }
    else {
        searchMenu.className = "search-container";
    }
    // if (!searchMenu.classList.contains("responsive-search")) {
    //     // searchMenu.classList.add("responsive-search");
    //     searchMenu.classList.toggle("responsive-search");
    //     console.log(searchMenu.outerHTML);
    // }
    // else {
    //     // searchMenu.classList.remove("responsive-search");
    //     searchMenu.classList.toggle("responsive-search");
    //     console.log(searchMenu.outerHTML);
    // }
}

// search bar functionality

let availableKeywords = [
    {
        name: "Lasagna recipe",
        link: "./lasagna-recipe.html"
    },
    {
        name: "Brownie recipe",
        link: "./brownie-recipe.html"
    },
    {
        name: "Shakshuka recipe",
        link: "./shakshuka-recipe.html"
    },
    {
        name: "Lasagna ingredients",
        link: "./lasagna-recipe.html#ingredients"
    },
    {
        name: "Lasagna galery",
        link: "./lasagna-recipe.html#galery"
    }
];

const resultBox = document.querySelector(".result-box");
const inputBox = document.querySelector("#input-box");
const searchContainer = document.querySelector(".search-container");

// check if the input is in the name parameters of list
function isInNames(value) {
    let n = 0;
    let resultName = [];
    while (n != availableKeywords.length) {
        let isInText = availableKeywords[n].name.toLowerCase().includes(value);
        // console.log(isInText);
        if (isInText) {
            resultName.push(availableKeywords[n].name);
        }
        n += 1;
    }
    return resultName;
}
function getLink(value){
    let n = 0;
    let resultLink = [];
    while (n != availableKeywords.length) {
        let isInText = availableKeywords[n].name.toLowerCase().includes(value);
        // console.log(isInText);
        if (isInText) {
            resultLink.push(availableKeywords[n].link);
        }
        n += 1;
    }
    return resultLink;
}

inputBox.onkeyup = function () {
    let resultName = [];
    let resultLink = [];
    let input = inputBox.value;
    if(input.length){
        // result = availableKeywords.filter((keyword)=>{
        //     return keyword.toLowerCase().includes(input.toLowerCase());
        // });
        // result = availableKeywords.filter(isInNames);
        resultName = isInNames(input.toLowerCase());
        if (!resultName.length) {
            resultName.push("No matches for your search");
        }
        resultLink = getLink(input.toLowerCase());
        console.log(resultName);
        console.log(resultLink);
    }
    displaySearchResult(resultName, resultLink);
    resultLink = [];
}

function makeList(resultName, resultLink) {
    let content = [];
    let n = 0;
    while (n != resultName.length) {
        content[n] = `<li><a href="${resultLink[n]}">${resultName[n]}</a></li>`
        n += 1;
    }
    return content;
}

function displaySearchResult(resultName, resultLink) {
    if(!resultName.length) {
        resultName.innerHTML = '';
        searchContainer.style.height = "5.3vh";
    }
    else {
        searchContainer.style.height = "fit-content";
    }
    // const content = result.map((list)=>{
    //     return "<li>" + list + "</li>";
    // });
    let content = makeList(resultName, resultLink);
    console.log(content);
    resultBox.innerHTML = "<ul>" + content.join('') + "</ul>";
}