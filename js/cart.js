/* global Cart */
'use strict';

// Create an event listener so that when the delete link is clicked, the removeItemFromCart method is invoked.
var table = document.getElementById('cart');
table.addEventListener('click', removeItemFromCart);
var cart;

function loadCart() {
  var cartItems = JSON.parse(localStorage.getItem('cart')) || [];
  cart = new Cart(cartItems);
}

function renderCart() {
  loadCart();
  clearCart();
  showCart();
}

orderForm();

function clearCart() {
  while (table.rows.length > 0) {
    table.deleteRow(0);
  }
}

function showCart() {
  var tableBody = document.querySelector('tbody');
  for (var i = 0; i < cart.items.length; i++) {
    var tr = document.createElement('tr');
    tr.setAttribute('id', i);
    tableBody.appendChild(tr);


    var productTd = document.createElement('td');
    var img = document.createElement('img');
    productTd.textContent = cart.items[i].product;
    for (var j = 0; j < Product.allProducts.length; j++) {
      if (Product.allProducts[j].name.toUpperCase() === cart.items[i].product.toUpperCase()) {
        img.src = Product.allProducts[j].filePath;
      };
    }
    tr.appendChild(img);
    tr.appendChild(productTd);
    
    var amountTd = document.createElement('td');
    amountTd.textContent = cart.items[i].quantity;
    tr.appendChild(amountTd);

    var td = document.createElement('td');
    td.textContent = 'X';
    td.setAttribute('class', 'remove');
    tr.appendChild(td);
  }
}

function removeItemFromCart(event) {
  if (event.target.textContent === 'X') {
    cart.removeItem(event.target.parentElement);
  }
  localStorage.setItem('cart', JSON.stringify(cart.items));
  renderCart();
}

function orderForm() {
  var section = document.getElementsByClassName('deck')[1];
  var div = document.createElement('div');
  div.setAttribute('id', 'order-form');
  var labelInput = ['First Name:', 'Last Name:', 'Street:', 'City:', 'State:', 'Zip Code:', 'Phone Number:', 'Credit Card Number:'];
  // Create order form
  for (var i = 0; i < 6; i++) {
    var label = document.createElement('label');
    label.textContent = labelInput[i];
    var input = document.createElement('input');  
    input.setAttribute('type', 'text');
     //Render form to 2nd section with class deck
    div.appendChild(label);
    div.appendChild(input);
    section.appendChild(div);
  }
  // Credit Card Input
  label = document.createElement('label');
  label.textContent = labelInput[7];
  input = document.createElement('input');
  input.setAttribute('type', 'number');
  input.setAttribute('pattern', '[0-9]{16}');
  div.appendChild(label);
  div.appendChild(input);
  // Submit Order Button
  input = document.createElement('button');
  input.setAttribute('id', 'submit-button');
  input.textContent = 'Process Order';  
  div.appendChild(input);
}

function overLayMessage() {
  var body = document.querySelector('body');
  var div = document.createElement('div');
  div.setAttribute('id', 'overlay');
  div.style.display = 'block';
  div.innerHTML = `<p> Your order has been submitted! </p>`;
  body.appendChild(div);
}

// Even listener to clear cart and display overlay
var button = document.getElementById('submit-button');
button.addEventListener('click', clearCart);
button.addEventListener('click', overLayMessage);

// This will initialize the page and draw the cart on screen
renderCart();

