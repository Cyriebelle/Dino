// 1. Elements
const startBtn = document.getElementById('start-btn');
const findDinoBtn = document.getElementById('find-dino-btn');
const gameDino = document.getElementById('game-dino');
const homeBtn = document.getElementById('home-btn');

const welcomeState = document.getElementById('state-welcome');
const optionsState = document.getElementById('state-options');
const reasonsState = document.getElementById('state-reasons');
const surpriseState = document.getElementById('state-surprise');
const successState = document.getElementById('state-success');

// 2. Welcome -> Menu Transition
startBtn.addEventListener('click', () => {
    welcomeState.style.transition = "opacity 0.5s ease";
    welcomeState.style.opacity = "0"; 
    
    setTimeout(() => {
        welcomeState.classList.add('hidden-content');
        optionsState.classList.remove('hidden-content');
        optionsState.style.opacity = "1";
        homeBtn.classList.add('show-nav');
        findDinoBtn.classList.add('show-nav');
    }, 500); 
});

// 3. Open Sub-Pages (Reasons & Surprise)
document.getElementById('btn-reasons').addEventListener('click', () => {
    optionsState.classList.add('hidden-content');
    reasonsState.classList.remove('hidden-content');
});

document.getElementById('btn-surprise').addEventListener('click', () => {
    optionsState.classList.add('hidden-content');
    surpriseState.classList.remove('hidden-content');
});

// 4. THE UNIVERSAL BACK LOGIC
// This finds EVERY button with the class "back-btn" and returns to menu
document.querySelectorAll('.back-btn').forEach(button => {
    button.addEventListener('click', () => {
        // Hide all possible sub-states
        reasonsState.classList.add('hidden-content');
        surpriseState.classList.add('hidden-content');
        successState.classList.add('hidden-content');
        
        // Show main menu
        optionsState.classList.remove('hidden-content');
        optionsState.style.opacity = "1";
    });
});

// 5. Dino Game Logic
findDinoBtn.addEventListener('click', () => {
    gameDino.style.display = "block";
    const x = Math.random() * (window.innerWidth - 100);
    const y = Math.random() * (window.innerHeight - 100);
    gameDino.style.left = x + 'px';
    gameDino.style.top = y + 'px';
});

gameDino.addEventListener('click', (e) => {
    e.stopPropagation();
    gameDino.style.display = "none";
    optionsState.classList.add('hidden-content');
    successState.classList.remove('hidden-content');
});

// 6. Reset from Success Screen (Special Case for "Back to Menu" ID)
document.getElementById('reset-game').addEventListener('click', () => {
    successState.classList.add('hidden-content');
    optionsState.classList.remove('hidden-content');
    optionsState.style.opacity = "1";
});

// 7. MASTER HOME BUTTON
homeBtn.addEventListener('click', () => {
    window.location.reload();
});