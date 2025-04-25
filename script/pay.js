// Load cart from localStorage when page loads
window.onload = function () {
    loadCart();
};

function loadCart() {
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    const cartBody = document.getElementById('cart-body');
    const totalPriceElement = document.getElementById('total-price');
    let totalPrice = 0;

    cartBody.innerHTML = '';

    cartItems.forEach(item => {
        const row = document.createElement('tr');
        const price = parseFloat(item.price.replace('$', ''));
        totalPrice += price;

        row.innerHTML = `
            <td>${item.MovieName}</td>
            <td>${item.NumberofSeats}</td>
            <td>${item.price}</td>
        `;
        cartBody.appendChild(row);
    });

    totalPriceElement.innerText = `$${totalPrice.toFixed(2)}`;
}

function proceedToPayment() {
    // Get personal info
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const phone = document.getElementById('phone').value.trim();

    // Get seat preferences
    const seatType = document.getElementById('seatType').value;
    const seatLocation = document.getElementById('seatLocation').value;
    const seatCount = document.getElementById('seatCount').value;

    // Get payment info
    const cardName = document.getElementById('card-name').value.trim();
    const cardNumber = document.getElementById('card-number').value.trim();
    const expiryDate = document.getElementById('expiry-date').value;
    const cvv = document.getElementById('cvv').value.trim();

    // Validate all fields
    if (!name || !email || !phone ||
        !seatType || !seatLocation || !seatCount ||
        !cardName || !cardNumber || !expiryDate || !cvv) {
        alert("Please fill in all required fields.");
        return;
    }

    // Simulate booking reference number
    const bookingReference = "BK" + Math.floor(100000 + Math.random() * 900000);

    // Assume movie time from localStorage or set a placeholder
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    const movieName = cartItems.length > 0 ? cartItems[0].MovieName : "Unknown Movie";
    const movieTime = "7:30 PM"; // You can customize or store this in cartItems if available

    // Show confirmation alert
    alert(` Thank you for your purchase, ${name}!\n\n` +
            `Movie Name: ${movieName}\n Movie Time: ${movieTime}\n` +
            `Seat Type: ${seatType}, Location: ${seatLocation}, Count: ${seatCount}\n` +
            `Your Booking Reference: ${bookingReference}\n\n` +
            `An electronic ticket has been sent to your email.`);

    // Save details if needed
    const userData = {
        name, email, phone,
        seatType, seatLocation, seatCount,
        cardName, cardNumber, expiryDate, cvv,
        bookingReference
    };
    localStorage.setItem('bookingInfo', JSON.stringify(userData));


}
