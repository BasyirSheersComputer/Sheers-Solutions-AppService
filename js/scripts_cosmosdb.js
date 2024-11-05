/*!
* Start Bootstrap - Agency v7.0.12 (https://startbootstrap.com/theme/agency)
* Copyright 2013-2023 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-agency/blob/master/LICENSE)
*/
//
// Scripts
// 

window.addEventListener('DOMContentLoaded', event => {

    // Navbar shrink function
    var navbarShrink = function () {
        const navbarCollapsible = document.body.querySelector('#mainNav');
        if (!navbarCollapsible) {
            return;
        }
        if (window.scrollY === 0) {
            navbarCollapsible.classList.remove('navbar-shrink')
        } else {
            navbarCollapsible.classList.add('navbar-shrink')
        }

    };

    // Shrink the navbar 
    navbarShrink();

    // Shrink the navbar when page is scrolled
    document.addEventListener('scroll', navbarShrink);

    //  Activate Bootstrap scrollspy on the main nav element
    const mainNav = document.body.querySelector('#mainNav');
    if (mainNav) {
        new bootstrap.ScrollSpy(document.body, {
            target: '#mainNav',
            rootMargin: '0px 0px -40%',
        });
    };

    // Collapse responsive navbar when toggler is visible
    const navbarToggler = document.body.querySelector('.navbar-toggler');
    const responsiveNavItems = [].slice.call(
        document.querySelectorAll('#navbarResponsive .nav-link')
    );
    responsiveNavItems.map(function (responsiveNavItem) {
        responsiveNavItem.addEventListener('click', () => {
            if (window.getComputedStyle(navbarToggler).display !== 'none') {
                navbarToggler.click();
            }
        });
    });

});

// Load Cosmos SDK for browser
const { CosmosClient } = window.AzureCosmos;

// Cosmos DB connection configuration
const endpoint = "https://cosmos-sheersdigital-website.documents.azure.com:443/";  // replace with your Cosmos DB endpoint
// const key = "";  // replace with your Cosmos DB key

// Initialize Cosmos Client
const client = new CosmosClient({ endpoint, key });

// Database and Container IDs
const databaseId = "SheersDigital-Website";
const containerId = "WebsiteForm";

// Handle form submission
document.getElementById('contactForm').addEventListener('submit', async function (event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const message = document.getElementById('message').value;

    // Create a new document (record) in Cosmos DB
    try {
        const database = client.database(databaseId);
        const container = database.container(containerId);

        // Create the new item
        const newItem = {
            id: `${Date.now()}`,  // unique ID for each item
            name: name,
            email: email,
            phone: phone,
            message: message
        };

        await container.items.create(newItem);

        // Show success message
        document.getElementById('submitSuccessMessage').classList.remove('d-none');
        document.getElementById('submitButton').classList.add('disabled');
        document.getElementById('contactForm').reset();
    } catch (error) {
        console.error("Error writing to Cosmos DB", error);
        document.getElementById('submitErrorMessage').classList.remove('d-none');
    }
});
