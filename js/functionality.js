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

// let availableKeywords = [
//     {
//         name: "Lasagna recipe",
//         link: "./lasagna-recipe.html"
//     },
//     {
//         name: "Brownie recipe",
//         link: "./brownie-recipe.html"
//     },
//     {
//         name: "Shakshuka recipe",
//         link: "./shakshuka-recipe.html"
//     },
//     {
//         name: "Lasagna ingredients",
//         link: "./lasagna-recipe.html#ingredients"
//     },
//     {
//         name: "Lasagna galery",
//         link: "./lasagna-recipe.html#galery"
//     }
// ];

// AJAX fetch
// let availableKeywords = {};
// fetch('search_terms.json')
//       .then(response => {
//         if (!response.ok) {
//           throw new Error('Network response was not ok ' + response.statusText);
//         }
//         return response.json();
//       })
//       .then(data => {
//         availableKeywords = data;
//         console.log(typeof fetchedData);
//         console.log(fetchedData.availableKey[0].name);
//         })
//       .catch(error => {
//         console.error('Fetch error:', error);
// });
// console.log(availableKeywords);

// Ajax old
let availableKeywords;
const xhr = new XMLHttpRequest();
    xhr.open('GET', 'search_terms.json', true);

    xhr.onload = function () {
      if (xhr.status === 200) {
        const data = JSON.parse(xhr.responseText);
        availableKeywords = data.availableKey;
        
        // console.log(availableKeywords);
        // console.log('Data fetched with XMLHttpRequest:', data);
      } else {
        console.error('Error fetching data:', xhr.statusText);
      }
    };

    xhr.onerror = function () {
      console.error('Request error');
    };

    xhr.send();
// console.log(availableKeywords);
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
    }
    displaySearchResult(resultName, resultLink);
    resultLink = [];
}

function makeList(resultName, resultLink) {
    let content = [];
    let n = 0;
    let nMax = resultName.length;
    if (nMax > 5) {
        nMax = 5;
    }
    while (n != nMax) {
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
    resultBox.innerHTML = "<ul>" + content.join('') + "</ul>";
}

const animation = document.querySelector(".animation-box");

function getRandomHexColor () {
    return '#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0');
    //padstart adauga zerouri pana cand numarul are 6 cifre
}

setInterval ( () => {
    let color = getRandomHexColor();
    animation.style.backgroundColor = color;
}, 1500)