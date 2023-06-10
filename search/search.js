(() => {
  // input 요소 클릭 이벤트 
let input = document.querySelector('.form-control');

// 클릭 시 주황색 실선 표시
input.addEventListener('click', function() {
  this.style.borderBottom = '3px solid orange';
});
// 클릭해제 시 실선 제거
input.addEventListener('blur', function() {
  this.style.borderBottom = 'none';
}); 




const submit = document.querySelector('#inputForm');
submit.addEventListener('submit', async (e) => {
  e.preventDefault();
  
  const search_word = input.value;

  async function requestSearch() {
    const response = await fetch(`http://localhost:8080/api/restaurants`,
    {
      method: 'GET',
    });
    const data = await response.json();

    const search_complete = filterArrayByWord(data, search_word);

    return search_complete;
  }
  const searchResults = await requestSearch();
  
  fetch("/search/search.html")
  .then((response) => response.text())
  .then((html) => {
    

    // document.documentElement.innerHTML = "";
    while (document.documentElement.firstChild) {
      document.documentElement.removeChild(document.documentElement.firstChild);
    }

    const search_html = document.querySelector('html');
    const head = document.createElement('head');
    const body = document.createElement('body');
    search_html.appendChild(head);
    search_html.appendChild(body);


    const range = document.createRange();
    const parsedHTML = range.createContextualFragment(html);
    document.body.appendChild(parsedHTML);

    
    const mainStyle = document.createElement("link");
    mainStyle.rel = "stylesheet";
    mainStyle.href = "/search/search.css";
    document.head.appendChild(mainStyle);

    // main.html과 관련된 JavaScript 파일 추가
    const mainScript = document.createElement("script");
    mainScript.src = "/search/search.js";
    document.body.appendChild(mainScript);

    
    if (searchResults === false) {
        const ol = document.querySelector('.searchInfo-space');
        ol.style.cssText = 'height: 500px; justify-content: center; flex-direction: column; align-items: center;';
        // justify-content: center;
        const text = document.createElement('h1');
        text.textContent = `${search_word}를(을) 찾을 수 없습니다.`
        ol.appendChild(text);
        const home_button = document.createElement('button');
        home_button.textContent = '홈으로';
        home_button.classList.add('btn', 'btn-warning');
        ol.appendChild(home_button);
    }

    // 검색결과의 length만큼 요소 생성
    for (let i = 0; i <= searchResults.length; i++ ) {
      information = searchResults[i];
      
      const ol = document.querySelector('.searchInfo-space');
      
      const li = document.createElement('li');
      li.classList.add('searchInfo-infoContainer');
      
      const a = document.createElement('a');
      a.href = '#';
      
      const infoHead = document.createElement('div');
      infoHead.classList.add('info-header');
      
      const img = document.createElement('img');
      img.src = information.image;
      img.alt = '';
      

      const info = document.createElement('div');
      info.classList.add('info');
      
      const infoTitleContainer = document.createElement('div');
      infoTitleContainer.classList.add('info-title-container');
      
      const h1 = document.createElement('h1');
      h1.classList.add('info-title');
      h1.textContent = information.title;
      
      const infoTagContainer = document.createElement('div');
      infoTagContainer.classList.add('info-tag-container');
      
      const infoTag = document.createElement('p');
      infoTag.textContent = information.menu_type;
      
      const rate = document.createElement('div');
      rate.classList.add('rate');
      
      const score = document.createElement('p');
      score.classList.add('score');
      score.textContent = '0점';
      
      const span1 = document.createElement('span');
      span1.textContent = '|';
      
      const faStar = document.createElement('p');
      faStar.classList.add('fa', 'fa-star', 'checked');
      
      const userScore = document.createElement('p');
      userScore.classList.add('user-score');
      userScore.textContent = information.total_points;
      
      const span2 = document.createElement('span');
      span2.textContent = '|';
      
      const comment = document.createElement('p');
      comment.classList.add('comment');
      comment.textContent = `${information.total_votes}명`;
      
      const reviewContainer = document.createElement('div');
      reviewContainer.classList.add('review-container');
      
      const reviewSpan = document.createElement('span');
      reviewSpan.classList.add('review');
      reviewSpan.textContent = '정말 맛있어요 ~ 정말 맛있어요 ~ 정말 맛있어요 ~ 정말 맛있어요 ~ 정말 맛있어요 ~ ...';
      
      const locationContainer = document.createElement('div');
      locationContainer.classList.add('location-container');
      
      const location = document.createElement('p');
      location.classList.add('location');
      location.textContent = information.address;
      
  
      ol.appendChild(li);
      li.appendChild(a);
      a.appendChild(infoHead);
      infoHead.appendChild(img);
      infoHead.appendChild(info);
      info.appendChild(infoTitleContainer);
      infoTitleContainer.appendChild(h1);
      info.appendChild(infoTagContainer);
      infoTagContainer.appendChild(infoTag);
      info.appendChild(rate);
      rate.appendChild(score);
      rate.appendChild(span1); 
      rate.appendChild(faStar);
      rate.appendChild(userScore);
      rate.appendChild(span2);
      rate.appendChild(comment);
      info.appendChild(reviewContainer);
      reviewContainer.appendChild(reviewSpan);
      a.appendChild(locationContainer);
      locationContainer.appendChild(location);
      
    }
    

  })

  
  
})



function filterArrayByWord(originalArray, word) {
  const filteredArray = [];
  
  for (let i = 0; i < originalArray.length; i++) {
    const item = originalArray[i];
    // includes로 null값을 찾으려할때 오류가 발생하기때문에
    // null값을 처리하는 조건문도 작성
  
    if ((item.title && item.title.includes(word)) || (item.menu_type && item.menu_type.includes(word))) {
      filteredArray.push(item);
    }
  }
  if (filteredArray.length === 0) {
    return false;
  }
  return filteredArray;
}

})();


