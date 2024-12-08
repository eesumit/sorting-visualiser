// import {sortingState} from "./sortingState.js";
import { isSorting, setSortingState } from './sortingState.js';
document.addEventListener('DOMContentLoaded', () => {
    let isPaused = false;
    const button = document.getElementById("controlButton");
    function delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    async function insertionSort() {

        if (isSorting) return; // Avoid starting a new sort
        setSortingState(true);

        button.innerHTML = `<span class="material-symbols-rounded">
        pause_circle
        </span>`;
        const bars = document.querySelectorAll('.bar');
        const speed = 101 - document.querySelector('#speed_input').value;

        for (let i = 1; i < bars.length; i++) {
            let key = parseInt(bars[i].style.height);
            let j = i - 1;

            bars[i].style.background = 'red'; // Current key element

            await delay(speed);

            while (j >= 0 && parseInt(bars[j].style.height) > key) {
                bars[j].style.background = 'yellow'; // Current element being compared
                bars[j + 1].style.height = bars[j].style.height;
                await delay(speed);

                // console.log(isPaused);
                //handling the stop/resume button.
                while (isPaused) {
                    await delay(100); // Poll every 100ms
                }
                // console.log(`Processing: i=${i}, j=${j}`);
                // await delay(500); 



                bars[j].style.background = 'blue'; // Reset color after comparison
                j = j - 1;
            }
            bars[j + 1].style.height = key + 'px';
            bars[i].style.background = 'blue'; // Reset color after insertion

            // Mark the sorted part
            for (let k = 0; k <= i; k++) {
                bars[k].style.background = 'green'; // Element in correct position
            }
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

    document.getElementById('insertion').addEventListener('click', insertionSort);
});
