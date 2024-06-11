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
    mainLottoNumbers.splice(0,mainLottoNumbers.length);
    checkLotto.innerHTML = '';

    // 내 로또 번호 배열 초기화
    myLottoNumbers.splice(0, myLottoNumbers.length);

    // 내 로또 공간 초기화
    clearMyLottoContainers();
  })

  // 내 로또 공간 초기화 함수
  function clearMyLottoContainers() {
  // my-lotto 클래스를 가진 모든 요소를 찾아서 제거
  const myLottoContainers = document.querySelectorAll('.my-lotto');
  myLottoContainers.forEach(container => {
    container.remove();
    });
  }

  // 로또 번호 공간 생성 함수
  function myLottoTk() {
    // 3개의 div 요소 생성
    for (let j = 0; j < 3; j++) {
      const tk = document.createElement('div');
      tk.classList.add('lotto');
      tk.classList.add('my-lotto');
      myContainer.insertBefore(tk, myLottoBtn);

      // 각 div에 6개의 로또 번호 span 추가
      for (let i = 0; i < 6; i++) {
        let rn;
        // 중복되지 않는 랜덤 번호 추출
        do {
          rn = Math.floor(Math.random() * 45) + 1;
        } while (myLottoNumbers.includes(rn));

        // 추출된 번호를 내 로또 번호 배열에 추가
        myLottoNumbers.push(rn);

        // 각 div에 로또 번호 span 추가
        showMyNumbers(tk, rn);
      }
    }
  }

  // 내 로또 번호 span 추가 함수
  function showMyNumbers(container, number) {
    const ball = document.createElement('span');
    ball.textContent = number;
    ball.classList.add('lotto-num');

    // mainLottoNumbers와 myLottoNumbers 배열에서 같은 숫자 확인
    const isInMainLotto = mainLottoNumbers.includes(number);
    const isInMyLotto = myLottoNumbers.includes(number);

    // 공 색상 변경
    const colorIndex = Math.floor(number / 10);
    ball.style.backgroundColor = LOTTO_COLORS[colorIndex];

    // 같은 숫자가 존재할 경우 배경색을 LOTTO_COLORS[5]로 설정
    if (isInMainLotto && isInMyLotto) {
      ball.style.backgroundColor = LOTTO_COLORS[5]; // 중복 번호의 색상
    }
    else {
      // 다른 숫자의 경우
      ball.style.backgroundColor = LOTTO_COLORS[6]; // 다른 번호의 색상
    }

    container.appendChild(ball); // 생성된 div에 로또 번호 span 추가
  }

  // 랜덤으로 번호 얻기 버튼 클릭 시
  getRandomBtn.addEventListener('click', function(){
    if (mainLottoNumbers.length !== 0) {
      // 내 로또 번호 배열 초기화
      myLottoNumbers.splice(0, myLottoNumbers.length);

      // 내 로또 공간 초기화
      clearMyLottoContainers();

      // 내 로또 공간 생성 및 번호 표시
      myLottoTk();
    } else {
      alert('로또를 먼저 추첨해주세요!!');
    }
  });