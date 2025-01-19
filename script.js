document.addEventListener('DOMContentLoaded', () => {
    const messageBoxes = document.querySelectorAll('.message-box');
    const container = document.querySelector('.container');

    function getRandomPosition(element) {
        const heartContainer = document.querySelector('.heart-container');
        const heartRect = heartContainer.getBoundingClientRect();
        const padding = 50; // Minimum distance from the heart
        
        let x, y;
        do {
            x = Math.random() * (container.offsetWidth - element.offsetWidth);
            y = Math.random() * (container.offsetHeight - element.offsetHeight);
        } while (
            x > heartRect.left - padding &&
            x < heartRect.right + padding &&
            y > heartRect.top - padding &&
            y < heartRect.bottom + padding
        );
        
        return [x, y];
    }

    function moveBox(box) {
        const [x, y] = getRandomPosition(box);
        box.style.transform = `translate(${x}px, ${y}px)`;
    }

    function animateBoxes() {
        messageBoxes.forEach(box => {
            moveBox(box);
            setInterval(() => {
                if (!box.classList.contains('expanded')) {
                    moveBox(box);
                }
            }, 5000);
        });
    }

    messageBoxes.forEach(box => {
        box.addEventListener('click', () => {
            messageBoxes.forEach(otherBox => {
                if (otherBox !== box) {
                    otherBox.classList.remove('expanded');
                }
            });
            box.classList.toggle('expanded');
        });
    });

    animateBoxes();

    window.addEventListener('resize', () => {
        messageBoxes.forEach(box => {
            if (!box.classList.contains('expanded')) {
                moveBox(box);
            }
        });
    });
});

