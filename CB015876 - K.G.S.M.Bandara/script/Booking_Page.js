
// Define an object to hold the movie  prices
const Price = {
    'Inception': 1500,
    'Smile': 1800,
    'MineCraft': 1000,
    'Mario_Bross': 1400,
    'An_EPic': 1600,
    'Alarmy': 1200,
    'Scooby_DOO': 1500,
    'OPPENHEIMER': 1300,
    'CAPTAIN_AMERICA': 2400,
    'CREATOR': 1200,
    'INTERSTELTAN': 1200,
    'AFTER': 2200,
    'Retribution': 1250,
    'Archer': 1500,
    'Jone_Carter': 1800,
    'Lorem_IPsum': 1200,
    'Avatar': 1200,
    'Freedom': 2000,
    'Army_of_Darkness': 1000,
    'Godzilla': 1200,
    'Fifth_Road': 1400,
    'Animal': 1450,
    'Total_Recall': 1900,
    'King_Frankie': 1100,
    'Strange_Dorling': 1800,
    'Thriller': 1500,
    'Rocky': 1990,
    'The_Artist': 1200,
    'Ace_Ventura': 1300,
    'Alien': 1500
};

function addToCart() {
    const cartBody = document.getElementById('cart-body');
    cartBody.innerHTML = ''; 
    let totalPrice = 0;

    for (let movie in Price) {
        const quantityInput = document.getElementById(movie);
        if (quantityInput && parseInt(quantityInput.value) > 0) {
            const numberOfSeats = parseInt(quantityInput.value);
            const pricePerSeat = Price[movie];
            const total = pricePerSeat * numberOfSeats;
            totalPrice += total;

            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${movie}</td>
                <td>${numberOfSeats}</td>
                <td>$${total}</td>
            `;
            cartBody.appendChild(row);
        }
    }

    document.getElementById('total-price').innerText = `$${totalPrice.toFixed(2)}`;
}


// Function to save the current cart to localStorage when the "Buy Now" button is clicked
function proceedToCheckout() {
    const cartBody = document.getElementById('cart-body');
    const rows = cartBody.getElementsByTagName('tr');
    const cartItems = [];

    for (let i = 0; i < rows.length; i++) {
        const cells = rows[i].getElementsByTagName('td');
        const item = {
            MovieName: cells[0].innerText,
            NumberofSeats: cells[1].innerText,
            price: cells[2].innerText
        };
        cartItems.push(item);
    }

    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    const totalPrice = document.getElementById('total-price').innerText;
    localStorage.setItem('totalPrice', totalPrice);

    window.location.href = "pay_form.html";
}


// Save current cart to favorites
function saveAsFavorite() {
    const cartBody = document.getElementById('cart-body');
    const rows = cartBody.getElementsByTagName('tr');
    const favoriteItems = [];

    for (let i = 0; i < rows.length; i++) {
        const cells = rows[i].getElementsByTagName('td');
        favoriteItems.push({
            MovieName: cells[0].innerText,
            NumberofSeats: cells[1].innerText,
            price: cells[2].innerText
        });
    }

    localStorage.setItem('favoriteItems', JSON.stringify(favoriteItems));
    alert('Favorites saved successfully!');
}

// Apply favorite items to cart
function applyFavorite() {
    const favoriteItems = JSON.parse(localStorage.getItem('favoriteItems'));
    if (!favoriteItems) {
        alert('No favorites found.');
        return;
    }

    const cartBody = document.getElementById('cart-body');
    cartBody.innerHTML = '';
    let totalPrice = 0;

    favoriteItems.forEach(item => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${item.MovieName}</td>
            <td>${item.NumberofSeats}</td>
            <td>${item.price}</td>
        `;
        cartBody.appendChild(row);

        const price = parseFloat(item.price.replace('$', ''));
        totalPrice += price;
    });

    document.getElementById('total-price').innerText = `$${totalPrice.toFixed(2)}`;
    alert('Favorites applied successfully!');
}

// Attach event listeners
window.onload = function () {
    document.getElementById('add-to-cart-btn').onclick = addToCart;
    document.getElementById('buy-now-btn').onclick = proceedToCheckout;
    document.getElementById('save-favorite-btn').onclick = saveAsFavorite;
    document.getElementById('apply-favorite-btn').onclick = applyFavorite;
};