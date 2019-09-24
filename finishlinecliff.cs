using System;
using System.Collections.Generic;

// possible classes
// Die X
// Deck X
// Card X
// Player X
// Marker X
// FLMarker /
// Game or Board
public class Die
{
	// sides value color
	public int val;
	private int sides;
	public int color;
	public Die(int sides, int color)
	{
		this.sides = sides;
		this.color = color;
		this.val = 1;
	}

	public Die(int sides)
	{
		this.sides = sides;
		this.val = 1;
	}

	public Die()
	{
		this.sides = 6;
		this.val = 1;
	}

	public void Roll(Random rand)
	{
		this.val = rand.Next(1, this.sides + 1);
	}
}

public class Card
{
	public int suit;
	public int val;
	private Dictionary<int, string> SUIT_MAP = new Dictionary<int, string>{{0, "\u2663"}, {1, "\u2660"}, {2, "\u2665"}, {3, "\u2666"}};
	private Dictionary<int, string> VAL_MAP = new Dictionary<int, string>{{1, "Ac"}, {10, "10"}, {11, "Ja"}, {12, "Qu"}, {13, "Ki"}};
	public Card(int val, int suit)
	{
		this.val = val;
		this.suit = suit;
	}

	public string Display()
	{
		if (this.val == 0)
		{
			return "Jkr";
		}

		if (this.VAL_MAP.ContainsKey(this.val))
		{
			return this.SUIT_MAP[this.suit] + this.VAL_MAP[this.val];
		}

		return this.SUIT_MAP[this.suit] + "0" + this.val;
	}
}

public class Deck
{
	public List<Card> cards = new List<Card>();
	public Deck(int[] values, int[] suits, int numJokers)
	{
		foreach (var suit in suits)
		{
			foreach (var val in values)
			{
				this.cards.Add(new Card(val, suit));
			}
		}

		for (int jkr = 0; jkr < numJokers; jkr++)
		{
			this.cards.Add(new Card(0, 0));
		}
	}

	public void Shuffle(Random rand)
	{
		for (int index = this.cards.Count - 1; index > 0; index--)
		{
			int position = rand.Next(index + 1);
			Card temp = this.cards[index];
			this.cards[index] = this.cards[position];
			this.cards[position] = temp;
		}
	}
}

public class Marker
{
	public int position;
	public string name;
	public Marker(string name)
	{
		this.position = -1;
		this.name = name;
	}

	public virtual void Move(int spaces)
	{
		this.position += spaces;
	}
}

public class FLMarker : Marker
{
	public bool stopped;
	public FLMarker(string name): base(name)
	{
		this.stopped = false;
	}

	//overload of the parent class since it has an extra param. override is used when method signature is the same
	//but you want to call the method that is defined in the child class
	public void Move(int spaces, int stopValue, Deck gameDeck)
	{
		//int position = this.position; position <= position + spaces; position++
		for(int count = 1; count <= spaces ; count++)
		{
			if(gameDeck.cards[this.position + count].val >= stopValue)
			{
				base.Move(count);
				return;
			}
		}

		Move(spaces);
	}
}

public class Player
{
	public FLMarker[] markers;
	public string name;
	public Player(string name, string[] markerNames)
	{
		this.markers = new FLMarker[markerNames.Length];
		this.name = name;
		for (int markerName = 0; markerName < markerNames.Length; markerName++)
		{
			this.markers[markerName] = new FLMarker(markerNames[markerName]);
		}
	}

	public string HasMarkersAt(int position)
	{
		string master = "";
		foreach (var marker in this.markers)
		{
			if (marker.position == position)
			{
				master += marker.name;
			}
			else
				master += " ";
		}

		return master;
	}
}

