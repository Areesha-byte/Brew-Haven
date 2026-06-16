// ================================
// BREW HAVEN - FULL JAVASCRIPT
// ================================

let cart = [];
let total = 0;

const cartItems = document.getElementById("cartItems");
const totalBox = document.getElementById("total");
const cartCount = document.getElementById("cartCount");

function addToCart(item, price) {
    cart.push({ item, price });
    total += price;

    renderCart();
}

function removeFromCart(index) {
    total -= cart[index].price;
    cart.splice(index, 1);

    renderCart();
}

function renderCart() {

    if (!cartItems) return;

    let html = "";

    for (let i = 0; i < cart.length; i++) {
        html += `
        <li>
            ${cart[i].item} - Rs. ${cart[i].price}
            <button onclick="removeFromCart(${i})">x</button>
        </li>`;
    }

    cartItems.innerHTML = html;
    if (totalBox) totalBox.innerText = total;
    if (cartCount) cartCount.innerText = cart.length;
}

// ----------------------------
// MENU FILTER (CATEGORY)
// ----------------------------
function filterItems(category) {

    let items = document.querySelectorAll(".item");

    items.forEach(item => {

        if (category === "all") {
            item.style.display = "block";
        } else {
            item.style.display = item.classList.contains(category) ? "block" : "none";
        }

    });
}

// ----------------------------
// SEARCH FUNCTION (MENU PAGE)
// ----------------------------
let searchInput = document.getElementById("searchInput");

if (searchInput) {
    searchInput.addEventListener("input", function () {

        let value = this.value.toLowerCase();
        let items = document.querySelectorAll(".item");

        items.forEach(item => {

            let title = item.querySelector("h3").innerText.toLowerCase();

            if (title.includes(value)) {
                item.style.display = "block";
            } else {
                item.style.display = "none";
            }

        });

    });
}

// ----------------------------
// BACK TO TOP BUTTON
// ----------------------------
let topBtn = document.getElementById("topBtn");

window.addEventListener("scroll", () => {

    if (!topBtn) return;

    if (window.scrollY > 200) {
        topBtn.style.display = "block";
    } else {
        topBtn.style.display = "none";
    }

});

if (topBtn) {
    topBtn.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });
}

// ----------------------------
// CONTACT FORM VALIDATION
// ----------------------------
let form = document.getElementById("form");

if (form) {

    form.addEventListener("submit", function (e) {
        e.preventDefault();

        let name = document.getElementById("name").value;
        let email = document.getElementById("email").value;
        let subject = document.getElementById("subject").value;
        let message = document.getElementById("message").value;

        let msg = document.getElementById("formMsg");

        if (name && email && subject && message) {
            msg.innerText = "Order / Message Sent Successfully!";
            msg.style.color = "green";
            form.reset();
        } else {
            msg.innerText = "Please fill all fields properly.";
            msg.style.color = "red";
        }
    });

}