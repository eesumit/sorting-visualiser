import { isSorting, setSortingState } from './js_files/sortingState.js';
document.addEventListener('DOMContentLoaded', () => {
    const arrSize = document.querySelector("#arr_sz");
    const button = document.getElementById("controlButton");
    let initialArray = []; // To store the initial state of the array

    // Delay function to create pauses in execution
    function delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    // Function to create the initial bars and save the initial array
    function createBars() {
        setSortingState(false);
        button.innerHTML = `<span class="material-symbols-rounded">
        play_circle
        </span>`;
        let noOfBars = arrSize.value;
        let randomNumber = [];
        for (let i = 1; i <= noOfBars; i++) {
            let randomNum = Math.floor(Math.random() * 102);
            randomNumber.push(randomNum);
        }

        let barContainers = document.getElementById('barsContainer');

        // Clear existing bars
        barContainers.innerHTML = '';

        randomNumber.forEach(number => {
            let bar = document.createElement('div');
            bar.style.height = `${number * 2}px`;
            bar.classList.add('bar');
            barContainers.appendChild(bar);
        });

        // Save the initial array state
        initialArray = randomNumber.slice(); // Save a copy
        // console.log("Initial Array:", initialArray);
    }

    // Function to reset the bars to their initial state
    function resetBars() {
        button.innerHTML = `<span class="material-symbols-rounded">
        play_circle
        </span>`;
        let barContainers = document.getElementById('barsContainer');
        barContainers.innerHTML = '';

        initialArray.forEach(number => {
            let bar = document.createElement('div');
            bar.style.height = `${number * 2}px`;
            bar.classList.add('bar');
            barContainers.appendChild(bar);
        });

        // console.log("Reset to Initial Array:", initialArray);
        // Avoid starting a new sort
        setSortingState(false);
    }

    // Event Listeners
    document.getElementById('array').addEventListener('click', createBars); // Create new array
    document.getElementById('reset').addEventListener('click', resetBars); // Reset array
    arrSize.addEventListener('input', createBars); // Adjust size and create bars

    // Initialize the bars on page load
    createBars();
});
