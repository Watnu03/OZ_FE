const todoForm = document.getElementById('todo-form');
const todo = document.getElementById('todo');
const addBtn = document.querySelector('.add-btn');

const todoList = document.querySelector('.todo-list');

let todoArr = [];

//로컬스토리지에 저장
function saveTodos(){
  //배열에 객체가 저장되있으면 stringify 해줘야 저장이 된다
  const todoString = JSON.stringify(todoArr);
  localStorage.setItem('myTodos', todoString);
}

//로컬스토리지에서 가져오기
function loadTodos(){
  const myTodos = localStorage.getItem('myTodos');
  if(myTodos !== null){
    //가져온 item을 parse 해서 저장하기
    todoArr = JSON.parse(myTodos);
    displayTodo();
  }
}
loadTodos();

//할일 수정하기
function handleTodoItemClick(clickedId){
  todoArr = todoArr.map(function(aTodo){
    if(aTodo.todoId === clickedId){
      return {
        //기존의 aTodo내용에다가 todoDone을 반전시켜서 줘라(! False를 True를.True를 False로)
        ...aTodo, todoDone: !aTodo.todoDone
      }
    }
    else{
      return aTodo;
    }
  })
  displayTodo();
  saveTodos();
}

// 할일 삭제하기
function handleDeleteBtnClick(clickedId){
  //클릭된 ID에 해당되는 요소만 삭제
  //배열에서 내가 클릭한 하나만 빼고 나머지를 filtering 해서 남겨야한다
  todoArr = todoArr.filter(function(aTodo){
    console.log(`Todo: ${aTodo.todoId}`)
    console.log(`선택한 ID: ${clickedId}`)
    //클릭한 item이랑 달라야지 true
    return aTodo.todoId !== clickedId
  })
  console.log(todoArr);
  displayTodo();
  saveTodos();
}

//할 일 보이기
function displayTodo(){
  todoList.innerHTML = '';
  todoArr.forEach(function(aTodo){
    //Item 추가
    const todoItem = document.createElement('li');
    //aTodo.done 값에 따라 class 이름을 다르게 줌
    todoItem.classList.add(aTodo.todoDone);
    if(aTodo.todoDone){
      todoItem.classList.add('done');
    }
    else{
      todoItem.classList.add('yet');
    }
    todoItem.title = '클릭하면 완료됨';
    todoItem.textContent = aTodo.todoText;
    todoList.appendChild(todoItem);
    
    //추가버튼 클릭시
    todoItem.addEventListener('click',function(){
      handleTodoItemClick(aTodo.todoId);
    })
    
    //삭제버튼
    const deleteBtn = document.createElement('button');
    deleteBtn.classList.add('delete-btn');
    deleteBtn.title = '클릭하면 삭제됨';
    deleteBtn.textContent = '❌';
    todoItem.appendChild(deleteBtn);

    //삭제버튼 클릭시
    deleteBtn.addEventListener('click', function(){
      console.log('삭제버튼클릭함')
      handleDeleteBtnClick(aTodo.todoId);
    })
  })
}

//add 버튼 클릭 시
todoForm.addEventListener('submit', function(e){
  //새로고침 차단
  e.preventDefault();
  
  if(todo.value !== ''){
    //추가 될 할일 객체 리터럴
    const toBeAdded = {
      todoText: todoForm.todo.value,
      todoId: new Date().getTime(),
      todoDone: false
    }
    todoForm.todo.value = '';
    todoArr.push(toBeAdded);
    
    displayTodo();
    saveTodos();
  }
})


