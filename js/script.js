//alert("hi");
document.querySelector("#stateSelect").addEventListener("change", displayCounties);

let zipcodeInput = document.querySelector('#zipcodeInput');

zipcodeInput.addEventListener("input", async function() {
    let zipcodeResults = await fetch("https://csumb.space/api/cityInfoAPI.php?zip=" + zipcodeInput.value);
    //make sure this works for all zipcodes
    console.log(zipcodeResults);

    let zips = await zipcodeResults.json();

    if (zips) {
        document.querySelector("#checkZip").textContent = "";
        let city = document.querySelector("#displayCity");
        let lat = document.querySelector("#displayLatitude");
        let long = document.querySelector("#displayLongitude");

        city.textContent = zips.city;
        lat.textContent = zips.latitude;
        long.textContent = zips.longitude;
    } else {
        document.querySelector("#checkZip").textContent = "Zip code not found";
        document.querySelector("#checkZip").style.color = "red";

    }
});

let usernameInput = document.querySelector("#usernameInput");
let status = document.querySelector("#status");

usernameInput.addEventListener("input", async function() {
    let usernameResults = await fetch("https://csumb.space/api/usernamesAPI.php?username=" + usernameInput.value);
    console.log(usernameResults);

    let result = await usernameResults.json();
    
    status.textContent = "";
    if (result.available == true) {
        status.textContent = "Username is available";
        status.style.color = "green";
    } else {
        status.textContent = "Username is not available";
        status.style.color = "red";
    }
})

let displayPassword = document.querySelector("#displayPw");

displayPassword.addEventListener("click", async function() {
    let passwordResults = await fetch("https://csumb.space/api/suggestedPassword.php?length=8")
    console.log(passwordResults);

    let passwords = await passwordResults.json();
    console.log(passwords);

    displayPw.placeholder = passwords.password;

});

let submitBtn = document.querySelector("#submitBtn");

submitBtn.addEventListener("click", function() {
    let pwFeedback = document.querySelector("#checkPw");
    if (displayPw.value.length < 6) {
        pwFeedback.textContent = "The password must be at least 6 characters long";
        pwFeedback.style.color = "red";
    } 
    
    let usernameFeedback = document.querySelector("#checkUsername");
    if (usernameInput.value.length < 3) {
        status.textContent = "";
        usernameFeedback.textContent = "The username must be at least 3 characters long";
        usernameFeedback.style.color = "red";

    }

    let pwMatchFeedback = document.querySelector("#checkPwMatch");
    let otherPw = document.querySelector("#otherPw");
    if (displayPw.value != otherPw.value) {
        pwMatchFeedback.textContent = "Passwords must match - retype password"
        pwMatchFeedback.style.color = "red";

    }
})

async function getStates() {
    let statesResults = await fetch("https://csumb.space/api/allStatesAPI.php");
    console.log(statesResults);

    let states = await statesResults.json(); 
    console.log(states);

    let stateSelect = document.querySelector("#stateSelect");
    console.log(states[0]);

    //create 1 state option and add to dropdown

    //add loop
    for (let i of states) {
        let stateOption = document.createElement('option');
        stateOption.id = i.usps;
        stateOption.value = i.state;
        stateOption.textContent = i.state;

        stateSelect.appendChild(stateOption);
    }
}

async function displayCounties() {
    let state = document.querySelector("#stateSelect").options[document.querySelector("#stateSelect").selectedIndex].id;
    console.log(state);
    let url = `https://csumb.space/api/countyListAPI.php?state=${state}`;
    let response = await fetch(url);
    let data = await response.json();
    let countyList = document.querySelector("#county");
    countyList.innerHTML = "<option> Select County </option>";
    for (let i of data) {
        countyList.innerHTML += `<option> ${i.county} </option>`;
    }
}

getStates();

