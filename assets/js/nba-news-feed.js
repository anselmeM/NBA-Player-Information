// Function to fetch NBA news from ESPN
async function fetchNbaNews() {
  try {
    const response = await fetch('https://www.espn.com/nba');
    const html = await response.text();

    // Create a DOM parser to extract data from the HTML
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');

    // Find the news articles on the page
    const articles = doc.querySelectorAll('.contentItem__content');

    // Iterate over the articles and extract relevant information
    const news = [];
    articles.forEach((article) => {
      const title = article.querySelector('.contentItem__title').textContent;
      const image = article.querySelector('.contentItem__image img').src;
      const link = article.querySelector('.contentItem__padding a').href;

      // Create an object with the extracted data
      const newsItem = {
        title,
        image,
        link,
      };

      // Add the news item to the array
      news.push(newsItem);
    });

    // Return the array of news items
    return news;
  } catch (error) {
    console.log('Error fetching NBA news:', error);
    return [];
  }
}

// Function to display NBA news with images
function displayNbaNews(news) {
  const newsContainer = document.getElementById('nba-news-container');

  // Iterate over the news items and create HTML elements for display
  news.forEach((item) => {
    const newsItem = document.createElement('div');
    newsItem.classList.add('news-item');

    const title = document.createElement('h3');
    title.textContent = item.title;
    newsItem.appendChild(title);

    const image = document.createElement('img');
    image.src = item.image;
    newsItem.appendChild(image);

    const link = document.createElement('a');
    link.href = item.link;
    link.textContent = 'Read More';
    newsItem.appendChild(link);

    newsContainer.appendChild(newsItem);
  });
}

// Call the fetchNbaNews function and display the news
fetchNbaNews()
  .then((news) => {
    displayNbaNews(news);
  })
  .catch((error) => {
    console.log('Error:', error);
  });
