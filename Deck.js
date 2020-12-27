const SUITS = [ '♥', '♠', '♦', '♣' ];
const VALUES = [ 'ACE', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'JACK', 'QUEEN', 'KING' ];

// Deck Class -- takes in an array of cards using the freshDeck function.
export default class Deck {
	constructor(cards = freshDeck()) {
		this.cards = cards;
	}
}

// card class -- takes in suit and value.
class Card {
	constructor(suit, value) {
		this.suit = suit;
		this.value = value;
	}
}

// override the toString function for Card.
Card.prototype.toString = function cardToString() {
	return `<li>${this.value} of ${this.suit}</li>`;
};

// combines the SUITS and VALUES arrays into one array of cards with a suit and value property.
function freshDeck() {
	return SUITS.flatMap((suit) => {
		return VALUES.map((value) => {
			return new Card(suit, value);
		});
	});
}
