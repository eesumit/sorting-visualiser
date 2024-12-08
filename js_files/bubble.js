// import { sortingState } from "./sortingState.js";
import { isSorting, setSortingState } from './sortingState.js';
document.addEventListener('DOMContentLoaded', () => {
    let isPaused = false;
    const button = document.getElementById("controlButton");
    //function to simulate the work.
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

    async function bubbleSort() {
        if (isSorting) return; // Avoid starting a new sort
        setSortingState(true);

        button.innerHTML = `<span class="material-symbols-rounded">
        pause_circle
        </span>`;
        const bars = document.querySelectorAll('.bar');
        const speed = 101 - document.querySelector('#speed_input').value;

        for (let i = 0; i < bars.length - 1; i++) {
            for (let j = 0; j < bars.length - i - 1; j++) {
                bars[j].style.background = 'red';
                bars[j + 1].style.background = 'red';
                await delay(speed);

                //handling the stop/resume button.
                while (isPaused) {
                    await delay(100); // Poll every 100ms
                }
                // console.log(`Processing: i=${i}, j=${j}`);
                // await delay(500); 




                const height1 = parseInt(bars[j].style.height);
                const height2 = parseInt(bars[j + 1].style.height);

                if (height1 > height2) {
                    swap(bars[j], bars[j + 1]);
                }

                bars[j].style.background = 'blue';
                bars[j + 1].style.background = 'blue';
            }
            bars[bars.length - i - 1].style.background = 'green';
        }
        bars[0].style.background = 'green';
    }

        button.addEventListener("click", () => {
            isPaused = !isPaused;
            button.innerHTML = isPaused ? `<span class="material-symbols-rounded">
play_circle
</span>` : `<span class="material-symbols-rounded">
pause_circle
</span>`;
        });

    document.getElementById('bubble').addEventListener('click', bubbleSort);
});
