// Configuration Variables
const hourlyRate = 500; 
const standardHours = 8;
const overtimeMultiplier = 1.5;

function login() {
    const username = document.getElementById('username').value;
    const role = document.getElementById('role').value;

    if (!username) {
        alert("Please enter a username");
        return;
    }

    document.getElementById('loginScreen').classList.add('hidden');

    if (role === 'admin') {
        document.getElementById('adminDashboard').classList.remove('hidden');
    } else {
        document.getElementById('userDashboard').classList.remove('hidden');
        document.getElementById('profileName').innerText = username;
        document.getElementById('profileRole').innerText = role.toUpperCase();
    }
}

function clockIn() {
    localStorage.setItem('clockInTime', new Date().getTime());
    document.getElementById('workStatus').innerText = "Clocked In";
    document.getElementById('btnIn').classList.add('hidden');
    document.getElementById('btnOut').classList.remove('hidden');
}

function clockOut() {
    const clockInTime = localStorage.getItem('clockInTime');
    if (!clockInTime) return;

    const clockOutTime = new Date().getTime();
    
    // Simulated as seconds = hours for quick testing
    let hoursWorked = (clockOutTime - clockInTime) / 1000; 

    let regularHours = Math.min(hoursWorked, standardHours);
    let overtime = Math.max(0, hoursWorked - standardHours);

    let baseSalary = regularHours * hourlyRate;
    let overtimeSalary = overtime * (hourlyRate * overtimeMultiplier);
    let finalSalary = baseSalary + overtimeSalary;

    document.getElementById('totalHours').innerText = hoursWorked.toFixed(2);
    document.getElementById('overtimeHours').innerText = overtime.toFixed(2);
    document.getElementById('totalSalary').innerText = finalSalary.toFixed(2);

    document.getElementById('workStatus').innerText = "Clocked Out";
    document.getElementById('btnOut').classList.add('hidden');
    document.getElementById('salaryReport').classList.remove('hidden');
    
    localStorage.removeItem('clockInTime'); // Reset
}

function logout() {
    document.getElementById('loginScreen').classList.remove('hidden');
    document.getElementById('userDashboard').classList.add('hidden');
    document.getElementById('adminDashboard').classList.add('hidden');
    document.getElementById('salaryReport').classList.add('hidden');
    document.getElementById('btnIn').classList.remove('hidden');
    document.getElementById('btnOut').classList.add('hidden');
    document.getElementById('username').value = '';
}