const weather = document.querySelector(".js-weather");

const API_KEY = '2f1464dbab4f0bc38796d32797bbae57'; //openWeatherMap 사이트에서 얻음(회원가입 필요)
const COORDS ='coords';

function getWeather(lat,lng){
    fetch( //api 가져오는 방법
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}&units=metric`
        ).then(function(response){
            return response.json();
        }).then(function(json){
            const temperature = json.main.temp;
            const place = json.name;
            weather.innerText = `${temperature} ${place}`
        });
}

function saveCoords(coordsObj){
    localStorage.setItem(COORDS,JSON.stringify(coordsObj)); //로컬에 저장
}

function handleGeoSucces(position){ // 위도 경도 가져오기
    
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    const coordsObj = {
        latitude,
        longitude
    };
    console.log(coordsObj);
    saveCoords(coordsObj);
    getWeather(latitude,longitude);
}

function handleGeoError(){ //좌표정보를 허락하지 않았을 때 문구
    console.log("Can't Access geo error");
}

function askForCoords(){
    navigator.geolocation.getCurrentPosition(handleGeoSucces,handleGeoError); //API에서 내 좌표 읽기
}

function loadCoords(){
    const loadCoords=localStorage.getItem(COORDS); //로컬 스토리지에 날씨정보를 얻어옴 
    if(loadCoords === null){ // null 이면 
        askForCoords(); // 날씨를 물어봄 
    }else{
        const parseCoords = JSON.parse(loadCoords);
        getWeather(parseCoords.latitude, parseCoords.longitude);
    }
}

function init(){
    loadCoords(); //날씨정보 로드
}
init();