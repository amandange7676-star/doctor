
(function (window, document, $) {
  'use strict';

  const AppAnimations = (function () {
    let _inited = false;

    // Register GSAP ScrollTrigger only once
    function _registerGSAP() {
      try {
        if (!window._GSAP_ScrollTriggerRegistered && typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
          gsap.registerPlugin(ScrollTrigger);
          window._GSAP_ScrollTriggerRegistered = true;
        }
      } catch (e) {
        console.warn('GSAP registration failed', e);
      }
    }

    // Helpers
    const $qs = (s, base = document) => base.querySelector(s);
    const $qsAll = (s, base = document) => Array.from(base.querySelectorAll(s));
    const hasDatasetFlag = (el, flag) => (el && el.dataset && el.dataset[flag]) !== undefined;
    const setDatasetFlag = (el, flag) => { if (el && el.dataset) el.dataset[flag] = '1'; };

    /* -------------------------
       All init functions below
       Each function is defensive:
       - returns early if required elements missing
       - sets dataset flags so it won't run twice
    ------------------------- */

    function initEvents3() {
      const section = $qs('.section-wrapper.events-3');
      if (!section || hasDatasetFlag(section, '_events3')) return;
      setDatasetFlag(section, '_events3');

      try {
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
      } catch (e) { console.warn('initEvents3 error', e); }
    }

    function initEvents4() {
      const cards = $qsAll('.section-wrapper.events-4 .events-4-card');
      if (!cards.length) return;

      cards.forEach(card => {
        if (hasDatasetFlag(card, '_events4')) return;
        setDatasetFlag(card, '_events4');

        try {
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
        } catch (e) { console.warn('initEvents4 card error', e); }
      });
    }

    function initAbout33() {
      const els = $qsAll('.about-33-text');
      if (!els.length) return;

      const distance = window.innerWidth * 1.2;
      els.forEach((el, i) => {
        if (hasDatasetFlag(el, '_about33')) return;
        setDatasetFlag(el, '_about33');

        try {
          gsap.fromTo(
            el,
            { x: i % 2 === 0 ? -distance : distance },
            {
              x: i % 2 === 0 ? distance : -distance,
              ease: "none",
              scrollTrigger: {
                trigger: ".about-33",
                start: "top top",
                end: "+=200%",
                scrub: true,
                pin: false
              }
            }
          );
        } catch (e) { console.warn('initAbout33 error', e); }
      });
    }

    function initOurteam3() {
      const els = $qsAll('#ourteam-3 .ourteam-3-card');
      if (!els.length) return;

      els.forEach(el => {
        if (hasDatasetFlag(el, '_ourteam3')) return;
        setDatasetFlag(el, '_ourteam3');

        try {
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
        } catch (e) { console.warn('initOurteam3 error', e); }
      });
    }

    function initHome63() {
      const cards = $qsAll('.home-63-card');
      if (!cards.length) return;
      // floating animation
      cards.forEach((card, i) => {
        if (hasDatasetFlag(card, '_home63float')) return;
        setDatasetFlag(card, '_home63float');
        try {
          const dir = i % 2 === 0 ? -1 : 1;
          gsap.to(card, {
            y: 30 * dir,
            duration: 1 + i,
            ease: "easeInOut",
            repeat: -1,
            yoyo: true
          });
        } catch (e) { console.warn('initHome63 float error', e); }
      });

      // 3D scroll effect
      cards.forEach((card, i) => {
        if (hasDatasetFlag(card, '_home63scroll')) return;
        setDatasetFlag(card, '_home63scroll');
        try {
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
        } catch (e) { console.warn('initHome63 scroll error', e); }
      });
    }

    function initHome64() {
      const section = $qs('.home-64');
      if (!section || hasDatasetFlag(section, '_home64')) return;
      setDatasetFlag(section, '_home64');

      try {
        const videoSel = '.home-64-video';
        gsap.to(videoSel, {
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
      } catch (e) { console.warn('initHome64 error', e); }
    }

    function initHome65() {
      const c1 = $qs('.home-65-col1');
      const c2 = $qs('.home-65-col2');
      if (!c1 || !c2 || (c1.dataset && c1.dataset._home65)) return;
      setDatasetFlag(c1, '_home65');

      try {
        gsap.to(".home-65-col1", {
          yPercent: -100,
          repeat: -1,
          duration: 5,
          ease: "none"
        });
        gsap.to(".home-65-col2", {
          yPercent: 100,
          repeat: -1,
          duration: 5,
          ease: "none"
        });
      } catch (e) { console.warn('initHome65 error', e); }
    }

    function initHome66() {
      const panels = $qsAll('.home-66-section');
      if (!panels.length) return;

      panels.forEach((panel, i) => {
        if (hasDatasetFlag(panel, '_home66')) return;
        setDatasetFlag(panel, '_home66');

        try {
          ScrollTrigger.create({
            trigger: panel,
            start: "top 30%",
            end: "+=100%",
            pin: true,
            pinSpacing: false,
            scrub: true,
            markers: false,
            onUpdate: (self) => {
              if (i > 0) {
                try {
                  gsap.to(panels[i - 1], {
                    yPercent: -60 * self.progress,
                    overwrite: "auto",
                    duration: 0
                  });
                } catch (err) { /* ignore */ }
              }
            }
          });
        } catch (e) { console.warn('initHome66 error', e); }
      });
    }

    function initHome62() {
      const section = $qs('.home-62');
      if (!section || hasDatasetFlag(section, '_home62')) return;
      setDatasetFlag(section, '_home62');

      try {
        gsap.from(".home-62-title", {
          opacity: 0,
          y: 100,
          rotationX: -45,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: { trigger: ".home-62", start: "top 80%" }
        });

        gsap.from(".home-62-subtitle", {
          opacity: 0,
          y: 80,
          rotationX: -30,
          duration: 1,
          delay: 0.1,
          ease: "power3.out",
          scrollTrigger: { trigger: ".home-62", start: "top 75%" }
        });

        gsap.to(".home-62.section-wrapper", {
          backgroundPosition: "50% 80%",
          ease: "none",
          scrollTrigger: { trigger: ".home-62", start: "top bottom", end: "bottom top", scrub: true }
        });

        const img = $qs('.home-62-main-img');
        if (img && !hasDatasetFlag(img, '_home62tilt')) {
          setDatasetFlag(img, '_home62tilt');

          gsap.from(img, {
            rotationY: -45,
            rotationX: 20,
            scale: 0.8,
            filter: "blur(10px)",
            duration: 1.5,
            ease: "power3.out",
            scrollTrigger: { trigger: ".home-62", start: "top 80%", toggleActions: "play none none reverse" }
          });

          img.addEventListener('mousemove', function (e) {
            const bounds = img.getBoundingClientRect();
            const x = e.clientX - bounds.left;
            const y = e.clientY - bounds.top;
            const centerX = bounds.width / 2;
            const centerY = bounds.height / 2;
            const maxTilt = 20;
            const rotateX = ((y - centerY) / centerY) * maxTilt;
            const rotateY = ((x - centerX) / centerX) * maxTilt;

            gsap.to(img, { rotationX: -rotateX, rotationY: rotateY, scale: 1.08, duration: 0.3, ease: "power2.out" });
          });

          img.addEventListener('mouseleave', function () {
            gsap.to(img, { rotationX: 0, rotationY: 0, scale: 1, duration: 0.6, ease: "power2.out" });
          });
        }
      } catch (e) { console.warn('initHome62 error', e); }
    }

    function initHome67() {
      const title = $qs('.home-67-title');
      if (!title || hasDatasetFlag(title, '_home67')) return;
      setDatasetFlag(title, '_home67');

      try {
        const text = title.textContent || '';
        title.textContent = '';
        text.split('').forEach(char => {
          const span = document.createElement('span');
          span.className = 'home-67-letter';
          span.textContent = char;
          title.appendChild(span);
        });

        const section = $qs('.home-67');
        if (section && !hasDatasetFlag(section, '_home67hover')) {
          setDatasetFlag(section, '_home67hover');
          section.addEventListener('mouseenter', function () {
            gsap.to(section, { scale: 1.05, rotationY: 8, rotationX: 4, duration: 1, ease: "power3.out" });
          });
          section.addEventListener('mouseleave', function () {
            gsap.to(section, { scale: 1, rotationY: 0, rotationX: 0, duration: 1, ease: "power3.out" });
          });
        }

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
      } catch (e) { console.warn('initHome67 error', e); }
    }

    function initAbout38() {
      const els = $qsAll('.about-38-text');
      if (!els.length) return;

      els.forEach(el => {
        if (hasDatasetFlag(el, '_about38')) return;
        setDatasetFlag(el, '_about38');

        try {
          // split into chars if not done
          if (!el.dataset.split) {
            const chars = el.textContent.split('');
            el.innerHTML = chars.map(ch => `<span class="char">${ch}</span>`).join('');
            el.dataset.split = 'true';
          }

          gsap.from(".about-38-text .char", {
            scrollTrigger: { trigger: ".about-38", start: "top 80%" },
            opacity: 0,
            y: 80,
            rotateX: 90,
            transformOrigin: "50% 50% -20",
            ease: "back.out(2)",
            duration: 1,
            stagger: { amount: 1.5, from: "start" }
          });

          const section = $qs('.about-38');
          if (section && !hasDatasetFlag(section, '_about38hover')) {
            setDatasetFlag(section, '_about38hover');
            section.addEventListener('mouseenter', () => {
              gsap.fromTo(".about-38-text .char",
                { opacity: 0.4, y: 30, rotateX: -60 },
                {
                  opacity: 1,
                  y: 0,
                  rotateX: 0,
                  ease: "elastic.out(1, 0.6)",
                  duration: 1,
                  stagger: { amount: 0.8, from: "center" }
                });
            });
          }
        } catch (e) { console.warn('initAbout38 error', e); }
      });
    }

    function initHome68() {
      const section = $qs('.home-68');
      if (!section || hasDatasetFlag(section, '_home68')) return;
      setDatasetFlag(section, '_home68');

      try {
        gsap.from(".home-68 .home-68-eyebrow, .home-68 .home-68-title, .home-68 .home-68-role, .home-68 .home-68-desc, .home-68 .home-68-cta, .home-68 .home-68-social", {
          scrollTrigger: { trigger: ".home-68", start: "top 80%" },
          y: 20, opacity: 0, duration: 0.8, ease: "power2.out", stagger: 0.08
        });

        gsap.from(".home-68 .home-68-card", {
          scrollTrigger: { trigger: ".home-68", start: "top 75%" },
          x: 40, opacity: 0, duration: 1, ease: "power3.out"
        });

        gsap.to(".home-68 .home-68-skill", {
          y: (i) => i % 2 ? 10 : -12,
          rotation: (i) => (i % 2 ? -6 : 6),
          duration: 2.2,
          ease: "sine.inOut",
          yoyo: true, repeat: -1
        });

        const area = $qs('#home-68-tilt-area');
        const card = $qs('#home-68-card');
        if (area && card && !hasDatasetFlag(area, '_home68tilt')) {
          setDatasetFlag(area, '_home68tilt');

          function handleMove(e) {
            const bounds = area.getBoundingClientRect();
            const relX = (e.clientX - bounds.left) / bounds.width;
            const relY = (e.clientY - bounds.top) / bounds.height;
            const rotY = gsap.utils.mapRange(0, 1, -12, 12, relX);
            const rotX = gsap.utils.mapRange(0, 1, 10, -10, relY);
            gsap.to(card, { rotateY: rotY, rotateX: rotX, duration: 0.3, transformPerspective: 900, ease: "power2.out" });
          }
          function handleLeave() {
            gsap.to(card, { rotateY: 0, rotateX: 0, duration: 0.6, ease: "power3.out" });
            gsap.to(".home-68 .home-68-skill", { x: 0, y: 0, scale: 1, duration: 0.5, ease: "back.out(1.7)" });
          }

          area.addEventListener("mousemove", handleMove);
          area.addEventListener("mouseleave", handleLeave);

          area.addEventListener("mouseenter", function () {
            gsap.to(".home-68 .home-68-s1", { x: -12, y: -8, scale: 1.08, duration: 0.35 });
            gsap.to(".home-68 .home-68-s2", { x: 12, y: -6, scale: 1.08, duration: 0.35, delay: 0.05 });
            gsap.to(".home-68 .home-68-s3", { y: 10, scale: 1.08, duration: 0.35, delay: 0.1 });
          });
        }

        document.querySelectorAll(".home-68 .home-68-skill").forEach((el) => {
          if (hasDatasetFlag(el, '_home68chip')) return;
          setDatasetFlag(el, '_home68chip');
          el.addEventListener("mouseenter", () => {
            gsap.fromTo(el, { scale: 1 }, { scale: 1.18, yoyo: true, repeat: 1, duration: 0.18, ease: "power1.inOut" });
          });
        });

      } catch (e) { console.warn('initHome68 error', e); }
    }

    function initAbout40() {
      const title = $qs('.about-40-title');
      if (!title || hasDatasetFlag(title, '_about40')) return;
      setDatasetFlag(title, '_about40');

      try {
        gsap.from(".about-40-title", {
          y: 60, opacity: 0, duration: 1.2, ease: "power3.out",
          scrollTrigger: { trigger: ".about-40-title", start: "top 80%" }
        });
        gsap.from(".about-40-subtitle", {
          y: 40, opacity: 0, duration: 1, delay: 0.3, ease: "power3.out",
          scrollTrigger: { trigger: ".about-40-subtitle", start: "top 85%" }
        });
        gsap.from(".about-40-btn", {
          y: 20, opacity: 0, duration: 1, delay: 0.6, ease: "power3.out",
          scrollTrigger: { trigger: ".about-40-btn", start: "top 90%" }
        });
        gsap.from(".about-40-img img", {
          scale: 0.8, opacity: 0, duration: 1.2, ease: "back.out(1.7)",
          scrollTrigger: { trigger: ".about-40-img img", start: "top 85%" }
        });
      } catch (e) { console.warn('initAbout40 error', e); }
    }

    function initContact15() {
      const titleH5 = $qs('.contact-15 .title h5');
      const titleH2 = $qs('.contact-15 .title h2');
      const leftImg = $qs('.contact-15 .left-img');
      const formBox = $qs('.contact-15 .form-box');
      if (!titleH5 && !titleH2 && !leftImg && !formBox) return;
      if ((titleH5 && hasDatasetFlag(titleH5, '_contact15')) || (titleH2 && hasDatasetFlag(titleH2, '_contact15'))) return;
      if (titleH5) setDatasetFlag(titleH5, '_contact15');
      if (titleH2) setDatasetFlag(titleH2, '_contact15');

      try {
        if (titleH5) gsap.from(".contact-15 .title h5", { opacity: 0, y: -20, duration: 1 });
        if (titleH2) gsap.from(".contact-15 .title h2", { opacity: 0, y: 30, duration: 1, delay: 0.3 });
        if (leftImg) gsap.from(".contact-15 .left-img", {
          opacity: 0, x: -50, duration: 1, delay: 0.6, scrollTrigger: { trigger: ".contact-15 .left-img", start: "top 80%" }
        });
        if (formBox) gsap.from(".contact-15 .form-box", {
          opacity: 0, x: 50, duration: 1, delay: 0.8, scrollTrigger: { trigger: ".contact-15 .form-box", start: "top 80%" }
        });

        // hover effect on caption - use jQuery if available, else fallback
        const imgEl = $qs('.contact-15 .left-img');
        const captionH3 = imgEl ? imgEl.querySelector('.caption h3') : null;
        if ($ && typeof $.fn !== 'undefined' && imgEl) {
          // jQuery version
          // use dataset flag to prevent double-binding
          if (!hasDatasetFlag(imgEl, '_contact15hover')) {
            setDatasetFlag(imgEl, '_contact15hover');
            $(imgEl).hover(
              function () { $(this).find(".caption h3").each(function () { gsap.to(this, { scale: 1.1, color: "#4de1e8", duration: 0.4 }); }); },
              function () { $(this).find(".caption h3").each(function () { gsap.to(this, { scale: 1, color: "#fff", duration: 0.4 }); }); }
            );
          }
        } else if (imgEl && captionH3 && !hasDatasetFlag(imgEl, '_contact15hover')) {
          setDatasetFlag(imgEl, '_contact15hover');
          imgEl.addEventListener('mouseenter', () => { gsap.to(captionH3, { scale: 1.1, color: "#4de1e8", duration: 0.4 }); });
          imgEl.addEventListener('mouseleave', () => { gsap.to(captionH3, { scale: 1, color: "#fff", duration: 0.4 }); });
        }

      } catch (e) { console.warn('initContact15 error', e); }
    }

    function initServices21() {
      const boxes = $qsAll('.services-21-box');
      if (!boxes.length) return;

      boxes.forEach(box => {
        if (hasDatasetFlag(box, '_services21box')) return;
        setDatasetFlag(box, '_services21box');

        box.addEventListener('mouseenter', () => {
          gsap.to(box, {
            scale: 1.05,
            y: -10,
            duration: 0.4,
            ease: "power3.out",
            boxShadow: "0 15px 30px rgba(0,0,0,0.4)"
          });
        });
        box.addEventListener('mouseleave', () => {
          gsap.to(box, {
            scale: 1,
            y: 0,
            duration: 0.4,
            ease: "power3.inOut",
            boxShadow: "0 0px 0px rgba(0,0,0,0)"
          });
        });
      });

      document.querySelectorAll('.services-21-img-box img').forEach(img => {
        if (hasDatasetFlag(img, '_services21img')) return;
        setDatasetFlag(img, '_services21img');

        img.addEventListener('mouseenter', () => { gsap.to(img, { scale: 1.1, duration: 0.5, ease: "power3.out" }); });
        img.addEventListener('mouseleave', () => { gsap.to(img, { scale: 1, duration: 0.5, ease: "power3.inOut" }); });
      });
    }

    function initServices23() {
      const wrapper = $qs('.services-23 .card-wrapper');
      const cards = $qsAll('.services-23 .service-card');
      if (!wrapper || !cards.length) return;
      if (hasDatasetFlag(wrapper, '_services23')) return;
      setDatasetFlag(wrapper, '_services23');

      try {
        // only duplicate once
        if (!hasDatasetFlag(wrapper, '_looped')) {
          wrapper.innerHTML += wrapper.innerHTML;
          setDatasetFlag(wrapper, '_looped');
        }

        gsap.to(wrapper, {
          x: "-50%",
          duration: 20,
          ease: "linear",
          repeat: -1
        });

        cards.forEach(card => {
          if (hasDatasetFlag(card, '_services23card')) return;
          setDatasetFlag(card, '_services23card');
          card.addEventListener('mouseenter', () => { gsap.to(card, { rotationY: 15, rotationX: 5, duration: 0.5 }); });
          card.addEventListener('mouseleave', () => { gsap.to(card, { rotationY: 0, rotationX: 0, duration: 0.5 }); });
        });

      } catch (e) { console.warn('initServices23 error', e); }
    }

    /* -------------------------
       Public initializer
    ------------------------- */
    function init() {
      if (_inited) return;
      _registerGSAP();

      const fns = [
        initHome64, initHome65, initHome66, initHome67, initHome68,
        initEvents3, initEvents4, initAbout33, initOurteam3, initHome62, initHome63,
        initAbout40, initContact15, initServices21, initServices23, initAbout38
      ];

      fns.forEach(fn => {
        try { fn(); } catch (e) { console.warn('Animation init failed:', fn.name, e); }
      });

      // one global refresh if ScrollTrigger exists
      try {
        if (typeof ScrollTrigger !== 'undefined' && typeof ScrollTrigger.refresh === 'function') {
          ScrollTrigger.refresh();
        }
      } catch (e) { /* ignore */ }

      _inited = true;
    }

    return {
      init
    };
  })();

  // Auto-init on DOM ready (jQuery if present, fallback to DOMContentLoaded)
  try {
    if ($ && typeof $.fn !== 'undefined') {
      $(document).ready(function () { AppAnimations.init(); });
    } else {
      if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => AppAnimations.init());
      } else {
        AppAnimations.init();
      }
    }
  } catch (e) {
    // If anything goes wrong, still expose the namespace so user can call manually
    console.warn('Auto-init failed, call window.AppAnimations.init() manually', e);
  }

  // Expose for debugging / manual re-init
  window.AppAnimations = AppAnimations;

})(window, document, window.jQuery);




