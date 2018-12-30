const clockContainer = document.querySelector(".js-clock"),
    clockTitle = clockContainer.querySelector("h1");


function getTime(){
    const date = new Date();
    const getHour = date.getHours();
    const getMin = date.getMinutes();
    const getSec = date.getSeconds();   
    clockTitle.innerText = `${getHour<10?`0${getHour}`:getHour}:${getMin<10?`0${getMin}`: getMin}:${getSec <10?`0${getSec}`:getSec }`;
    
}

function init(){
    getTime();
    setInterval(getTime,1000);

}
init();
