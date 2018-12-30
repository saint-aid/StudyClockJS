const body = document.querySelector("body");
const IMG_NUMBER =5;

function paintImage(imgNumber){
    const image = new Image();
    image.src = `images/${imgNumber + 1}.jpg`; //배경화면 이름 경로 설정
    image.classList.add("bgImg"); //클래스 이름을 설정
    body.prepend(image);
}

function getRandom(){
    const number = Math.floor(Math.random() * IMG_NUMBER); //배경화면 숫자 이름 생성
    return number; //숫자 반환
}

function init(){
    const randomNumber = getRandom(); //배경화면 숫자 불러옴
    paintImage(randomNumber); //배경화면 설정
}
init();