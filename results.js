var highScore = document.querySelector("#highScores");
var clear = document.querySelector("#clear");
var retrn = document.querySelector("#retrn");

//The following event will clear previous scores
clean.addEventListener("click", function () {
  localStorage.clear();
  location.reload();
});
// Fetching data from local storage
var allScores = localStorage.getItem("allScores");
allScores = JSON.parse(allScores);

if (allScores !== null) {
  for (var i = 0; i < allScores.length; i++) {
    var createList = document.createElement("li");
    createList.textContent = allScores[i].initials + " " + allScores[i].score;
    highScore.appendChild(createList);
  }
}
// Return to main page
retrn.addEventListener("click", function () {
  window.location.replace("./index.html");
});
