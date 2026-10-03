// ===============================
// PRODUCT SEARCH
// ===============================

const searchForm = document.getElementById("searchForm");
const searchInput = document.getElementById("searchInput");
const products = document.querySelectorAll(".product-item");

searchForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const searchText = searchInput.value.toLowerCase().trim();

    products.forEach(function (product) {
        const productText = product.textContent.toLowerCase();

        if (productText.includes(searchText)) {
            product.style.display = "";
        } else {
            product.style.display = "none";
        }
    });
});


// ===============================
// SHOPPING CART
// ===============================

let cart = [];

const cartButtons = document.querySelectorAll(".add-to-cart");
const cartBadge = document.querySelector(".badge");
const cartItems = document.getElementById("cartItems");
const cartTotal = document.getElementById("cartTotal");


// Add product to cart
cartButtons.forEach(function (button) {

    button.addEventListener("click", function () {

        const productCard = button.closest(".product-card");

        const productName =
            productCard.querySelector(".card-title").textContent.trim();

        const productPriceText =
    productCard.querySelectorAll(".card-body h5")[1].textContent.trim();

        const productPrice =
            parseInt(productPriceText.replace(/[₹,]/g, ""));

        const existingProduct = cart.find(function (item) {
            return item.name === productName;
        });

        if (existingProduct) {
            existingProduct.quantity++;
        } else {
            cart.push({
                name: productName,
                price: productPrice,
                quantity: 1
            });
        }

        updateCart();

        button.textContent = "Added ✓";

        setTimeout(function () {
            button.textContent = "Add to Cart";
        }, 1000);

    });

});


// Update cart display
function updateCart() {

    cartItems.innerHTML = "";

    let total = 0;
    let totalQuantity = 0;

    if (cart.length === 0) {

        cartItems.innerHTML = `
            <p class="text-center text-muted">
                Your cart is empty.
            </p>
        `;

    } else {

        cart.forEach(function (item, index) {

            const itemTotal = item.price * item.quantity;

            total += itemTotal;
            totalQuantity += item.quantity;

            cartItems.innerHTML += `
                <div class="d-flex justify-content-between align-items-center mb-3 border-bottom pb-3">

                    <div>
                        <h6 class="mb-1">${item.name}</h6>
                        <p class="mb-0 text-muted">
                            ₹${item.price} × ${item.quantity}
                        </p>
                    </div>

                    <div class="d-flex align-items-center gap-2">

                        <button
                            class="btn btn-sm btn-outline-secondary"
                            onclick="decreaseQuantity(${index})">
                            −
                        </button>

                        <span>${item.quantity}</span>

                        <button
                            class="btn btn-sm btn-outline-secondary"
                            onclick="increaseQuantity(${index})">
                            +
                        </button>

                        <button
                            class="btn btn-sm btn-danger"
                            onclick="removeFromCart(${index})">
                            Remove
                        </button>

                    </div>

                    <strong>
                        ₹${itemTotal}
                    </strong>

                </div>
            `;

        });

    }

    cartTotal.textContent = total.toLocaleString("en-IN");
    cartBadge.textContent = totalQuantity;
}


// Increase quantity
function increaseQuantity(index) {

    cart[index].quantity++;

    updateCart();
}


// Decrease quantity
function decreaseQuantity(index) {

    if (cart[index].quantity > 1) {
        cart[index].quantity--;
    } else {
        cart.splice(index, 1);
    }

    updateCart();
}


// Remove product
function removeFromCart(index) {

    cart.splice(index, 1);

    updateCart();
}

const clearCartButton = document.getElementById("clearCart");

clearCartButton.addEventListener("click", function () {
    cart = [];
    updateCart();
});

// ===============================
// CHECKOUT FORM VALIDATION
// ===============================

const checkoutForm = document.getElementById("checkoutForm");

checkoutForm.addEventListener("submit", function (event) {

    event.preventDefault();

    const name = document.getElementById("customerName").value.trim();
    const email = document.getElementById("customerEmail").value.trim();
    const phone = document.getElementById("customerPhone").value.trim();
    const address = document.getElementById("customerAddress").value.trim();

    if (name === "" || email === "" || phone === "" || address === "") {

        alert("Please fill in all the fields.");

        return;
    }

    if (phone.length < 10) {

        alert("Please enter a valid phone number.");

        return;
    }

    alert("Order placed successfully! 🎉");

    checkoutForm.reset();

    cart = [];

    updateCart();

});

// ===============================
// CATEGORY FILTER
// ===============================

const categoryButtons = document.querySelectorAll(".category-btn");

categoryButtons.forEach(function (button) {

    button.addEventListener("click", function () {

        const selectedCategory = button.dataset.category;

        products.forEach(function (product) {

            const productCategory = product.dataset.category;

            if (
                selectedCategory === "all" ||
                productCategory === selectedCategory
            ) {
                product.style.display = "";
            } else {
                product.style.display = "none";
            }

        });

        categoryButtons.forEach(function (btn) {
            btn.classList.remove("btn-primary");
            btn.classList.add("btn-outline-primary");
        });

        button.classList.remove("btn-outline-primary");
        button.classList.add("btn-primary");

    });

});