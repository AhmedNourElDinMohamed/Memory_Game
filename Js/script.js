// Global Variables
var welcomeBg = document.querySelector(".welcome"); // Welcome Bg
var startBtn = document.querySelector(".start-game"); // Start Game Button
var userName = document.querySelector('input[name="user-name"]'); // User Name Input
var profileName = document.querySelector(".profile-name"); // User Name Input
var containerBlocks = document.getElementById("container"); // Container For All Boxs
var allCards = document.querySelectorAll(".card-box"); // All Boxs
var winnerDiv = document.querySelector(".winner"); // winner box
var loserDiv = document.querySelector(".loser"); // Loser box
var trueScore = document.querySelector(".true-score"); // True Counter
var wrongScore = document.querySelector(".wrong-score"); // Wrong Counter
var restarttBtn = document.querySelector(".restart-game"); // Restart Game Button
var endBtn = document.querySelector(".end-game"); // End Game Button
var secondTimer = document.querySelector(".sec"); // Second Timer
var minuteTimer = document.querySelector(".min"); // Minute Timer
var countSecound = 0; // Counter for Second
var countMinute = 0; // Counter For Minute
var countClick = 0; // Counter To Count Number Of Flip Card
var trueMatche = 0; // Counter To Count True Matches.
var wrongMatche = 0; // Counter To Count Wrong Matches.
var wrongLimit = 25; // Limitition for Wrong tries

// Add Event Listner And make Random Order On All Cards
// allCards.forEach(function(card){
//     card.style.order =  Math.floor(Math.random() * allCards.length); // Set order attrbite on card
//     card.addEventListener("click",selectCard);
// })

startBtn.addEventListener("click", startGame);

function startGame() {
  welcomeBg.style.display = "none"; // Hidden Welcome Screen
  if (userName.value) {
    profileName.textContent = userName.value;
  } else {
    profileName.textContent = "UnKnown";
  }
  // Timer
  timerHandller = setInterval(function () {
    countSecound++;
    if (countSecound < 60) {
      if (countSecound < 10) {
        secondTimer.textContent = "0" + countSecound;
      } else {
        secondTimer.textContent = countSecound;
      }
    } else {
      countSecound = 0;
      secondTimer.textContent = "0" + countSecound;
      countMinute++;
      if (countMinute < 60) {
        if (countMinute < 10) {
          minuteTimer.textContent = "0" + countMinute;
        } else {
          minuteTimer.textContent = countMinute;
        }
      }
    }
  }, 1000);
  allCards.forEach(function (card) {
    card.style.order = Math.floor(Math.random() * allCards.length); // Set order attrbite on card
    card.addEventListener("click", selectCard);
  });
}
// Func To Select Card Select Card
function selectCard() {
  if (countClick < 2 && !this.classList.contains("flip")) {
    // this >> The card which clicked on it
    flipCard(this);
    countClick++;
  }
  if (countClick == 2) {
    resetCards(containerBlocks, allCards);
  }
}
// Func To Select Card Select Card

// Func Add Filp Class To Card
var flipCard = function (card) {
  card.classList.toggle("flip"); // Class In Css Which Rotate Card
};
// Func Add Filp Class To Card

// Func To Remove Filp from All Card And Reset clickCounter
var resetCards = function (containerBlocks, allCards) {
  countClick = 0; // Reset Counter To Handling Number Of Clicks
  containerBlocks.classList.add("stop-click"); // stop-clicking is a class which do event none

  // Filter Cards and get only 2 card was flipped and storage it in array
  setTimeout(function () {
    var matchedCard = Array.from(allCards).filter(function (card) {
      return card.classList.contains("flip");
    });

    // Checked if two is Matched or not
    if (
      matchedCard[0].lastElementChild.firstElementChild.getAttribute("alt") ===
      matchedCard[1].lastElementChild.firstElementChild.getAttribute("alt")
    ) {
      trueMatche++;
      matchedCard.forEach(function (card) {
        card.classList.add("hidden");
      });
      trueScore.textContent = trueMatche;
    } else {
      ++wrongMatche;
      wrongScore.textContent = wrongMatche;
    }
  }, 500);

  // remove from All Card flip card and enable Clicking after 1.5s
  setTimeout(function () {
    allCards.forEach(function (card) {
      card.classList.remove("flip");
      containerBlocks.classList.remove("stop-click");
    });
  }, 800);

  setTimeout(function () {
    checkWinnerOrLoser();
  }, 1000);
};
// Func To Remove Filp Class from All Card And Reset clickCounter

//Func Check Winner Or Losr
function checkWinnerOrLoser() {
  if (wrongMatche == wrongLimit) {
    clearInterval(timerHandller);
    loserDiv.style.display = "flex";
    containerBlocks.classList.add("stop-click");
  }
  if (trueMatche == allCards.length / 2) {
    winnerDiv.style.display = "flex";
  }
}
//Func Check Winner Or Losr

//Func To Restart Game
function restartGame() {
  loserDiv.style.display = "none";
  location.reload();
}
//Func To Restart Game
