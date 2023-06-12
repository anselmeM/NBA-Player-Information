 document.addEventListener("DOMContentLoaded", function() {
            // API endpoint URL
            const apiUrl = "https://api.example.com/nba/latest-stories";

            // Event listener for the search button
            document.getElementById("searchButton").addEventListener("click", function() {
                const playerName = document.getElementById("playerName").value; // Get the player name from the input field

                // Make an API request
                fetch(`${apiUrl}?player=${playerName}`)
                    .then(response => response.json())
                    .then(data => {
                        // Process the API response
                        const news = data.news;
                        const resultsContainer = document.getElementById("results");
                        if (news.length > 0) {
                            // Clear previous results
                            resultsContainer.innerHTML = "";

                            // Display the latest news
                            for (let i = 0; i < news.length; i++) {
                                const headline = news[i].headline;
                                const summary = news[i].summary;

                                // Create HTML elements to display the news
                                const newsElement = document.createElement("div");
                                const headlineElement = document.createElement("h3");
                                headlineElement.textContent = headline;
                                const summaryElement = document.createElement("p");
                                summaryElement.textContent = summary;

                                // Append the elements to the results container
                                newsElement.appendChild(headlineElement);
                                newsElement.appendChild(summaryElement);
                                resultsContainer.appendChild(newsElement);
                            }
                        } else {
                            resultsContainer.textContent = "No news found for the specified player.";
                        }
                    })
                    .catch(error => {
                        document.getElementById("results").textContent = "Error occurred while fetching data from the API.";
                    });
            });
        });