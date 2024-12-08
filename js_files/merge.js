import { isSorting, setSortingState } from './sortingState.js';
document.addEventListener('DOMContentLoaded', () => {
    let isPaused = false;
    const button = document.getElementById("controlButton");
    // Delay function to create pauses in execution
    function delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    // Function to merge two subarrays with visualization
    async function merge(bars, l, m, r, speed) {
        const n1 = m - l + 1;
        const n2 = r - m;

        let leftArray = new Array(n1);
        let rightArray = new Array(n2);

        for (let i = 0; i < n1; i++) {
            leftArray[i] = bars[l + i].style.height;
        }

        for (let j = 0; j < n2; j++) {
            rightArray[j] = bars[m + 1 + j].style.height;
        }

        let i = 0, j = 0, k = l;

        while (i < n1 && j < n2) {
            if (parseInt(leftArray[i]) <= parseInt(rightArray[j])) {
                bars[k].style.height = leftArray[i];
                i++;
            } else {
                bars[k].style.height = rightArray[j];
                j++;
            }
            k++;

            // Color change to indicate comparison
            bars[k - 1].style.background = 'yellow';

            // Delay for visualization
            await delay(speed);

            // Reset color after comparison
            bars[k - 1].style.background = 'blue';
        }

        // Copy remaining elements of leftArray, if any
        while (i < n1) {
            bars[k].style.height = leftArray[i];
            i++;
            k++;

            // Color change to indicate remaining elements
            bars[k - 1].style.background = 'yellow';

            // Delay for visualization
            await delay(speed);
            while (isPaused) {
                await delay(100); // Poll every 100ms
            }
            
            // Reset color after comparison
            bars[k - 1].style.background = 'blue';
        }

        // Copy remaining elements of rightArray, if any
        while (j < n2) {
            bars[k].style.height = rightArray[j];
            j++;
            k++;

            // Color change to indicate remaining elements
            bars[k - 1].style.background = 'yellow';

            // Delay for visualization
            await delay(speed);

            //handling the stop/resume button.
            while (isPaused) {
                await delay(100); // Poll every 100ms
            }

            // Reset color after comparison
            bars[k - 1].style.background = 'blue';
        }
    }

    // Merge Sort algorithm with visualization
    async function mergeSort(bars, l, r, speed) {
        if (l >= r) {
            return;
        }

        const m = l + Math.floor((r - l) / 2);

        await mergeSort(bars, l, m, speed);
        await mergeSort(bars, m + 1, r, speed);
        await merge(bars, l, m, r, speed);
    }

    // Function to start Merge Sort and update visualization
    async function startMergeSort() {
        if (isSorting) return; // Avoid starting a new sort
    setSortingState(true);

        button.innerHTML = `<span class="material-symbols-rounded">
        pause_circle
        </span>`;
        const bars = document.querySelectorAll('.bar');
        const speed = 101 - document.querySelector('#speed_input').value;

        await mergeSort(bars, 0, bars.length - 1, speed);

        // Marking the sorted bars with green color
        for (let i = 0; i < bars.length; i++) {
            bars[i].style.background = 'green';
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


    // Event listener for Merge Sort button
    document.getElementById('merge').addEventListener('click', startMergeSort);
});
