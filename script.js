let newsList = [];
const menus = document.querySelectorAll(".menus button")
menus.forEach((menu) =>
  menu.addEventListener("click", (event) => getNewsByCategory(event)));

let url = new URL(`https://pooh-news.netlify.app/top-headlines?country=kr`);

let totalResults = 0
let page = 1
const pageSize = 10
const groupSize = 5

const getNews = async () => {

  try {
    url.searchParams.set("page",page);
    url.searchParams.set("pageSize",pageSize);

    const response = await fetch(url)

    const data = await response.json()
    console.log("data:",data)
    if (response.status === 200) {
      if (data.articles.length === 0) {
        throw new Error("검색 결과가 없습니다.");
      }
      newsList = data.articles;
      totalResults = data.totalResults;
      render();
      paginationRender();
    } else {
      throw new Error(data.message)
    }
  } catch (error) {
    errorRender(error.message)
  }
}

const getLatestNews = async () => {
  url = new URL(`https://pooh-news.netlify.app/top-headlines?country=kr`);
  getNews();
};
getLatestNews();

const getNewsByCategory = async (event) => {
  const category = event.target.textContent.toLowerCase();
  url = new URL(`https://pooh-news.netlify.app/top-headlines?country=kr&category=${category}`)
  getNews();
}

const getNewsByKeyword = async (event) => {
  const keyword = document.getElementById("search-input").value;
  url = new URL(`https://pooh-news.netlify.app/top-headlines?country=kr&q=${keyword}`)
  getNews();
}

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

const errorRender = (errorMessage) => {
  const errorHTML = `<div class="alert alert-danger" role="alert">
  ${errorMessage}
  </div>`

  document.getElementById("news-board").innerHTML = errorHTML;
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

const paginationRender = () => {
  //totalResult
  //page
  //pageSize
  //groupSize
  //totalPages
  const totalPages = Math.ceil(totalResults / pageSize)
  //pageGroup 몇 번째 페이지 그룹에 속해있는지?
  const pageGroup = Math.ceil(page / groupSize) 
  //lastPage 그 그룹의 마지막 페이지 번호
  let lastPage = pageGroup * groupSize
  if(lastPage>totalPages){
    lastPage = totalPages
  }
  //firstPage 그 그룹의 첫번째 페이지 번호
  const firstPage = lastPage - (groupSize - 1) <= 0 ? 1 : lastPage - (groupSize - 1);

  let paginationHTML = ``

  for(let i=firstPage;i<=lastPage;i++){
    paginationHTML+=`<li class="page-item ${i === page?"active":""}" onclick="moveToPage(${i})"><a class="page-link" >${i}</a></li>`
  }

  document.querySelector(".pagination").innerHTML=paginationHTML
}

const moveToPage = (pageNum) =>{
  console.log("moveToPage",pageNum)
  page = pageNum
  getNews();
}