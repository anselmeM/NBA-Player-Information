// JavaScript code for player comparison using balldontlie API

// Function to fetch player details from balldontlie API
function fetchPlayerDetails(playerId, targetElementId) {
    // Fetch player details using balldontlie API
    fetch(`https://www.balldontlie.io/api/v1/players/${playerId}`)
        .then(response => response.json())
        .then(data => {
            // Display player details in the target element
            const playerElement = document.getElementById(targetElementId);
            playerElement.innerHTML = `
                <h2>${data.first_name} ${data.last_name}</h2>
                <p>Team: ${data.team.full_name}</p>
                <p>Position: ${data.position}</p>
                <p>Height: ${data.height_feet}' ${data.height_inches}"</p>
                <p>Weight: ${data.weight_pounds} lbs</p>
            `;
        })
        .catch(error => console.error(error));
}

// Fetch player details for Player 1
fetchPlayerDetails(1, 'player1');

// Fetch player details for Player 2
fetchPlayerDetails(2, 'player2');
