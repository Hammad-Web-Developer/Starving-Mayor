const controls = document.querySelectorAll(".control");

// Enabling range setters and balance deductions

controls.forEach(element => {
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
    const balElement = document.getElementById("balance");
    let balance = balElement.innerText;
    balance = balance.replace(/k$/ , "000");
    if (Number(price.innerText) <= Number(balance)){
        let post = Number(balance) - Number(price.innerText);
        post = JSON.stringify(post).replace(/000$/ , "k");
        balElement.innerText = post;
    }
});
});