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
const searchContainer = document.querySelector(".search-container");

// check if the input is in the name parameters of list
function isInNames(value) {
    let n = 0;
    let result = [];
    while (n != availableKeywords.length) {
        let isInText = availableKeywords[n].name.toLowerCase().includes(value);
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
        result = isInNames(input.toLowerCase());
        if (!result.length) {
            result.push("No matches for your search");
        }
        console.log(result);
    }
    displaySearchResult(result);
}

function displaySearchResult(result) {
    if(!result.length) {
        result.innerHTML = '';
        searchContainer.style.height = "51px";
    }
    else {
        searchContainer.style.height = "fit-content";
    }
    const content = result.map((list)=>{
        return "<li>" + list + "</li>";
    });

    resultBox.innerHTML = "<ul>" + content.join('') + "</ul>";
}
