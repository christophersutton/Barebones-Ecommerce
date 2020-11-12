

const cart = {
    html : document.querySelector("#cart"),
    items : JSON.parse(localStorage.getItem('orderItems')) || [],
    itemsHTML : document.querySelector('#orderItems'),
    btns : document.querySelectorAll('.cart-btn'),
    displayCart : false,

    handler : function(e) {
        cart[e.target.dataset.action](e);
    },
    toggle : function() {
        if (cart.html.classList.contains('show')) {
            cart.html.classList.remove('show');
            displayCart = false
          }
        else {
            cart.html.classList.add('show');
            displayCart = true;
        }
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
        cart.items.splice(e.target.dataset.id,1)
        cart.sync();
    },  
    clear : function() {
        cart.items.splice(0,cart.items.length)
        cart.sync();  
    },
    sync : function() {
        localStorage.setItem('orderItems',JSON.stringify(cart.items));
        cart.paint(cart.items);
    },
    checkout : function() {
        alert(cart.items);
    }
}

cart.paint(cart.items);
cart.btns.forEach(btn => btn.addEventListener("click",cart.handler));