//Display markers that are not in play and check for the edge cards.
public class FinishLine
{
	private readonly int[] SUITS = new int[]{0, 1, 2, 3};
	private readonly int[] VALUES = new int[]{1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13};
	private const int NUM_JOKERS = 2;
	private readonly string[] MARKER_NAMES = new string[]{"A", "B", "C"};
	private readonly int[] RESTRICTED_VALUES = new int[]{0, 1, 2, 11, 12, 13};
	public Deck deck;
	public Die redDie;
	public Die blackDie;
	public Player player1;
	public int players;
	public Random rand;
	public FinishLine(int players, string player1Name)
	{
		this.players = players;
		this.player1 = new Player(player1Name, this.MARKER_NAMES);
		this.rand = new Random();
		// value and suit have 'this' becuase it can be modified but the num_jokers is not an instance and the same for every game of finishline.
		//when referring to a card we say this card's value is 5 and this card's suit is hearts.
		this.deck = new Deck(this.VALUES, this.SUITS, NUM_JOKERS);
		this.redDie = new Die(6, 0xFF0000);
		this.blackDie = new Die(6, 0x000000);
		this.deck.Shuffle(rand);
		ValidateDeck();
		this.redDie.Roll(rand);
		this.blackDie.Roll(rand);
	}

	public void DisplayBoard()
	{
		// how to display
		//\t[SVV]\t[SVV]
		Console.Clear();
		string master = "";
		string cardRow = "\t";
		string playerRow = "\t";
		cardRow += "Player1";
		playerRow += this.player1.HasMarkersAt(-1);
		master += cardRow + "\n" + playerRow + "\n\n";
		cardRow = "\t";
		playerRow = "\t";
		int counter = 0;
		foreach (Card card in this.deck.cards)
		{
			cardRow += "|" + card.Display() + "|";
			playerRow += " " + this.player1.HasMarkersAt(counter) + " ";
			counter++;
			if (counter % 9 == 0) //counter !=0 is removed coz counter is incremented
			{
				master += cardRow + "\n" + playerRow + "\n\n";
				cardRow = "\t";
				playerRow = "\t";
			}
			else
			{
				cardRow += "\t";
				playerRow += "\t";
			}
		}

		Console.WriteLine(master);
	}

	public void ValidateCard(int posn)
	{
		if (Array.IndexOf(RESTRICTED_VALUES, this.deck.cards[posn].val) > -1)
		{
			while (true)
			{
				int newPosn = rand.Next(3, 51);
				if (Array.IndexOf(RESTRICTED_VALUES, this.deck.cards[newPosn].val) > -1)
					continue;
				Card temp = this.deck.cards[posn];
				this.deck.cards[posn] = this.deck.cards[newPosn];
				this.deck.cards[newPosn] = temp;
				break;
			}
		}
	}

	public void ValidateDeck()
	{
		int[] RESTRICTED_POSITIONS = new int[]{0, 1, 2, 51, 52, 53};
		foreach(var posn in RESTRICTED_POSITIONS)
		{
			ValidateCard(posn);
		}
	}
/*public void CheckEdgeCards()
	{
		private readonly int[] invalidPositions = new int[]{0, 1, 2, 51, 52, 53};
		foreach(var idx in invalidPositions)
		{
			//Console.WriteLine(this.deck.cards[idx]);
			if(Array.IndexOf(invalidCards, this.deck.cards[idx].val) > -1)
			{
				int position = this.rand.Next(3, 51);
				while(Array.IndexOf(invalidCards,this.deck.cards[position].val) > -1)
					position = rand.Next(3, 51);
				Card temp = this.deck.cards[idx];
				this.deck.cards[idx] = this.deck.cards[position];
				this.deck.cards[position] = temp;
			}
			else
				continue;
		}
	}*/
}

public class Program
{
	public static void Main()
	{
		FinishLine game = new FinishLine(1, "Player 1");
		/*Console.WriteLine("Player 1's {0} marker is at {1}",game.player1.markers[1].name, game.player1.markers[1].position);
		Console.WriteLine("First card is {0}",game.deck.cards[0].Display());
		Console.WriteLine("Last card is {0}",game.deck.cards[53].Display());
		Console.WriteLine("Red die is {0}", game.redDie.val);
		Console.WriteLine("Black die is {0}", game.blackDie.val);*/
		//game.DisplayBoard();
		//Console.WriteLine();
		//game.CheckEdgeCards();
		game.DisplayBoard();
		game.player1.markers[0].Move(10, 10, game.deck);
		game.DisplayBoard();
	}
}
