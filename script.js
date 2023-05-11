const billInput = document.getElementById('bill-input');
const tipButtons = Array.from(document.querySelectorAll('.tip-btn'));
const customTipInput = document.getElementById('custom-tip-input');
const numOfPeopleInput = document.getElementById('people-count-input');
const resetBtn = document.getElementById('reset-btn');

tipButtons.forEach(button => button.addEventListener('click', handleTip));
resetBtn.addEventListener('click', () => location.reload());

customTipInput.addEventListener('keyup', (e) => {
    if (e.key === 'Enter') {
        handleTip(e);
    }
})

function handleTip(e) {
    const tip = e.currentTarget.value;
    const tipPercentage = getTipPercentage(tip);

    if (!isValidPeople(numOfPeopleInput.value)) {
        return;
    }

    tipButtons.forEach(button => button.classList.remove('active'));
    e.currentTarget.classList.add('active');

    const tipAmount = (billInput.value / numOfPeopleInput.value) * tipPercentage;
    const totalAmount = billInput.value / numOfPeopleInput.value + tipAmount;
    
    document.getElementById('tip-amount').textContent = tipAmount.toFixed(2);
    document.getElementById('total-amount').textContent = totalAmount.toFixed(2);

    resetBtn.classList.remove('disabled');
    resetBtn.disabled = false;
}

function getTipPercentage(tipValue) {
    let currentTip = 0;

    if (tipValue.includes('%')) {
        currentTip = Number(tipValue.slice(0, -1)) / 100;
    } else {
        currentTip = Number(tipValue / 100);
    }

    return currentTip;
}

function isValidPeople(numOfPeople) {
    if (numOfPeople === '') {
        document.getElementById('error-msg').style.display = 'block';
        numOfPeopleInput.classList.add('error-border');
        return false;
    } else {
        document.getElementById('error-msg').style.display = 'none';
        numOfPeopleInput.classList.remove('error-border');
        return true;
    }
}
