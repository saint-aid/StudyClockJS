const form = document.querySelector(".js-form"),
    input = form.querySelector("input"),
    greeting = document.querySelector(".js-greeting");
const USER_LS = "currentUser",
    SHOWING_CN = "showing";

function saveName(text){
    localStorage.setItem(USER_LS,text);//로컬에 저장
}

function handleSubmit(event){
    event.preventDefault(); //
    const currentValue = input.value;
    paintGreeting(currentValue);
    saveName(currentValue);
}

function askForName(){ 
    form.classList.add(SHOWING_CN);
    form.addEventListener("submit",handleSubmit);
}    

function paintGreeting(text){
    form.classList.remove(SHOWING_CN);
    greeting.classList.add(SHOWING_CN);
    greeting.innerText = `Hello ${text}`; //저장된 이름 설정
}

function loadName(){
    const currentUser = localStorage.getItem(USER_LS); //스토리지에 저장된 이름 찾음
    if(currentUser === null){ //저장된 이름 없으면
        askForName(); //이름 물어봄
    }else{//저장된 이름 있으면 
        paintGreeting(currentUser); 
    }
}

function init(){ //처음 
    loadName(); // 이름 불러옴
}
init();