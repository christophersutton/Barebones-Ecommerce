

const cart = {
    html : document.querySelector("#cart"),
    items : JSON.parse(localStorage.getItem('cartItems')) || [],
    itemsHTML : document.querySelector('#cartList'),
    btns : document.querySelectorAll('.cart-btn'),
    displayCart : false,

    toggle : function() {
        if (cart.html.classList.contains('show')) {
            cart.html.classList.remove('show');
            displayCart = false
          }
        else {cart.html.classList.add('show');
        displayCart = true;}
    },
    paint : function(items) {  
        cart.itemsHTML.innerHTML = items.map((item, i) => {
            return `<div>
                        ${item.item}
                        <a href="#" class="deleteItem" data-id="${i}">Delete</a>
                    </div>`;}
            ).join('');
        const removeItemBtns = document.querySelectorAll('.deleteItem');
        removeItemBtns.forEach(b=>b.addEventListener('click',cart.removeItem));
    },
    addItem : function(e) {
        let item = {
            item : e.target.dataset.item,
            qty : 1,
            price : e.target.dataset.price
        };
        cart.items.push(item);
        cart.sync();
        !cart.displayCart && cart.toggle();
    },
    removeItem : function(e) {
        let start = e.target.dataset.id;
        let end = 1;
        if (e.target.dataset.action === 'clear') {
             start = 0;
             end = cart.items.length;
        }
        cart.items.splice(start,end)
        cart.sync();
    },  
    sync : function(){
        localStorage.setItem('cartItems',JSON.stringify(cart.items));
        cart.paint(cart.items);
    },
    handler : function(e){
        cart[e.target.dataset.action](e);
    }
}

cart.paint(cart.items);
cart.btns.forEach(btn => btn.addEventListener("click",cart.handler));