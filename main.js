(function getMarvelResponse() {
  var PUBLIC_KEY = "309488cbf382f8ba2a5e91f9b2f371bf";
  var PRIV_KEY = "93256e632e7fd2b8a1323acd2c284845d08f3f40";
  var ts = new Date().getTime();
  var hash = MD5(ts + PRIV_KEY + PUBLIC_KEY).toString();
  var url = 'http://gateway.marvel.com:80/v1/public/characters';
  $.getJSON(

    url, {
    ts: ts,
    apikey: PUBLIC_KEY,
    hash: hash,
    limit: 26,
    events: 253
    })
    .done(function(data) {
      test(data);
    })
    .fail(function(err){
      console.log(err);
    });
})();

var characterList = document.querySelector('.character-list');
var arrayOfCharacters = [];
var buttonNumber = 0;

function test(data) {
  for (var i = 0; i < data.data.results.length; i++) {
    if (data.data.results[i].thumbnail.path.indexOf("not_available") != -1) {

    } else {
      arrayOfCharacters.push(data.data.results[i]);
      var characterSelect = document.createElement('div');
      var characterName = document.createElement('button');
      characterSelect.setAttribute('class', 'character-select');
      characterName.setAttribute('value', buttonNumber)
      characterSelect.innerHTML += '<img src="' + data.data.results[i].thumbnail.path + "." + data.data.results[i].thumbnail.extension + '" />';
      characterName.append(data.data.results[i].name);
      characterList.append(characterSelect);
      characterSelect.append(characterName);
    }
    buttonNumber += 1;
  }

  var allButtons = document.querySelectorAll('button');
  var battleArea = document.querySelector('.battle-area');
  var opponentSelect = Math.floor(Math.random() * arrayOfCharacters.length);
  var playerOne = document.createElement('div');
  playerOne.setAttribute('class', 'player-one');
  var startBattle = document.createElement('div');
  startBattle.setAttribute('class', 'start-battle');
  var startBattleButton = document.createElement('button');
  startBattle.append(startBattleButton);
  startBattleButton.setAttribute('class', 'start-battle-button');
  var playerTwo = document.createElement('div');
  playerTwo.setAttribute('class', 'player-two');

  for (var j = 0; j < allButtons.length; j++) {
    allButtons[j].addEventListener("click", function() {
      playerOne.innerHTML = '<img src="' + arrayOfCharacters[this.value].thumbnail.path + "." + arrayOfCharacters[this.value].thumbnail.extension + '" />';
      playerOne.append("You chose: " + arrayOfCharacters[this.value].name)
      battleArea.append(playerOne);
      startBattleButton.append("Start the battle");
      battleArea.append(startBattle);
      playerTwo.innerHTML = '<img src="' + arrayOfCharacters[opponentSelect].thumbnail.path + "." + arrayOfCharacters[opponentSelect].thumbnail.extension + '" />';
      playerTwo.append("Your opponent chose: " + arrayOfCharacters[opponentSelect].name)
      battleArea.append(playerTwo);
    });
  }

  startBattleButton.addEventListener("click", function() {
    startBattle.removeChild(startBattleButton);
    var resetButton = document.createElement('button')
    resetButton.setAttribute('class', 'reset-button');
    resetButton.append("Play again?");
    var playerOneRoll = Math.floor(Math.random() * 100);
    var playerTwoRoll = Math.floor(Math.random() * 100);
    if (playerOneRoll >= playerTwoRoll) {
      startBattle.append("You have defeated " + arrayOfCharacters[opponentSelect].name + "!");
    } else {
      startBattle.append("You have been defeated by " + arrayOfCharacters[opponentSelect].name);
    }
    startBattle.append(resetButton);
  });
}

/*
I can click the name button and it will console log the correct variable
When you lose: "You've been overpowered by " + winner
When you win: "You've bested " + loser
*/
