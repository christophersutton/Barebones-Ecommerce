class OrderItem {
    constructor(data) {
        this.id = data.id;
        this.name = data.name;
        this.price = parseFloat(data.price);
        this.qty = 1;
        this.subTotal = parseFloat(data.price);
    }
    increment() {
        this.qty += 1;
        this.subTotal = this.qty * this.price;
    }
    decrement() {
        this.qty -= 1;
        this.subTotal = this.qty * this.price;
    }
}

const cart = {
    html: document.querySelector("#cart"),
    itemsHTML: document.querySelector('#orderItems'),
    btns: document.querySelectorAll('.cart-btn'),
    overlay: document.querySelector('.overlay'),
    displayCart: false,

    /* load OrderItems from localstorage if they exist */
    items: (JSON.parse(localStorage.getItem('orderItems')) || []).map(i => new OrderItem(i)),

    /* function router for event handlers */
    handler: function (e) {
        return cart[e.target.dataset.action](e);
    },

    /* toggle the display of the cart */
    toggle: function () {
        if (this.html.classList.contains('show')) {
            this.html.classList.remove('show');
            this.overlay.setAttribute("style", "display:none !important")
            displayCart = false
        } else {
            this.html.classList.add('show');
            this.overlay.setAttribute("style", "display:block !important")
            displayCart = true;
        }
    },

    /* paint HTML of order items */
    paint: function (items) {
        /* build the orderItems html */
         let orderItemsHTML = items.map((item, i) => {
            return `<div>
                        ${item.name}
                        <a href="#" data-action="removeItem" data-id="${i}">Delete</a>
                        <span>qty: ${item.qty}</span>
                        <span>$${item.subTotal.toFixed(2)}</span>
                    </div>`;
        }).join('');
        /* build the order total */
        let orderTotalHTML = `<section>$${this.total().toFixed(2)}</section>`
        /* paint the html */
        this.itemsHTML.innerHTML = orderItemsHTML + orderTotalHTML;
        /* set up event listeners on order item modifiers */
        const removeItemBtns = document.querySelectorAll("[data-action='removeItem']");
        removeItemBtns.forEach(b => b.addEventListener('click', this.handler));
    },

    /* add an order item, or increment an order item if it already exists */
    addItem: function (e) {
        let dup = this.items.findIndex(el => el.name === e.target.dataset.name) 
        if (dup >= 0) { this.items[dup].increment(); } 
        else {
            let item = new OrderItem({
                id: e.target.dataset.id,
                name: e.target.dataset.name,
                qty: 1,
                price: parseFloat(e.target.dataset.price),
            });
            this.items.push(item);
        }
        this.sync();
        !this.displayCart && this.toggle();
    },

    /* remove orderItem from cart */
    removeItem: function (e) {
        this.items.splice(e.target.dataset.id, 1)
        this.sync();
    },

    /* get the cart total */
    total: function() {
        return this.items.reduce( (acc, el) => acc + el.subTotal, 0)
    },

    /* remove all orderItems from cart */
    clear: function () {
        this.items.splice(0, this.items.length)
        this.sync();
    },

    /* push current cart to localStorage and repaint */
    sync: function () {
        localStorage.setItem('orderItems', JSON.stringify(this.items));
        this.paint(this.items);
    },

    /* post checkout */
    checkout: function () {
        alert('TODO');
    }
}

cart.paint(cart.items);
cart.btns.forEach(btn => btn.addEventListener("click", cart.handler));