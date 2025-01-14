const loginPage = document.getElementById("loginPage");
const yesBtn = document.getElementById("yes");

let loginInfo;
if (localStorage.getItem("loginInfo") != null) {
    loginInfo = JSON.parse(localStorage.getItem("loginInfo"));
    if (loginInfo.email != "") {
        loginPage.parentElement.innerHTML = `<a href = "./logout.html" id="loginInfo"><div>Logout</div></a>`;
        // add here
        let connectedWith = document.getElementById("connected-with");
        connectedWith.innerHTML = `<p>You're connected with:<br>${loginInfo.email}`;
    }
}
else {
    if (document.URL.includes("logout.html")) {
        window.location.href = "../html/login.html";
    }
}

if (yesBtn != null) {
    yesBtn.addEventListener("click", (event) => {
        event.preventDefault();
        if (loginInfo.email != "") {
            localStorage.clear("loginInfo");
        }
        window.location.href = "../html/homepage.html";
    })
}