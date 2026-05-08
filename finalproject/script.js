const products = [
    { id: 1, name: "Laptop", price: 999.99, img: "💻" },
    { id: 2, name: "Smartphone", price: 599.99, img: "📱" },
    { id: 3, name: "Headphones", price: 149.99, img: "🎧" },
    { id: 4, name: "Coffee Maker", price: 89.00, img: "☕" },
    { id: 5, name: "Desk Lamp", price: 25.50, img: "💡" },
    { id: 6, name: "Backpack", price: 45.00, img: "🎒" }
];

let cart = [];

// DOM Elements
const productList = document.getElementById('product-list');
const cartItemsContainer = document.getElementById('cart-items');
const cartTotalDisplay = document.getElementById('cart-total');
const cartBadge = document.getElementById('cart-badge');
const cartEmptyMsg = document.getElementById('cart-empty-msg');
const clearCartBtn = document.getElementById('clear-cart-btn');

// Initialize Store
function init() {
    renderProducts();
    updateUI();
}

// Render the product listing
function renderProducts() {
    productList.innerHTML = products.map(p => {
        const inCart = cart.find(item => item.id === p.id);
        return `
            <div class="product-card">
                <div class="product-emoji">${p.img}</div>
                <h3>${p.name}</h3>
                <p>$${p.price.toFixed(2)}</p>
                <button 
                    class="btn-add" 
                    onclick="addToCart(${p.id})" 
                    ${inCart ? 'disabled' : ''}>
                    ${inCart ? 'Already in Cart' : 'Add to Cart'}
                </button>
            </div>
        `;
    }).join('');
}

// Logic to add to cart
function addToCart(id) {
    const product = products.find(p => p.id === id);
    cart.push({ ...product, quantity: 1 });
    renderProducts(); // Update buttons
    updateUI();
}

// Change quantity (+ / -)
function updateQuantity(id, change) {
    const item = cart.find(i => i.id === id);
    if (item) {
        item.quantity += change;
        if (item.quantity <= 0) {
            removeFromCart(id);
        } else {
            updateUI();
        }
    }
}

// Remove item entirely
function removeFromCart(id) {
    cart = cart.filter(item => item.id !== id);
    renderProducts();
    updateUI();
}

// Update the Cart Section and Badge
function updateUI() {
    // 1. Show/Hide empty message
    cartEmptyMsg.style.display = cart.length === 0 ? 'block' : 'none';

    // 2. Render Cart Items
    cartItemsContainer.innerHTML = cart.map(item => `
        <div class="cart-item">
            <div><strong>${item.name}</strong> - $${item.price.toFixed(2)}</div>
            <div class="cart-controls">
                <button class="qty-btn" onclick="updateQuantity(${item.id}, -1)">-</button>
                <span>Qty: ${item.quantity}</span>
                <button class="qty-btn" onclick="updateQuantity(${item.id}, 1)">+</button>
                <button class="btn-danger" onclick="removeFromCart(${item.id})">Remove</button>
            </div>
            <div>Subtotal: $${(item.price * item.quantity).toFixed(2)}</div>
        </div>
    `).join('');

    // 3. Calculate Totals
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const count = cart.reduce((sum, item) => sum + item.quantity, 0);

    cartTotalDisplay.innerText = total.toFixed(2);
    cartBadge.innerText = count;
}

// Clear Cart Action
clearCartBtn.onclick = () => {
    cart = [];
    renderProducts();
    updateUI();
};

init();