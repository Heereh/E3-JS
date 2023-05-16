//* Llamado de los elementos del HTML

const formPizza = document.querySelector('.form-pizza');
const inputNumber = document.querySelector('.input-number');
const contenedorPizzas = document.querySelector('.container-pizzas');

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

let localPizza = JSON.parse(localStorage.getItem('pizza')) || [];

const savePizzaLocalStorage = localPizza =>
  localStorage.setItem('pizza', JSON.stringify(localPizza));

resetLocalPizza = () =>
  (localPizza = savePizzaLocalStorage.setItem('pizza', JSON.stringify([])));

//@ Funciones auxiliares */

function errorMensajes(input, message) {
  inputNumber.value = '';
  contenedorPizzas.innerHTML = '';
  const mensajesError = document.querySelector('.mensaje');
  mensajesError.classList.add('showError');
  mensajesError.textContent = message;
}

function succesMessage() {
  const messageSuccess = document.querySelector('.mensaje');
  messageSuccess.classList.remove('showError');
}
function findPizza(dataUser) {
  return pizzas.find(pizza => pizza.id == dataUser);
}

const correctInput = () => {
  return inputNumber.value.trim().replace(/\s+/g, ' ');
};

function verificationData(dataUser) {
  let value = true;

  if (!dataUser.length) {
    errorMensajes(dataUser, 'Por favor ingrese un ID del 1 al 5');
    resetLocalPizza();
    value = false;
  } else if (!findPizza(dataUser)) {
    errorMensajes(dataUser, 'Este ID no se encontro en la base de datos');
    resetLocalPizza();
    value = false;
  }
  return value;
}

//@ Funciones generales

const renderPizza = pizza => {
  if (pizza.length === 0) {
    return false;
  } else {
    return (contenedorPizzas.innerHTML = `
        <div class="pizza">
          <img src=${pizza.imagen} alt="${pizza.nombre}" id="img" />
        </div> 
        <div class="pizza-information">
          <div class="pizza-title"><h2>${pizza.nombre}</h2></div>
          <div class="pizza-ingredientes">Ingredientes: ${pizza.ingredientes} </div>
          <div class="pizza-price"><span>Precio: $${pizza.precio} </span></div>
       </div>
    `);
  }
};

const showPizza = e => {
  e.preventDefault();

  let dataUser = correctInput();
  if (verificationData(dataUser)) {
    renderPizza(findPizza(dataUser));
    savePizzaLocalStorage(findPizza(dataUser));
    succesMessage();
  }
};

//@ Funcion init

const init = () => {
  savePizzaLocalStorage(localPizza);
  renderPizza(localPizza);
  formPizza.addEventListener('submit', showPizza);
};

init();
