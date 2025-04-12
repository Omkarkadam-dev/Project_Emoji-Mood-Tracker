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
  