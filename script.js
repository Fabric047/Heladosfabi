// SMOOTH SCROLLING
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

/* BUTTON TO SCROLL*/
window.onscroll = function() {
    scrollFunction();
};

function scrollFunction() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        document.getElementById("scrollToTopBtn").style.display = "block";
    } else {
        document.getElementById("scrollToTopBtn").style.display = "none";
    }
}

function scrollToTop() {
    document.body.scrollTop = 0; 
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE, and Opera
}

/* FOR MOBILE DEVICES */
function toggleMenu() {
    const iconNav = document.getElementById("iconNav");
    const menu = document.querySelector('.menu');

    if (menu.style.display === 'flex') {
        menu.style.display = 'none';
        iconNav.className = "fa-solid fa-bars";
    } 
    else {
        menu.style.display = 'flex';
        iconNav.className = "fa-solid fa-x";
    }
}

/* EVENTS WITH THE INPUT TO SEARCH ICECREAM */
const input_filter = document.getElementById("input_filter");

input_filter.addEventListener("keydown", () =>{
    let input = document.getElementById("input_filter");
    let filter = input.value.toUpperCase();
    let ul = document.getElementById("iceCream");
    let li = ul.getElementsByTagName("li");

    for(let i = 0; i < li.length; i++){
        let a = li[i].getElementsByTagName("a")[0];
        let href = a.getAttribute("href").toUpperCase();
        if(href.indexOf(filter) > -1){
            li[i].style.display = "";
        } else {
            li[i].style.display = "none";
        }
    }
})


input_filter.addEventListener("click", () =>{
    var inputElement = document.getElementById('input_filter');
    inputElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    inputElement.focus();
})




document.addEventListener('DOMContentLoaded', (event) => {
    const tiempo = new Date();
    const hour = tiempo.getHours();
    const minutes = tiempo.getMinutes();
    if(hour > 9 & hour <= 22){
        const OpenClose = document.getElementById('OpenClose');
        OpenClose.innerHTML = "Ahora mismo: Abierto "+" <i class='fa-regular fa-face-smile'></i>";
        OpenClose.style.color = "green";
    }
    else{
        const OpenClose = document.getElementById('OpenClose');
        OpenClose.innerHTML = "Ahora mismo: Cerrado "+" <i class='fa-regular fa-face-sad-tear'></i>";
        OpenClose.style.color = "red";
    }


    const condition = new Date().getHours();
    if (9<condition<10){
        console.log(condition);
        const parahoy = document.getElementById("parahoy");
        parahoy.style.display = "block";
    }
    else {
        console.log(condition);
        const parahoy = document.getElementById("parahoy");
        parahoy.style.display = "none";
    }
});










// Configuración
const API_KEY = 'BYSHMJKC9L8CVY5JZPKH6WMWW';
const LOCATION = 'Ventanilla, Callao';
const BASE_URL = 'https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline';

// Seleccionamos el botón
const btnWeather = document.getElementById('btn_weather');

btnWeather.addEventListener('click', async () => {
    const weatherData = await getTodayWeather(LOCATION, API_KEY);
    if (weatherData) {
        feelslike = weatherData.feelslike
        precip = weatherData.precipitation
        solar_radiation = weatherData.solar_radiation
        //Algorithm
        IR = (0.6*feelslike)+(0.003*solar_radiation)-(5*precip)
    }

    var content = document.getElementById("toggle-content");
    if (content.style.display === "none") {
        content.style.display = "block";

        function animationLoading() {
            const recomendation = document.getElementById("recomendation");


            const catalogo = {
                muyFrio: ["sundae con chocolate","vaso con pasitas borrachas","vaso con fosh","cono chocolate","vaso con doña pepas"],
                fresco: ["sundae con manjar","vaso con choco donuts","vaso con oreo","cono sublime","cono mani","vaso mani"],
                templado: ["cono vainilla","cono combinado","sundae con lucuma","vaso con grajeas","vaso con lentejas","vaso ositos"],
                calor: ["sundae con fresa","vaso con fresa","sundae con sauco","sundae con aguaymanto","vaso chocoyogurt","sundae con menta"],
                extremo: ["sundae con maracuya","vaso con maracuya","sundae con tamarindo","vaso fabito","vaso yayito"]
            };
            let lista
            if (IR<8){
                lista = catalogo.muyFrio

            }else if (IR>=8 && IR<12){
                lista = catalogo.fresco

            }else if (IR>=12 && IR<17){
                lista = catalogo.templado

            }else if (IR>=17 && IR<21){
                lista = catalogo.calor

            }else{
                lista = catalogo.extremo
            }
            const mezclados = [...lista].sort(() => 0.5 - Math.random());
            const [sugerencia1, sugerencia2, sugerencia3] = mezclados.slice(0, 3);
            recomendation.innerHTML = `${sugerencia1}<br>${sugerencia2}<br>${sugerencia3}`;
            recomendation.style.color = "black";
        }

        setTimeout(animationLoading, 3500);
    } else {
        content.style.display = "none";
    }
});


async function getTodayWeather(location, apiKey) {
    const cacheKey = 'weather_data_cache';
    const cacheTimeKey = 'weather_timestamp';
    const expirationTime = 60 * 60 * 1000; // 30 minutos en milisegundos

    const now = Date.now();
    const cachedData = localStorage.getItem(cacheKey);
    const cachedTimestamp = localStorage.getItem(cacheTimeKey);

    // 1. Verificar si hay datos válidos en el caché
    if (cachedData && cachedTimestamp && (now - cachedTimestamp < expirationTime)) {
        console.log("Datos recuperados del caché (Ahorraste 1 registro)");
        return JSON.parse(cachedData);
    }

    // 2. Si no hay caché, construir la URL y llamar a la API
    const today = new Date().toISOString().split('T')[0];
    const url = `${BASE_URL}/${encodeURIComponent(location)}/${today}?unitGroup=metric&key=${apiKey}&include=days&elements=datetime,feelslike,precip,solarradiation&contentType=json`;

    try {
        const response = await fetch(url);
        
        if (!response.ok) throw new Error('Error en la petición a la API');

        const data = await response.json();

        if (data.days && data.days.length > 0) {
            const todayData = data.days[0];

            const result = {
                date: todayData.datetime,
                location: data.resolvedAddress,
                feelslike: todayData.feelslike,
                precipitation: todayData.precip,
                solar_radiation: todayData.solarradiation
            };

            // 3. Guardar en localStorage para la próxima vez
            localStorage.setItem(cacheKey, JSON.stringify(result));
            localStorage.setItem(cacheTimeKey, now.toString());

            console.log("Datos frescos descargados de la API");
            return result;
        }
    } catch (error) {
        console.error("Error obteniendo el clima:", error);
        return null;
    }
}




