import data from "./data.json" with { type: "json" };

const container = document.getElementById("cards-container");
let timeframe = "weekly";
container.classList.add('max-height-300');

const renderCards = () => {
  container.innerHTML = "";

  data.forEach((item) => {
    const card = document.createElement("section");

    card.classList.add(
      "card",
      `card--${item.title.toLowerCase().replace(" ", "-")}`
    );
    card.innerHTML = `
    <div class="card__background">
    <img src="./images/icon-${item.title
      .toLowerCase()
      .replace(" ", "-")}.svg" alt="${item.title} icon" class="card__icon">
  </div>
  <div class="card__content-wrapper">
    <div class="card__title-wrapper">
      <h3 class="card__title">${item.title}</h3>
      <img src="./images/icon-ellipsis.svg" alt="Ellipsis icon" class="card__icon-ellipsis">
    </div>
    <div class="card__time-wrapper">
      <h1 class="card__time">${item.timeframes[timeframe].current}hrs</h1>
      <p class="card__text">Last ${textifyTimeframe(timeframe)} - ${
      item.timeframes[timeframe].previous
    }hrs</p>
    </div>
  </div>
    `;
    container.appendChild(card);
  });
  container.classList.add('max-height-300');
//   container.style.maxHeight = '300px';
//   container.style.overflowY = 'auto';

};

const buttons = document.querySelectorAll('.main-card__button');
// Event listeners for timeframe buttons
document.querySelectorAll(".main-card__button").forEach((button) => {

    
  button.addEventListener("click", (e) => {
    buttons.forEach(btn => btn.classList.remove('clicked'));
    button.classList.toggle('clicked');
    const selectedTimeframe = e.target.dataset.timeframe.trim();
    timeframe = selectedTimeframe;

    renderCards();
  });
});

// function to turn daily into "Day", weekly into "Week", Monthly into "Month"
const textifyTimeframe = (timeframe) => {
  timeframe = timeframe.toLowerCase();

  switch (timeframe) {
    case "daily":
      return "Day";
    case "weekly":
      return "Week";
    case "monthly":
      return "Month";
    default:
      return "Invalid timeframe";
  }
};

// Initial render
renderCards();
