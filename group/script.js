

const scrollRevealOption={
    origin:"bottom",
    distance:"50px",
    duration:"1000"
};
ScrollReveal().reveal(".section_image img",{
    ...scrollRevealOption,
    origin:"right",
});
ScrollReveal().reveal(".section_content h1",{
    ...scrollRevealOption,
    delay:500,
});
ScrollReveal().reveal(".section_content p",{
    ...scrollRevealOption,
    delay:1000,
});

const banner=document.querySelector(".banner_container");

const bannerContent =Array.from(banner.children);
bannerContent.forEach((item) => {
    const duplication=item.cloneNode(true);
    duplication.setAttribute("aria-hidden",true)
    banner.appendChild(duplication)
});
// slider sale
let slideIndex = 0;
const track = document.getElementById("sliderTrack");
const slides = document.querySelectorAll(".slider_track .sale_image");


track.addEventListener("click", (e) => {
     const width = track.offsetWidth;
   
    const clickX = e.offsetX;
    if (clickX < width / 2) {
        
        slideIndex--;
    } else {
        
        slideIndex++;
    }

    if (slideIndex >= slides.length) { slideIndex = 0; }
    if (slideIndex < 0) { slideIndex = slides.length - 1; }

    track.style.transform = `translateX(-${slideIndex * 100}%)`;
});
// ANOUT US
let next = document.querySelector('.next');
let prev = document.querySelector('.prev');

next.onclick = function() {
    let items = document.querySelectorAll('.about-item');
    document.querySelector('.slide').appendChild(items[0]);
};

prev.onclick = function() {
    let items = document.querySelectorAll('.about-item');
    document.querySelector('.slide').prepend(items[items.length - 1]);
};































// 
 // 1. Target ALL containers with the class ".product_field"
    const allProductSections = document.querySelectorAll('.product_field');

    allProductSections.forEach((section) => {
        // 2. Locate the list (ul) inside THIS specific section
        const list = section.querySelector('ul');
        let isDown = false;
        let startX;
        let scrollLeft;
        let isMoving = false;

        // --- MOUSE DRAG LOGIC ---
        list.addEventListener('mousedown', (e) => {
            isDown = true;
            isMoving = false;
            startX = e.pageX - list.offsetLeft;
            scrollLeft = list.scrollLeft;
        });

        list.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            isMoving = true;
            e.preventDefault();
            const x = e.pageX - list.offsetLeft;
            const walk = (x - startX) * 2; 
            list.scrollLeft = scrollLeft - walk;
        });

        window.addEventListener('mouseup', () => isDown = false);
        list.addEventListener('mouseleave', () => isDown = false);

        // --- EDGE-CLICK LOGIC ---
        section.addEventListener('click', (e) => {
            if (isMoving) return; 
            const rect = section.getBoundingClientRect();
            const clickX = e.clientX - rect.left;
            const zone = rect.width * 0.2; // Defines the clickable 20% edge

            if (clickX < zone) {
                list.scrollBy({ left: -400, behavior: 'smooth' });
            } else if (clickX > (rect.width - zone)) {
                list.scrollBy({ left: 400, behavior: 'smooth' });
            }
        });

        // --- MOUSE WHEEL LOGIC ---
        list.addEventListener('wheel', (e) => {
            if (e.deltaY !== 0) {
                e.preventDefault();
                list.scrollLeft += e.deltaY;
            }
        }, { passive: false });
    });

    
document.addEventListener('DOMContentLoaded', () => {
    const indicatorLinks = document.querySelectorAll('.indicator li a');
    const sortSelect = document.querySelector('.filer-condition select');
    const allRows = document.querySelectorAll('.product_field');

    // --- FUNCTION: FILTER BY GENDER ---
    indicatorLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const category = link.id; // 'all', 'men', 'women', 'kid'

            allRows.forEach(row => {
                const items = row.querySelectorAll('li');
                items.forEach(item => {
                    const itemCat = item.getAttribute('data-catagory');
                    if (category === 'all' || itemCat === category) {
                        item.style.display = 'block';
                    } else {
                        item.style.display = 'none';
                    }
                });
            });
        });
    });

    // --- FUNCTION: SORT BY PRICE ---
    sortSelect.addEventListener('change', () => {
        const val = sortSelect.value;
        if (val === "Default") return;

        allRows.forEach(row => {
            const list = row.querySelector('ul');
            const items = Array.from(list.querySelectorAll('li'));

            items.sort((a, b) => {
                // Extracts number from "RM200"
                const priceA = parseInt(a.querySelector('h4').innerText.replace(/\D/g, ''));
                const priceB = parseInt(b.querySelector('h4').innerText.replace(/\D/g, ''));

                return val === "LowToHigh" ? priceA - priceB : priceB - priceA;
            });

            // Re-append items in new order
            items.forEach(item => list.appendChild(item));
        });
    });
});

// Sing up /Log in
const authOverlay  = document.getElementById('authOverlay');
const authClose    = document.getElementById('authClose');
const signupForm   = document.getElementById('signupForm');
const loginForm    = document.getElementById('loginForm');
const tabSignup    = document.getElementById('tabSignup');
const tabLogin     = document.getElementById('tabLogin');
const signupBtn    = document.querySelector('.header .btn');

function openModal(showTab) {
    authOverlay.classList.add('active');
    document.body.classList.add('modal_open');
    switchTab(showTab || 'signup');
}

function closeModal() {
    authOverlay.classList.remove('active');
    document.body.classList.remove('modal_open');
}

function switchTab(tab) {
    if (tab === 'signup') {
        signupForm.classList.remove('hidden');
        loginForm.classList.add('hidden');
        tabSignup.classList.add('active');
        tabLogin.classList.remove('active');
    } else {
        loginForm.classList.remove('hidden');
        signupForm.classList.add('hidden');
        tabLogin.classList.add('active');
        tabSignup.classList.remove('active');
    }
}

// Open  Sign Up button
if (signupBtn) signupBtn.addEventListener('click', () => openModal('signup'));

// Tab clicks
tabSignup.addEventListener('click', () => switchTab('signup'));
tabLogin.addEventListener('click',  () => switchTab('login'));

// In-form switch links
document.getElementById('switchToLogin').addEventListener('click',  () => switchTab('login'));
document.getElementById('switchToSignup').addEventListener('click', () => switchTab('signup'));

// Close button & overlay click
authClose.addEventListener('click', closeModal);
authOverlay.addEventListener('click', (e) => { if (e.target === authOverlay) closeModal(); });

// Escape key
document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeModal(); });

