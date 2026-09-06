const controls = document.querySelectorAll(".control");
const balElement = document.getElementById("balance");
const start = document.getElementById("start");
const people = document.getElementById("people");
const happyPerc = document.getElementById("happyPerc");
const houseDiv = document.getElementById("houses");
const pollutionDiv = document.getElementById("pollution");
const schoolDiv = document.getElementById("education");
const healthDiv = document.getElementById("health");
const industryDiv = document.getElementById("industries");
const jobsDiv = document.getElementById("jobs");
const businessDiv = document.getElementById("businesses");
const safetyDiv = document.getElementById("safety");

// Setting up local storage on game start 

start.addEventListener("click" , ()=>{
    localStorage.clear();
    const data = {
        "population": 500,
        "ships": 0,
        "happy": 0,
        "homies": 0,
        "educated": 0,
        "jobs": 0,
        "health": 0,
        "industry": 0,
        "business": 0,
        "taxes": 10,
        "pollution": 0,
        "police": 0
    }
    localStorage.setItem("data" , JSON.stringify(data));
});

// Enabling range setters and balance deductions

controls.forEach(element => {
   const name = element.querySelector("span");
   const rangeSetter = element.querySelector("input[type='range']");
   const price = element.querySelector("button span");
   const button = element.querySelector("button");
   rangeSetter.addEventListener("change", ()=>{
    let pre = Number(price.dataset.num);
    let val = rangeSetter.value;
    let post = pre * val;
    price.innerText = post;
}); 
button.addEventListener("click",()=>{
    let balance = balElement.innerText;
    balance = Number(balance.replace(/k$/ , "000"));
    let finalPrice = Number(price.innerText);
    if (name.innerText === "Add Houses"){
    addHouses(finalPrice,balance);
    setColor(eleName='homies');
    } else if (name.innerText === "Add Schools") {
        addSchools(finalPrice,balance);
        setColor(eleName='educated');
    } else if (name.innerText === "Add Hospital") {
        addHospitals(finalPrice,balance);
        setColor(eleName='health');
    } else if (name.innerText === "Add Industry") {
        addIndustry(finalPrice,balance);
        setColor(eleName='industry');
    } else if (name.innerText === "Give Loans") {
        giveLoan(finalPrice,balance);
        setColor(eleName='loans')
    } else if (name.innerText === "Inc Taxes"){
        increaseTax(finalPrice);
    } else if (name.innerText === "Inc Police"){
        hirePolice(finalPrice);
        setColor(eleName='police');
    } else if (name.innerText === 'Exp Products'){
        expProducts(finalPrice,balance);
    }
});
});

// Function for adding houses

  
function addHouses(price,balance) {
    if (price > balance){
        alert("Insufficient balance");
        return;
    }
    let data = JSON.parse(localStorage.getItem("data"));
    let post = balance - price;
    post = JSON.stringify(post).replace(/000$/ , "k");
    balElement.innerText = post;
    data.homies += (price / 270) * 20;
    data.pollution += (price / 270) * 0.2;
    localStorage.setItem("data" , JSON.stringify(data));
    finalCalc();
}

// Function for adding schools

function addSchools(price,balance) {
    if (price > balance){
        alert("Insufficient balance");
        return;
    }
    let data = JSON.parse(localStorage.getItem("data"));
    let post = balance - price;
    post = JSON.stringify(post).replace(/000$/ , "k");
    balElement.innerText = post;
    data.educated += (price / 500) * 70;
    data.jobs += (price / 800) * 10;
    data.pollution += (price / 500) * 3;
    localStorage.setItem("data" , JSON.stringify(data));
    finalCalc();
}

// Function for adding hospitals

function addHospitals(price,balance) {
    if (price > balance){
        alert("Insufficient balance");
        return;
    }
    let data = JSON.parse(localStorage.getItem("data"));
    let post = balance - price;
    post = JSON.stringify(post).replace(/000$/ , "k");
    balElement.innerText = post;
    data.health += (price / 700) * 100;
    data.jobs += (price / 700) * 20;
    data.pollution += (price / 700) * 7;
    localStorage.setItem("data" , JSON.stringify(data));
    finalCalc();
}

// Function for adding industries

function addIndustry(price,balance) {
    if (price > balance){
        alert("Insufficient balance");
        return;
    }
    let data = JSON.parse(localStorage.getItem("data"));
    let post = balance - price;
    post = JSON.stringify(post).replace(/000$/ , "k");
    balElement.innerText = post;
    data.industry += price / 800;
    data.jobs += (price / 800) * 50;
    data.health -= (price / 800) * 10;
    data.business += (price / 800) * 5;
    data.pollution += (price / 800) * 15;
    localStorage.setItem("data" , JSON.stringify(data));
    finalCalc();
}

