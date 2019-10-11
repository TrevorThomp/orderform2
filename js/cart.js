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

// Make magic happen --- re-pull the Cart, clear out the screen and re-draw it
function renderCart() {
  loadCart();
  clearCart();
  showCart();
  orderForm();
}

// TODO: Remove all of the rows (tr) in the cart table (tbody)
function clearCart() {
  while (table.rows.length > 0) {
    table.deleteRow(0);
  }
}

// TODO: Fill in the <tr>'s under the <tbody> for each item in the cart
function showCart() {

  // TODO: Find the table body
  var tableBody = document.querySelector('tbody');
  // TODO: Iterate over the items in the cart
  for (var i = 0; i < cart.items.length; i++) {
     // TODO: Create a TR
    var tr = document.createElement('tr');
    tr.setAttribute('id', i);
    tableBody.appendChild(tr);

    // TODO: Create a TD for the delete link, quantity,  and the item
    // TODO: Add the TR to the TBODY and each of the TD's to the TR
    var productTd = document.createElement('td');
    productTd.textContent = cart.items[i].product;
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

  // TODO: When a delete link is clicked, use cart.removeItem to remove the correct item
  if (event.target.textContent === 'X') {
    cart.removeItem(event.target.parentElement);
  }
  // TODO: Save the cart back to local storage
  localStorage.setItem('cart', JSON.stringify(cart.items));
  // TODO: Re-draw the cart table
  renderCart();
}

function orderForm(event) {
  var section = document.getElementsByClassName('.deck')[1];
  var div = document.createElement('div');
  div.setAttribute('id', 'order-form');
  var labelInput = ['First Name:', 'Last Name:', 'Street:', 'City:', 'State:', 'Zip Code:', 'Phone Number:']
  // Create order form
  for (var i = 0; i < 6; i++) {
    var label = document.createElement('label');
    label.textContent = labelInput[i];
    var input = document.createElement('input');
    input.setAttribute('type', 'text');
    div.appendChild(label);
    div.appendChild(input);
    section.appendChild(div);
  }
  //Render form to 2nd section with class deck
}

// This will initialize the page and draw the cart on screen
renderCart();
