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
const clearout = document.getElementById("clearout");
const toBlur = document.getElementById("to-blur");
const instructions = document.querySelector(".instructions");
const timer = document.getElementById("time");
const shipCount = document.getElementById("ships");
const gameOver = document.querySelector(".game-over");
const gameOverOk = document.getElementById("game-over-ok");
const mexican = document.getElementById("MXN");
const canadian = document.getElementById("CAD");
const chinese = document.getElementById("CNY");
const swiz = document.getElementById("CHF");
const exchangeBtn = document.getElementById("exchange");

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
        "police": 0,
        "currencies" : ["MXN","CAD","CNY","CHF"]
    }
    localStorage.setItem("data" , JSON.stringify(data));
    toBlur.classList.toggle("hidden");
    instructions.classList.toggle("hidden");
    countdown();
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
        expProducts(finalPrice);
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

function expProducts(ships){
    let data = JSON.parse(localStorage.getItem("data"));
    if (ships <= data.ships){
    data.ships -= ships;
    let shipAlready = Number(shipCount.innerText);
    shipAlready -= ships;
    shipCount.innerText=shipAlready;
    localStorage.setItem("data" , JSON.stringify(data));
    addTradeMoney(ships);
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
    const housing = Math.min(data.homies / data.population, 1);
    const education = Math.min(data.educated / data.population, 1);
    const jobsRate = Math.min(data.jobs / data.population, 1);
    const healthRate = Math.min(data.health / data.population, 1);

    const base =
        housing * 0.30 +
        education * 0.20 +
        jobsRate * 0.25 +
        healthRate * 0.25;

    // Pollution hurts happiness
    const pollutionPenalty = Math.min(data.pollution / 100, 0.30);

    // Taxes hurts happiness

    const taxPenalty = Math.min((data.taxes - 10) / 100, 0.20);

    // Safety contributes a little
    const safetyRate = Math.min(data.police / data.population, 1);
    const safetyBonus = safetyRate * 0.10;

    let happiness = (base - pollutionPenalty - taxPenalty + safetyBonus) * 100;

    // Keep it between 0 and 99 normally
    happiness = Math.max(0, Math.min(happiness, 99));

    happyPerc.innerText = Math.floor(happiness);

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

// Function to clear out city

function clean(){
    let data = JSON.parse(localStorage.getItem("data"));
    data.pollution = 0;
    localStorage.setItem("data" , JSON.stringify(data));
    let balance = balElement.innerText;
    balance = Number(balance.replace(/k$/ , "000"));
    if (balance < 2000){
        alert("Insufficient balance");
        return;
    }
    balance = JSON.stringify((balance-2000)).replace(/000$/ , "k");
    balElement.innerText = balance;
    finalCalc();
    pollution();
}

// On clearout button click

clearout.addEventListener("click",clean);

// Function for game countdown

function countdown(){
    let time = Number(timer.innerText);
    time--;
    timer.innerText = time;
    if (time === 0){
        toBlur.classList.toggle("hidden");
        gameOver.classList.toggle("hidden");
        return;
    } else if (time === 8 || time === 6 || time === 4 || time === 2){
        deductTaxes();
    }
    deductSalaries();
    addShips();
    setTimeout(countdown,60000);
}

// Function to add ships ready to export

function addShips(){
    let data = JSON.parse(localStorage.getItem("data"));
    let number = data.industry * 2;
    data.ships += number;
    localStorage.setItem("data",JSON.stringify(data));
    let shipAlready = Number(shipCount.innerText);
    shipAlready += number;
    shipCount.innerText=shipAlready;
}

// Function to deduct tax money

function deductTaxes(){
    let data = JSON.parse(localStorage.getItem("data"));
    let tax = (data.population) * (data.taxes * 0.5);
    let balance = balElement.innerText;
    balance = balance.replace(/k$/ , "000");
    balance = Number(balance);
    balance += tax;
    balance = JSON.stringify(balance).replace(/000$/,"k");
    balElement.innerText = balance; 
}

// Function to deduct police men pay

function deductSalaries(){
    let data = JSON.parse(localStorage.getItem("data"));
    let pay = (data.police) * 20;
    let balance = balElement.innerText;
    balance = balance.replace(/k$/ , "000");
    balance = Number(balance);
    balance -= pay;
    balance = JSON.stringify(balance).replace(/000$/,"k");
    balElement.innerText = balance;
}

// When ok button is pressed on game over window

gameOverOk.addEventListener("click",()=>{
    gameOver.classList.toggle("hidden");
    window.location.reload();
});

// Asynchronous function to add currency when ships are exported

async function addTradeMoney(ships){
    let data = JSON.parse(localStorage.getItem("data"));
    let array = data.currencies;
    let number = Math.floor(Math.random() * 4);
    let name = array[number];
    try {
    let response = await fetch("https://api.exchangerate-api.com/v4/latest/USD");
    let apiData = await response.json();
    let obj = apiData.rates;
    let money = obj[name] * (ships * 100);
    let balanceEl = document.getElementById(name);
    let balance = Number(balanceEl.innerText);
    balance += money;
    balanceEl.innerText = balance.toFixed(1);
    } catch (error) {
        alert(`An error occoured while fetching Currency Api : ${error}`);
    }
}

// Asynchronous function to convert currency

async function exchangeCurrency(){
    try {
    let response = await fetch("https://api.exchangerate-api.com/v4/latest/USD");
    let data = await response.json();
    let obj = data.rates;
    let availableBalance = Number((balElement.innerText).replace(/k$/,"000"));
    let MXNval = Number(mexican.innerText) / obj.MXN;
    let CADval = Number(canadian.innerText) / obj.CAD;
    let CNYval = Number(chinese.innerText) / obj.CNY;
    let CHFval = Number(swiz.innerText) / obj.CHF;
    let finalBalance = availableBalance + MXNval + CADval + CNYval + CHFval;
    finalBalance = JSON.stringify(finalBalance).replace(/000$/,"k");
    balElement.innerText = finalBalance;
    mexican.innerText = 0;
    canadian.innerText = 0;
    chinese.innerText = 0;
    swiz.innerText = 0;
    } catch (error) {
        alert(`An error occoured while fetching Currency Api : ${error}`);
    }
}

exchangeBtn.addEventListener("click",exchangeCurrency);