function scrollToMood() {
    alert("This will scroll to the mood logging section. (Add logic later)");
    // You can replace this with actual scroll logic later
  }

  
  // Show today's date
document.addEventListener("DOMContentLoaded", () => {
    const todayDate = document.getElementById("today-date");
    const date = new Date().toLocaleDateString("en-GB", {
      weekday: "long",
      year: "numeric",
      month: "short",
      day: "numeric"
    });
    todayDate.textContent = `Today is ${date}`;
  });
  
  // Mood Selection
  const emojis = document.querySelectorAll(".emoji");
  let selectedMood = null;
  
  emojis.forEach((emoji) => {
    emoji.addEventListener("click", () => {
      emojis.forEach((e) => e.classList.remove("selected"));
      emoji.classList.add("selected");
      selectedMood = emoji.dataset.mood;
    });
  });
  
  // Log Mood Button
  document.getElementById("logMoodBtn").addEventListener("click", () => {
    if (!selectedMood) {
      alert("Please select a mood first 😅");
      return;
    }
  
    const date = new Date().toLocaleDateString();
    let moodLog = JSON.parse(localStorage.getItem("moodLog")) || {};
    moodLog[date] = selectedMood;
  
    localStorage.setItem("moodLog", JSON.stringify(moodLog));
  
    // Show toast
    const toast = document.getElementById("toast");
    toast.style.display = "block";
    setTimeout(() => {
      toast.style.display = "none";
    }, 1500);
  
    // Reset selection
    emojis.forEach((e) => e.classList.remove("selected"));
    selectedMood = null;
  });

  
  // Calendar View Logic
const calendarGrid = document.getElementById("calendarGrid");
const monthYearDisplay = document.getElementById("monthYear");
const prevMonthBtn = document.getElementById("prevMonth");
const nextMonthBtn = document.getElementById("nextMonth");

let currentDate = new Date();

const emojiMap = {
  happy: "😊",
  sad: "😢",
  angry: "😡",
  neutral: "😐",
  love: "😍",
  funny: "😂"
};

function renderCalendar(date) {
  const year = date.getFullYear();
  const month = date.getMonth();
  const today = new Date();

  // Update Month-Year Header
  monthYearDisplay.textContent = date.toLocaleString("default", {
    month: "long",
    year: "numeric"
  });

  // Get first day of the month
  const firstDay = new Date(year, month, 1).getDay();
  const totalDays = new Date(year, month + 1, 0).getDate();

  // Clear old calendar
  calendarGrid.innerHTML = "";

  // Fill blank spaces for first day offset
  for (let i = 0; i < firstDay; i++) {
    const blank = document.createElement("div");
    calendarGrid.appendChild(blank);
  }

  // Fetch moodLog
  const moodLog = JSON.parse(localStorage.getItem("moodLog")) || {};

  // Fill days with emojis if mood is logged
  for (let day = 1; day <= totalDays; day++) {
    const dateKey = new Date(year, month, day).toLocaleDateString();
    const mood = moodLog[dateKey];
    const emoji = mood ? emojiMap[mood] : "";

    const dayDiv = document.createElement("div");
    dayDiv.classList.add("day");
    if (
      day === today.getDate() &&
      month === today.getMonth() &&
      year === today.getFullYear()
    ) {
      dayDiv.classList.add("today");
    }

    dayDiv.innerHTML = `<div>${day}</div><div class="emoji">${emoji}</div>`;
    calendarGrid.appendChild(dayDiv);
  }
}

prevMonthBtn.addEventListener("click", () => {
  currentDate.setMonth(currentDate.getMonth() - 1);
  renderCalendar(currentDate);
});

nextMonthBtn.addEventListener("click", () => {
  currentDate.setMonth(currentDate.getMonth() + 1);
  renderCalendar(currentDate);
});

document.addEventListener("DOMContentLoaded", () => {
  renderCalendar(currentDate);
});


// Chart.js - Mood Analytics
function generateMoodAnalytics() {
    const moodLog = JSON.parse(localStorage.getItem("moodLog")) || {};
  
    const moodCounts = {
      happy: 0,
      sad: 0,
      angry: 0,
      neutral: 0,
      love: 0,
      funny: 0
    };
  
    Object.values(moodLog).forEach((mood) => {
      if (moodCounts[mood] !== undefined) {
        moodCounts[mood]++;
      }
    });
  
    const moodLabels = {
      happy: "😊 Happy",
      sad: "😢 Sad",
      angry: "😡 Angry",
      neutral: "😐 Neutral",
      love: "😍 Love",
      funny: "😂 Funny"
    };
  
    const ctx = document.getElementById("moodChart").getContext("2d");
  
    new Chart(ctx, {
      type: "bar",
      data: {
        labels: Object.keys(moodCounts).map((m) => moodLabels[m]),
        datasets: [
          {
            label: "Mood Count",
            data: Object.values(moodCounts),
            backgroundColor: [
              "#FF9A9E",
              "#A18CD1",
              "#FBC2EB",
              "#FFDAC1",
              "#C1FFD7",
              "#B5EAD7"
            ],
            borderRadius: 12,
            borderWidth: 1
          }
        ]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            display: false
          },
          tooltip: {
            backgroundColor: "#333",
            titleColor: "#fff",
            bodyColor: "#fff"
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              precision: 0
            }
          }
        }
      }
    });
  }
  
  // Trigger when DOM is loaded
  document.addEventListener("DOMContentLoaded", () => {
    generateMoodAnalytics();
  });

  
  // Animate feature cards on scroll
const featureCards = document.querySelectorAll(".feature-card");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = 1;
        entry.target.style.transform = "translateY(0)";
      }
    });
  },
  { threshold: 0.1 }
);

featureCards.forEach((card) => {
  card.style.opacity = 0;
  card.style.transform = "translateY(40px)";
  observer.observe(card);
});
