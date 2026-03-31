// 1. Поточний час та дата з оновленням щосекунди 
function updateClock() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    
    document.getElementById('clock').textContent = `${hours}:${minutes}:${seconds}`;
    
    const dateOptions = { day: '2-digit', month: '2-digit', year: 'numeric' };
    document.getElementById('date').textContent = now.toLocaleDateString('uk-UA', dateOptions);
}
setInterval(updateClock, 1000);

// 2. Таймер зворотного відліку 
document.getElementById('startTimerBtn').addEventListener('click', () => {
    let timeLeft = parseInt(document.getElementById('countdownInput').value);
    const display = document.getElementById('timerDisplay');
    
    const countdown = setInterval(() => {
        display.textContent = `Залишилося: ${timeLeft} сек`;
        timeLeft--;
        
        if (timeLeft < 0) {
            clearInterval(countdown);
            display.textContent = "Час вийшов!";
            alert("Таймер завершено!"); // 
        }
    }, 1000);
});

// 3. Будильник зі зміною фону 
document.getElementById('setAlarmBtn').addEventListener('click', () => {
    const alarmH = parseInt(document.getElementById('alarmHour').value);
    const alarmM = parseInt(document.getElementById('alarmMin').value);
    
    if (isNaN(alarmH) || isNaN(alarmM)) return;
    
    alert(`Будильник встановлено на ${alarmH}:${alarmM}`);

    const alarmCheck = setInterval(() => {
        const now = new Date();
        if (now.getHours() === alarmH && now.getMinutes() === alarmM) {
            clearInterval(alarmCheck);
            console.log('Будильник дзвонить!');
            document.body.style.backgroundColor = "#ff4d4d"; // Зміна фону за додатковим завданням 
            alert("ПІДЙОМ!");
        }
    }, 1000);
});

// 4. Приклад роботи з об'єктом Date (в консоль) 
const debugDate = new Date();
console.log(`Рік: ${debugDate.getFullYear()}, Місяць: ${debugDate.getMonth() + 1}, День: ${debugDate.getDate()}`);