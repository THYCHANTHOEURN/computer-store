/* script.js */

/**
 * Jquery code for smooth scrolling, shopping cart and form submission.
 *
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
});


/**
 * Script for  pagination navigation.
 * 
 * JavaScript code to implement pagination on the product list page.
 * 
 */
document.addEventListener('DOMContentLoaded', function () {
    const productsPerPage = 9;
    const productList = document.getElementById('product-list');
    if (!productList) {
        console.error('Product list element not found');
        return;
    }
    const products = Array.from(productList.getElementsByClassName('col-md-4'));
    const pagination = document.getElementById('pagination');
    let currentPage = 1;

    function showPage(page) {
        const start = (page - 1) * productsPerPage;
        const end = start + productsPerPage;

        products.forEach((product, index) => {
            if (index >= start && index < end) {
                product.style.display = 'block';
            } else {
                product.style.display = 'none';
            }
        });
    }

    function setupPagination() {
        const pageCount = Math.ceil(products.length / productsPerPage);
        pagination.innerHTML = '';

        const prevLi = document.createElement('li');
        prevLi.className = 'page-item';
        prevLi.innerHTML = `<a class="page-link" href="javascript:void(0)" aria-label="Previous">Previous</a>`;
        prevLi.addEventListener('click', (e) => {
            e.preventDefault();
            if (currentPage > 1) {
                currentPage--;
                showPage(currentPage);
                updatePagination();
            }
        });
        pagination.appendChild(prevLi);

        for (let i = 1; i <= pageCount; i++) {
            const li = document.createElement('li');
            li.className = 'page-item';
            li.innerHTML = `<a class="page-link" href="javascript:void(0)">${i}</a>`;
            li.addEventListener('click', (e) => {
                e.preventDefault();
                currentPage = i;
                showPage(currentPage);
                updatePagination();
            });
            pagination.appendChild(li);
        }

        const nextLi = document.createElement('li');
        nextLi.className = 'page-item';
        nextLi.innerHTML = `<a class="page-link" href="javascript:void(0)" aria-label="Next">Next</a>`;
        nextLi.addEventListener('click', (e) => {
            e.preventDefault();
            if (currentPage < pageCount) {
                currentPage++;
                showPage(currentPage);
                updatePagination();
            }
        });
        pagination.appendChild(nextLi);

        updatePagination();
    }

    function updatePagination() {
        const pageItems = pagination.getElementsByClassName('page-item');
        for (let i = 1; i < pageItems.length - 1; i++) {
            pageItems[i].classList.remove('active');
            if (i === currentPage) {
                pageItems[i].classList.add('active');
            }
        }

        // Disable previous button if on the first page
        if (currentPage === 1) {
            pageItems[0].classList.add('disabled');
        } else {
            pageItems[0].classList.remove('disabled');
        }

        // Disable next button if on the last page
        if (currentPage === pageItems.length - 2) {
            pageItems[pageItems.length - 1].classList.add('disabled');
        } else {
            pageItems[pageItems.length - 1].classList.remove('disabled');
        }
    }

    if (products.length > productsPerPage) {
        showPage(1);
        setupPagination();
    }
});

