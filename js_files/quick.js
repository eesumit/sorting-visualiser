import { isSorting, setSortingState } from './sortingState.js';
document.addEventListener('DOMContentLoaded', () => {
    let isPaused = false;
    const button = document.getElementById("controlButton");
    // Delay function to create pauses in execution
    function delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    // Function to swap heights of two bars
    function swap(el1, el2) {
        const style1 = window.getComputedStyle(el1);
        const style2 = window.getComputedStyle(el2);

        const height1 = style1.getPropertyValue("height");
        const height2 = style2.getPropertyValue("height");

        el1.style.height = height2;
        el2.style.height = height1;
    }

    // Partition function for Quick Sort
    async function partition(bars, low, high, speed) {
        let pivot = parseInt(bars[high].style.height);
        let i = low - 1;

        bars[high].style.background = 'red'; // Pivot element

        for (let j = low; j < high; j++) {
            bars[j].style.background = 'yellow'; // Current element being compared

            await delay(speed);


            //handling the stop/resume button.
            while (isPaused) {
                await delay(100); // Poll every 100ms
            }


            if (parseInt(bars[j].style.height) < pivot) {
                i++;
                swap(bars[i], bars[j]);
            }

            bars[j].style.background = 'blue'; // Reset color after comparison
        }

        swap(bars[i + 1], bars[high]);

        bars[high].style.background = 'blue'; // Reset color after pivot placement
        bars[i + 1].style.background = 'green'; // Element in correct position

        return i + 1;
    }

    // Quick Sort algorithm
    async function quickSort(bars, low, high, speed) {
        
        if (low < high) {
            let pi = await partition(bars, low, high, speed);

            await quickSort(bars, low, pi - 1, speed);
            await quickSort(bars, pi + 1, high, speed);
        }
    }

    // Function to start Quick Sort
    async function startQuickSort() {

        if (isSorting) return; // Avoid starting a new sort
    setSortingState(true);
    
        button.innerHTML = `<span class="material-symbols-rounded">
        pause_circle
        </span>`;
        const bars = document.querySelectorAll('.bar');
        const speed = 101 - document.querySelector('#speed_input').value;

        await quickSort(bars, 0, bars.length - 1, speed);

        for (let i = 0; i < bars.length; i++) {
            bars[i].style.background = 'green'; // Marking the sorted bars
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

    // Event listener for Quick Sort button
    document.getElementById('quick').addEventListener('click', startQuickSort);
});
