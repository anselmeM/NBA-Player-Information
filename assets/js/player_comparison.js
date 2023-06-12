document.addEventListener('DOMContentLoaded', function() {
  const searchInput = document.getElementById('PlayerStat');
  const searchButton = document.getElementById('StatSearchButton');
  const playerStatsInfo = document.getElementById('playerSatsInfo');

  const autocomplete = new Autocomplete(searchInput, {
    data: [], // This will be populated with player names
    onSelect: function(item) {
      searchInput.value = item.text;
    }
  });

  searchButton.addEventListener('click', function() {
    searchPlayer();
  });

  // Fetch player names and populate the autocomplete data
  fetchPlayerNames()
    .then(names => {
      autocomplete.setData(names);
    })
    .catch(error => {
      console.error('Failed to fetch player names:', error);
    });
});

function fetchPlayerNames() {
  const url = 'https://www.balldontlie.io/api/v1/players';

  return fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to fetch player names');
      }
      return response.json();
    })
    .then(data => {
      const names = data.data.map(player => ({
        text: `${player.first_name} ${player.last_name}`,
        value: player.id
      }));
      return names;
    });
}

function searchPlayer() {
  const searchInput = document.getElementById('PlayerStat');
  const playerName = searchInput.value;
  searchInput.value = '';

  getPlayerInfo(playerName)
    .then(player => {
      displayPlayerInfo(player);
    })
    .catch(error => {
      displayErrorMessage(error);
    });
}

function getPlayerInfo(playerName) {
  const url = `https://www.balldontlie.io/api/v1/players?search=${playerName}`;

  return fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error('Player not found');
      }
      return response.json();
    })
    .then(data => {
      if (data.data.length === 0) {
        throw new Error('Player not found');
      }
      const player = data.data[0];
      const playerId = player.id;
      const careerStatsUrl = `https://www.balldontlie.io/api/v1/season_averages?player_ids[]=${playerId}`;

      return fetch(careerStatsUrl)
        .then(response => {
          if (!response.ok) {
            throw new Error('Failed to fetch career statistics');
          }
          return response.json();
        })
        .then(statsData => {
          player.careerStats = statsData.data;
          return player;
        });
    })
    .catch(error => {
      throw new Error('Failed to fetch player information');
    });
}

function displayPlayerInfo(player) {
  const playerStatsInfo = document.getElementById('playerSatsInfo');
  playerStatsInfo.innerHTML = `
    <h2>${player.first_name} ${player.last_name}</h2>
    <p>Team: ${player.team.full_name}</p>
    <p>Position: ${player.position}</p>
    <p>Height: ${player.height_feet}'${player.height_inches}"</p>
    <p>Weight: ${player.weight_pounds} lbs</p>
    <h3>Career Statistics</h3>
    <table>
      <thead>
        <tr>
          <th>Season</th>
          <th>Points per Game</th>
          <th>Assists per Game</th>
          <th>Rebounds per Game</th>
          <!-- Add more table headers for additional statistics -->
        </tr>
      </thead>
      <tbody>
        ${player.careerStats.map(stats => `
          <tr>
            <td>${stats.season}</td>
            <td>${stats.pts}</td>
            <td>${stats.ast}</td>
            <td>${stats.reb}</td>
            <!-- Add more table cells for additional statistics -->
          </tr>
        `).join('')}
      </tbody>
    </table>
  `;
}

function displayErrorMessage(error) {
  const playerStatsInfo = document.getElementById('playerSatsInfo');
  playerStatsInfo.innerHTML = `<p>${error.message}</p>`;
}

// Player Comparison Functions
function searchPlayer(playerNum) {
  const searchInput = document.getElementById(`searchInput${playerNum}`);
  const playerName = searchInput.value;
  searchInput.value = '';

  getPlayerInfo(playerName)
    .then(player => {
      displayPlayerInfo(player, playerNum);
    })
    .catch(error => {
      displayErrorMessage(error);
    });
}

function displayPlayerInfo(player, playerNum) {
  const playerInfo = document.getElementById(`playerInfo${playerNum}`);
  playerInfo.innerHTML = `
    <h2>${player.first_name} ${player.last_name}</h2>
    <p>Team: ${player.team.full_name}</p>
    <p>Position: ${player.position}</p>
    <p>Height: ${player.height_feet}'${player.height_inches}"</p>
    <p>Weight: ${player.weight_pounds} lbs</p>
    <h3>Career Statistics</h3>
    <table>
      <thead>
        <tr>
          <th>Season</th>
          <th>Points per Game</th>
          <th>Assists per Game</th>
          <th>Rebounds per Game</th>
          <!-- Add more table headers for additional statistics -->
        </tr>
      </thead>
      <tbody>
        ${player.careerStats.map(stats => `
          <tr>
            <td>${stats.season}</td>
            <td>${stats.pts}</td>
            <td>${stats.ast}</td>
            <td>${stats.reb}</td>
            <!-- Add more table cells for additional statistics -->
          </tr>
        `).join('')}
      </tbody>
    </table>
  `;
}
