

const cart = {
    html : document.querySelector("#cart"),
    items : JSON.parse(localStorage.getItem('cartItems')) || [],
    itemsHTML : document.querySelector('#cartList'),
    
    addItemBtn : document.querySelector('#addToCart'),
    clearBtn : document.querySelector('#emptyCart'),
    
    openBtn : document.querySelector('a[href*="#"]'),
    closeBtn : document.querySelector('#close'),
    checkoutBtn : document.querySelector('#checkout'),
    
    open : function() {
        cart.html.classList.add('show');
    },
    
    close : function() {
        cart.html.classList.remove('show');
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
        localStorage.setItem('cartItems',JSON.stringify(cart.items));
        cart.paint(cart.items);
        cart.html.classList.add('show');    
    },
    removeItem : function(e) {
        console.log(e.target.dataset.id);
        cart.items.splice(e.target.dataset.id,1)
        localStorage.setItem('cartItems',JSON.stringify(cart.items));
        cart.paint(cart.items);
    },
    clear : function(){
        cart.items.splice(0,cart.items.length);
        localStorage.setItem('cartItems',JSON.stringify(cart.items));
        cart.paint(cart.items);
    }

}

cart.paint(cart.items);

cart.openBtn.addEventListener('click',cart.open);
cart.closeBtn.addEventListener('click', cart.close);
cart.addItemBtn.addEventListener('click',cart.addItem);
cart.clearBtn.addEventListener('click',cart.clear);
//cart.paint.removeItemBtns.addEventListener('click',cart.removeItem);