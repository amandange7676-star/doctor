$(document).ready(function () {
    // Load Home-64 first
    $("#home-64").load("home-64.html", function () {
        // Hover Animations for Home-64
        document.querySelector(".home-64").addEventListener("mouseenter", () => {
            gsap.to(".home-64-video", {
                scale: 3.8,
                xPercent: -160,
                yPercent: -160,
                duration: 1.5,
                ease: "power2.out"
            });
            gsap.to(".home-64 .container", {
                y: -200,
                opacity: 0,
                duration: 1.2,
                ease: "power2.out"
            });
        });

        document.querySelector(".home-64").addEventListener("mouseleave", () => {
            gsap.to(".home-64-video", {
                scale: 1,
                xPercent: 0,
                yPercent: 0,
                duration: 1.5,
                ease: "power2.out"
            });
            gsap.to(".home-64 .container", {
                y: 0,
                opacity: 1,
                duration: 1.2,
                ease: "power2.out"
            });
        });
    });

    // Other sections (independent of hover)
    $("#events-3").load("events-3.html", function () {
        initEvents3();
        ScrollTrigger.refresh();
    });

    $("#events-4").load("events-4.html", function () {
        initEvents4();
        ScrollTrigger.refresh();
    });

    $("#about-33").load("about-33.html", function () {
        initAbout33();
        ScrollTrigger.refresh();
    });

    $("#ourteam-3").load("ourteam-3.html", function () {
        initOurteam3();
        ScrollTrigger.refresh();
    });

    $("#home-62").load("home-62.html", function () {
        initHome62();
        ScrollTrigger.refresh();
    });

    $("#home-63").load("home-63.html", function () {
        initHome63();
        ScrollTrigger.refresh();
    });
    $("#home-64").load("home-64.html", function () {
        initHome64();
        ScrollTrigger.refresh();
    });
    $("#home-65").load("home-65.html", function () {
        initHome65();
        ScrollTrigger.refresh();
    });

    $("#home-66").load("home-66.html", function () {
        initHome66();
        ScrollTrigger.refresh();
    });

    $("#home-67").load("home-67.html", function () {
        initHome67();
        ScrollTrigger.refresh();
    });

    $("#home-68").load("home-68.html", function () {
        initHome68();
        ScrollTrigger.refresh();
    });

    $("#about-40").load("about-40.html", function () {
        initAbout40();
        ScrollTrigger.refresh();
    });

    $("#contact-15").load("contact-15.html", function () {
        initContact15();
        ScrollTrigger.refresh();
    });

    $("#services-21").load("services-21.html", function () {
        initServices21();
        ScrollTrigger.refresh();
    });

    $("#services-23").load("services-23.html", function () {
        initServices23();
        ScrollTrigger.refresh();
    });
});
