
$(document).ready(function () {
    gsap.registerPlugin(ScrollTrigger);
  initHome64();
      initHome65();
    initHome66();
    initHome67();
    initHome68();
    initEvents3();
    initEvents4();
    initAbout33();
    initOurteam3();
    initHome62();
    initHome63();


    initAbout40();
    initContact15();
    initServices21();
    initServices23();

    ScrollTrigger.refresh(); // one global refresh
});

// Events-3 animation
function initEvents3() {
    gsap.from(".section-wrapper.events-3 .event-card", {
        opacity: 0,
        y: 50,
        scale: 1.8,
        rotateX: -90,
        transformOrigin: "center top",
        duration: 1,
        ease: "power3.out",
        stagger: 0.2,
        scrollTrigger: {
            trigger: ".section-wrapper.events-3",
            start: "top 40%",
            end: "bottom top",
            toggleActions: "play none play reverse",
            markers: false
        }
    });
}

// Events-4 animation
function initEvents4() {
    gsap.utils.toArray(".section-wrapper.events-4 .events-4-card").forEach((card) => {
        gsap.from(card, {
            scale: 0,
            opacity: 0,
            duration: 1.2,
            ease: "elastic.out(1, 0.4)",
            scrollTrigger: {
                trigger: card,
                start: "top 85%",
                toggleActions: "play none play reverse",
                markers: false
            }
        });
    });
}
// about-33 animation

function initAbout33() {
  const distance = window.innerWidth * 1.2; // move across viewport width

  gsap.utils.toArray(".about-33-text").forEach((el, i) => {
    gsap.fromTo(
      el,
      { x: i % 2 === 0 ? -distance : distance },
      {
        x: i % 2 === 0 ? distance : -distance,
        ease: "none",
        scrollTrigger: {
          trigger: ".about-33",    // entire section
          start: "top top",        // start when section hits top
          end: "+=200%",           // continue for extra scroll distance
          scrub: true,             // 🔑 ties to scroll
          pin: false,              // no pin, just parallax scroll
          // markers: true          // enable for debugging
        }
      }
    );
  });
}

// ourteam-3 animation
function initOurteam3() {
  gsap.utils.toArray("#ourteam-3 .ourteam-3-card").forEach((el) => {
    gsap.from(el, {
      x: 100,
      y: 100,
      rotation: 360,
      scale: 0,
      opacity: 0,
      duration: 1.5,
      ease: "power3.out",
      scrollTrigger: {
        trigger: el,
        start: "top 85%",
      }
    });
  });
}


function initHome63() {
    const cards = document.querySelectorAll(".home-63-card");

    // Floating animation (already in your code)
    cards.forEach((card, i) => {
        let direction = i % 2 === 0 ? -1 : 1; // alternate directions
        gsap.to(card, {
            y: 30 * direction,
            duration: 1 + i,
            ease: "easeInOut",
            repeat: -1,
            yoyo: true
        });
    });

    // 3D scroll effect
    gsap.utils.toArray(".home-63-card").forEach((card, i) => {
        gsap.fromTo(card,
            {
                rotationY: i % 2 === 0 ? -20 : 20,
                rotationX: -30,
                scale: 0.9,
                opacity: 0.6,
                transformPerspective: 1000,
                transformOrigin: "center center"
            },
            {
                rotationY: 0,
                rotationX: 0,
                scale: 1,
                opacity: 1,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: card,
                    start: "top 80%",
                    end: "bottom 60%",
                    scrub: true
                }
            }
        );
    });
}



// Home-64 animation
    function initHome64() {
    gsap.to(".home-64-video", {
        scale: 3.8,
        xPercent: -160,
        yPercent: -160,
        scrollTrigger: {
            trigger: ".home-64",
            start: "top top",
            end: "bottom top",
            scrub: true,
            pin: true
        }
    });

    // Fade out text
    gsap.to(".home-64 .container", {
        y: -200,
        opacity: 0,
        scrollTrigger: {
            trigger: ".home-64",
            start: "top center",
            end: "bottom top",
            scrub: true
        }
    });
}

// Home-65 animation


