// Harini Manohar's sprint 1 Meera's Kitchen JavaScript file

// Hero Section Slideshow
let slideIndex = 1;

function showSlides(n) {
    const slides = document.getElementsByClassName("slides");
    const dots = document.getElementsByClassName("dot");

    if (slides.length === 0) return; // Exit if no slides exist

    if (n > slides.length) { slideIndex = 1; }
    if (n < 1) { slideIndex = slides.length; }

    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }

    for (let i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }

    slides[slideIndex - 1].style.display = "block";
    if (dots.length > 0) {
        dots[slideIndex - 1].className += " active";
    }
}

function plusSlides(n) {
    showSlides(slideIndex += n);
}

function currentSlide(n) {
    showSlides(slideIndex = n);
}

// Testimonial Slideshow
let testimonialIndex = 1;

function showTestimonials(n) {
    const testimonials = document.getElementsByClassName("testimonial");

    if (testimonials.length === 0) return; // Exit if no testimonials exist

    if (n > testimonials.length) { testimonialIndex = 1; }
    if (n < 1) { testimonialIndex = testimonials.length; }

    for (let i = 0; i < testimonials.length; i++) {
        testimonials[i].style.display = "none";
    }

    testimonials[testimonialIndex - 1].style.display = "block";
}

function plusTestimonials(n) {
    showTestimonials(testimonialIndex += n);
}

// Auto-play for Hero and Testimonial Sections
setInterval(() => {
    plusSlides(1);
}, 3500);

setInterval(() => {
    plusTestimonials(1);
}, 3500);

// Function for menu section gallery slides
function autoSlideGallery() {
    const galleries = document.querySelectorAll('.gallery-slideshow');

    galleries.forEach(gallery => {
        let slideIndex = 0;
        const slides = gallery.querySelectorAll('.slide-container');

        if (slides.length === 0) return; // Ensure slides exist

        setInterval(() => {
            slides.forEach(slide => {
                slide.style.display = 'none';
            });

            slideIndex++;
            if (slideIndex >= slides.length) slideIndex = 0;
            slides[slideIndex].style.display = 'flex';
        }, 3000); 
    });
}

// Ensure all slideshows start correctly when the DOM is loaded
window.onload = function() {
    showSlides(slideIndex);
    showTestimonials(testimonialIndex);
    autoSlideGallery();
};

// Menu items with their properties
const menuItems = [
    { id: 1, name: 'Masala Vada', price: 5.99 },
    { id: 2, name: 'Medu Vada', price: 5.99 },
    { id: 3, name: 'Idli Varieties', price: 4.99 },
    { id: 4, name: 'Dosa Varieties', price: 4.99 },
    { id: 5, name: 'Upma Varieties', price: 4.99 },
    { id: 6, name: 'Uthappam Varieties', price: 4.99 },
    { id: 7, name: 'Rice Varieties', price: 10.99 },
    { id: 8, name: 'Paratha Varieties', price: 10.99 },
    { id: 9, name: 'Pizza', price: 7.99 },
    { id: 10, name: 'Curry', price: 5.99 },
    { id: 11, name: 'Pasta', price: 8.99 },
    { id: 12, name: 'Burgers', price: 6.99 },
    { id: 13, name: 'Samosa', price: 3.99 },
    { id: 14, name: 'Vada', price: 3.99 },
    { id: 15, name: 'Mixture', price: 4.99 },
    { id: 16, name: 'Fryums', price: 5.99 },
    { id: 17, name: 'Kolbadai', price: 4.99 },
    { id: 18, name: 'Pakodas', price: 4.99 },
    { id: 19, name: 'Cakes', price: 5.99 },
    { id: 20, name: 'Diwali Sweets', price: 10.99 },
    { id: 21, name: 'Fruits', price: 2.99 },
    { id: 22, name: 'Donuts', price: 2.99 },
    { id: 23, name: 'Gulab Jamun', price: 3.99 },
    { id: 24, name: 'Sambar', price: 3.99 },
    { id: 25, name: 'Raita', price: 1.99 },
    { id: 26, name: 'Pickle', price: 0.99 }
];

let selectedItems = []; // Array for selected items

// Display menu items in a table format
function displayMenuItems() {
    const tableBody = document.getElementById('menu-table-body');
    menuItems.forEach(item => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${item.name}</td>
            <td>$${item.price.toFixed(2)}</td>
            <td><input type="number" min="0" id="quantity-${item.id}" placeholder="0" style="width: 50px;"></td>
            <td><button onclick="selectItem(${item.id})">Add</button></td>
        `;
        tableBody.appendChild(row);
    });
}

// Add item to the order
function selectItem(itemId) {
    const quantityInput = document.getElementById(`quantity-${itemId}`);
    const quantity = parseInt(quantityInput.value, 10);

    if (isNaN(quantity) || quantity <= 0) {
        alert('Please enter a valid quantity.');
        return;
    }

    const item = menuItems.find(i => i.id === itemId);
    if (item) {
        const existingItemIndex = selectedItems.findIndex(i => i.id === itemId);
        if (existingItemIndex > -1) {
            selectedItems[existingItemIndex].quantity += quantity;
        } else {
            selectedItems.push({ ...item, quantity });
        }
        updateSelectedItemsDisplay();
    }
    quantityInput.value = ''; // Reset the input field
}

// Update the selected items in the cart
function updateSelectedItemsDisplay() {
    const selectedItemsContainer = document.getElementById('selected-items-list');
    if (selectedItems.length === 0) {
        selectedItemsContainer.innerHTML = '<p>No items selected.</p>';
    } else {
        selectedItemsContainer.innerHTML = selectedItems.map(item => `
            <div>${item.name} - Quantity: ${item.quantity} - Total: $${(item.price * item.quantity).toFixed(2)}</div>
        `).join('');
        updateCartTotal();
    }
}

// Update total amount in the cart
function updateCartTotal() {
    const total = selectedItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    document.getElementById('cart-total').textContent = `$${total.toFixed(2)}`;
}

// Show/hide delivery details based on radio button selection
document.querySelectorAll('input[name="order-type"]').forEach(radio => {
    radio.addEventListener('change', () => {
        const deliveryDetails = document.getElementById('delivery-details');
        deliveryDetails.style.display = (radio.value === 'delivery') ? 'block' : 'none';
    });
});

// Initialize display on page load
window.onload = function() {
    displayMenuItems();
};