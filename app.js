$(document).ready(function() {
    const $container = $('#container');
    const $colorPicker = $('#colorPicker'); 
    let isDrawing = false;

    // The Grid Creator
    const createGrid = (size = 16) => {
        $container.empty();
        isDrawing = false; // Reset drawing state
        
        $container.css({
            'grid-template-columns': `repeat(${size}, 1fr)`,
            'grid-template-rows': `repeat(${size}, 1fr)`
        });

        const fragment = document.createDocumentFragment();
        for (let i = 0; i < size * size; i++) {
            const gridSquare = document.createElement('div');
            gridSquare.classList.add('grid');
            fragment.appendChild(gridSquare);
        }
        $container.append(fragment);
    };

    // Painting Function
    const paint = (element) => {
        const selectedColor = $colorPicker.val();
        $(element).css({
            'background-color': selectedColor,
            'transition': 'none' // Ensures drawing is always instant
        });
    };

    // --- Interaction Listeners ---

    $container.on('mousedown', function(e) {
        e.preventDefault(); 
        isDrawing = true;
    });

    $container.on('mouseover', '.grid', function() {
        if (isDrawing) paint(this);
    });

    $container.on('mousedown', '.grid', function() {
        paint(this);
    });

    $(window).on('mouseup', function() {
        isDrawing = false;
    });

    // --- Button Controls ---

    // Clear and Shake
    $('#clear').on('click', function() {
        $container.addClass('shake-it');

        $('.grid').css({
            'transition': 'background-color 0.8s ease-in-out',
            'background-color': 'dimgray'
        });

        setTimeout(() => {
            $container.removeClass('shake-it');
            $('.grid').css('transition', ''); 
        }, 800);
    });

    // Custom Grid Size
    $('#custom').on('click', function() {
        let size = prompt("How many squares per side? (1-100)");
        size = parseInt(size);

        if (!isNaN(size) && size > 0 && size <= 100) {
            createGrid(size);
        } else if (size > 100) {
            alert("Maximum size is 100 to prevent browser crashes!");
        }
    });

    // Hover effects for buttons
    $('input[type="button"]').hover(
        function() { $(this).addClass('active'); },
        function() { $(this).removeClass('active'); }
    );

    // Initial Start
    createGrid(16);
});