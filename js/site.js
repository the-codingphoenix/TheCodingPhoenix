// Mobile menu
(function () {
    var btn = document.querySelector('.menu-toggle');
    var nav = document.getElementById('site-nav');
    if (btn && nav) {
        btn.addEventListener('click', function () {
            var open = nav.classList.toggle('open');
            btn.setAttribute('aria-expanded', open ? 'true' : 'false');
            btn.innerHTML = open ? '<i class="ri-close-line"></i>Close' : '<i class="ri-menu-line"></i>Menu';
        });
    }
    var year = document.getElementById('year');
    if (year) year.textContent = new Date().getFullYear();
})();

// Request form: preselect a service from the link (request.html?service=Growth%20Site)
// and submit to Formspree without leaving the page.
(function () {
    var form = document.getElementById('request-form');
    if (!form) return;

    var wanted = new URLSearchParams(window.location.search).get('service');
    var select = document.getElementById('service');
    if (wanted && select) {
        for (var i = 0; i < select.options.length; i++) {
            if (select.options[i].text === wanted) { select.selectedIndex = i; break; }
        }
    }

    var status = form.querySelector('.form-status');
    var button = form.querySelector('button[type="submit"]');

    form.addEventListener('submit', function (e) {
        e.preventDefault();
        button.disabled = true;
        button.textContent = 'Sending...';
        status.className = 'form-status';

        fetch(form.action, {
            method: 'POST',
            body: new FormData(form),
            headers: { 'Accept': 'application/json' }
        }).then(function (res) {
            if (!res.ok) throw new Error('Request failed');
            form.reset();
            status.className = 'form-status ok';
            status.textContent = 'Thank you! Your request was sent. I’ll reply within one business day.';
        }).catch(function () {
            status.className = 'form-status err';
            status.innerHTML = 'Sorry, something went wrong. Please email <a href="mailto:businesssolutions@rm-legacy.org">businesssolutions@rm-legacy.org</a> or call (352) 389-5141.';
        }).finally(function () {
            button.disabled = false;
            button.textContent = 'Send My Request';
        });
    });
})();
