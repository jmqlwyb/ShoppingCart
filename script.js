let cart = [];
const cartItemsEl = document.getElementById('cart-items');
const totalPriceEl = document.getElementById('total-price');

const shippingFees = {
    'a': 50,  
    'b': 75,  
    'c': 100  
};

    // items to be added to cart...

document.getElementById('add-to-cart').addEventListener('click', () => {
    const itemName = document.getElementById('item-name').value;
    const itemPrice = parseFloat(document.getElementById('item-price').value);
    const itemQuantity = parseInt(document.getElementById('item-quantity').value);
    const selectedTown = document.getElementById('select-town').value;

    if (!itemName || isNaN(itemPrice) || isNaN(itemQuantity)) {
        alert("Please enter valid item details.");
        return;
    }

    const item = {
        name: itemName,
        price: itemPrice,
        quantity: itemQuantity,
        selected: false,
        town: selectedTown,
        shippingFee: shippingFees[selectedTown]
    };

    cart.push(item);
    renderCart();
    clearForm();
});

function renderCart() {
    cartItemsEl.innerHTML = '';
    let total = 0;

    cart.forEach((item, index) => {
        const cartItemEl = document.createElement('li');
        cartItemEl.classList.add('cart-item');

        cartItemEl.innerHTML = `
            <input type="checkbox" ${item.selected ? 'checked' : ''} onchange="toggleSelection(${index})">
            <span>${item.name} - P${item.price.toFixed(2)} x ${item.quantity} (Shipping: P${item.shippingFee})</span>
            <div>
                <button class="edit-btn" onclick="editItem(${index})">Edit</button>
                <button class="delete-btn" onclick="deleteItem(${index})">Delete</button>
            </div>
        `;

        cartItemsEl.appendChild(cartItemEl);

        if (item.selected) {
            total += (item.price * item.quantity) + item.shippingFee;
        }
    });

    totalPriceEl.textContent = `P${total.toFixed(2)}`;
}

   

function clearForm() {
    document.getElementById('item-name').value = '';
    document.getElementById('item-price').value = '';
    document.getElementById('item-quantity').value = '';
    document.getElementById('select-town').value = 'a';
}

    // para edit button...

function editItem(index) {
    const item = cart[index];
    document.getElementById('item-name').value = item.name;
    document.getElementById('item-price').value = item.price;
    document.getElementById('item-quantity').value = item.quantity;
    document.getElementById('select-town').value = item.town;
    deleteItem(index);
}

   // para delete button...
function deleteItem(index) {
    cart.splice(index, 1);
    renderCart();
}

function toggleSelection(index) {
    cart[index].selected = !cart[index].selected;
    renderCart();
}

document.getElementById('checkout-button').addEventListener('click', () => {
    const selectedItems = cart.filter(item => item.selected);

    if (selectedItems.length === 0) {
        alert("No items selected for checkout.");
        return;
    }

    let checkoutMessage = "You have checked out the following items:\n";
    let grandTotal = 0;

    // para i check out ang items...

    console.log("Checkout items:");

    selectedItems.forEach(item => {
        const itemSubtotal = item.price * item.quantity;
        const itemTotal = itemSubtotal + item.shippingFee;
        grandTotal += itemTotal;

        checkoutMessage += `- ${item.name}:
        
          Subtotal = P${itemSubtotal.toFixed(2)}
          Shipping Fee = P${item.shippingFee.toFixed(2)}    
          Total = P${itemTotal.toFixed(2)}\n`;

        console.log({
            name: item.name,
            price: item.price,
            quantity: item.quantity,
            town: item.town,
            shippingFee: item.shippingFee,
            subtotal: itemSubtotal,
            total: itemTotal
        });
    });

    // para i check ang tanan total sa items nga g add to cart...

    checkoutMessage += `\n Total: P${grandTotal.toFixed(2)}`;

    alert(checkoutMessage);
});
