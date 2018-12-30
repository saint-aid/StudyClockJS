const toDoForm = document.querySelector(".js-toDoForm"),
    toDoInput = toDoForm.querySelector("input"),
    toDoList = document.querySelector(".js-toDoList");

const TODOS_LS ="toDos";
let toDos = [];
//할일삭제
function deleteToDo(event){
    const btn = event.target;  // 이벤트가 발생한 지점 찾기
    const li = btn.parentNode; // 이벤트가 발생한 지점의 부모 찾기
    toDoList.removeChild(li); //화면상에서 li 제거 
    const cleanToDos = toDos.filter(function(toDo){ //리턴값이 true 인 값으로 Array를 만듦
        return toDo.id !== parseInt(li.id); //스트링으로 넘어오기 때문에 숫자로 바꿈 
    });
    toDos = cleanToDos; //기존 할일 리스트에 대체
    saveToDos(); // 저장 
}

//로컬스토리지에 저장
function saveToDos(){
    // 자바스크립트는 로컬스토리지에 object로 저장하려고 함
    //그래서 String으로 바꿔주는 JSON.stringify를 씀
    localStorage.setItem(TODOS_LS,JSON.stringify(toDos)); 
}
//가시적 리스트 생성 및 저장
function painToDos(text){ 
    const li = document.createElement("li");  //li 항목 만듦
    const delBtn = document.createElement("button"); //delete 버튼 만듦
    const span = document.createElement("span"); // span 값 생성 
    const newId = toDos.length + 1; //리스트는 0부터 시작하기 때문에 +1을 해줌으로 맞춰줌
    delBtn.innerText = "X"; // 삭제버튼 생성
    delBtn.addEventListener("click",deleteToDo);
    span.innerText = text; //입력된 값을 span에 저장
    li.appendChild(span); // 자식요소 추가 
    li.appendChild(delBtn);
    li.id = newId; //리스트 항목에 ID 값을 부여
    toDoList.appendChild(li);
    const toDoObj = { //할일 리스트에 키값 오브젝트화
        text:text,
        id:newId
    };
    
    toDos.push(toDoObj); // 리스트에 저장 
    saveToDos(); // 로컬스토리지에 저장
}
//입력하고 엔터시 핸들러 
function handleSubmit(event){
    event.preventDefault(); // 새로고침 막음
    const currentValue =toDoInput.value; //입력된 값 가져옴
    painToDos(currentValue); // 함수에 파라미터 시킴
    toDoInput.value= "";  //입력칸 초기화
}
//저장된 값이 있을 경우 핸들러 
function loadToDos(){
     const loadToDos = localStorage.getItem(TODOS_LS); //스토리지에서 할일목록 가져옴
     if(loadToDos !== null){ // 빈값이 아닐경우 
        const parsedToDos = JSON.parse(loadToDos); //스트링값을 다시 오브젝트로 꺼냄
        parsedToDos.forEach(function somethig(toDo) { //할일을 반복으로 꺼냄
            painToDos(toDo.text); // 항목을 가시적으로 실행 
        });
     }
}

function init(){ //처음
    loadToDos(); //할일 로드 
    toDoForm.addEventListener("submit",handleSubmit); //엔터눌렀을 시 할일 핸들러 
}

init();