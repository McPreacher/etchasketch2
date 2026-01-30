$(document).ready(function() {
    const $container = $('#container');
    const $colorPicker = $('#colorPicker');
    let isDrawing = false;

    const createGrid = (size = 16) => {
        $container.empty();
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

    const paint = (element) => {
        if (!element || !$(element).hasClass('grid')) return;
        $(element).css({
            'background-color': $colorPicker.val(),
            'transition': 'none'
        });
    };

    // --- MOUSE EVENTS ---
    $container.on('mousedown', (e) => { e.preventDefault(); isDrawing = true; });
    $(window).on('mouseup', () => isDrawing = false);
    $container.on('mouseover', '.grid', function() { if (isDrawing) paint(this); });
    $container.on('mousedown', '.grid', function() { paint(this); });

    // --- TOUCH EVENTS (Mobile Support) ---
    $container.on('touchstart', '.grid', function(e) {
        // Prevent scrolling while drawing
        if (e.cancelable) e.preventDefault();
        isDrawing = true;
        paint(this);
    });

    $container.on('touchmove', function(e) {
        if (!isDrawing) return;
        // Prevent scrolling while moving finger
        if (e.cancelable) e.preventDefault();

        // Get the location of the touch
        const touch = e.touches[0];
        // Find the element currently under that specific point
        const target = document.elementFromPoint(touch.clientX, touch.clientY);
        
        paint(target);
    });

    $(window).on('touchend', () => isDrawing = false);

    // --- BUTTON CONTROLS ---
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

    $('#custom').on('click', function() {
        let size = prompt("Grid size (1-100):", "16");
        size = parseInt(size);
        if (size > 0 && size <= 100) createGrid(size);
    });

    createGrid(16);
});