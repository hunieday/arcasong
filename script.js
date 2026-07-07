document.addEventListener("DOMContentLoaded", () => {
    const fadeElements = document.querySelectorAll(".scroll-fade");

    const observerOptions = {
        root: null,
        threshold: 0.15,
        rootMargin: "0px"
    };

    const scrollObserver = new IntersectionObserver((entries, observer) => {
        // Track how many items are appearing in this specific scroll snapshot
        let delayCount = 0;

        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;

                // Assign a staggered delay (150ms multiplied by its order sequence)
                element.style.setProperty('--delay', `${delayCount * 150}ms`);
                delayCount++;

                element.classList.add("appear");
                observer.unobserve(element);
            }
        });
    }, observerOptions);

    fadeElements.forEach(element => {
        scrollObserver.observe(element);
    });
});

function openImagePopup(imageSrc) {
    const lightbox = document.getElementById("image-lightbox");
    const lightboxImg = document.getElementById("lightbox-img");
    
    lightboxImg.src = imageSrc;
    lightbox.style.display = "flex";
    
    // Smooth fade in transition
    setTimeout(() => {
        lightbox.classList.add("show");
    }, 10);
}

function closeImagePopup() {
    const lightbox = document.getElementById("image-lightbox");
    lightbox.classList.remove("show");
    
    setTimeout(() => {
        lightbox.style.display = "none";
    }, 300);
}

function openProfile(charKey) {
    const data = characterData[charKey];
    if (!data) return;

    // Fill structural layout parameters dynamically from the asset configuration matrix
    document.getElementById("modal-title-jp").innerText = data.jpName;
    document.getElementById("modal-title-en").innerText = data.enName;
    document.getElementById("modal-bio").innerText = data.bio;
    document.getElementById("modal-full-body").src = data.fullBody;
    document.getElementById("modal-vertical-quote").innerText = data.quote;
    
    // Set both background wash graphic and central focal render properties
    document.getElementById("modal-bg-large").style.backgroundImage = `url('${data.fullBody}')`;

    // Display overlay element wrapper smoothly
    const modal = document.getElementById("profile-modal");
    modal.style.display = "block";
    setTimeout(() => modal.classList.add("active"), 10);
}

function closeProfile() {
    const modal = document.getElementById("profile-modal");
    modal.classList.remove("active");
    setTimeout(() => modal.style.display = "none", 400);
}