document.addEventListener("DOMContentLoaded", () => {
    // All animation classes
    const animClasses = [
        "anim-slide-up",
        "anim-slide-down",
        "anim-slide-left",
        "anim-slide-right",
        "anim-fade-in",
        "anim-zoom-in",
        "anim-rotate-in",
        "anim-flip-in",
        "anim-bounce-in",
        "anim-blur-in",
        "anim-stripe-reveal",
        "anim-flip3d-left",
        "anim-flip3d-right",
        "anim-flip3d-up",
        "anim-flip3d-down",
        "anim-cube-rotate",
        "anim-tilt-zoom",
        "anim-depth-pop",
        "anim-rotate-diagonal",
        "anim-layer-slide",
        "anim-spiral-zoom"
    ];

    // Create a single selector string
    const selector = animClasses.map(cls => `.${cls}`).join(", ");

    // Select all elements with animation classes
    const elements = document.querySelectorAll(selector);

    // IntersectionObserver to trigger animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("in-view"); // Animate in
            } else {
                entry.target.classList.remove("in-view"); // Reset when out of view
            }
        });
    }, { threshold: 0.2 }); // Trigger when 20% visible

    elements.forEach(el => observer.observe(el));
});


// service-24
$(window).on("scroll", function () { var scrollTop = $(window).scrollTop(); var sectionOffset = $(".services-24-sticky-wrapper").offset().top; var sectionHeight = $(".services-24-sticky-wrapper").outerHeight(); var scrollPos = scrollTop - sectionOffset; var cards = $(".services-24-card"); var cardHeight = sectionHeight / cards.length; cards.each(function (i) { var start = i * cardHeight * 0.8; var end = start + cardHeight; if (scrollPos >= start && scrollPos < end) { $(this).addClass("active").css("z-index", 10 + i); } else { $(this).removeClass("active"); } }); });