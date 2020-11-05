

const addToCartBtn = document.querySelector('.button-primary');

function addToCart(e) {
    item = this.dataset.item;
    qty = 1;
    window.localStorage.cart = {item,qty};
}

addToCartBtn.addEventListener("click",addToCart());
