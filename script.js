let newsList = [];
const menus = document.querySelectorAll(".menus button")
menus.forEach((menu) =>
  menu.addEventListener("click", (event) => getNewsByCategory(event)));

const getLatestNews = async () => {
  const url = new URL(
    `https://pooh-news.netlify.app/top-headlines?country=kr`
  );
  const response = await fetch(url);
  const data = await response.json();
  newsList = data.articles;
  render();
  console.log("news:", newsList);
};

const getNewsByCategory = async (event) => {
  const category = event.target.textContent.toLowerCase();
  console.log("category:",category)
  const url = new URL(`https://pooh-news.netlify.app/top-headlines?country=kr&category=${category}`)
  const response = await fetch(url)
  const data = await response.json()
  console.log("DDD :", data)
  newsList = data.articles;
  render();
}

getLatestNews();

const render = () => {
  const newsHTML = newsList.map(news => `<article class="row news">
    <picture class="col-lg-4">
      <img
        class="news-image-size"
        src=${news.urlToImage}
      />
    </picture>
    <div class="col-lg-8">
      <h2>${news.title}</h2>
      <p>${news.description}</p>
      <div>${news.source.name} * ${news.publishedAt}</div>
    </div>
  </article>`).join('');



  document.getElementById("news-board").innerHTML = newsHTML;
}















function openSearch() {
  // 인풋창과 버튼 요소를 변수에 할당
  let searchInput = document.querySelector('.search-input');
  let searchButton = document.getElementById('button-addon2');

  // 인풋창의 현재 display 상태를 확인하고 토글
  if (searchInput.style.display === 'block') {
    searchInput.style.display = 'none';
    searchButton.style.display = 'none';
  } else {
    searchInput.style.display = 'block';
    searchButton.style.display = 'block';
  }
}