// Function for giving loans

function giveLoan(price,balance) {
    if (price > balance){
        alert("Insufficient balance");
        return;
    }
    let data = JSON.parse(localStorage.getItem("data"));
    let post = balance - price;
    post = JSON.stringify(post).replace(/000$/ , "k");
    balElement.innerText = post;
    data.jobs += (price / 3000) * 6;
    data.business += (price / 3000) * 3;
    data.pollution += (price / 3000) * 9;
    localStorage.setItem("data" , JSON.stringify(data));
    finalCalc();
}

// Function to increase tax

function increaseTax(percent){
    let data = JSON.parse(localStorage.getItem("data"));
    data.taxes += (data.taxes / 100) * percent;
    localStorage.setItem("data" , JSON.stringify(data));
    finalCalc();
}

// Function to hire police

function hirePolice(number) {
    let data = JSON.parse(localStorage.getItem("data"));
    data.police += number;
    data.jobs += number;
    localStorage.setItem("data" , JSON.stringify(data));
    finalCalc();
}

// Function to export products

function expProducts(ships,balance){
    let data = JSON.parse(localStorage.getItem("data"));
    if (ships <= data.ships){
    data.ships -= ships;
    let final = balance + (ships * 500);
    balElement.innerText = final;
    localStorage.setItem("data" , JSON.stringify(data));
    finalCalc();
    }
}

// Function for calculating hapiness

function finalCalc(){
    let data = JSON.parse(localStorage.getItem("data"));
    if (data.homies > data.population) {
        data.population = data.homies;
        people.innerText = data.population;
        localStorage.setItem("data" , JSON.stringify(data));
    }
    let final = Math.floor(((((data.homies/data.population)*100)+((data.educated/data.population)*100)+((data.jobs/data.population)*100)+((data.health/data.population)*100))/4));
    happyPerc.innerText = final;
}

// Function for setting div colors

function setColor(name){
    if (name === 'homies'){
        houses();
        pollution();
    } else if (name === 'educated'){
        schools();
        pollution();
        jobs();
    } else if (name === 'health'){
        jobs();
        pollution();
        health();
    } else if (name === 'industry'){
        industry();
        pollution();
        jobs();
        health();
        business();
    } else if (name === 'loans'){
        jobs();
        business();
        pollution();
    } else if (name === 'police'){
        jobs();
        safety();
    }
}

// Function to color houses

function houses(){
    let data = JSON.parse(localStorage.getItem("data"));
    let final = (data.homies / data.population) * 100;
    houseDiv.style.background = `linear-gradient(
        to right,
        green ${final}%,
        blueviolet ${final}%
    )`;
}

// Function to color schools

function schools(){
    let data = JSON.parse(localStorage.getItem("data"));
    let final = (data.educated / data.population) * 100;
    schoolDiv.style.background = `linear-gradient(
        to right,
        green ${final}%,
        blueviolet ${final}%
    )`;
}

// Function to color pollution

function pollution(){
    let data = JSON.parse(localStorage.getItem("data"));
  pollutionDiv.style.background = `linear-gradient(
        to right,
        red ${data.pollution}%,
        blueviolet ${data.pollution}%
    )`;
}

// Function to color jobs

function jobs(){
    let data = JSON.parse(localStorage.getItem("data"));
    let final = (data.jobs / data.population) * 100;
    jobsDiv.style.background = `linear-gradient(
        to right,
        green ${final}%,
        blueviolet ${final}%
    )`;
}

// Function to color health

function health(){
    let data = JSON.parse(localStorage.getItem("data"));
    let final = (data.health / data.population) * 100;
    healthDiv.style.background = `linear-gradient(
        to right,
        green ${final}%,
        blueviolet ${final}%
    )`;
}

// Function to color business

function business(){
    let data = JSON.parse(localStorage.getItem("data"));
    let final = (data.business / data.population) * 1000;
    businessDiv.style.background = `linear-gradient(
        to right,
        green ${final}%,
        blueviolet ${final}%
    )`;
}

// Function to color industry

function industry(){
    let data = JSON.parse(localStorage.getItem("data"));
    let final = (data.industry / data.population) * 5000;
    industryDiv.style.background = `linear-gradient(
        to right,
        green ${final}%,
        blueviolet ${final}%
    )`;
}

// Function to color safety

function safety(){
    let data = JSON.parse(localStorage.getItem("data"));
    let final = (data.police / data.population) * 2000;
    safetyDiv.style.background = `linear-gradient(
        to right,
        green ${final}%,
        blueviolet ${final}%
    )`;
}
