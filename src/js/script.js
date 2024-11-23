/* script.js */

/**
 * Jquery code for smooth scrolling, shopping cart and form submission.
 * 
 * @returns {void}
 */
$(document).ready(function () {
    // Smooth scrolling for links
    $('a[href^="#"]').on('click', function (event) {
        const target = $(this.getAttribute('href'));
        if (target.length) {
            event.preventDefault();
            $('html, body').stop().animate({
                scrollTop: target.offset().top
            }, 1000);
        }
    });

    // Shopping cart script
    $('.btn-success').click(function () {
        alert("Item added to cart successfully!");
    });

    // Form submission alert
    $('form').submit(function (event) {
        event.preventDefault();
        alert("Message sent successfully!");
        // Add your form submission logic here
    });

    if ($('#cart-count').length) {
        updateCartCount();
    } else {
        console.error('Cart count element not found');
    }
});


/**
 * Script for  pagination navigation.
 * 
 * @param {number} productsPerPage Number of products per page
 * @param {jQuery} productList jQuery object containing the product list
 * @param {jQuery} pagination jQuery object containing the pagination element
 * @param {number} currentPage Current page number
 * @param {jQuery} products jQuery object containing the products
 * 
 * @returns {void}
 * 
 */
$(document).ready(function () {
    const productsPerPage = 9;
    const productList = $('#product-list');
    if (!productList.length) {
        console.error('Product list element not found');
        return;
    }
    const products = productList.find('.col-md-4');
    const pagination = $('#pagination');
    let currentPage = 1;

    function showPage(page) {
        const start = (page - 1) * productsPerPage;
        const end = start + productsPerPage;

        products.each(function (index) {
            if (index >= start && index < end) {
                $(this).show();
            } else {
                $(this).hide();
            }
        });
    }

    function setupPagination() {
        const pageCount = Math.ceil(products.length / productsPerPage);
        pagination.html('');

        const prevLi = $('<li class="page-item"><a class="page-link" href="javascript:void(0)" aria-label="Previous">Previous</a></li>');
        prevLi.on('click', function (e) {
            e.preventDefault();
            if (currentPage > 1) {
                currentPage--;
                showPage(currentPage);
                updatePagination();
            }
        });
        pagination.append(prevLi);

        for (let i = 1; i <= pageCount; i++) {
            const li = $(`<li class="page-item"><a class="page-link" href="javascript:void(0)">${i}</a></li>`);
            li.on('click', function (e) {
                e.preventDefault();
                currentPage = i;
                showPage(currentPage);
                updatePagination();
            });
            pagination.append(li);
        }

        const nextLi = $('<li class="page-item"><a class="page-link" href="javascript:void(0)" aria-label="Next">Next</a></li>');
        nextLi.on('click', function (e) {
            e.preventDefault();
            if (currentPage < pageCount) {
                currentPage++;
                showPage(currentPage);
                updatePagination();
            }
        });
        pagination.append(nextLi);

        updatePagination();
    }

    function updatePagination() {
        const pageItems = pagination.find('.page-item');
        pageItems.removeClass('active');
        pageItems.eq(currentPage).addClass('active');

        // Disable previous button if on the first page
        pageItems.first().toggleClass('disabled', currentPage === 1);

        // Disable next button if on the last page
        pageItems.last().toggleClass('disabled', currentPage === pageItems.length - 2);
    }

    if (products.length > productsPerPage) {
        showPage(1);
        setupPagination();
    }

    updateCartCount();

    $('#cart-items').on('click', '.remove-item', function () {
        const productId = $(this).data('id');
        removeFromCart(productId); // Use the removeFromCart function
    });
});

function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartCount = cart.reduce((total, product) => total + product.quantity, 0);
    const cartCountElement = $('#cart-count');
    if (cartCountElement.length) {
        cartCountElement.text(cartCount);
    } else {
        console.error('Cart count element not found');
    }
}

function addToCart(productId) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const product = products.find(p => p.id == productId);
    const existingProduct = cart.find(p => p.id == productId);

    if (existingProduct) {
        existingProduct.quantity += 1;
    } else {
        product.quantity = 1;
        cart.push(product);
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    alert(`${product.name} has been added to your cart.`);
    updateCartCount();
}

function removeFromCart(productId) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart = cart.filter(p => p.id != productId);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    loadCart(); // Ensure the cart is reloaded after removing an item
}

// Ensure product.price is a number
function formatPrice(product) {
    return `$${parseFloat(product.price).toFixed(2)}`;
}

