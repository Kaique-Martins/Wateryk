// Adicionar no início do script
let reminders = [];

function setupReminders() {
  // Carregar lembretes do localStorage
  const savedReminders = localStorage.getItem('healthReminders');
  if (savedReminders) reminders = JSON.parse(savedReminders);
  
  // Verificar lembretes a cada minuto
  setInterval(checkReminders, 60000);
}

function addReminder(time, message, repeatDays = []) {
  reminders.push({ time, message, repeatDays });
  localStorage.setItem('healthReminders', JSON.stringify(reminders));
}

function checkReminders() {
  const now = new Date();
  const currentTime = now.toTimeString().substring(0, 5);
  const currentDay = now.getDay();
  
  reminders.forEach(reminder => {
    if (reminder.time === currentTime && 
        (reminder.repeatDays.length === 0 || reminder.repeatDays.includes(currentDay))) {
      showNotification(reminder.message);
    }
  });
}

function showNotification(message) {
  if (Notification.permission === "granted") {
    new Notification("Lembrete Saúde", { body: message });
  } else if (Notification.permission !== "denied") {
    Notification.requestPermission().then(permission => {
      if (permission === "granted") {
        new Notification("Lembrete Saúde", { body: message });
      }
    });
  }
  
  // Fallback para browsers sem suporte a Notification API
  alert(`Lembrete: ${message}`);
}