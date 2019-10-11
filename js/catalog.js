/* global Product, Cart */

'use strict';

// Set up an empty cart for use on this page.
var cart = new Cart([]);

function populateForm() {
  var selectElement = document.getElementById('items');
  for (var i in Product.allProducts) {
    var option = document.createElement('option');
    option.textContent = Product.allProducts[i].name;
    selectElement.appendChild(option);
  }
  return selectElement;
}

function handleSubmit(event) {
  event.preventDefault();
  addSelectedItemToCart();
  cart.saveToLocalStorage();
  updateCounter();
  updateCartPreview();

}

function addSelectedItemToCart() {
  var e = document.getElementById('items');
  var itemPicked = e.options[e.selectedIndex].value;
  var quantity = document.getElementById('quantity').value;
  cart.addItem(itemPicked, quantity);
}

function updateCounter() {
  var counter = document.getElementById('itemCount');
  counter.textContent = cart.items.length;
};

function updateCartPreview() {
  var e = document.getElementById('items');
  var itemPicked = e.options[e.selectedIndex].value;
  var quantity = document.getElementById('quantity').value;
  var ul = document.createElement('ul');
  for (var i = 0; i < 1; i++) {
    var cartContents = document.getElementById('cartContents');
    cartContents.appendChild(ul); 
    var li = document.createElement('li');
    li.textContent = `${itemPicked} x ${quantity}`
    ul.appendChild(li)
  }
}

var catalogForm = document.getElementById('catalog');
catalogForm.addEventListener('submit', handleSubmit);
catalogForm.addEventListener('submit', function() {
  var quantity = document.getElementById('quantity');
  quantity.value = '';
})

populateForm();
