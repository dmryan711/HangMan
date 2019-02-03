//Global word bank of potential words
var wordBank = ["goose","moose","hand","band","sand","country","lamp","hammer","promise", "maniacal",
 "string", "taste","shelf","fool", "excite", "rail", "release", "enjoy", "trade", "girl","sticks","pretend",
 "relieved", "pickle","volleyball","plate","puncture", "panoramic","name","motionless", "wail","sad", "knowledge",
  "water", "smash", "produce","yam","large","care","observe", "name", "hulking", "jaded", "wood","insidious", "rate",
  "pretty", "paddle", "damp", "nation", "dance", "colorful", "limsy", "curl", "park", "childlike","fierce", "fair", "gun", 
  "soothe", "abounding", "trace","nest" , "swanky","battle", "wiry", "nose", "broken", "tight", "reduce", "stormy", 
  "homeless", "uppity", "look","exam", "nervous", "joke", "fix","simplistic", "level", "paint", "gratis", "spiders", 
  "wire", "obtainable", "humdrum", "tesseract", "change", "piquant", "witty", "explain", "delay", "mutter", "languid",
   "woebegone", "disturbed", "slow", "romantic", "caption", "squander", "rule", "list", "ambiguous", "present", "telephone","butter"];

var heroBank = [];
var hero;
var heroBlankArray = [];
var heroNameArray = [];
var gameRoundOn = false;  
var keysPressedCorrect = [];
var keysPressedWrong = [];

  
  //selectRandomWord(wordBank);

  //SuperHero Object Constructor
  function SuperHero(fname, imgString, playedOrNot){
    this.name = fname;
    this.imageSrc = imgString;
    this.hasPlayed = playedOrNot;

  }
  //Create SuperHeros
  //IronMan
  ironMan = new SuperHero("Iron Man","assets/images/ironman.jpg");
  hasPlayed = false;
  heroBank.push(ironMan);

  //Thor
  thor =  new SuperHero("Thor","assets/images/thor.jpg");
  hasPlayed = false;
  heroBank.push(thor);

  //SpiderMan
  spiderMan =  new SuperHero("Spiderman","assets/images/spiderman.jpg");
  hasPlayed = false;
  heroBank.push(spiderMan);

  //Hulk
  hulk = new SuperHero("Hulk","assets/images/hulk.jpg");
  hasPlayed = false;
  heroBank.push(hulk);

  //Captain America
  captainAmerica = new SuperHero("Captain America","assets/images/captainamerica.jpg");
  hasPlayed = false;
  heroBank.push(captainAmerica);



//Helper Functions
//Select Random Hero
function selectRandomHero(arrayOfHeroObjects){

    hero = arrayOfHeroObjects[Math.floor(Math.random()*arrayOfHeroObjects.length)];
   
    console.log(hero);
    return hero;
}

function startGameRound(){
    gameRoundOn = true;
    hero = selectRandomHero(heroBank);
   heroNameArray = changeStringToArrayOfChars(hero.name);
   heroBlankArray = createBlankArrayOfButtonsFromHeroNameArray(heroNameArray);
   console.log(heroNameArray);
   console.log(heroBlankArray);
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
        wrongAnswerTitle.innerHTML = "Wrong Guesses Here";
        wrongAnswerTitle.class = "display-4 mt-3";
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










//CLICK FUNCTION
var playGameButtonElement = document.getElementById('play-game');

playGameButtonElement.addEventListener('click', event => {
    //Start Game Here
    startGameRound();
  });

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
        }else{ //The key may be a variation of correct, checking to see
            console.log("The key may be correct, checking to see if it is");
            if(((keysPressedWrong.indexOf(keyPressed) !== -1)
            ||(keysPressedWrong.indexOf(keyPressedLowercase) !== -1)
            || (keysPressedWrong.indexOf(keyPressedUppercase) !== -1)
            || (keyPressed ==="Shift"))
            || ((keysPressedCorrect.indexOf(keyPressed) !== -1)
                ||(keysPressedCorrect.indexOf(keyPressedLowercase) !== -1)
                || (keysPressedCorrect.indexOf(keyPressedUppercase) !== -1))){
            
                console.log("The key is in the correct list or the wrong list");
            }else{//Log as Error
                console.log("They key is not correct")
                
                //Add Key to Wrong Answer Array
                keysPressedWrong.push(keyPressed);
                if(keyPressed == keyPressedUppercase){
                   
                    keysPressedWrong.push(keyPressedLowercase);
                    console.log("Key Pressed Wrong is uppercase" + keysPressedWrong);

                }else{
                    keysPressedWrong.push(keyPressedUppercase);
                    console.log("Key Pressed is lower case"+ keysPressedWrong);
                }
                //Create Incorrect Answer buttons
                var wrongAnswerbutton = document.createElement("button");
                wrongAnswerbutton.innerHTML = keyPressed;
                wrongAnswerbutton.className = "btn btn-danger mr-3 mt-1 wrong-answer";
                document.getElementById('wrong-answers').appendChild(wrongAnswerbutton);
                
            }
    
            
        }
    }
    


}); 
    




//    This works
//   var im = document.createElement('img');
//   im.src=ironMan.imageSrc;
//   document.body.appendChild(im);


//   var th = document.createElement('img');
//   th.src=thor.imageSrc;
//   document.body.appendChild(th);


//   var sm = document.createElement('img');
//   sm.src=spiderMan.imageSrc;
//   document.body.appendChild(sm);


//   var ca = document.createElement('img');
//   ca.src=captainAmerica.imageSrc;
//   document.body.appendChild(ca);




  

//    function selectRandomWord(arrayOfStrings){
//       if(checkArrayForTypeAndStrings(arrayOfStrings)){
//         //Pick a selection at random
//          word = arrayOfStrings[Math.floor(Math.random()*arrayOfStrings.length)];
//         console.log(word);
//       }    
//    }

//    function checkArrayForTypeAndStrings(arrayOfStrings){
//         if(arrayOfStrings instanceof Array){ //Check that it is an array
//            console.log("It is an Array");
//            for(var i=0;i<arrayOfStrings.length;i++){
//                if(!(typeof arrayOfStrings[i] === 'string')){
//                 console.log("Not a string at index: "+ i);
//                     return false;
//                }else{
//                     console.log("String at index: "+ i);
//                } 
//            }
//            console.log("It's and Array, and everything is a string");
//            return true;
//        }else{
//            console.log("It is not an array");
//            return false;
//        }
//    }


//Test Cases

// Test Cases for checkArrayForTypeAndStrings

//    var foo = 3;
//    var bar = 4;

//    var testCase1NotAnArray = "string";
//    var testCase2ArrayButNoStrings = [foo,bar];
//    var testCase3ArrayWithSomeStrings = ["string",foo,"string2",bar];

//    console.log("Test Case 1: Not An Array");
//    checkArrayForTypeAndStrings(testCase1NotAnArray);

//     console.log("Test case 2: Array but No strings");
//     checkArrayForTypeAndStrings(testCase2ArrayButNoStrings);

//     console.log("Test case 3: Array with some strings");
//     checkArrayForTypeAndStrings(testCase3ArrayWithSomeStrings);

//     console.log("Test Case 4: Array with all strings");
//     checkArrayForTypeAndStrings(wordBank);
   

   //    var $cols = $('.col-lg-1');

//    $cols.each(function(index){
//        console.log($cols[index]);
//    })