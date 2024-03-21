var count = 0;

function roll() {
  var random1 = Math.floor(Math.random() * 6) + 1;

  var random2 = Math.floor(Math.random() * 6) + 1;

  if (random1 === random2 && count<25) {
    var random1 = Math.floor(Math.random() * 6) + 1;
    var random2 = Math.floor(Math.random() * 6) + 1;
  }

  var randomDiceImage1 = "images/dice" + random1 + ".png";
  document.querySelector(".img1").setAttribute("src", randomDiceImage1);
  var randomDiceImage2 = "images/dice" + random2 + ".png";
  document.querySelector(".img2").setAttribute("src", randomDiceImage2);

  if (random1 === random2 && count>25) {
    alert("YOU DID IT");
    document.querySelector("h1").innerHTML = "Finally!";
    document.querySelector("h1").innerHTML = "<a href= ' '> lets go </a>";
  } else if (count > 30) {
    alert("Never Mind. You loser.");
    document.querySelector("h1").innerHTML = "Finally!";
    document.querySelector("h1").innerHTML = "<a href= ' '> lets go </a>";
  }
}

const playBtn = document.getElementById('play');

playBtn.addEventListener('click', () => {
  roll();
  count++;
  console.log(count);
});