function initHome65() {
gsap.to(".home-65-col1", {
  yPercent: -100,   // moves through duplicated set
  repeat: -1,
  duration: 5,     // adjust for speed (smaller = faster)
  ease: "none"      // keeps movement perfectly smooth
});

// Column 2 (top → bottom)
gsap.to(".home-65-col2", {
  yPercent: 100,
  repeat: -1,
  duration: 5,
  ease: "none"
});
}

function initHome66() {
  const sections = gsap.utils.toArray(".home-66-section");

  sections.forEach((panel, i) => {
    ScrollTrigger.create({
      trigger: panel,
      start: "top 30%",      // pin starts when section reaches 30% from top
      end: "+=100%",         // pin for full viewport scroll
      pin: true,
      pinSpacing: false,
      scrub: true,
      markers: false,
      onUpdate: (self) => {
        if (i > 0) {
          // Progress goes 0 → 1 while scrolling this section
          gsap.to(sections[i - 1], {
            yPercent: -60 * self.progress, // overlap 60% gradually
            overwrite: "auto",
            duration: 0
          });
        }
      }
    });
  });
}



function initHome62(){
 gsap.from(".home-62-title", {
        opacity: 0,
        y: 100,
        rotationX: -45,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
            trigger: ".home-62",
            start: "top 80%"
        }
    });

    gsap.from(".home-62-subtitle", {
        opacity: 0,
        y: 80,
        rotationX: -30,
        duration: 1,
        delay: 0.1,
        ease: "power3.out",
        scrollTrigger: {
            trigger: ".home-62",
            start: "top 75%"
        }
    });

    // Background parallax effect
    gsap.to(".home-62.section-wrapper", {
        backgroundPosition: "50% 80%",
        ease: "none",
        scrollTrigger: {
            trigger: ".home-62",
            start: "top bottom",
            end: "bottom top",
            scrub: true
        }
    });

    const img = document.querySelector(".home-62-main-img");

    // 1️⃣ On Scroll Animation (3D entrance)
    gsap.from(img, {
        rotationY: -45,
        rotationX: 20,
        scale: 0.8,
        filter: "blur(10px)",
        duration: 1.5,
        ease: "power3.out",
        scrollTrigger: {
            trigger: ".home-62",
            start: "top 80%",
            toggleActions: "play none none reverse"
        }
    });

    // 2️⃣ On Hover Tilt Effect
    img.addEventListener("mousemove", (e) => {
        const bounds = img.getBoundingClientRect();
        const x = e.clientX - bounds.left;
        const y = e.clientY - bounds.top;
        const centerX = bounds.width / 2;
        const centerY = bounds.height / 2;

        // Tilt range
        const maxTilt = 20;
        const rotateX = ((y - centerY) / centerY) * maxTilt;
        const rotateY = ((x - centerX) / centerX) * maxTilt;

        gsap.to(img, {
            rotationX: -rotateX,
            rotationY: rotateY,
            scale: 1.08,
            duration: 0.3,
            ease: "power2.out"
        });
    });

    // Reset when mouse leaves
    img.addEventListener("mouseleave", () => {
        gsap.to(img, {
            rotationX: 0,
            rotationY: 0,
            scale: 1,
            duration: 0.6,
            ease: "power2.out"
        });
    });
}
function initHome67(){

  // Split "Dominic" into spans
  const title = document.querySelector(".home-67-title");
  const text = title.textContent;
  title.textContent = "";
  text.split("").forEach(char => {
    let span = document.createElement("span");
    span.className = "home-67-letter";
    span.textContent = char;
    title.appendChild(span);
  });

  // Background hover 3D effect
  const section = document.querySelector(".home-67");
  section.addEventListener("mouseenter", () => {
    gsap.to(section, {
      scale: 1.05,
      rotationY: 8,
      rotationX: 4,
      duration: 1,
      ease: "power3.out"
    });
  });
  section.addEventListener("mouseleave", () => {
    gsap.to(section, {
      scale: 1,
      rotationY: 0,
      rotationX: 0,
      duration: 1,
      ease: "power3.out"
    });
  });

  // Animate each letter with 3D reveal effect
  gsap.from(".home-67-letter", {
    opacity: 0,
    scale: 0,
    z: -200,
    stagger: 0.15,
    duration: 1.2,
    ease: "back.out(2)",
    scrollTrigger: {
      trigger: ".home-67-title",
      start: "top 85%",
      toggleActions: "play reverse play reverse"
    }
  });
}


