import { isSorting, setSortingState } from './sortingState.js';
document.addEventListener('DOMContentLoaded', () => {
    let isPaused = false;
    const button = document.getElementById("controlButton");
    function delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    function swap(el1, el2) {
        const style1 = window.getComputedStyle(el1);
        const style2 = window.getComputedStyle(el2);

        const height1 = style1.getPropertyValue("height");
        const height2 = style2.getPropertyValue("height");

        el1.style.height = height2;
        el2.style.height = height1;
    }

    async function selectionSort() {
        if (isSorting) return; // Avoid starting a new sort
    setSortingState(true);
    
        button.innerHTML = `<span class="material-symbols-rounded">
        pause_circle
        </span>`;
        const bars = document.querySelectorAll('.bar');
        const speed = 101 - document.querySelector('#speed_input').value;

        for (let i = 0; i < bars.length; i++) {
            let minIndex = i;
            bars[minIndex].style.background = "red";

            for (let j = i + 1; j < bars.length; j++) {
                bars[j].style.background = "yellow";

                await delay(speed);

                //handling the pause/resume button
                while (isPaused) {
                    await delay(100); // Poll every 100ms
                }

                const height1 = parseInt(bars[minIndex].style.height);
                const height2 = parseInt(bars[j].style.height);

                if (height2 < height1) {
                    bars[minIndex].style.background = "blue";
                    minIndex = j;
                    bars[minIndex].style.background = "red";
                } else {
                    bars[j].style.background = "blue";
                }
            }

            if (minIndex !== i) {
                swap(bars[i], bars[minIndex]);
            }

            bars[minIndex].style.background = "blue";
            bars[i].style.background = "green"; // Element is sorted
        }
    }

        button.addEventListener("click", () => {
            isPaused = !isPaused;
            button.innerHTML = isPaused ? `<span class="material-symbols-rounded">
play_circle
</span>` : `<span class="material-symbols-rounded">
pause_circle
</span>`;
        });

    document.getElementById('selection').addEventListener('click', selectionSort);
});
