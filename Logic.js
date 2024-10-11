document.addEventListener('DOMContentLoaded', () => {
    const follower = document.getElementById('follower');
    const dot = document.getElementById('dot');
    const scoreDisplay = document.getElementById('scoreDisplay');
    const wonElement = document.getElementById('won');
    const congratulationsElement = document.getElementById('congratulations');
    const timeTakenElement = document.getElementById('timeTaken');
    const runAudio = document.getElementById('runAudio');
    const escapeAudio = document.getElementById('escapeAudio');
    const backgroundMusic = document.getElementById('backgroundMusic');
    const bdy = document.getElementById('body');
    const goHard = document.getElementById("goHard");
    const goHome = document.getElementById("goHome");
    const homeVideoContainer = document.getElementById('homeVideoContainer');
    const homeV= document.getElementById('home');
    const audioPlayer = document.getElementById("audioPlayer");
     const go =  document.getElementById('go');
     const audio = document.getElementById("audioPlayer");
     

    let touched = false;
    let score = 0;
    let startTime = Date.now(); // Initialize the timer

    // Follower movement on mousemove
    document.addEventListener('mousemove', (event) => {
        follower.style.left = `${event.pageX - 25}px`;
        follower.style.top = `${event.pageY - 25}px`;
        checkTouch();
    });

    document.addEventListener('touchmove', (event) => {
        follower.style.left = `${event.touches[0].pageX - 25}px`;
        follower.style.top = `${event.touches[0].pageY - 25}px`;
        checkTouch();
    });

    // Handle form submission and set difficulty
    document.getElementById('difficultyForm').addEventListener('submit', function(event) {
        event.preventDefault();
        const difficulty = document.getElementById('difficulty').value; // Get the selected difficulty
        localStorage.setItem('difficulty', difficulty); // Store the difficulty level

        // Hide home page and show game section
        document.getElementById('homePage').style.display = 'none';
        document.getElementById('gameSection').style.display = 'block';

        // Start moving the dot
        moveDot(); // Start moving the dot immediately based on difficulty level
    });

    function moveDot() {
        const x = Math.random() * (window.innerWidth - 50); // Adjust the width of the dot
        const y = Math.random() * (window.innerHeight - 50); // Adjust the height of the dot
        dot.style.position = 'absolute';
        dot.style.left = `${x}px`;
        dot.style.top = `${y}px`;

        // Set the next movement delay based on difficulty
        const difficulty = localStorage.getItem('difficulty');
        let delay = 1000; // Default to 1000ms
        switch (difficulty) {
            case 'YarAdua':
                delay = 1300;
                break;
            case 'GEJ':
                delay = 580;
                break;
            case 'BuBu':
                delay = 400;
                break;
            case 'Tpain':
                delay = 130;
                break;
        }
        
        setTimeout(moveDot, delay); // Call moveDot again after the specified delay
    }

    // Check if the follower touches the dot
    function checkTouch() {
        const dotRect = dot.getBoundingClientRect();
        const followerRect = follower.getBoundingClientRect();
        const isTouching = !(dotRect.right < followerRect.left ||
                             dotRect.left > followerRect.right ||
                             dotRect.bottom < followerRect.top ||
                             dotRect.top > followerRect.bottom);

        if (isTouching && !touched) {
            touched = true;
            score += 200; // Increase score on touch
            scoreDisplay.textContent = score;
            runAudio.pause();
             escapeAudio.pause();
             go.play();

            if (score >= 2000) {
                const timeTaken = ((Date.now() - startTime) / 1000).toFixed(2); // Calculate time in seconds
                timeTakenElement.textContent = timeTaken;
                congratulationsElement.style.display = 'block';
                body.style.display = 'none';
                go.pause();
                audio.pause();
                escapeAudio.play(); // Play escape audio
                wonElement.style.display = 'none'; // Hide won element
            } else {
                wonElement.style.display = 'block';   
                bdy.style.display = 'none';
                go.play();
             ;
            }
        } else if (!isTouching && touched) {
            touched = false;
            wonElement.style.display = 'none';
            runAudio.play();
            go.pause();
            audio.pause();
        }
    }

    
    // Click handler for "Go Home" button
    goHome.onclick = function() {
        // Hide the game section and show the video container
        document.getElementById('won').style.display = 'none';
        document.getElementById('btn').style.display = 'block';
        homeV.style.display = 'block';
        goHard.style.display = 'block';

        // Start the video playback
        homeV.play();
        go.pause();
            

        audio.pause();
    };

    // Click handler for "Go Hard" button
    goHard.onclick = function() {
        wonElement.style.display = 'none';
        bdy.style.display = 'block';
        go.pause();
        audio.pause();
        
    };
});


function toggleMusic(action) {
    var audio = document.getElementById("audioPlayer");

    if (action === 'play') {
        audio.play();
         escapeAudio.pause();
         go.pause()
    } else if (action === 'pause') {
        audio.pause();
        go.pause();
         escapeAudio.pause();
    } 
    
}

document.getElementById('difficultyForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    // Get the selected difficulty (regime)
    const difficulty = document.getElementById('difficulty').value;
    
    // Store the difficulty in local storage
    localStorage.setItem('difficulty', difficulty);
    
    // Show the selected regime in the span element
    document.getElementById('difficultyLevel').textContent = difficulty;
    
    // Hide home page and show game section
    document.getElementById('homePage').style.display = 'none';
    document.getElementById('gameSection').style.display = 'block';

    // Add state to history
    history.pushState({ game: true }, 'Game', '');
});

