const addToCartBtn = document.querySelector('#addToCart');
const cartHTML = document.querySelector("#cart");
const checkoutBtn = document.querySelector('#checkout');
const closeCartBtn = document.querySelector('#close');
const cartList = document.querySelector('#cartList');
const clearCartBtn = document.querySelector('#emptyCart');
const cartBtn = document.querySelector('a[href*="#"]')

const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

const cart = {
    items : JSON.parse(localStorage.getItem('cartItems')),
    
    getItems : function() {
        return JSON.parse(localStorage.getItem('cartItems'));
    },

    close : function() {
        cartHTML.classList.remove('show');
    },

    open : function() {
        cartHTML.classList.add('show');
    },

    paint : function(items) {  
        cartList.innerHTML = items.map((item, i) => {
        return `<li>${item.item}</li>`;}).join('');
    },

    addItem : function(e) {
        let item = {
            item : e.target.dataset.item,
            qty : 1,
            price : e.target.dataset.price
        };
        cartItems.push(item);
        localStorage.setItem('cartItems',JSON.stringify(cartItems));
        cart.paint(cartItems);
        cartHTML.classList.add('show');    
    },

    clear : function(){
        cartItems.splice(0,cartItems.length);
        localStorage.setItem('cartItems',JSON.stringify(cartItems));
        cart.paint(cartItems);
    }

}

cart.paint(cartItems);

closeCartBtn.addEventListener('click', cart.close);
addToCartBtn.addEventListener('click',cart.addItem);
clearCartBtn.addEventListener('click',cart.clear);
cartBtn.addEventListener('click',cart.open);