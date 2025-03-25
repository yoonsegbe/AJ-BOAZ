document.addEventListener("DOMContentLoaded", function () {
    // Loader functionality
    const loader = document.querySelector(".preloader");
    setTimeout(() => {
        loader.style.display = "none";
    }, 3000);

    // Theme toggle functionality
    const themeToggle = document.getElementById("theme-toggle");
    themeToggle.addEventListener("click", function () {
        document.body.classList.toggle("dark-mode");
    });

    // Mobile menu toggle
    const menuToggle = document.querySelector(".menu-toggle");
    const dropdownNav = document.querySelector(".dropdown-nav");
    menuToggle.addEventListener("click", function () {
        dropdownNav.style.display = dropdownNav.style.display === "block" ? "none" : "block";
    });


  // Product management system
    const productForm = document.getElementById("productForm");
    const productsContainer = document.getElementById("products");
    let products = JSON.parse(localStorage.getItem("products")) || [];

    function saveProducts() {
        localStorage.setItem("products", JSON.stringify(products));
    }

    function renderProducts() {
        productsContainer.innerHTML = "";
        products.forEach((product, index) => {
            const productElement = document.createElement("div");
            productElement.classList.add("product");
            productElement.innerHTML = `
                <img src="${product.image}" alt="${product.name}">
                <h3>${product.name}</h3>
                <p>$${product.price}</p>
                <button onclick="deleteProduct(${index})">Delete</button>
            `;
            productsContainer.appendChild(productElement);
        });
    }

    productForm.addEventListener("submit", function (event) {
        event.preventDefault();
        const name = document.getElementById("productName").value;
        const price = document.getElementById("productPrice").value;
        const image = document.getElementById("productImage").value;
        
        products.push({ name, price, image });
        saveProducts();
        renderProducts();
        productForm.reset();
    });

    window.deleteProduct = function (index) {
        products.splice(index, 1);
        saveProducts();
        renderProducts();
    };

    renderProducts();
});

document.getElementById("contactForm").addEventListener("submit", function(event){
    event.preventDefault();

    let formData = new FormData(this);

    fetch("submit_complaint.php", {
        method: "post",
        body: formData
    })
    .then(response => response.text())
    .then(data => {
        document.getElementById("responseMessage").innerHTML = data;
    })
    .catch(error => console.error("Error:", error));
});

