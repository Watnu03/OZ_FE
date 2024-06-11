//API 불러오기
const apiRandomImg = 'https://dog.ceo/api/breeds/image/random/50';
const apiBreedsList ='https://dog.ceo/api/breeds/list/all';
const request01 = new XMLHttpRequest();
const request02 = new XMLHttpRequest();

const container = document.getElementById('container');
const input = document.getElementById('filter-text');
const filterBtn = document.getElementById('filter-btn');
const selector = document.getElementById('filter-selector');
const main = document.getElementById('main');
const moreBtn = document.getElementById('more-btn');
const topBtn = document.getElementById('top-btn');
const resetBtn = document.getElementById('reset-btn');

//현재 화면에 표시되있는 dog를 넣을 배열
const currentDogs = [];

function displayDogs(item){
  const dogImgDiv = document.createElement('div');
  dogImgDiv.classList.add('flex-item');
  dogImgDiv.innerHTML = `
  <img src=${item}>
  `;
  main.appendChild(dogImgDiv);
}

//window page가 로드될때
window.addEventListener('load', function(){
  //강아지 사진 뿌리기
  request01.open('get', apiRandomImg)
  request01.addEventListener('load', function(){
    //객체의 응답을 parse해서 저장한다 
    const response = JSON.parse(request01.response);
    response.message.forEach(function(item) {
      //배열에 저장하기
      currentDogs.push(item)
      const dogImgDiv = document.createElement('div');
      dogImgDiv.classList.add('dog-list');
      dogImgDiv.innerHTML = `
        <img src=${item}>
      `;
      main.appendChild(dogImgDiv);
    });
  })
  request01.send();

  //Select 에 견종리스트 불러오기
  request02.open('get', apiBreedsList);
  request02.addEventListener('load', function(){
    const response = JSON.parse(request02.response);
    //객체의 key값만 모아서 배열로 만들어줌
    Object.keys(response.message).forEach(function(item){
      const option = document.createElement('option');
      option.textContent = item;
      option.value = item;
      selector.appendChild(option);
    });
  });
  request02.send();
});


//검색창에 입력후 필터링버튼
filterBtn.addEventListener('click', function(){
  if(input.value !== ''){
    main.innerHTML = '';
  
    let filteredDogs = currentDogs.filter(function(item){
      return item.indexOf(input.value) !== -1
    })
  
    filteredDogs.forEach(function(item){
      displayDogs(item);
      selector.value =``;
    });
    input.value = '';
  }
});

//Select 변경시
selector.addEventListener('change', function(){
  main.innerHTML = ''

  let selectDog = currentDogs.filter(function(item){
    return item.indexOf(selector.value) !== -1;
  })

  selectDog.forEach(function(item){
    displayDogs(item);
  })
  input.value = '';
})

//Reset 버튼 클릭 시
resetBtn.addEventListener('click', function(){
  // 첫번째 Reset : 새로 API 불러오기
  main.innerHTML = '';
  input.value = '';
  selector.value = '';

  request01.open('get',apiRandomImg);
  request01.addEventListener('send',function(){
    const response = JSON.parse(request01.response)
    response.message.forEach(function(item){
        currentDogs.push(item)
        displayDogs(item)
    })
  })
  request01.send()

  //두번째 Reset : 페이지 새로고침하기
  // location.reload();
})

//More 버튼 클릭시
moreBtn.addEventListener('click', function(){
  request01.open('get', apiRandomImg);
  request01.addEventListener('load', function(){
    const response = JSON.parse(request01.response)
    response.message.forEach(function(item){
        currentDogs.push(item)
        displayDogs(item)
    })
  })
  request01.send();
})

//Top 버튼 클릭시
topBtn.addEventListener('click', function(){
  //스크롤 시 
  window.scroll({
    top: 0,
    left: 0,
    behavior: 'smooth' //부드럽게 스크롤
  })
})
