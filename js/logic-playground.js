// Logic Playground Functions
function calculateFactorial() {
    const n = parseInt(document.getElementById('factInput').value);
    if (isNaN(n) || n < 0) {
        document.getElementById('factResult').textContent = "Please enter a non-negative number.";
        return;
    }

    let result = 1;
    let steps = "";
    for (let i = n; i > 0; i--) {
        result *= i;
        steps += i + (i !== 1 ? " × " : "");
    }

    document.getElementById('factResult').innerHTML = `
        The factorial of <strong>${n}</strong> is <strong>${result}</strong><br>
        Because: ${steps} = ${result}
    `;
    confetti();
}

function checkPalindrome() {
    const n = document.getElementById('palinInput').value.trim();
    if (n === "") {
        document.getElementById('palinResult').textContent = "Please enter a number.";
        return;
    }

    const reversed = n.split('').reverse().join('');
    const isPalin = n === reversed;

    document.getElementById('palinResult').innerHTML = isPalin
        ? `"${n}" is a <strong>Palindrome</strong> ✅<br>Because reversing it gives the same number: "${reversed}"`
        : `"${n}" is <strong>Not a Palindrome</strong> ❌<br>Because reversed value is "${reversed}", which is different.`;

    if (isPalin) confetti();
}

function generateFibonacci() {
    const n = parseInt(document.getElementById('fibInput').value);
    if (isNaN(n) || n < 0) {
        document.getElementById('fibResult').textContent = "Please enter a non-negative number.";
        return;
    }

    let fib = [0, 1];
    for (let i = 2; i <= n; i++) {
        fib[i] = fib[i - 1] + fib[i - 2];
    }

    const seq = fib.slice(0, n + 1);
    document.getElementById('fibResult').innerHTML = `
        The first <strong>${n + 1}</strong> numbers in the Fibonacci sequence are:<br>
        ${seq.join(', ')}<br>
        (Each number is the sum of the two before it)
    `;
    confetti();
}

function checkPrime() {
    const num = parseInt(document.getElementById('primeInput').value);
    const output = document.getElementById('primeResult');

    if (isNaN(num) || num <= 1) {
        output.innerHTML = `"${num}" is <strong>Not a Prime</strong> ❌<br>Because prime numbers must be greater than 1 and divisible only by 1 and itself.`;
        return;
    }

    let isPrime = true;
    let divisors = [];

    for (let i = 2; i < num; i++) {
        if (num % i === 0) {
            isPrime = false;
            divisors.push(i);
        }
    }

    if (isPrime) {
        output.innerHTML = `"${num}" is a <strong>Prime Number</strong> ✅<br>Because it has no divisors other than 1 and ${num}.`;
        confetti();
    } else {
        output.innerHTML = `"${num}" is <strong>Not a Prime</strong> ❌<br>Because it's divisible by: ${divisors.join(", ")}`;
    }
}

function checkArmstrong() {
    const num = document.getElementById('armstrongInput').value.trim();
    if (num === "") {
        document.getElementById('armstrongResult').textContent = "Please enter a number.";
        return;
    }

    const digits = num.split('');
    const power = digits.length;
    let sum = 0;
    
    for (let digit of digits) {
        sum += Math.pow(parseInt(digit), power);
    }

    const isArmstrong = sum === parseInt(num);
    document.getElementById('armstrongResult').innerHTML = isArmstrong
        ? `"${num}" is an <strong>Armstrong Number</strong> ✅<br>Because ${digits.map(d => `${d}^${power}`).join(' + ')} = ${sum}`
        : `"${num}" is <strong>Not an Armstrong Number</strong> ❌<br>Because ${digits.map(d => `${d}^${power}`).join(' + ')} = ${sum} ≠ ${num}`;

    if (isArmstrong) confetti();
}

function reverseNumber() {
    const num = document.getElementById('reverseInput').value.trim();
    if (num === "") {
        document.getElementById('reverseResult').textContent = "Please enter a number.";
        return;
    }

    const reversed = num.split('').reverse().join('');
    document.getElementById('reverseResult').innerHTML = `
        The reverse of <strong>${num}</strong> is <strong>${reversed}</strong>
    `;
    confetti();
}

// Initialize logic playground when page loads
document.addEventListener('DOMContentLoaded', function() {
    console.log('Logic Playground loaded');
});