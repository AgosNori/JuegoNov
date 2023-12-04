const letterContainer= document.getElementById("letter-container");
const optionsContainer = document.getElementById("options-container");
const userInputSection = document.getElementById("user-input-section");
const newGameContainer = document.getElementById("new-game-container");
const newGameButton = document.getElementById("new-game-button");
const canvas = document.getElementById("canvas");
const resultText =document.getElementById("result-text");


// camelCase : la primera palabra toda en minuscula y apartir de la segunda
// palabra en adelante se pone la primera letra en mayuscula

//console.log(letterContainer)
/*
let nombres = ["Juli","joaquin","Ignacio"];
console.log(nombres)
// manejo de indices
console.log(nombres[0])
console.log(nombres[1])
console.log(nombres[2])
// longitud
console.log(nombres.length);*/
let options = {
    frutas:[
        "manzana",
        "frutilla",
        "pera",
        "sandia",
        "naranja",
        "mandarina",
        "uvas",
        "kiwi"
    ],
    animales:[
        "perro",
        "gato",
        "nutria",
        "jirafa",
        "rinoceronte",
        "leon",
        "pantera",
        "tortuga",
        "mamut",
        "hamster"
    ],
    paises:[
        "australia",
        "argentina",
        "suecia",
        "alemania",
        "chile",
        "irlanda",
        "africa",
        "españa",
        "mexico"
    ],
};

//contadores
let winCount = 0;
let count = 0;
let chosenWord = "";

// trabajaremos con el display de las opciones
const displayOption = ()=>{
    // alt+96 para hacer el template literal
    optionsContainer.innerHTML += `<h3>Porfavor seleccione una opcion</h3>`;
    // innerHTML nos sirve para poder ingresar codigo html en js 
    let buttonCon = document.createElement("div");
    for (let value in options){
        buttonCon.innerHTML += `<button class="options" onClick="generateWord"('${value}')">${value}</button>`;
    }
    // appendChild  es agregar al ultimo en este caso el boton
    optionsContainer.appendChild(buttonCon);
};

// funcion para poder bloquear todos los botones
const blocker = ()=>{
    // crear dos variables 
    let optionsButton = document.querySelectorAll(".options");
    let letterButton = document.querySelectorAll(".letters");

    optionsButton.forEach((button)=>{
        button.disabled = true;
    });

    letterButton.forEach((button)=>{
        button.disabled = true;
    });
    // eliminar la clase de la lista de elementos (deja sin estilos )
    newGameContainer.classList.remove("hide"); // va a mostrarlo 
};


// generador de palabras
const generateWord = (optionValue)=>{
    let optionsButton = document.querySelectorAll(".options");
    optionsButton.forEach((button)=>{
        if (button.innerText.toLowerCase()=== optionValue){
            button.classList.add("active");
        }
        button.disabled=true;
    });
    // inicializamos el contenido de las letras en cero y limpiamos lo anterior 
    letterContainer.classList.remove("hide");
    userInputSection.innerText="";

    let optionArray = options[optionValue];

    // elegir una palabra aleatoria
    chosenWord = optionArray[Math.floor(Math.random()* optionArray.length)];
    chosenWord = chosenWord.toUpperCase();

    // una vez que ya seleccione la palabra
    // por cada letra vamos a reemplazarlo por un signo
    let displayItem = chosenWord.replace(/./g,'<span class="dashes">_</span>');
    userInputSection.innerHTML = displayItem;

};

// cuando hagamos click en el boton de nuevo juego, se reinicie todo 
const initializer = () => {
    winCount = 0;
    count = 0;

    userInputSection.innerHTML = "";
    optionsContainer.innerHTML = "";
    letterContainer.classList.add("hide");
    newGameContainer.classList.add("hide");
    letterContainer.innerHTML="";

    // crear las letras // letras en mayuscula
    for (let i = 65; i < 91;  i++){
        let button = document.createElement("button");
        button.classList.add("letters");
        button.innerText = String.fromCharCode(i);

        button.addEventListener("click",()=>{
            //split () divide un objeto en string
            let charArray = chosenWord.split("");
            let dashes = document.getElementsByClassName("dashes");

            if (charArray.includes(button.innerText)){
                charArray.forEach((char,index)=>{
                    if (char === button.innerText){
                        dashes [index].innerText = char;
                        winCount +=1;
                        if (winCount === charArray.length){
                            resultText.innerHTML = `<h2 class="win-msg">Ganaste</h2>`;
                            // esta es la funcion cunaod estan activados los botones
                            blocker();
                        }
                    }
                })
            }
        })
    }
}