// // input 요소 클릭 이벤트 
// let input = document.querySelector('.form-control');

// // 클릭 시 주황색 실선 표시
// input.addEventListener('click', function() {
//   this.style.borderBottom = '3px solid orange';
// });
// // 클릭해제 시 실선 제거
// input.addEventListener('blur', function() {
//   this.style.borderBottom = 'none';
// }); 



// const submit = document.querySelector('#inputForm');
// submit.addEventListener('submit', async (e) => {
//   e.preventDefault();
//   console.log('a');
  
//   const search_word = input.value;

//   async function requestSearch() {
//     const response = await fetch(`http://localhost:8080/api/restaurants`,
//     {
//       method: 'GET',
//     });
//     const data = await response.json();

//     const search_complete = filterArrayByWord(data, search_word);
    
//     return search_complete;
//   }
//   const searchResults = await requestSearch();
  
//   fetch("/search/search.html")
//   .then((response) => response.text())
//   .then((html) => {
    

//     // login.html 내용 제거 및 main.html 내용 추가
//     // document.documentElement.innerHTML = "";
//     while (document.documentElement.firstChild) {
//       document.documentElement.removeChild(document.documentElement.firstChild);
//     }

//     const search_html = document.querySelector('html');
//     const head = document.createElement('head');
//     const body = document.createElement('body');
//     search_html.appendChild(head);
//     search_html.appendChild(body);

//     const range = document.createRange();
//     const parsedHTML = range.createContextualFragment(html);
//     document.body.appendChild(parsedHTML);

    
//     const mainStyle = document.createElement("link");
//     mainStyle.rel = "stylesheet";
//     mainStyle.href = "/search/search.css";
//     document.head.appendChild(mainStyle);

//     // main.html과 관련된 JavaScript 파일 추가
//     const mainScript = document.createElement("script");
//     mainScript.src = "/search/search.js";

//     if (searchResults === false) {
//       const ol = document.querySelector('.searchInfo-space');
//       ol.style.cssText = 'height: 500px; justify-content: center; flex-direction: column; align-items: center;';
//       // justify-content: center;
//       const text = document.createElement('h1');
//       text.textContent = `${search_word}를(을) 찾을 수 없습니다.`
//       ol.appendChild(text);
//       const home_button = document.createElement('button');
//       home_button.textContent = '홈으로';
//       home_button.classList.add('btn', 'btn-warning');
//       ol.appendChild(home_button);
//   } 
    
