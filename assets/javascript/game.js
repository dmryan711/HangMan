var heroBank = [];
var hero;
var heroBlankArray = [];
var heroNameArray = [];
var gameRoundOn = false;  
var keysPressedCorrect = [];
var keysPressedWrong = [];
var guessesLeft = 5;
var herosRemaingCount = 0;

  
  //selectRandomWord(wordBank);

  //SuperHero Object Constructor
  function SuperHero(fname, imgString, playedOrNot){
    this.name = fname;
    this.imageSrc = imgString;
    this.hasPlayed = playedOrNot;

  }

  function createGameBank(){
    //Create SuperHeros & Add to Array initially
    //IronMan
    ironMan = new SuperHero("Iron Man","assets/images/ironman.jpg",false);
    heroBank.push(ironMan);

    //Thor
    thor =  new SuperHero("Thor","assets/images/thor.jpg",false);
    heroBank.push(thor);

    //SpiderMan
    spiderMan =  new SuperHero("Spiderman","assets/images/spiderman.jpg",false);
    heroBank.push(spiderMan);

    //Hulk
    hulk = new SuperHero("Hulk","assets/images/hulk.jpg",false);
    heroBank.push(hulk);

    //Captain America
    captainAmerica = new SuperHero("Captain America","assets/images/captainamerica.jpg",false);
    heroBank.push(captainAmerica);
  }
  
 



//Helper Functions
//Select Random Hero
function selectRandomHero(arrayOfHeroObjects){
    if(arrayOfHeroObjects instanceof Array){
        hero = arrayOfHeroObjects[Math.floor(Math.random()*arrayOfHeroObjects.length)];
        if(hero.hasPlayed){
            selectRandomHero(heroBank);
        }
        console.log(hero);
        return hero;
    }
}

function startGameRound(){
    gameRoundOn = true;
    hero = selectRandomHero(heroBank);
   heroNameArray = changeStringToArrayOfChars(hero.name);
   heroBlankArray = createBlankArrayOfButtonsFromHeroNameArray(heroNameArray);
   addImageToUI(hero);
   setUpGameUI(heroBlankArray);

}

function changeStringToArrayOfChars(nameString){
    var array = [];
    if(typeof nameString === 'string'){
        array = hero.name.split('');
        return array;
    }else{
    }
}

function createBlankArrayOfButtonsFromHeroNameArray(arrayOfHeroName){
    if(arrayOfHeroName instanceof Array){
        var array = [];
        for(var i = 0; i< arrayOfHeroName.length;i++){
            if(arrayOfHeroName[i] === " "){
                //Make a different button for spaces
                var button = document.createElement("button");
                button.innerHTML = " ";
                button.className = "btn btn-secondary mr-3 mt-1";
                button.id="letterNumber "+i;
                array.push(button);
            }else{
                var button = document.createElement("button");
                button.innerHTML = "_";
                button.className = "btn btn-warning mr-3 mt-1";
                button.id=i;
                array.push(button);
            }
            
        }
        return array;
    }else{
    }
}

function addImageToUI(heroObject){
    
    var oldImage = document.getElementById('hero-image');
    if (oldImage){
        oldImage.parentNode.removeChild(oldImage);
    }
    var guessBody = document.getElementById('guessBody');
    var heroImage = document.createElement('img');
    heroImage.src=heroObject.imageSrc;
    heroImage.id = "hero-image";
    document.getElementById('hero-picture-wrapper').insertBefore(heroImage,guessBody);

}


function setUpGameUI(array){
    if(array instanceof Array){
        var guessDivElement =  document.getElementById("guessBody");
        if(guessDivElement.hasChildNodes()){
            while (guessDivElement.firstChild) {
                guessDivElement.removeChild(guessDivElement.firstChild);
            }
        }
       
        for(var i = 0;i <array.length;i++){
            
            guessDivElement.appendChild(array[i]);
        }
        var playTitle = document.createElement('h3');
        playTitle.innerHTML = "Guess the hero using the keyboard!"
        playTitle.class = "display-4";
        var firstButton = document.getElementById("0");
        guessDivElement.insertBefore(playTitle,firstButton);

        //Setup InCorrect Answer section if not already done so
        var wrongAnswersSection = document.getElementById("wrong-answers");
        if(wrongAnswersSection.hasChildNodes()){
            while (wrongAnswersSection.firstChild) {
                wrongAnswersSection.removeChild(wrongAnswersSection.firstChild);
            }
        }
        var wrongAnswerTitle =  document.createElement('h3');
        wrongAnswerTitle.innerHTML = "Wrong Guesses Left: "+guessesLeft;
        wrongAnswerTitle.class = "display-4 mt-3";
        wrongAnswerTitle.id = "wrong-guesses-title";
        wrongAnswersSection.appendChild(wrongAnswerTitle);


    }else{
    }
}

