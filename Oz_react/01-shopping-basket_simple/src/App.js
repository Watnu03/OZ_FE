import { useCallback, useState } from "react";
import "./App.css";
import ExpenseForm from "./components/ExpenseForm";
import ExpenseList from "./components/ExpenseList";
import Alert from "./components/Alert";

const App = () => {

  // item 객체배열
  const [expenses, setExpenses] = useState([
    {id: 1, charge: '제로콜라', amount: 2000},
    {id: 2, charge: '가래떡', amount: 15000},
  ])

  const [charge, setCharge] = useState('');
  const [amount, setAmount] = useState(0);
  const [id, setId] = useState('');

  // alert
  const [alert, setAlert] = useState({show: false});

  // 수정: 다른 UI제공을 위한 State제공
  const [edit, setEdit] = useState(false);
  

  const handleCharge = (e) => {
    setCharge(e.target.value);
  }

  //숫자값으로 받기
  const handleAmount = (e) => {
    setAmount(parseInt(e.target.value));
  }
  

  // 제출버튼 클릭
  const handleSubmit = (e) => {
    //새로고침 방지
    e.preventDefault();
    
    if(charge !== '' && amount > 0){
      if (edit) {
        // 수정: map을 이용해서 id로 바꿀려는 item을 수정/id가 다르면 그대로 값 넣어준다
        const newExpenses = expenses.map(item => {
          return item.id === id ? {...item, charge, amount } : item; //? {...}문법은 값을 그대로 복사인가?
        });
        setExpenses(newExpenses);
        setEdit(false);
        handleAlert({ type: 'success', text: '아이템이 수정되었습니다.'});
      }
      else{
        //새로운 지출을 객체로 만들기
        const newExpense = {id:crypto.randomUUID(), charge, amount};
        //원래 배열은 건들이지 않으면서 새로운값을 복사해서 넣기
        const newExpenses = [...expenses, newExpense];
        //state 업데이트
        setExpenses(newExpenses);
        
        handleAlert({ type: 'success', text: '아이템이 생성되었습니다.'});
      }
      //제출버튼을 누르면 입력창 초기화
      setCharge('');
      setAmount(0);
    }
    else{
      console.log('error');
      handleAlert({ type: 'danger', text: 'Charge는 빈 값일 수 없으며 Amount값은 0보다 커야합니다.'});
    }
  }
  
  //item 삭제버튼 클릭
  //최적화함수 useCallback 추가
  const handleDelete = useCallback((id) => {
    const newExpense = expenses.filter(expense => expense.id !== id)
    
    setExpenses(newExpense);

    handleAlert({ type: 'danger', text: '아이템이 삭제되었습니다.'});
  }, [expenses]);



  // 모든상품 제거버튼 클릭
  const clearItem = () => {
    //item 배열 비워주기
    setExpenses([]);
  };

  // 수정버튼 클릭 => 해당 지출항목의 charge,amount,id 가져오기
  const handleEdit = (id) => {
    //전체 배열메소드에서 find로 찾기 => 같은id 찾기
    const expense = expenses.find(item => item.id === id);
    // 구조분해 할당으로 charge 와 amount 가져오기
    const { charge, amount } = expense;
    setCharge(charge);
    setAmount(amount);
    setEdit(true);
    setId(id);
  }

  // Alert
  const handleAlert = ({ type, text}) => {
    setAlert({show: true, type, text});
    setTimeout(() => {
      setAlert({show: false});
    }, 7000)
  }


  return(
    <main className="main-container">
      {/* 삼항연산자 사용 */}
      {alert.show ? <Alert type={alert.type} text={alert.text} /> : null}
      <div className='sub-container'>
        <h1>장바구니</h1>
        <div style={{width: '100%', backgroundColor: 'white', padding:'1rem'}}>
          <ExpenseForm handleSubmit={handleSubmit} charge={charge} handleCharge={handleCharge} amount={amount} handleAmount={handleAmount} edit={edit}/>
        </div>
        <div style={{width:'100%', backgroundColor: 'white', padding: '1rem'}}>
          <ExpenseList handleEdit={handleEdit} initialExpenses={expenses} handleDelete={handleDelete} clearItem={clearItem}/>
        </div>
        <div style={{display: 'flex', justifyContent: 'start', marginTop: '1rem'}}>
          <p style={{fontSize: '2rem'}}>
            총합계:
            <span>
              {expenses.reduce((acc, curr) => {
                // 어느 부분에서 amount 값이 문자열로 계산됨 => parseInt 로 숫자타입으로 변환
                //? 어디서 amount가 문자열로 받아지는거지?
                return (acc += parseInt(curr.amount));
              },0)}원
            </span>
          </p>
        </div>
      </div>
    </main>
  )
}

export default App;