//     // 검색결과의 length만큼 요소 생성
//     for (let i = 0; i <= searchResults.length; i++ ) {
//       information = searchResults[i];

//       const ol = document.querySelector('.searchInfo-space');
      
//       const li = document.createElement('li');
//       li.classList.add('searchInfo-infoContainer');
      
//       const a = document.createElement('a');
//       a.href = '#';
      
//       const infoHead = document.createElement('div');
//       infoHead.classList.add('info-header');
      
//       const img = document.createElement('img');
//       img.src = information.image;
//       img.alt = '';
      

//       const info = document.createElement('div');
//       info.classList.add('info');
      
//       const infoTitleContainer = document.createElement('div');
//       infoTitleContainer.classList.add('info-title-container');
      
//       const h1 = document.createElement('h1');
//       h1.classList.add('info-title');
//       h1.textContent = information.title;
      
//       const infoTagContainer = document.createElement('div');
//       infoTagContainer.classList.add('info-tag-container');
      
//       const infoTag = document.createElement('p');
//       infoTag.textContent = information.menu_type;
      
//       const rate = document.createElement('div');
//       rate.classList.add('rate');
      
//       const score = document.createElement('p');
//       score.classList.add('score');
//       score.textContent = '0점';
      
//       const span1 = document.createElement('span');
//       span1.textContent = '|';
      
//       const faStar = document.createElement('p');
//       faStar.classList.add('fa', 'fa-star', 'checked');
      
//       const userScore = document.createElement('p');
//       userScore.classList.add('user-score');
//       userScore.textContent = information.total_points;
      
//       const span2 = document.createElement('span');
//       span2.textContent = '|';
      
//       const comment = document.createElement('p');
//       comment.classList.add('comment');
//       comment.textContent = `${information.total_votes}명`;
      
//       const reviewContainer = document.createElement('div');
//       reviewContainer.classList.add('review-container');
      
//       const reviewSpan = document.createElement('span');
//       reviewSpan.classList.add('review');
//       reviewSpan.textContent = '정말 맛있어요 ~ 정말 맛있어요 ~ 정말 맛있어요 ~ 정말 맛있어요 ~ 정말 맛있어요 ~ ...';
      
//       const locationContainer = document.createElement('div');
//       locationContainer.classList.add('location-container');
      
//       const location = document.createElement('p');
//       location.classList.add('location');
//       location.textContent = information.address;
      
  
//       ol.appendChild(li);
//       li.appendChild(a);
//       a.appendChild(infoHead);
//       infoHead.appendChild(img);
//       infoHead.appendChild(info);
//       info.appendChild(infoTitleContainer);
//       infoTitleContainer.appendChild(h1);
//       info.appendChild(infoTagContainer);
//       infoTagContainer.appendChild(infoTag);
//       info.appendChild(rate);
//       rate.appendChild(score);
//       rate.appendChild(span1); 
//       rate.appendChild(faStar);
//       rate.appendChild(userScore);
//       rate.appendChild(span2);
//       rate.appendChild(comment);
//       info.appendChild(reviewContainer);
//       reviewContainer.appendChild(reviewSpan);
//       a.appendChild(locationContainer);
//       locationContainer.appendChild(location);
      
//     }
    

//   })

  
  
// })

// function filterArrayByWord(originalArray, word) {
//   const filteredArray = [];
  
//   for (let i = 0; i < originalArray.length; i++) {
//     const item = originalArray[i];
//     // includes로 null값을 찾으려할때 오류가 발생하기때문에
//     // null값을 처리하는 조건문도 작성
//     if (!(item.title && item.title.includes(word)) || !(item.menu_type && item.menu_type.includes(word))) {
//         return false
//     }
//     if ((item.title && item.title.includes(word)) || (item.menu_type && item.menu_type.includes(word))) {
//       filteredArray.push(item);
//     }
//   }
//   return filteredArray;
// }