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

// Handle form submission
document.getElementById('contactForm').addEventListener('submit', async function (event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const message = document.getElementById('message').value;

    // Send form data to Logic App URL
    const logicAppUrl = 'https://prod-34.southeastasia.logic.azure.com:443/workflows/b2499626cbff4278a32178764c29ae2e/triggers/When_a_HTTP_request_is_received/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2FWhen_a_HTTP_request_is_received%2Frun&sv=1.0&sig=WwLnP8kQFS6J1H-Xly1JiWXRXpwuE7Q27yyYsr01gKI';  // replace with your Logic App's HTTP POST URL

    try {
        const response = await fetch(logicAppUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: name,
                email: email,
                phone: phone,
                message: message
            })
        });

        if (response.ok) {
            document.getElementById('submitSuccessMessage').classList.remove('d-none');
            document.getElementById('submitButton').classList.add('disabled');
            document.getElementById('contactForm').reset();
        } else {
            throw new Error('Submission failed');
        }
    } catch (error) {
        console.error("Error submitting form", error);
        document.getElementById('submitErrorMessage').classList.remove('d-none');
    }
});