function initAbout38(){

  // Split text into letters
  const splitText = (selector) => {
    document.querySelectorAll(selector).forEach(el => {
      if (!el.dataset.split) { // prevent splitting multiple times
        let chars = el.textContent.split("");
        el.innerHTML = chars.map(ch => `<span class="char">${ch}</span>`).join("");
        el.dataset.split = "true";
      }
    });
  };

  splitText(".about-38-text");

  // SCROLL ANIMATION
  gsap.from(".about-38-text .char", {
    scrollTrigger: {
      trigger: ".about-38",
      start: "top 80%",
    },
    opacity: 0,
    y: 80,
    rotateX: 90,
    transformOrigin: "50% 50% -20",
    ease: "back.out(2)",
    duration: 1,
    stagger: {
      amount: 1.5,
      from: "start"
    }
  });

  // HOVER ANIMATION
  const section = document.querySelector(".about-38");
  section.addEventListener("mouseenter", () => {
    gsap.fromTo(".about-38-text .char",
      {opacity: 0.4, y: 30, rotateX: -60},
      {
        opacity: 1,
        y: 0,
        rotateX: 0,
        ease: "elastic.out(1, 0.6)",
        duration: 1,
        stagger: {
          amount: 0.8,
          from: "center"
        }
      }
    );
  });
}


function initHome68() {
 gsap.from(".home-68 .home-68-eyebrow, .home-68 .home-68-title, .home-68 .home-68-role, .home-68 .home-68-desc, .home-68 .home-68-cta, .home-68 .home-68-social", {
    scrollTrigger: { trigger: ".home-68", start: "top 80%" },
    y: 20, opacity: 0, duration: 0.8, ease: "power2.out", stagger: 0.08
  });

  gsap.from(".home-68 .home-68-card", {
    scrollTrigger: { trigger: ".home-68", start: "top 75%" },
    x: 40, opacity: 0, duration: 1, ease: "power3.out"
  });

  // Floating chips idle animation
  gsap.to(".home-68 .home-68-skill", {
    y: (i) => i%2 ? 10 : -12,
    rotation: (i)=> (i%2? -6 : 6),
    duration: 2.2,
    ease: "sine.inOut",
    yoyo: true, repeat: -1
  });

  // Hover tilt (3D) + make chips pop when hovering portrait area
  const area = document.getElementById("home-68-tilt-area");
  const card = document.getElementById("home-68-card");

  function handleMove(e){
    const bounds = area.getBoundingClientRect();
    const relX = (e.clientX - bounds.left) / bounds.width;
    const relY = (e.clientY - bounds.top) / bounds.height;
    const rotY = gsap.utils.mapRange(0, 1, -12, 12, relX);
    const rotX = gsap.utils.mapRange(0, 1, 10, -10, relY);
    gsap.to(card, { rotateY: rotY, rotateX: rotX, duration: 0.3, transformPerspective: 900, ease: "power2.out" });
  }
  function handleLeave(){
    gsap.to(card, { rotateY: 0, rotateX: 0, duration: 0.6, ease: "power3.out" });
    gsap.to(".home-68 .home-68-skill", { x:0, y:0, scale:1, duration:0.5, ease:"back.out(1.7)" });
  }
  area.addEventListener("mousemove", handleMove);
  area.addEventListener("mouseleave", handleLeave);

  // On hover of portrait, bump the chips outward
  area.addEventListener("mouseenter", function(){
    gsap.to(".home-68 .home-68-s1", { x: -12, y: -8, scale:1.08, duration:0.35 });
    gsap.to(".home-68 .home-68-s2", { x: 12, y: -6, scale:1.08, duration:0.35, delay:0.05 });
    gsap.to(".home-68 .home-68-s3", { y: 10, scale:1.08, duration:0.35, delay:0.1 });
  });

  // Extra: ripple the chips when hovered directly
  document.querySelectorAll(".home-68 .home-68-skill").forEach((el)=>{
    el.addEventListener("mouseenter", ()=>{
      gsap.fromTo(el, { scale:1 }, { scale:1.18, yoyo:true, repeat:1, duration:0.18, ease:"power1.inOut" });
    });
  });
}



