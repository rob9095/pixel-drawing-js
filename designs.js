// makes grid
function makeGrid() {
    // get input values for width & height
    var gridWidth = $('#input_width').val();
    var gridHeight = $('#input_height').val();
    // set width & height in px for actual html grid
    var pxWidth = (gridWidth * 18);
    var pxHeight = (gridHeight * 18);
    // declare grid as an empty array  
    var grid = [];
    // setup CSS for the active grid  
    $('div.grid').css({
        "width": pxWidth,
        "height": pxHeight,
        "background": "#f9f9f9",
        "border": "3px dashed rgb(255,82,82)",
        "border-radius": "5px"
    });
    // add the Design Canvas header/color picker above the active grid
    $('<h2>Pick A Color</h2><input type="color" id="colorPicker">').insertBefore('#grid');  
    $('<h2>Design Canvas</h2>').insertBefore('#grid');
    // while loop to make grid rows
    var n = 0;
    while ( n < gridHeight) {
        $('div.grid').prepend('<div class="row ' + n + '" id="row-' + n + '"></div>');
        grid.push([]);
        // nested for loop to make grid cells
        for (var m = 0; m < gridWidth; m++) {
            $('#row-' + n + '').append('<div class="cell ' + n + ' ' + m + '" id="cell-' + n + '-' + m + '"></div>');
            grid[n].push(0);
        }
      n++      
    }
};
// clears the grid
function clearGrid() {
    $("div.grid").html('');
    $('#pixel_canvas').children('h2').remove();
   $('#pixel_canvas').children('#colorPicker').remove();
};

$(document).ready(function() {
    // when the size picker form is is submitted
    $('#sizePicker').submit(function(e) {
        // prevent page refresh
        e.preventDefault();
        clearGrid();
        makeGrid();
        // setup the paint
        $(function() {
            var isClicked = false;
            // on mousedown get chosen color and paint
            $('div.cell').mousedown(function() {
                var bgColor = $('#colorPicker').val();
                var isClicked = true;
                $(this).css("background", bgColor);
                // after mousedown, on mouse up unpaint
                $('body').mouseup(function() {
                    isClicked = false;
                })
                // on mousemove paint if no mouseup happened yet
                $('div.cell').mousemove(function() {
                    if (isClicked) {
                        $(this).css("background", bgColor);
                    }
                })
            })
        });
    });
});
