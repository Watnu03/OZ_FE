const container = document.querySelector('.container'); 
const number = document.getElementById('number');
const myNumber = document.getElementById('my-number');

const playBtn = document.getElementById('play-btn');
const resetBtn = document.getElementById('reset-btn');
let cnt = 0;

//play버튼 클릭시 실시간으로 범위 값이 업데이트된다
playBtn.addEventListener('click',function(){
  const num = Number(number.value);
  const myNum = Number(myNumber.value);

  clearLog();
  if(!number.value || !myNumber.value){
    alert('Number is empty');
  }//유저가 숫자를 입력한 후에 게임을 플레이할 수 있다
  else if(myNum < 0 || num < 0 || num < myNum){
    alert('Wrong Number');
  }//입력값에는 양의정수만 입력가능하다
  else{
    cnt ++;
    //0부터 사용자가 지정한 숫자까지의 범위에서 랜덤한 숫자
    const randNum = Math.floor(Math.random() * num);

    const gameCnt = document.createElement('p');
    gameCnt.classList.add('game');

    const gameLog = document.createElement('p');
    gameLog.classList.add('game');
    gameLog.textContent = `You chose: ${myNum}, the machine chose: ${randNum}.`;

    const gameResult = document.createElement('p');
    gameResult.classList.add('game');
    
    //유저에게 게임의 승패를 알려주는 문구도 뜨게 한다
    // game log
    if(myNum === randNum){
      gameCnt.textContent = `Counting remaining games: ${num-cnt}/${num}`;
      gameResult.textContent = 'Your winner...\t Please press "restart"';
      gameOver()
    }
    else if(cnt === num){
      gameCnt.textContent = `Counting remaining games: ${num-cnt}/${num}`;
      gameResult.textContent = 'Count is 0\t Your lost!!!!!';
      alert('Game over');
      gameOver()
    }

    else{
      gameCnt.textContent = `Counting remaining games: ${num-cnt}/${num}`;
      gameResult.textContent = 'Your lost!!!!!';
    }
    container.appendChild(gameCnt);
    container.appendChild(gameLog);
    container.appendChild(gameResult);
  }
})

// 초기화
function clearLog(){
  const game = document.querySelectorAll('.game');
  game.forEach(container => {
    container.remove();
    });
}

//reset 버튼 클릭시 새로고침
resetBtn.addEventListener('click', function(){
  alert('Game is restart!');
  location.reload();
})

//게임이 더이상 진행할수없을때 입력칸과 버튼 비활성화 시키기
function gameOver(){
  number.disabled = true;
  myNumber.disabled = true;
  playBtn.disabled = true;
  playBtn.style.backgroundColor = 'gray';
}