function initAbout40(){

  // Text animation on scroll
  gsap.from(".about-40-title", {
    y: 60,
    opacity: 0,
    duration: 1.2,
    ease: "power3.out",
    scrollTrigger: {
      trigger: ".about-40-title",
      start: "top 80%"
    }
  });

  gsap.from(".about-40-subtitle", {
    y: 40,
    opacity: 0,
    duration: 1,
    delay: 0.3,
    ease: "power3.out",
    scrollTrigger: {
      trigger: ".about-40-subtitle",
      start: "top 85%"
    }
  });

  gsap.from(".about-40-btn", {
    y: 20,
    opacity: 0,
    duration: 1,
    delay: 0.6,
    ease: "power3.out",
    scrollTrigger: {
      trigger: ".about-40-btn",
      start: "top 90%"
    }
  });

  // Image animation on scroll
  gsap.from(".about-40-img img", {
    scale: 0.8,
    opacity: 0,
    duration: 1.2,
    ease: "back.out(1.7)",
    scrollTrigger: {
      trigger: ".about-40-img img",
      start: "top 85%"
    }
  });
}


function initContact15(){
   gsap.from(".contact-15 .title h5", {opacity:0, y:-20, duration:1});
  gsap.from(".contact-15 .title h2", {opacity:0, y:30, duration:1, delay:0.3});

  gsap.from(".contact-15 .left-img", {
    opacity:0, x:-50, duration:1, delay:0.6, scrollTrigger:{
      trigger: ".contact-15 .left-img",
      start: "top 80%"
    }
  });

  gsap.from(".contact-15 .form-box", {
    opacity:0, x:50, duration:1, delay:0.8, scrollTrigger:{
      trigger: ".contact-15 .form-box",
      start: "top 80%"
    }
  });

  // Hover effect on caption
  $(".contact-15 .left-img").hover(
    function(){ gsap.to($(this).find(".caption h3"), {scale:1.1, color:"#4de1e8", duration:0.4}); },
    function(){ gsap.to($(this).find(".caption h3"), {scale:1, color:"#fff", duration:0.4}); }
  );
}


function initServices21(){
 document.querySelectorAll(".services-21-box").forEach(box => {
    box.addEventListener("mouseenter", () => {
      gsap.to(box, {
        scale: 1.05,
        y: -10,
        duration: 0.4,
        ease: "power3.out",
        boxShadow: "0 15px 30px rgba(0,0,0,0.4)"
      });
    });
    box.addEventListener("mouseleave", () => {
      gsap.to(box, {
        scale: 1,
        y: 0,
        duration: 0.4,
        ease: "power3.inOut",
        boxShadow: "0 0px 0px rgba(0,0,0,0)"
      });
    });
  });

  // Animate image boxes
  document.querySelectorAll(".services-21-img-box img").forEach(img => {
    img.addEventListener("mouseenter", () => {
      gsap.to(img, {
        scale: 1.1,
        duration: 0.5,
        ease: "power3.out"
      });
    });
    img.addEventListener("mouseleave", () => {
      gsap.to(img, {
        scale: 1,
        duration: 0.5,
        ease: "power3.inOut"
      });
    });
  });
}


function initServices23(){
const wrapper = document.querySelector('.services-23 .card-wrapper');
  const cards = document.querySelectorAll('.services-23 .service-card');

  // Duplicate cards for infinite loop
  wrapper.innerHTML += wrapper.innerHTML;

  gsap.to(wrapper, {
    x: "-50%",
    duration: 20,
    ease: "linear",
    repeat: -1
  });

  // Hover 3D flip effect
  cards.forEach(card => {
    card.addEventListener('mouseenter', () => {
      gsap.to(card, {rotationY: 15, rotationX: 5, duration: 0.5});
    });
    card.addEventListener('mouseleave', () => {
      gsap.to(card, {rotationY: 0, rotationX: 0, duration: 0.5});
    });
  });
}








