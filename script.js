const API_KEY = `1125cb34731a40b69604262079905fec`;
const getLatestNews = async () => {
    const url = new URL(
        `https://newsapi.org/v2/top-headlines?country=us&pageSize=2&apiKey=${API_KEY}`
    );
    const response = await fetch(url);
    const data = await response.json();
    let news = data.articles;
    console.log("news:",news);
};

getLatestNews();