function correctKeyLogic(letter){
    keysPressedCorrect.push(letter);
        while(heroNameArray.indexOf(letter) !== -1){
            //Replace the index with the letter
           var indexOfLetter = heroNameArray.indexOf(letter);
            heroBlankArray[indexOfLetter].innerHTML=letter;
            heroBlankArray[indexOfLetter].className = "btn btn-success mr-3 mt-1";
            heroBlankArray[indexOfLetter].id = indexOfLetter;
            heroNameArray.splice(indexOfLetter,1," ");
        }   
}


function didUserWin(){
   var array = hero.name.split('');
    for(var i = 0;i<heroBlankArray.length;i++){
       console.log("HeroBlank Array Letter: "+heroBlankArray[i].innerHTML);
       console.log("Real Hero Array Letter: "+array[i]);

       if(heroBlankArray[i].innerHTML !== array[i]){
           console.log("not all letters are guessed "+heroBlankArray[i]+" does not equal "+array[i]);
           return;
       }
    }

    //User Beat the Round, check if they won the game or if they just won a round
    console.log("Survived the For Loop comparison, everything matches");
    hero.hasPlayed = true;
    for(var i = 0;i<heroBank.length;i++){
        console.log("Hero "+heroBank[i].name+" "+heroBank[i].hasPlayed);
        //Count the heros left
        if(heroBank[i].hasPlayed === false){
            herosRemaingCount++;
        }
    }
    //If all of the heros are gone, congratulate them and ask for reset
    if (herosRemaingCount === 0){
        //Reset Game
        displayEndGameModal();
    }else{
        //Tell them they beat a round and start a new one
        displayWinRoundModal();
    }
}

function displayWinRoundModal(){
    var herosRemaingString;
    if (herosRemaingCount === 1){
        herosRemaingString = "There is " + herosRemaingCount + " hero remaining.";
    }else{
        herosRemaingString = "There are " + herosRemaingCount + " heros remaining.";
    }
    
    $('#modalMessage').text(herosRemaingString);
    $('#gameStateButton').text("Keep Going");
    $('#gameStateButton').removeClass();
    $('#gameStateButton').addClass('btn btn-primary');
    $("#winModal").modal({
        backdrop: 'static',
        keyboard: false
    });
    dumpRoundData();
    $('#winModal').modal('show');
}


function dumpRoundData(){
    keysPressedCorrect= [];
    keysPressedWrong = [];
    // heroBank = [];
    heroBlankArray = [];
    heroNameArray = [];
    //guessesLeft = 5;
    herosRemaingCount = 0;
}


function displayEndGameModal(){
    var herosRemaingString = "There are no heros remaining, you beat the Game!";
    $('#modalMessage').text(herosRemaingString);
    $('#gameStateButton').text("Start Over");
    $('#gameStateButton').removeClass();
    $('#gameStateButton').addClass('btn btn-success');
    $("#winModal").modal({
        backdrop: 'static',
        keyboard: false
    });
    $('#winModal').modal('show');
 

}

function displayLoseGameModal(){
    $('#modalMessage').text("You ran out of guesses, sorry.");
    var $button = $('#gameStateButton');
    $button.text("Start Over");
    $('#gameStateButton').removeClass();
    $button.addClass('btn btn-danger');
    $("#winModal").modal({
        backdrop: 'static',
        keyboard: false
    });
    $('#winModal').modal('show');
 

}



