let timer = setInterval(function(){
  const now = document.querySelector('#now-time');
  const xmas = document.querySelector('#xmas-time');
  
  let nowTime = new Date();
  let xmasTime = new Date(`${nowTime.getFullYear()}-12-25`);
  //크리스마스 년도만 올해로 가져오기
  
  //Math.floor=소수 부분을 버림하고 정수부분만 나오게 함
  let diff = xmasTime - nowTime;
  
  //숫자 계산부분은 별칭으로 따로 빼두기
  const D_DAY = Math.floor(diff / (1000 * 60 * 60 * 24));
  const D_DAY_HOUR = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const D_DAY_MIN = Math.floor((diff / (1000 * 60)) % 60);
  const D_DAY_SEC = Math.floor((diff / 1000) % 60);

  //올해 크리스마스가 지날경우 내년 크리스마스로 카운트다운 넘어가기
  if(xmasTime-nowTime < 0){
    xmasTime.getFullYear() += 1;
    if(xmasTime.getFullYear() == nowTime.getFullYear()){
      xmasTime.getFullYear() = nowTime.getFullYear();
    }
  }
  
  //현재 날짜,시간
  let nowMonth = nowTime.getMonth()+1;
  let nowDate = nowTime.getDate();

  let nowHour = nowTime.getHours();
  let nowMin = nowTime.getMinutes();
  let nowSec = nowTime.getSeconds();
  
  now.textContent = `${nowTime.getFullYear()}-${nowMonth < 10 ? `0${nowMonth}` : nowMonth}-${nowDate < 10 ? `0${nowDate}` : nowDate}
  ${nowHour < 10 ? `0${nowHour}` : nowHour}h ${nowMin < 10 ? `0${nowMin}` : nowMin}m ${nowSec < 10 ? `0${nowSec}` : nowSec}s`;
  
  //올해 크리스마스 날짜,시간
  xmas.textContent = `${xmasTime.getFullYear()}-${xmasTime.getMonth()+1}-${xmasTime.getDate()}`;
  
  //크리스마스까지 D-day,시간
  const dayCnt = document.querySelector('#day-cnt');
  
  let dDay = D_DAY;
  let dHour = D_DAY_HOUR; //시간부분은 24시간기준으로 왜하나? => d-day라 24시간으로 표현해야지
  let dMin = D_DAY_MIN; 
  let dSec = D_DAY_SEC;
  
  //백틱은 실제 줄바꿈을 통해 줄바꿈을 인식시킬수 있다 => textContent안이라 줄바꿈 인식이 안되나?
  dayCnt.textContent = `D-
  ${dDay} / 
  ${dHour < 10 ? `0${dHour}` : dHour}h
  ${dMin < 10 ? `0${dMin}` : dMin}m
  ${dSec < 10 ? `0${dSec}` : dSec}s`;
    //if문 보다 삼항연산자가 pc에 부하가 더 걸린다고 하는데 if문으로 먼저 걸러내는게 나은가? 아니면 이대로 사용해서 가독성이 좋게 하는게 좋은가?
    pads
  }, 1000) // 1초마다 함수가 실행되도록 설정
//왜 1초마다 실행하지 않는가 => 맨위의 new Date()를 함수 밖에서 가져와서 계속 실행이 안됬던것

//css -> white space 속성을 free로 지정해두지 않으면 공백이 space bar 하나로 인식됨
// innerHTML로 해보기

//12월 25일을 지나고 난뒤의 조건추가
/*크리스마스 년도만 현재 년도 받아오기
let xmasTime = new Date(`${nowTime.getFullYear()}-12-25`); 
let xmasTime = new Date(${nowTime.getFullYear()},12,25);
이런식으로 변수 넣어보기*/

