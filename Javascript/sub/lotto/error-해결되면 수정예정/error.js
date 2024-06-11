const LOTTO_COLORS = ['#FBC400','#69C8F2','#FF7272','#AAAAAA','#B0D840', '#fd79a8', '#b2bec3'];

//메인 로또 번호
const checkContainer = document.getElementById('check-container');
const checkTitle = document.querySelector('#check-container .title'); 
const checkLotto = document.querySelector('#check-container .lotto'); 
const drawBtn = document.getElementById('draw-btn');
const resetBtn = document.getElementById('reset-btn');

//내 로또 번호
const myContainer = document.getElementById('my-container');
const myTitle = document.querySelector('#my-container .title');
const myLottoBtn = document.querySelector('#my-container .lotto-btn');
const getRandomBtn = document.getElementById('get-btn');

//로또 번호 배열
const mainLottoNumbers = [];
//내 로또 번호 배열
const myLottoNumbers = [];

const today = new Date();
// 오늘 날짜와 함께 메인 title 제목
const mainTitle = setInterval(function(){

  const tdYear = today.getFullYear();
  const tdMonth = today.getMonth() +1;
  const tdDate = today.getDate();

  checkTitle.textContent = `${tdYear}년 ${tdMonth}월 ${tdDate}일 로또 번호 추첨`;
},1000)

  // 범위 별 Lotto 공의 색상 변경
  function editLottoBall(number){
    const ball = document.createElement('span');
    ball.textContent = number;
    ball.classList.add('lotto-num');
    // 숫자 범위별 (10단위로) 공의 색상 변경
    const colorIndex = Math.floor(number / 10);
    ball.style.backgroundColor = LOTTO_COLORS[colorIndex];

    checkLotto.appendChild(ball);
  }

  // 추첨 버튼 클릭 시
  drawBtn.addEventListener('click', function(){
      /*for문을 사용 할 경우
        mainLottoNumbers[]에서 중복을 없애고 다시 할때 i의 카운트는 줄어들지 않으므로 따로 --i 를 해줘야한다
        버튼을 click할때마다 i가 초기화되므로 이미 배열안에 번호가 생성되있어도 무한으로 실행된다
      
        for(let i = 0; i < 6; i++){
        let rn = Math.floor(Math.random() * 45) +1;
        if(mainLottoNumbers.indexOf(rn) === -1){
          mainLottoNumbers.push(rn);
          editLottoBall(rn);
        }
        else{
          --i;
        }
      }*/
      //while문을 사용 할 경우
      while(mainLottoNumbers.length < 6){
        let rn = Math.floor(Math.random() * 45) +1;
        if(mainLottoNumbers.indexOf(rn) === -1){
          mainLottoNumbers.push(rn);
          editLottoBall(rn);
        }
      }
    }
  )

  // 다시 버튼 클릭 시
  resetBtn.addEventListener('click', function(){
    mainLottoNumbers.splice(0,6);
    checkLotto.innerHTML = '';
  })

  // 로또 번호 공간
  function myLottoTk(){
    const tk = document.createElement('div');
    tk.classList.add('lotto');
    tk.classList.add('my-lotto');
    myContainer.insertBefore(tk,myLottoBtn);
    return tk;
  }

  // 내 로또 공 색깔
  function showMyNumbers(number){
    const myLotto = document.querySelector('.my-lotto')
    const ball = document.createElement('span');
    ball.textContent = number;
    ball.classList.add('lotto-num');  

    const colorIndex = Math.floor(number / 10);
    ball.style.backgroundColor = LOTTO_COLORS[colorIndex];
    myLotto.appendChild(ball);
  }

  //랜덤으로 번호 얻기 버튼 클릭 시
  getRandomBtn.addEventListener('click', function(){
    if(mainLottoNumbers.length !== 0){
      for(let i = 0; i < 3; i++){
        myLottoNumbers.splice(0,6);
        myLottoTk(i);

        for(let i = 0; myLottoNumbers.length < 6; i++){
          let rn = Math.floor(Math.random() * 45) +1;

          if(myLottoNumbers.indexOf(rn) === -1){
            myLottoNumbers.push(rn);
            showMyNumbers(rn);
            }
          }
        }
      }
    else{
      alert('Lotto를 먼저 추첨해주세요!!');
    }
})