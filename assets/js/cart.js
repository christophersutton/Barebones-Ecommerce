const cart = {
    html: document.querySelector("#cart"),
    items: JSON.parse(localStorage.getItem('orderItems')) || [],
    itemsHTML: document.querySelector('#orderItems'),
    btns: document.querySelectorAll('.cart-btn'),
    displayCart: false,

    handler: function (e) {
        return cart[e.target.dataset.action](e);
    },
    toggle: function () {
        let overlay = document.querySelector('.overlay');
        if (this.html.classList.contains('show')) {
            this.html.classList.remove('show');
            overlay.setAttribute("style","display:none !important")
            displayCart = false
        } else {
            this.html.classList.add('show');
            overlay.setAttribute("style","display:inline !important")
            displayCart = true;
        }
    },
    paint: function (items) {
        this.itemsHTML.innerHTML = items.map((item, i) => {
            return `<div>
                        ${item.item}
                        <a href="#" data-action="removeItem" data-id="${i}">Delete</a>
                    </div>`;
        }).join('');
        const removeItemBtns = document.querySelectorAll("[data-action='removeItem']");
        removeItemBtns.forEach(b => b.addEventListener('click', this.handler));
    },
    addItem: function (e) {
        let item = {
            item: e.target.dataset.item,
            qty: 1,
            price: e.target.dataset.price
        };
        this.items.push(item);
        this.sync();
        !this.displayCart && this.toggle();
    },
    removeItem: function (e) {
        console.log(this);
        this.items.splice(e.target.dataset.id, 1)
        this.sync();
    },
    clear: function () {
        this.items.splice(0, this.items.length)
        this.sync();
    },
    sync: function () {
        localStorage.setItem('orderItems', JSON.stringify(this.items));
        this.paint(this.items);
    },
    checkout: function () {
        alert(this.items);
    }
}

function test(){
    console.log('hmmmmm')
}

cart.paint(cart.items);

document.querySelector('.overlay').addEventListener("click",cart.handler);
cart.btns.forEach(btn => btn.addEventListener("click", cart.handler));