import Deck from './Deck.js';

// enum to reference card value with a numeric value in order to keep score.
const CARD_REFERENCE = {
	'1': 1,
	'2': 2,
	'3': 3,
	'4': 4,
	'5': 5,
	'6': 6,
	'7': 7,
	'8': 8,
	'9': 9,
	'10': 10,
	JACK: 10,
	QUEEN: 10,
	KING: 10,
	ACE: 11
};

// create a new deck
const deck = new Deck();
console.log(deck.cards);

// create hands
let playerHand;
let dealerHand;

console.log(drawRandomCard(deck));

// Draws a random card from the deck.
function drawRandomCard(deck) {
	let i = deck.cards.length - 1;
	let randomIndex = Math.floor(Math.random() * (i + 1));
	return deck.cards[randomIndex];
}

// run startGame function
startGame();

// add cards to hands and displays to the DOM
function startGame() {
	playerHand = [ drawRandomCard(deck), drawRandomCard(deck) ];
	dealerHand = [ drawRandomCard(deck), drawRandomCard(deck) ];

	document.getElementById('player-hand').innerHTML = Object.values(playerHand);
	document.getElementById('dealer-hand').innerHTML = Object.values(dealerHand)[0] + ' <li>Hidden</li'; //hide dealer's second card
	document.getElementById('player-hand-value').innerHTML = getHandValue(playerHand);
	document.getElementById('dealer-hand-value').innerHTML = 'HIDDEN'; // hide dealer's value.
	document.getElementById('newHandBtn').style.display = 'none';

	// check for natural BlackJack
	if (document.getElementById('player-hand-value').innerHTML == 21) {
		document.getElementById('player-hand-value').innerHTML = 'BLACKJACK!';
		gameWin();
		document.getElementById('newHandBtn').style.display = 'inline';
	} else if (getHandValue(dealerHand) == 21) {
		document.getElementById('dealer-hand-value').innerHTML = 'BLACKJACK!';
		document.getElementById('dealer-hand').innerHTML = Object.values(dealerHand);
		gameWin();
		document.getElementById('newHandBtn').style.display = 'inline';
	}
}

/* Event Listener for hitBtn - 
pushed random card to the player's hand from the deck and updates the DOM. */
document.getElementById('hitBtn').addEventListener('click', function() {
	playerHand.push(drawRandomCard(deck));
	getHandValue(playerHand);
	document.getElementById('player-hand').innerHTML = Object.values(playerHand);
	document.getElementById('player-hand-value').innerHTML = getHandValue(playerHand);
	// check for bust
	if (getHandValue(playerHand) > 21) {
		document.getElementById('player-hand-value').innerHTML = 'BUST!';
	}

	getHandValue(playerHand);
});

/* Event listner for standBtn -- while dealer hand value is less than 17  
push random card to the hand and update the DOM.
Once the dealerHand is >= 17 run the gameWin function. */
document.getElementById('standBtn').addEventListener('click', function() {
	document.getElementById('dealer-hand').innerHTML = Object.values(dealerHand);
	document.getElementById('dealer-hand-value').innerHTML = getHandValue(dealerHand);
	while (getHandValue(dealerHand) < 17) {
		dealerHand.push(drawRandomCard(deck));
		document.getElementById('dealer-hand').innerHTML = Object.values(dealerHand);
		if (getHandValue(dealerHand) < 22) {
			document.getElementById('dealer-hand-value').innerHTML = getHandValue(dealerHand);
		} else {
			document.getElementById('dealer-hand-value').innerHTML = 'BUST!';
		}
	}
	gameWin();
	document.getElementById('newHandBtn').style.display = 'inline';
});

// function that compares the dealerHand value to the playerHand value and displays the winner.
function gameWin() {
	if (
		(getHandValue(dealerHand) > getHandValue(playerHand) && getHandValue(dealerHand) <= 21) ||
		(getHandValue(playerHand) > 21 && getHandValue(dealerHand) <= 21)
	) {
		document.getElementById('outcome').innerHTML = 'DEALER WINS';
	} else if (
		(getHandValue(playerHand) > getHandValue(dealerHand) && getHandValue(playerHand) <= 21) ||
		(getHandValue(dealerHand) > 21 && getHandValue(playerHand) <= 21)
	) {
		document.getElementById('outcome').innerHTML = 'PLAYER WINS';
	} else if (getHandValue(playerHand) === getHandValue(dealerHand)) {
		document.getElementById('outcome').innerHTML = 'DRAW';
	} else if (
		document.getElementById('player-hand-value').innerHTML == 'BLACKJACK!' &&
		document.getElementById('dealer-hand-value').innerHTML != 'BLACKJACK!'
	) {
		document.getElementById('outcome').innerHTML = 'PLAYER WINS';
	} else if (
		document.getElementById('dealer-hand-value').innerHTML == 'BLACKJACK!' &&
		document.getElementById('player-hand-value').innerHTML != 'BLACKJACK!'
	) {
		document.getElementById('outcome').innerHTML = 'DEALER WINS';
	} else if (
		document.getElementById('dealer-hand-value').innerHTML == 'BLACKJACK!' &&
		document.getElementById('player-hand-value').innerHTML == 'BLACKJACK!'
	) {
		document.getElementById('outcome').innerHTML = 'DRAW';
	}
}

/* Gets the value of the cards in a hand by referencing the value in the card object to the CARD_REFERENCE, 
then adds the values together to get the total hand value. */
function getHandValue(hand) {
	let sum = 0;
	let aces = 0;
	let cardValue = hand.map((a) => a.value);

	for (let i = 0; i < hand.length; i++) {
		sum += CARD_REFERENCE[cardValue[i]];
		// check for Aces. If ace is found add to the aces counter.
		if (CARD_REFERENCE[cardValue[i]] == 11) {
			aces++;
		}
        /*if the sum exceeds 21, and there is at least 1 ace in the aces counter,
         subtract 10 from the value then subtract 1 from aces counter. */
		if (sum > 21 && aces >= 1) {
			aces--;
			sum -= 10;
		}
	}

	return sum;
}

document.getElementById('newHandBtn').addEventListener('click', function() {
	document.getElementById('outcome').innerHTML = '';

	startGame();
});
