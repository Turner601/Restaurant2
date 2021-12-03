class Restaurant {
    constructor() {
        this.itemsInCart = {
            itemCount: 0,
            subTotal: 0,
        }

        // Menu inventory
        this.inventory = {

            item1: {
                id: 1,
                img: 'media/thai-chicken-curry-with-rice.jpeg',
                alt: 'chicken curry',
                class: 'main-meal',
                price: 12.00,
                qty: 0,
                name: 'chicken curry',
            },

            item2: {
                id: 2,
                img: 'media/thai-green-curry.jpeg',
                alt: 'green curry',
                class: 'main-meal',
                price: 12.00,
                qty: 0,
                name: 'green curry'
            },

            item3: {
                id: 3,
                img: 'media/thai-panang-curry.jpeg',
                alt: 'panang curry',
                class: 'main-meal',
                price: 12.00,
                qty: 0,
                name: 'panang curry'
            },

            item4: {
                id: 4,
                img: 'media/steamed-dumplings.jpeg',
                alt: 'dumplings',
                class: 'side-items',
                price: 5.00,
                qty: 0,
                name: 'dumplings'
            },

            item5: {
                id: 5,
                img: 'media/thai-chili-brussel-sprouts.jpeg',
                alt: 'brussel sprouts',
                class: 'side-items',
                price: 5.00,
                qty: 0,
                name: 'brussel sprouts'
            },

            item6: {
                id: 6,
                img: 'media/peanut-salad-wonton-cups.jpeg',
                alt: 'salad cups',
                class: 'side-items',
                price: 5.00,
                qty: 0,
                name: 'salad cups'
            },

            item7: {
                id: 7,
                img: 'media/CoconutCakeWithFluffyCoconutIcing.jpeg',
                alt: 'coconut cake',
                class: 'dessert',
                price: 5.00,
                qty: 0,
                name: 'coconut cake'
            },

            item8: {
                id: 8,
                img: 'media/ThaiFriedBananasGorengPisang.jpeg',
                alt: 'fried bananas',
                class: 'dessert',
                price: 5.00,
                qty: 0,
                name: 'fried bananas'
            },

            item9: {
                id: 9,
                img: 'media/ThaiBlackStickyRicePudding.jpeg',
                alt: 'rice pudding',
                class: 'dessert',
                price: 5.00,
                qty: 0,
                name: 'rice pudding'
            }
        }
    }

    init() {
        this.addToCart();
        this.checkout();
    }

    addToCart() {
        // Set variables
        let buttons = document.querySelectorAll('.add-button');
        let cartItems = document.getElementById('cartItems');
        let cartSubTotal = document.getElementById('cartSubTotal');
        let itemCount = 0;
        let price = 0;

        // For in loop to loop through this.inventory
        for (const key in this.inventory) {
            const item = this.inventory[key];
            // Add event listener to each button
            buttons.forEach(button => {
                button.addEventListener('click', () => {
                    // if the id of the data attribute matches item.id
                    if (button.dataset['id'] == item.id) {
                        itemCount++;
                        price = price + item.price;
                        // Store changed itemCount and price into this.itemsInCart
                        this.itemsInCart.itemCount = itemCount;
                        this.itemsInCart.subTotal = price;

                        item.qty++;
                        console.log(item);
                        console.log(this.itemsInCart);
                    }

                    // Sending back to the DOM
                    cartItems.innerText = itemCount;
                    cartSubTotal.innerText = price.toFixed(2);
                })
            })
        }
    }

    checkout() {
        // Set variables
        let table = document.getElementById('tbody');
        let checkout = document.getElementById('checkout');
        let checkoutPage = document.querySelector('.checkout-page');
        let homePage = document.querySelector('.home-page');
        let mainMenu = document.querySelector('.menu-main');
        let subTimesQty = 0;
        let subtotalValue = document.getElementById('subtotalValue');
        let taxValue = document.getElementById('taxValue');
        let totalValue = document.getElementById('totalValue');
        let tax = 0;
        let delieveryValue = document.getElementById('delieveryValue');
        let checkoutItemCount = document.getElementById('checkoutItemCount');
        let delievery = 0;

        checkout.addEventListener('click', () => {
            if (homePage.classList.contains('d-none')) return;
            // Remove d-none from checkout and add d-none to homePage
            checkoutPage.classList.remove('d-none');
            mainMenu.classList.add('d-none');

            if (this.itemsInCart.itemCount == 1) {
                checkoutItemCount.innerText = `${this.itemsInCart.itemCount} item`;
            } else {
                checkoutItemCount.innerText = `${this.itemsInCart.itemCount} items`
            }

            // Load content on checkout page
            for (const key in this.inventory) {
                const item = this.inventory[key];

                subTimesQty = (item.qty * item.price).toFixed(2);
                subtotalValue.innerText = this.itemsInCart.subTotal.toFixed(2);
                delieveryValue.innerText = delievery.toFixed(2);
                tax = this.itemsInCart.subTotal * .07;
                taxValue.innerText = tax.toFixed(2);
                totalValue.innerText = (this.itemsInCart.subTotal + tax + delievery).toFixed(2);

                // If the qty > 0 (item has been added to cart)
                if (item.qty > 0) {

                    const tableRow = document.createElement('tr');
                    tableRow.className = 'product-checkout';

                    tableRow.innerHTML += `
                        <td id="checkoutImg">
                            <img src="${item.img}" alt="${item.alt}" class="img-fluid checkout-img"
                            <div class="product-desc">
                                <p class="item-name">${item.name}</p>
                            </div>
                        </td>
                        <td>
                            <p class="unit-price">${item.price.toFixed(2)}</p>
                        </td>
                        <td>
                            <div id="itemQuantity">
                                <p id="qtyInput">${item.qty}</p>
                            </div>
                        </td>
                        <td id="itemSubtotal">${subTimesQty}</td>`

                        table.append(tableRow);
                }
            }
        })
    }
}

let action = new Restaurant();

action.init();