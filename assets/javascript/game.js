//"pokemon",
"the legend of zelda",
"metroid",
"super mario",
"pac man",
"street fighter"//


var gameObject = {
	currentLetter: "",

	allGuesses: [],
	incorrectGuesses: [],
	correctGuesses: [],
	correctGuessesInOrder: [],

	gamesArray: [
        "pokemon",
        "the legend of zelda",
        "metroid",
        "super mario",
        "pac man",
        "street fighter"],
		
	randomWord: "",
	gameLetters:[],

	isMatch: null,
	isRepeat: null,

	guessesRemaining: 15,
	loseCount: 0,
	winCount:0,

	generateWord: function(){
		// Generate a random number from 0-10
		var random_num = Math.random() * 9;
		random_num = Math.floor(random_num);

		// Assign randomWord to a word from the array whose index was chosen randomly.
		// Split the string into an array containing the individual letters of the randomly chosen word
		this.randomWord = this.gamesArray[random_num];
		this.gameLetters = this.randomWord.split("");

		// Shows that a randomly chosen game name was converted into an array containing each of its letters.
		console.log(this.randomWord + " " + this.gameLetters);

		// Reset the guesses arrays after winning or losing
		this.allGuesses = [];
		this.incorrectGuesses = [];
		this.correctGuesses = [];
		this.correctGuessesInOrder = [];
		this.guessesRemaining = 15;
	},

	checkRepeat: function(){
		var repeatCounter = -1;

		// Loop for the number of guesses.
		// If the current letter equals one from the array of allGuesses, the counter variable goes up one.
		for (var i=0; i < this.allGuesses.length; i++){
			if (this.currentLetter == this.allGuesses[i]){
				repeatCounter++;
			}
		}
		// If counter is zero, the global isRepeat variable becomes false (no matches found)
		// Otherwise a match was found and isRepeat becomes true.
		if (repeatCounter == 0){
			this.isRepeat = false;
		}
		else{
			this.isRepeat = true;
		}
	},
	checkMatch: function(){
		var matchCounter = 0;

		// Loop for the game names length amount of times.
		// If the guessed letter is equal to the the games letter at a given index, the counter variable increment by one.
		for (var i=0; i < this.gameLetters.length; i++){
			if (this.currentLetter == this.gameLetters[i]){
				matchCounter++;
			}
		}
		// If counter is zero, the global isMatch variable becomes false (signifies no matches found)
		// Otherwise a match was found and isMatch becomes true.
		if (matchCounter == 0){
			this.isMatch = false;
		}
		else{
			this.isMatch = true;
		}
	},
	match_repeatComparison: function(){
		// If key already has been pressed remove from guess
		if (this.isRepeat == true){
			this.allGuesses.pop(this.currentLetter);
		}
		// Letter has not been guessed and was a wrong guess, put the currentLetter in incorrectGuesses.
		if (this.isRepeat == false && this.isMatch == false){
			this.incorrectGuesses.push(this.currentLetter);
			this.guessesRemaining--;
		}
		// Letter has not been guessed and was a correct guess, put the currentLetter in correctGuesses.
		if (this.isRepeat == false && this.isMatch == true){
			this.correctGuesses.push(this.currentLetter);
			this.guessesRemaining--;
		}
	},
	revealgame: function(){
		// If there are no correctGuesses,
		// For the number of letters in the games name, fill the displayed guesses with an underscore.
		if (this.correctGuesses.length == 0){
			for (var i =0; i<this.gameLetters.length; i++){
				this.correctGuessesInOrder[i] = "_";
			}
		}
		else {
			// For the length of the games name,
			for (var i=0; i<this.gameLetters.length; i++){
				// If the displayed guess is not the same as gameletters at index i,
				if (this.correctGuessesInOrder[i] != this.gameLetters[i]){
					// Loop for correctGuesses length number of times,
					for (var j=0; j<this.correctGuesses.length; j++){
						// If the correctGuesses at j is equal to gameLetters at i, the displayedGuess becomes the gameletter at index i
						if (this.correctGuesses[j] == this.gameLetters[i]){
							this.correctGuessesInOrder[i] = this.gameLetters[i];
						}
						// Otherwise the displayedGuess at index i (corresponding to the game letter's indexes) becomes an underscore.
						else {
							this.correctGuessesInOrder[i] = "_";
						}
					}
				}
			}
		}

		document.getElementById("current-word").innerHTML = this.correctGuessesInOrder.join(" ");
		document.getElementById("num-wins").innerHTML = ("Wins: " + this.winCount + "  " + "Losses: " + this.loseCount);
		document.getElementById("letters-guessed").innerHTML = this.incorrectGuesses;
		document.getElementById("guesses-remaining").innerHTML = this.guessesRemaining;
	},
	checkProgress: function(){
		var counter = 0;

		// Loop a number of times equal to the length of the game name. 
		// If a guess is equal to the the game letter at the same index, add 1 to the counter.
		for (var i=0; i<this.gameLetters.length; i++){
			if (this.correctGuessesInOrder[i] == this.gameLetters[i]){
				counter++;
			}
		}

		// If the counter is the length of the game name, the user has won.
		if (counter == this.gameLetters.length){
			alert("You win");
			this.winCount++;
			this.generateWord();
		}
		// If the number of guesses remaining is zero, the user has lost.
		if (this.guessesRemaining == 0){
			alert("You lose!");
			this.loseCount++;
			this.generateWord();
		}
	}
}

var userStartedGameOnce = false;

// On every keyup...
document.onkeyup = function(q) {

	// currentLetter is grabbed from the keyboard and converted to lower case.
	// Then the letter is pushed into the allGuesses array
	gameObject.currentLetter = String.fromCharCode(q.keyCode).toLowerCase();

	// If the user presses the space button upon loading the page, start the game.
	if (gameObject.currentLetter == " " && userStartedGameOnce == false){


		gameObject.generateWord();

		userStartedGameOnce = true;

	}

	gameObject.allGuesses.push(gameObject.currentLetter);

	console.log("Current Letter: " + gameObject.currentLetter + "\n" + "game Letters: " + gameObject.gameLetters + "\n" + "All Guesses: " + gameObject.allGuesses);


	// Checks to see if the letter has been typed before.
	// Checks to see if the letter matches with one in the game name.
	gameObject.checkRepeat();
	gameObject.checkMatch();


	// This function determines which array to push the currentLetter into.
	gameObject.match_repeatComparison();

	console.log("Correct Guesses: " + gameObject.correctGuesses);
	console.log("Incorrect Guesses: " + gameObject.incorrectGuesses);
	console.log("Guesses Remaining:" + gameObject.guessesRemaining);

	// Reveals the game name as it is being guessed.
	gameObject.revealgame();
	console.log(gameObject.correctGuessesInOrder);

	// Check to see if the game is still in progress or if a win/lose has happened
	gameObject.checkProgress();
}
