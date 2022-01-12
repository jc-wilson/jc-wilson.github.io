const calculateTip = () => {

event.preventDefault();

let bill = Number(document.getElementById('billInput').value);
let tip = Number(document.getElementById('percentageInput').value);

let tipAmount = Math.round((bill / (1 / (tip / 100))) * 100) / 100
let finalBill = tipAmount + bill
 
let tipValue = document.querySelector('#tipValue')
let totalBill = document.querySelector('#totalBill')

tipValue.value = tipAmount.toFixed(2)
totalBill.value = finalBill.toFixed(2)

};

