/**
 * STATE MANAGEMENT
 */
function showState(stateId) {
    const states = ['state-welcome', 'state-options', 'state-reasons', 'state-letter', 'state-success'];
    
    states.forEach(id => {
        const el = document.getElementById(id);
        if (el) {
            el.style.display = 'none'; 
            el.classList.add('hidden-content');
        }
    });

    const target = document.getElementById(stateId);
    if (target) {
        // Force display and remove hidden classes
        target.style.display = 'block'; 
        target.classList.remove('hidden-content');
        
        // Reset animation trigger to ensure text fades in every time
        target.style.animation = 'none';
        target.offsetHeight; /* trigger reflow */
        target.style.animation = null; 
    }

    // Nav buttons logic
    const homeBtn = document.getElementById('home-btn');
    const findDinoBtn = document.getElementById('find-dino-btn');
    
    if (stateId === 'state-welcome') {
        homeBtn?.classList.add('hidden-nav');
        findDinoBtn?.classList.add('hidden-nav');
    } else {
        homeBtn?.classList.remove('hidden-nav');
        homeBtn?.classList.add('show-nav');
        findDinoBtn?.classList.remove('hidden-nav');
        findDinoBtn?.classList.add('show-nav');
    }
}

document.addEventListener('DOMContentLoaded', () => {
    // Navigation/Start Buttons
    document.getElementById('start-btn')?.addEventListener('click', () => showState('state-options'));
    document.getElementById('btn-reasons')?.addEventListener('click', () => showState('state-reasons'));
    document.getElementById('btn-letter')?.addEventListener('click', () => showState('state-letter'));

    // Back Buttons
    document.querySelectorAll('.back-btn').forEach(btn => {
        btn.addEventListener('click', () => showState('state-options'));
    });

    // Success Screen Button
    document.getElementById('reset-game')?.addEventListener('click', () => showState('state-options'));
    
    // Home Button
    document.getElementById('home-btn')?.addEventListener('click', () => location.reload());

    /**
     * DINO GAME LOGIC (Triggered by the top-right button)
     */
    document.getElementById('find-dino-btn')?.addEventListener('click', () => {
        const dino = document.getElementById('game-dino');
        if (dino) {
            dino.style.display = 'block';
            dino.style.top = Math.random() * 70 + 15 + 'vh';
            dino.style.left = Math.random() * 70 + 15 + 'vw';
            
            dino.onclick = function() {
                this.style.display = 'none';
                showState('state-success');
            };
        }
    });
});

/**
 * FINAL REVEAL (The Gold Text & Flower Shower)
 */
function showFinalSurprise() {
    const revealBtn = document.getElementById('reveal-btn');
    const greenLightMsg = document.getElementById('green-light-msg');
    
    if (revealBtn) revealBtn.style.display = 'none';
    if (greenLightMsg) {
        greenLightMsg.style.display = 'block';
        greenLightMsg.classList.add('fast-fade');
    }

    showerFlowers();

    const box = document.querySelector('.intro-box');
    setTimeout(() => {
        box.scrollTo({ top: box.scrollHeight, behavior: 'smooth' });
    }, 200);
}

function showerFlowers() {
    const flowerEmojis = ['🌸', '🌷', '🌿', '✨', '💛', '🌹'];
    for (let i = 0; i < 40; i++) {
        const flower = document.createElement('div');
        flower.className = 'petal';
        flower.innerHTML = flowerEmojis[Math.floor(Math.random() * flowerEmojis.length)];
        flower.style.cssText = `
            position: fixed;
            left: ${Math.random() * 100}vw;
            top: -50px;
            font-size: ${Math.random() * 20 + 15}px;
            z-index: 10000;
            pointer-events: none;
        `;
        document.body.appendChild(flower);

        flower.animate([
            { top: '-50px', transform: 'rotate(0deg)' },
            { top: '110vh', transform: `rotate(${Math.random() * 720}deg) translateX(${Math.random() * 100 - 50}px)` }
        ], { duration: Math.random() * 3000 + 2000, easing: 'linear' }).onfinish = () => flower.remove();
    }
}
