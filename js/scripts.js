
$(function() {
	
function randomString() {
    var chars = '0123456789abcdefghiklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXTZ';
    var str = '';
    var i = 0;
    for (i = 0; i < 10; i++) {
        str += chars[Math.floor(Math.random() * chars.length)];
    }
    return str;
}

function Column(name) {
    var self = this; 

    this.id = randomString();
    this.name = name;
    this.$element = createColumn();

  function createColumn() {
  	var $column = $('<div>').addClass('column');
  	var $columnTitle = $('<h2>').addClass('column-title').text(self.name);
  	var $columnCardList = $('<ul>').addClass('column-card-list');
  	var $columnDelete = $('<button>').addClass('btn-delete').text('x');
  	var $columnAddCard = $('<button>').addClass('add-card').text('Dodaj kartę');

  $columnDelete.click(function() {
    self.removeColumn();
  });
  $columnAddCard.click(function() {
    self.addCard(new Card(prompt("Wpisz nazwę karty")));
  });

  $column.append($columnTitle)
    .append($columnDelete)
    .append($columnAddCard)
    .append($columnCardList);

  return $column;
}
  }

  Column.prototype = {
    addCard: function(card) {
      this.$element.children('ul').append(card.$element);
    },
    removeColumn: function() {
      this.$element.remove();
    }
};

function Card(description) {
	var self = this;

	this.id = randomString();
	this.description = description;
	this.$element = createCard();
	
	function createCard() {
		var $card = $('<li>').addClass('card');
		var $cardDescription = $('<p>').addClass('card-description').text(self.description);
		var $cardDelete = $('<button>').addClass('btn-delete').text('x');


	$cardDelete.click(function() {
        self.removeCard();
	});

	$card.append($cardDelete).append($cardDescription);

	return $card;
	}
}

Card.prototype = {
	removeCard: function() {
		this.$element.remove();
	}
};

//var board = {
    //name: 'Tablica Kanban',
    //addColumn: function(column) {
      //this.$element.append(column.$element);
      //initSortable();
    //},
    //$element: $('#board .column-container')
//};

function Board(name) {

	var self = this; 

    this.id = randomString();
    this.name = name;
    this.$element = createBoard();

	function createBoard() {
	var $board = $('<div>').addClass('board');
  var $boardTitle = $('<h2>').addClass('board-title').text(self.name);
  var $boardColumnList = $('<ul>').addClass('board-list');
  var $boardDelete = $('<button>').addClass('btn-delete').text('x');
  var $boardAddColumn = $('<button>').addClass('add-column').text('Dodaj kolumnę');	

  $boardDelete.click(function() {
    self.removeBoard();
  });

  $boardAddColumn.click(function(event) {
    self.addColumn(new Card(prompt("Wpisz nazwę kolumny")));
  });

    $board.append($boardTitle)
    .append($boardDelete)
    .append($boardAddColumn)
    .append($boardColumnList);

	return $board;	
	}
}

Board.prototype = {
    addColumn: function(column) {
      this.$element.children('ul').append(column.$element);
    },
    removeBoard: function() {
      this.$element.remove();
    }
};

function initSortable() {
    $('.column-card-list').sortable({
      connectWith: '.column-card-list',
      placeholder: 'card-placeholder'
    }).disableSelection();
  }

  $('.create-column').click(function() {
	var name = prompt('Wpisz nazwę kolumny');
	var column = new Column(name);
   $board.addColumn(column);
  });


var todoColumn = new Column('Do zrobienia');
var doingColumn = new Column('W trakcie');
var doneColumn = new Column('Skończone');

$board.addColumn(todoColumn);
$board.addColumn(doingColumn);
$board.addColumn(doneColumn);

var card1 = new Card('Nowe zadanie');
var card2 = new Card('Stworzyc tablice kanban');

todoColumn.addCard(card1);
doingColumn.addCard(card2);

})


 $('.create-board').click(function() {
	var name = prompt('Wpisz nazwę tablicy');
	var board = new Board(name);
   $board.addColumn(column);
  });

 var todoBoard = new Board('Tablica');
 //$board.addBoard(todoBoard);