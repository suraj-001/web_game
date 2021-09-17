var images = [
    { src: 'puzzle_1.jpg', title: 'Mr. Bean' },
    { src: 'puzzle_3.png', title: 'Harry Potter' },
    { src: 'puzzle.jpeg', title: 'solve kro jani pehchani hi hai ;)' },
    { src: 'puzzle_5.png', title: 'Kristen Stewart (Bella)' },
    { src: 'shrivis.jpg', title: 'Shrivis' }
];

$(function () {
    var gridSize = $('#levelPanel :radio:checked').val();
    imagePuzzle.startGame(images, gridSize);
    $('#newPhoto').click(function () {
        var gridSize = $('#levelPanel :radio:checked').val();
        imagePuzzle.startGame(images, gridSize);
    });

    $('#levelPanel :radio').change(function (e) {
        var gridSize = $(this).val();
        imagePuzzle.startGame(images, gridSize);
    });
});
function rules() {
    alert('Rearrange the pieces so that you get a sample image. \nThe steps taken are counted \nBest of Luck... :)');
}


var timerFunction;

var imagePuzzle = {
    stepCount: 0,
    startTime: new Date().getTime(),
    startGame: function (images, gridSize) {
        this.setImage(images, gridSize);
        $('#playPanel').show();
        $('#sortable').randomize();
        this.enableSwapping('#sortable li');
        this.stepCount = 0;
        this.startTime = new Date().getTime();
        this.tick();
    },
    tick: function () {
        var now = new Date().getTime();
        var elapsedTime = parseInt((now - imagePuzzle.startTime) / 1000, 10);
        $('#timerPanel').text(elapsedTime);
        timerFunction = setTimeout(imagePuzzle.tick, 1000);
    },
    enableSwapping: function (elem) {
        $(elem).draggable({
            snap: '#droppable',
            snapMode: 'outer',
            revert: "invalid",
            helper: "clone"
        });
        $(elem).droppable({
            drop: function (event, ui) {
                var $dragElem = $(ui.draggable).clone().replaceAll(this);
                $(this).replaceAll(ui.draggable);

                currentList = $('#sortable > li').map(function (i, el) { return $(el).attr('data-value'); });
                if (isSorted(currentList))
                    $('#actualImageBox').empty().html($('#gameOver').html());
                else {
                    var now = new Date().getTime();
                    imagePuzzle.stepCount++;
                    $('.stepCount').text(imagePuzzle.stepCount);
                    $('.timeCount').text(parseInt((now - imagePuzzle.startTime) / 1000, 10));
                }

                imagePuzzle.enableSwapping(this);
                imagePuzzle.enableSwapping($dragElem);
            }
        });
    },

    setImage: function (images, gridSize) {
        console.log(gridSize);
        gridSize = gridSize || 4; // If gridSize is null or not passed, default it as 4.
        console.log(gridSize);
        var percentage = 100 / (gridSize - 1);
        var image = images[Math.floor(Math.random() * images.length)];
        $('#imgTitle').html(image.title);
        $('#actualImage').attr('src', image.src);
        $('#sortable').empty();
        for (var i = 0; i < gridSize * gridSize; i++) {
            var xpos = (percentage * (i % gridSize)) + '%';
            var ypos = (percentage * Math.floor(i / gridSize)) + '%';
            var li = $('<li class="item" data-value="' + (i) + '"></li>').css({
                'background-image': 'url(' + image.src + ')',
                'background-size': (gridSize * 100) + '%',
                'background-position': xpos + ' ' + ypos,
                'width': 400 / gridSize,
                'height': 400 / gridSize
            });
            $('#sortable').append(li);
        }
        $('#sortable').randomize();
    }
};

function isSorted(arr) {
    for (var i = 0; i < arr.length - 1; i++) {
        if (arr[i] != i)
            return false;
    }
    return true;
}
$.fn.randomize = function (selector) {
    var $elems = selector ? $(this).find(selector) : $(this).children(),
        $parents = $elems.parent();

    $parents.each(function () {
        $(this).children(selector).sort(function () {
            return Math.round(Math.random()) - 0.5;
        }).remove().appendTo(this);
    });
    return this;
};