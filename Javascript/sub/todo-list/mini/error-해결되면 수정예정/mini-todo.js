const todoForm = document.getElementById('todo-form');
const todo = document.getElementById('todo');
const addBtn = document.querySelector('.add-btn');

const main = document.querySelector('.main');
const bubble = document.querySelector('.todo-list');

const text = document.querySelector('.text');
const tail = document.querySelector('.tail');

let todoArr = [];

//할 일 추가하기
function addTodoList(container,todoText){
  const deleteBtn = document.createElement('button');
  deleteBtn.classList.add('delete-btn');
  deleteBtn.title = '클릭하면 삭제됨';
  deleteBtn.textContent = '❌';

  const text = document.createElement('div');
  text.classList.add('text');
  text.textContent = todoText;

  const tail = document.createElement('div');
  tail.classList.add('tail');

  container.appendChild(deleteBtn);
  container.appendChild(text);
  container.appendChild(tail);
}

//할 일 보이기
function displayTodo(){
  main.innerHTML = '';
  todoArr.forEach(function(aTodo){
    const bubble = document.createElement('li');
    bubble.classList.add('todo-list');
    let todoText = aTodo.todoText;
    main.appendChild(bubble);

    addTodoList(bubble,todoText);

    if(aTodo.todoDone){
      bubble.classList.add('done');
    }
    else{
      bubble.classList.add('yet');
    }
    
    bubble.addEventListener('click',function(){
      handleTodoItemClick(aTodo.todoId);
    })

    const deleteBtn = document.querySelector('.delete-btn');
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
    
    todoArr.push(toBeAdded);
    
    displayTodo()
    
    todoForm.todo.value = '';
  }
  
})

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
}

// 할일 삭제하기
function handleDeleteBtnClick(clickedId){
  //클릭된 ID에 해당되는 요소만 삭제
  //배열에서 내가 클릭한 하나만배고 나머지를 filtering 해서 남겨야 해야한다
  todoArr = todoArr.filter(function(aTodo){
    console.log(`Todo: ${aTodo.todoId}`)
    console.log(`선택한 ID: ${clickedId}`)
    //클릭한 item이랑 달라야지 true
    return aTodo.todoId !== clickedId
  })
  console.log(todoArr);
  displayTodo();
}
