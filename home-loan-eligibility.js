var P, R, N, pie;
var loan_amt_slider = document.getElementById("loan-amount");
var int_rate_slider = document.getElementById("interest-rate");
var loan_period_slider = document.getElementById("loan-period");
var other_emi_slider = document.getElementById("other-emi");
var net_income_input = document.getElementById("net-income");


loan_amt_slider.addEventListener("input", (self) => {
	document.querySelector("#loan-amt-text").innerText =
		parseInt(self.target.value).toLocaleString("en-IN") + "₹";
	P = parseFloat(self.target.value);
	displayDetails();
});


int_rate_slider.addEventListener("input", (self) => {
	document.querySelector("#interest-rate-text").innerText =
		self.target.value + "%";
	R = parseFloat(self.target.value);
	displayDetails();
});


loan_period_slider.addEventListener("input", (self) => {
	document.querySelector("#loan-period-text").innerText =
		self.target.value + " years";
	N = parseFloat(self.target.value);
	displayDetails();
});


other_emi_slider.addEventListener("input", (self) => {
	document.querySelector("#other-emi-text").innerText =
		parseInt(self.target.value).toLocaleString("en-IN") + "₹";
	displayDetails();
});

// existing_loan_input.addEventListener("input", (self) => {
// 	document.querySelector("#existing-loan-text").innerText =
// 		parseInt(self.target.value).toLocaleString("en-IN") + "₹";
// 	displayDetails();
// });
net_income_input.addEventListener("input", (self) => {
	document.querySelector("#net-income-text").innerText =
		parseInt(self.target.value).toLocaleString("en-IN") + "₹";
	displayDetails();
});

// document.getElementById("net-income").addEventListener("input", (self) => {
//     document.getElementById("net-income-text").innerText =
//         parseInt(self.target.value).toLocaleString("en-IN") + "₹";
//     displayDetails();
// });



function calculateLoanDetails(p, r, emi) {
	
	let totalInterest = 0;
	let yearlyInterest = [];
	let yearPrincipal = [];
	let years = [];
	let year = 1;
	let [counter, principal, interest] = [0, 0, 0];
	while (p > 0) {
		let interest = parseFloat(p) * parseFloat(r);
		p = parseFloat(p) - (parseFloat(emi) - interest);
		totalInterest += interest;
		principal += parseFloat(emi) - interest;
		interest += interest;
		if (++counter == 12) {
			years.push(year++);
			yearlyInterest.push(parseInt(interest));
			yearPrincipal.push(parseInt(principal));
			counter = 0;
			
		}
	}
	return totalInterest;
}


function calculateLoanEligibility(netIncome, otherEmi, loanTenure) {
	return Math.round((netIncome - otherEmi) * 0.4 * (loanTenure));
}


function displayDetails() {
	let r = parseFloat(R) / 12 / 100;
	let n = parseFloat(N) * 12;

	
  // net income per month
	let netIncome = parseFloat(document.getElementById("net-income").value);
	
    let otherEmi = parseFloat(document.getElementById("other-emi").value);
	let totalEligibleFinalAmount = calculateLoanEligibility(netIncome, otherEmi, n);

	let num = parseFloat(totalEligibleFinalAmount) * r * Math.pow(1 + r, n);
	let denom = Math.pow(1 + r, n) - 1;
	let emi = parseFloat(num) / parseFloat(denom);

	
	
	// let existingLoan = parseFloat(existing_loan_input.value);

	let totalInterest = calculateLoanDetails(P, r, emi);
	let totalLoanAmount = parseFloat(P) + totalInterest; 

	

	let opts = '{style: "decimal", currency: "INR"}';

	document.querySelector("#ci").innerText =
		parseFloat(totalInterest).toLocaleString("en-IN", opts) + "₹";

	document.querySelector("#ct").innerText =
		parseFloat(totalLoanAmount).toLocaleString("en-IN", opts) + "₹"; 

	document.querySelector("#price").innerText =
		parseFloat(emi).toLocaleString("en-IN", opts) + "₹";

	document.querySelector("#other-emi-text").innerText =
		parseInt(otherEmi).toLocaleString("en-IN", opts) + "₹";

	document.querySelector("#cl").innerText =
		parseFloat(totalEligibleFinalAmount).toLocaleString("en-IN", opts) + "₹";

	
	pie.data.datasets[0].data[0] = P; 
	pie.data.datasets[0].data[1] = totalInterest; 
	pie.update();
}

// Initialize 
function initialize() {
	document.querySelector("#loan-amt-text").innerText =
		parseInt(loan_amt_slider.value).toLocaleString("en-IN") + "₹";
	P = parseFloat(document.getElementById("loan-amount").value);

	document.querySelector("#interest-rate-text").innerText =
		int_rate_slider.value + "%";
	R = parseFloat(document.getElementById("interest-rate").value);

	document.querySelector("#loan-period-text").innerText =
		loan_period_slider.value + " years";
	N = parseFloat(document.getElementById("loan-period").value);

	displayDetails();
}



pie = new Chart(document.getElementById("pieChart"), {
	type: "doughnut",
	data: {
		labels: ["Principal", "Interest"],
		datasets: [
			{
				label: "Home Loan Details",
				data: [0, 0],
				backgroundColor: ["rgb(54, 162, 235)", "rgb(255, 99, 132)"],
				hoverOffset: 4
			}
		]
	},
	options: {
		plugins: {
			title: {
				display: true,
				text: "Payment Breakup"
			}
		}
	}
});

initialize();