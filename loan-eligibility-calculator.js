var gross_salary_slider = document.getElementById("gross-salary");
var int_rate_slider = document.getElementById("interest-rate");
var loan_period_slider = document.getElementById("loan-period");
var other_emi_slider = document.getElementById("other-emi");

gross_salary_slider.addEventListener("input", () => {
    document.querySelector("#gross-salary-text").innerText = parseInt(gross_salary_slider.value).toLocaleString("en-IN") + "₹";
    displayDetails();
});

int_rate_slider.addEventListener("input", () => {
    document.querySelector("#interest-rate-text").innerText = int_rate_slider.value + "%";
    displayDetails();
});

loan_period_slider.addEventListener("input", () => {
    document.querySelector("#loan-period-text").innerText = loan_period_slider.value + " years";
    displayDetails();
});

other_emi_slider.addEventListener("input", () => {
    document.querySelector("#other-emi-text").innerText = parseInt(other_emi_slider.value).toLocaleString("en-IN") + "₹";
    displayDetails();
});

// function calculateLoanEligibility(grossSalary, interestRate, loanTenure, otherEmi) {
//     let netIncome = grossSalary - otherEmi;
//     let r = interestRate / 12 / 100;
//     let n = loanTenure * 12;

//     let emi = (grossSalary /2) - otherEmi/2;
//     let loanAmount = (emi * (1 - Math.pow((1 + r), -n))) / r;

//     return Math.round(loanAmount);
// }



// same
function calculateLoanEligibility(grossSalary, interestRate, loanTenure, otherEmi) {
    
    let netIncome = grossSalary - otherEmi;

    let r = interestRate / 12 / 100;

   
    let n = loanTenure * 12;


    let emi = (netIncome * 0.5);     

 
    let loanAmount = (emi * (1 - Math.pow((1 + r), -n))) / r;

   
    return Math.round(loanAmount);
}


function displayDetails() {
    let grossSalary = parseInt(gross_salary_slider.value);
    let interestRate = parseFloat(int_rate_slider.value);
    let loanTenure = parseInt(loan_period_slider.value);
    let otherEmi = parseInt(other_emi_slider.value);

    let loanAmount = calculateLoanEligibility(grossSalary, interestRate, loanTenure, otherEmi);

    document.querySelector("#cl").innerText = loanAmount.toLocaleString("en-IN") + "₹";
}

function initialize() {
    document.querySelector("#gross-salary-text").innerText = parseInt(gross_salary_slider.value).toLocaleString("en-IN") + "₹";
    document.querySelector("#interest-rate-text").innerText = int_rate_slider.value + "%";
    document.querySelector("#loan-period-text").innerText = loan_period_slider.value + " years";
    displayDetails();
}

initialize();