function resetGame(){
    //DumpData
     heroBank = [];
     heroBlankArray = [];
     heroNameArray = [];
     gameRoundOn = false;  
     keysPressedCorrect = [];
     keysPressedWrong = [];
     guessesLeft = 5;
     herosRemaingCount = 0;
    var playGameButtonElement = document.getElementById('play-game');
    playGameButtonElement.className = "btn btn-primary active";
    playGameButtonElement.removeAttribute("disabled","disabled");

    //Kill Game UI
    $("#hero-image").remove(); // removes image

    //removes guess title and guess tiles
    var guessUI = document.getElementById("guessBody");
    while(guessUI.firstChild){
        guessUI.removeChild(guessUI.firstChild);
    }

    //removes guess wrong title and wrong tiles
    var wrongUI = document.getElementById("wrong-answers");
    while(wrongUI.firstChild){
        wrongUI.removeChild(wrongUI.firstChild);
    }

    //Change Play Game to Play Again?
    $("#play-game").text = "Play Again?";
}


function endGame(){
    
}



//CLICK FUNCTION
var playGameButtonElement = document.getElementById('play-game');

playGameButtonElement.addEventListener('click', event => {

    playGameButtonElement.className = "btn btn-primary disabled";
    playGameButtonElement.setAttribute("disabled","disabled");
    //Create Game
    createGameBank();
    //Start Game Here
    startGameRound();
  });

  var gameStateModalButton = document.getElementById('gameStateButton');

  gameStateModalButton.addEventListener('click', event =>{
      //If Game Text is Error, something went wrong
      if(gameStateModalButton.innerHTML === "ERROR"){

      }else if(gameStateModalButton.innerHTML === "Keep Going"){
        $('#winModal').modal('hide');
        console.log("Start Game Round");
          startGameRound();
      }else if (gameStateModalButton.innerHTML === "Start Over"){
        $('#winModal').modal('hide');
            resetGame();

      }
  })

//KEY INPUT DETECTION
document.addEventListener('keydown', function(event){
    if(gameRoundOn){
        var keyPressed = event.key;
        var keyPressedUppercase = event.key.toUpperCase();
        var keyPressedLowercase = event.key.toLowerCase();

        //If Key is correct in any variation, run through all of the variations
        if((heroNameArray.indexOf(keyPressed) !== -1) 
        || (heroNameArray.indexOf(keyPressedUppercase) !== -1) 
        || (heroNameArray.indexOf(keyPressedLowercase) !== -1)){
            //Check key as entered by user (lower case or uppercase)
            if (heroNameArray.indexOf(keyPressed) !== -1 ){
                correctKeyLogic(keyPressed);
            }
            //Check key converted to Uppercase (regardless of what user entered)
            if(heroNameArray.indexOf(keyPressedUppercase)!==-1){
                correctKeyLogic(keyPressedUppercase);

            }
            if(heroNameArray.indexOf(keyPressedLowercase)!==-1){
                correctKeyLogic(keyPressedLowercase);
            }
            //Check if user won, since this is a correct key, and it could be the last correct key
            didUserWin();
        }else{ //The key may be a variation of correct, checking to see
            if(((keysPressedWrong.indexOf(keyPressed) !== -1)
            ||(keysPressedWrong.indexOf(keyPressedLowercase) !== -1)
            || (keysPressedWrong.indexOf(keyPressedUppercase) !== -1)
            || (keyPressed ==="Shift"))
            || ((keysPressedCorrect.indexOf(keyPressed) !== -1)
                ||(keysPressedCorrect.indexOf(keyPressedLowercase) !== -1)
                || (keysPressedCorrect.indexOf(keyPressedUppercase) !== -1))){
            
            }else{//Log as Error
                
                //Add Key to Wrong Answer Array
                keysPressedWrong.push(keyPressed);
                if(keyPressed == keyPressedUppercase){
                   
                    keysPressedWrong.push(keyPressedLowercase);

                }else{
                    keysPressedWrong.push(keyPressedUppercase);
                }
                if(guessesLeft>0){
                    //Decrease Guess Remaining
                    guessesLeft--;

                    //Update Guesses Left UI
                    document.getElementById('wrong-guesses-title').innerHTML = "Wrong Guesses Left: "+guessesLeft;
                }else{
                    displayLoseGameModal();
                    return;
                }
                
                //Create Incorrect Answer tiles
                var wrongAnswerbutton = document.createElement("button");
                wrongAnswerbutton.innerHTML = keyPressed;
                wrongAnswerbutton.className = "btn btn-danger mr-3 mt-1 wrong-answer";
                document.getElementById('wrong-answers').appendChild(wrongAnswerbutton);  
            }  
        }
    }
}); 