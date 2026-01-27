// SMOOTH SCROLLING
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

/* BUTTON TO SCROLL 'TILL THE TOP */
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


  



/* RECOMENDATION OF THE DAY */

function toggleContent() {
    var content = document.getElementById("toggle-content");
    if (content.style.display === "none") {
        content.style.display = "block";
        
        const currentDay = new Date().getDay();
        const hours = new Date().getHours();
        const hour = parseInt(hours);
        const minutes = new Date().getMinutes();


        function animationLoading() {
            const recomendation = document.getElementById("recomendation");
            
            if (18<hour<23){
                const iceCream = "vaso fabito<br>vaso yayito<br>cono sublime<br>cono mani<br>vaso mani<br>vaso oreo<br>vaso fosh<br>vaso tamarindo<br>vaso aguaymanto";
                recomendation.innerHTML = iceCream;
                recomendation.style.color = "black";
            } if (14<hour<19){
                const iceCream = "vaso fabito<br>vaso yayito<br>vaso sundae lucuma<br>cono sublime";
                recomendation.innerHTML = iceCream;
                recomendation.style.color = "black";
            } if (11<hour<15){
                const iceCream = "vaso doña pepa<br>vaso fresa<br>vaso maracuya<br>vaso menta<br>vaso grajeas";
                recomendation.innerHTML = iceCream;
                recomendation.style.color = "black";
            } if (9<hour<12){
                const iceCream = "vaso oreo<br>vaso chocodonuts<br>conos chocolate<br>cono vainilla<br>cono combinado<br>vaso lentejas";
                recomendation.innerHTML = iceCream;
                recomendation.style.color = "black";
            }
            else{
                recomendation.innerHTML = "todavía";
            }
        }

        setTimeout(animationLoading, 3500);
    } else {
        content.style.display = "none";
    }
}

