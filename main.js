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

// create a div for both your character and opponent's character, put the info in there
// have your div float/position left and opponents right. Put info on who won in middle
// potentially in a third div

  for (var j = 0; j < allButtons.length; j++) {
    allButtons[j].addEventListener("click", function() {
      battleArea.innerHTML = '<img src="' + arrayOfCharacters[this.value].thumbnail.path + "." + arrayOfCharacters[this.value].thumbnail.extension + '" />';
      battleArea.append("You chose: " + arrayOfCharacters[this.value].name)
      battleArea.append("Your opponent chose: " + arrayOfCharacters[opponentSelect].name)
    });
  }
}

/*
I can click the name button and it will console log the correct variable
When you lose: "You've been overpowered by " + winner
When you win: "You've bested " + loser
*/
