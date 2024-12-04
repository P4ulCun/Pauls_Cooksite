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

// search bar functionality

let availableKeywords = [
    {
        name: "lasagna recipe",
        link: "./lasagna-recipe.html"
    },
    {
        name: "brownie recipe",
        link: "./brownie-recipe.html"
    },
    {
        name: "shakshuka recipe",
        link: "./shakshuka-recipe.html"
    },
    {
        name: "lasagna ingredients",
        link: "./lasagna-recipe.html#ingredients"
    },
    {
        name: "lasagna galery",
        link: "./lasagna-recipe.html#galery"
    }
];

const resultBox = document.querySelector(".result-box");
const inputBox = document.querySelector("#input-box");

// check if the input is in the name parameters of list
function isInNames(value) {
    let n = 0;
    let result = [];
    while (n != availableKeywords.length) {
        let isInText = availableKeywords[n].name.includes(value);
        if (isInText) {
            result.push(availableKeywords[n].name);
        }
        n += 1;
    }
    return result;
}

inputBox.onkeyup = function () {
    let result = [];
    let input = inputBox.value;
    if(input.length){
        // result = availableKeywords.filter((keyword)=>{
        //     return keyword.toLowerCase().includes(input.toLowerCase());
        // });
        // result = availableKeywords.filter(isInNames);
        result = isInNames(input);
        if (!result.length) {
            result.push("No matches for your search");
        }
        console.log(result);
    }
}