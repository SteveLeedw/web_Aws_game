var credits = 50;
var plays = 0;
var wins = 0;
function renderStats() {
  document.getElementById("credits").innerHTML = credits;
   document.getElementById("plays").innerHTML = plays;
    document.getElementById("wins").innerHTML = wins;
}
renderStats()
document.getElementById("play").addEventListener("click", playSlots);
function playSlots() {
  var one = Math.floor(Math.random() * 5);
   var two = Math.floor(Math.random() * 5);
   var three = Math.floor(Math.random() * 5);
  const fruit = ["apple", "banana", "cherry", "strawberry", "watermelon"];
  var fruitOne = fruit[one];
  var fruitTwo = fruit[two];
  var fruitThree = fruit[three];
    document.getElementById("slotOne").classList = fruitOne;
    document.getElementById("slotTwo").classList = fruitTwo;
    document.getElementById("slotThree").classList = fruitThree;
  
  if(fruitOne === fruitTwo && fruitTwo === fruitThree) {
    if(fruitOne === "cherry" && fruitTwo === "cherry" && fruitThree === "cherry") {
    credits+=10;
    wins+=1;
       alert("You won! If you have all images are cherries, you ca get 10 extra credits!");
    }
    credits+=20;
    wins+=1;
    alert("You won!");
     
  } else {
    credits-=1;
  }
  plays+=1;
  
  renderStats();
  
  if(credits === 0) {
     alert("You used all of credits. This game will now refresh");
  location.reload(true);
  }
}
function Automaticplayingsystem() {
  var num = parseInt(document.getElementById("auto").value);
  setTimeout(function() {
     for (let i = 0; i < num ; i++ ){
        playSlots();
     }
  },1000);
};
