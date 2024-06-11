const form = document.querySelector('.form-input');
const container = document.querySelector('.container');

const HIDDEN_CLASSNAME = 'hidden'; //자주쓰는 className String으로 저장해둠

let greeting = document.createElement('h1');
greeting.classList.add(HIDDEN_CLASSNAME); 
greeting.style.textAlign='center';

//핸드폰 인증버튼 구현X 안내 alert
const telVerification = document.querySelector('.tel-verification'); 
telVerification.addEventListener('click',function(){
  alert('아직 구현되지 않은 버튼입니다.')
})

form.addEventListener('submit', function(e){
  e.preventDefault(); //새로고침 방지

  let userName = e.target.name.value;
  let userEmail = e.target.email.value;
  let userBirth = e.target.birth.value;
  let userGender = e.target.gender.value;
  let userPhone = e.target.phone.value;
  let userPassword = e.target.password.value;

  form.classList.add(HIDDEN_CLASSNAME);

  greeting.innerText = `${userName}님\n 환영합니다!`;
  container.appendChild(greeting);
  greeting.classList.remove(HIDDEN_CLASSNAME);
  console.log(greeting);
})

