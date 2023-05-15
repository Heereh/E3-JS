//* Llamado de los elementos del HTML

const formPizza = document.querySelector('.form-pizza');
const inputNumber = document.querySelector('.input-number');
const contenedorPizzas = document.querySelector('.container-pizzas');

/* 
inputNumber.addEventListener('submit', () => {
  console.log(inputNumber.value);
}); */

const pizzas = [
  {
    id: 1,
    nombre: 'pizza de Muzzarella',
    precio: 500,
    ingredientes: ['Muzzarella', 'Tomate', 'Aceitunas'],
    imagen: './img/muzzarella.png',
  },

  {
    id: 2,
    nombre: 'pizza de Cebolla',
    precio: 1500,
    ingredientes: ['Muzzarella', 'Tomate', 'Cebolla'],
    imagen: './img/cebolla.png',
  },

  {
    id: 3,
    nombre: 'pizza 4 Quesos',
    precio: 1380,
    ingredientes: [
      'Muzzarella',
      'Tomate',
      'Queso Azul',
      'Parmesano',
      'Roquefort',
    ],
    imagen: './img/4quesos.png',
  },

  {
    id: 4,
    nombre: 'pizza Especial',
    precio: 1000,
    ingredientes: ['Muzzarella', 'Tomate', 'Rucula', 'Jamón'],
    imagen: './img/especial.png',
  },

  {
    id: 5,
    nombre: 'pizza con Anana',
    precio: 600,
    ingredientes: ['Muzzarella', 'Tomate', 'Anana'],
    imagen: './img/anana.png',
  },
];

//@  Local Storage /



//@ Funciones auxiliares */

function errorMensajes(input, message) {
  const mensajesError = document.querySelector('.mensaje');
  mensajesError.classList.add('showError');
  mensajesError.textContent = message;
}

function succesMessage() {
  const messageSuccess = document.querySelector('.mensaje');
  messageSuccess.classList.remove('showError');
}

const correctInput = () => {
  return inputNumber.value.trim().replace(/\s+/g, ' ');
};

function verificationData(dataUser) {
  let value = true;

  if (!dataUser.length) {
    errorMensajes(dataUser, 'Por favor ingrese un ID del 1 al 5');
    value = false;
    formPizza.reset();
    return;
  } else if (!pizzas.find((pizza) => pizza.id == dataUser)) {
    errorMensajes(dataUser, 'Este ID no se encontro en la base de datos');
    value = false;
    formPizza.reset();
    return;
  }
  return value;
}
//@ Funciones generales

const showPizza = (e) => {
  e.preventDefault();
  let dataUser = correctInput();
  console.log(dataUser);
  if (verificationData(dataUser)) {
    const search = pizzas.find((pizza) => pizza.id == dataUser);
    console.log(search);
    contenedorPizzas.innerHTML = `
        <div class="pizza">
          <img src=${search.imagen} alt="${search.nombre}" id="img" />
        </div> 
        <div class="pizza-information">
          <div class="pizza-title"><h2>${search.nombre}</h2></div>
          <div class="pizza-ingredientes">Ingredientes: ${search.ingredientes} </div>
          <div class="pizza-price"><span>Precio: $${search.precio} </span></div>
       </div>
    `;
  
    succesMessage();
    formPizza.reset();
  }
};

//@ Funcion init

const init = () => {

  formPizza.addEventListener('submit', showPizza);
};

init();
