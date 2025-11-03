document.addEventListener("DOMContentLoaded", function () {
  gsap.registerPlugin(ScrollTrigger);

  // Fade In Up
  gsap.utils.toArray(".reveal-fade-up").forEach((el) => {
    gsap.from(el, {
      y: 50,
      opacity: 0,
      duration: 1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: el,
        start: "top 85%",
        toggleActions: "play none none reverse"
      }
    });
  });

  // Fade In Down
  gsap.utils.toArray(".reveal-fade-down").forEach((el) => {
    gsap.from(el, {
      y: -50,
      opacity: 0,
      duration: 1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: el,
        start: "top 85%",
        toggleActions: "play none none reverse"
      }
    });
  });

  // Fade In Left
  gsap.utils.toArray(".reveal-left").forEach((el) => {
    gsap.from(el, {
      x: -80,
      opacity: 0,
      duration: 1.2,
      ease: "power3.out",
      scrollTrigger: {
        trigger: el,
        start: "top 85%",
      }
    });
  });

  // Fade In Right
  gsap.utils.toArray(".reveal-right").forEach((el) => {
    gsap.from(el, {
      x: 80,
      opacity: 0,
      duration: 1.2,
      ease: "power3.out",
      scrollTrigger: {
        trigger: el,
        start: "top 85%",
      }
    });
  });

  // Scale In
  gsap.utils.toArray(".scale-in").forEach((el) => {
    gsap.from(el, {
      scale: 0.8,
      opacity: 0,
      duration: 1,
      ease: "back.out(1.7)",
      scrollTrigger: {
        trigger: el,
        start: "top 85%",
      }
    });
  });

  // Rotate In
  gsap.utils.toArray(".rotate-in").forEach((el) => {
    gsap.from(el, {
      rotate: -45,
      opacity: 0,
      duration: 1,
      ease: "power2.out",
      scrollTrigger: {
        trigger: el,
        start: "top 85%",
      }
    });
  });

  // Flip In (X-axis)
  gsap.utils.toArray(".flip-x").forEach((el) => {
    gsap.from(el, {
      rotationX: 90,
      transformOrigin: "50% 50% -50",
      opacity: 0,
      duration: 1.2,
      ease: "back.out(1.7)",
      scrollTrigger: {
        trigger: el,
        start: "top 85%",
      }
    });
  });

  // Flip In (Y-axis)
  gsap.utils.toArray(".flip-y").forEach((el) => {
    gsap.from(el, {
      rotationY: 90,
      transformOrigin: "50% 50% -50",
      opacity: 0,
      duration: 1.2,
      ease: "back.out(1.7)",
      scrollTrigger: {
        trigger: el,
        start: "top 85%",
      }
    });
  });

  // Blur In
  gsap.utils.toArray(".blur-in").forEach((el) => {
    gsap.from(el, {
      filter: "blur(15px)",
      opacity: 0,
      duration: 1.2,
      ease: "power3.out",
      scrollTrigger: {
        trigger: el,
        start: "top 85%",
      }
    });
  });

  // Skew In
  gsap.utils.toArray(".skew-in").forEach((el) => {
    gsap.from(el, {
      skewX: 20,
      opacity: 0,
      duration: 1.2,
      ease: "power3.out",
      scrollTrigger: {
        trigger: el,
        start: "top 85%",
      }
    });
  });

  // Text Typing Effect
  gsap.utils.toArray(".text-type").forEach((el) => {
    let text = el.innerText;
    el.innerText = "";
    gsap.to(el, {
      duration: text.length * 0.05,
      text: text,
      ease: "none",
      scrollTrigger: {
        trigger: el,
        start: "top 85%",
      }
    });
  });

  // Stagger Children
  gsap.utils.toArray(".stagger-children").forEach((parent) => {
    gsap.from(parent.children, {
      y: 40,
      opacity: 0,
      duration: 0.6,
      ease: "power2.out",
      stagger: 0.15,
      scrollTrigger: {
        trigger: parent,
        start: "top 85%",
      }
    });
  });

  // Zoom Out Reveal
  gsap.utils.toArray(".zoom-out").forEach((el) => {
    gsap.from(el, {
      scale: 1.3,
      opacity: 0,
      duration: 1.2,
      ease: "power2.out",
      scrollTrigger: {
        trigger: el,
        start: "top 85%",
      }
    });
  });

  // Clip Path Reveal
  gsap.utils.toArray(".clip-reveal").forEach((el) => {
    gsap.from(el, {
      clipPath: "inset(0 100% 0 0)",
      duration: 1.5,
      ease: "power2.out",
      scrollTrigger: {
        trigger: el,
        start: "top 85%",
      }
    });
  });

  // Line From Bottom
  gsap.utils.toArray(".line-reveal").forEach((el) => {
    gsap.from(el, {
      yPercent: 100,
      opacity: 0,
      duration: 1.2,
      ease: "power4.out",
      scrollTrigger: {
        trigger: el,
        start: "top 85%",
      }
    });
  });


// Horizontal Text Scroll (like marquee on scroll)
gsap.utils.toArray(".text-scroll-horizontal").forEach((el) => {
  gsap.to(el, {
    xPercent: -100,
    ease: "none",
    scrollTrigger: {
      trigger: el,
      start: "top bottom",
      end: "bottom top",
      scrub: true,
    }
  });
});

// Vertical Letter Moving (each letter floats up/down on scroll)
gsap.utils.toArray(".text-scroll-vertical").forEach((el) => {
  let chars = el.innerText.split("");
  el.innerHTML = chars.map(c => `<span class="char">${c}</span>`).join("");
  gsap.fromTo(el.querySelectorAll(".char"), {
    y: 40, opacity: 0
  }, {
    y: 0, opacity: 1,
    stagger: 0.05,
    ease: "power3.out",
    scrollTrigger: {
      trigger: el,
      start: "top 80%",
    }
  });
});

// Spiral Image Movement
gsap.utils.toArray(".spiral-image").forEach((el) => {
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

// Slider Images (3D slide-in effect)
gsap.utils.toArray(".slider-image").forEach((el, i) => {
  gsap.from(el, {
    xPercent: i % 2 === 0 ? -100 : 100,
    rotationY: i % 2 === 0 ? 45 : -45,
    opacity: 0,
    duration: 1.2,
    ease: "power3.inOut",
    scrollTrigger: {
      trigger: el,
      start: "top 90%",
    }
  });
});

// Curtain Reveal (like stage opening)
gsap.utils.toArray(".curtain-reveal").forEach((el) => {
  gsap.from(el, {
    clipPath: "inset(0 50% 0 50%)",
    opacity: 0,
    duration: 1.5,
    ease: "power3.out",
    scrollTrigger: {
      trigger: el,
      start: "top 85%",
    }
  });
});

// Wave Text Effect
gsap.utils.toArray(".wave-text").forEach((el) => {
  let chars = el.innerText.split("");
  el.innerHTML = chars.map(c => `<span class="char">${c}</span>`).join("");
  gsap.fromTo(el.querySelectorAll(".char"), {
    y: 20, opacity: 0
  }, {
    y: 0, opacity: 1,
    stagger: 0.08,
    ease: "elastic.out(1,0.5)",
    scrollTrigger: {
      trigger: el,
      start: "top 80%",
    }
  });
});

// Bounce In
gsap.utils.toArray(".bounce-in").forEach((el) => {
  gsap.from(el, {
    scale: 0.5,
    opacity: 0,
    duration: 1,
    ease: "bounce.out",
    scrollTrigger: {
      trigger: el,
      start: "top 85%",
    }
  });
});

// Tilt Reveal
gsap.utils.toArray(".tilt-reveal").forEach((el) => {
  gsap.from(el, {
    rotationZ: 30,
    opacity: 0,
    duration: 1.2,
    ease: "power2.out",
    scrollTrigger: {
      trigger: el,
      start: "top 85%",
    }
  });
});

// Slide Overlap (images sliding over each other)
gsap.utils.toArray(".slide-overlap").forEach((el) => {
  gsap.from(el, {
    x: -200,
    opacity: 0,
    duration: 1,
    ease: "power2.inOut",
    scrollTrigger: {
      trigger: el,
      start: "top 90%",
    }
  });
});

// Parallax Float
gsap.utils.toArray(".parallax-float").forEach((el) => {
  gsap.to(el, {
    yPercent: -30,
    ease: "none",
    scrollTrigger: {
      trigger: el,
      start: "top bottom",
      end: "bottom top",
      scrub: true,
    }
  });
});

// Image Zoom Rotate
gsap.utils.toArray(".zoom-rotate").forEach((el) => {
  gsap.from(el, {
    scale: 0.5,
    rotation: -45,
    opacity: 0,
    duration: 1.2,
    ease: "power3.out",
    scrollTrigger: {
      trigger: el,
      start: "top 85%",
    }
  });
});

// Floating Cards
gsap.utils.toArray(".floating-card").forEach((el) => {
  gsap.from(el, {
    y: 100,
    opacity: 0,
    duration: 1,
    ease: "back.out(1.7)",
    scrollTrigger: {
      trigger: el,
      start: "top 85%",
    }
  });
});

// Rotate In 3D
gsap.utils.toArray(".rotate-3d").forEach((el) => {
  gsap.from(el, {
    rotationY: -180,
    transformOrigin: "left center",
    opacity: 0,
    duration: 1.3,
    ease: "back.out(1.5)",
    scrollTrigger: {
      trigger: el,
      start: "top 85%",
    }
  });
});

// Split Reveal (split mask left + right)
gsap.utils.toArray(".split-reveal").forEach((el) => {
  gsap.from(el, {
    clipPath: "polygon(0 0, 100% 0, 100% 100%, 0% 100%)",
    opacity: 0,
    duration: 1.5,
    ease: "power4.out",
    scrollTrigger: {
      trigger: el,
      start: "top 85%",
    }
  });
});

// Shake In
gsap.utils.toArray(".shake-in").forEach((el) => {
  gsap.from(el, {
    x: -20,
    repeat: 3,
    yoyo: true,
    opacity: 0,
    duration: 0.6,
    ease: "power1.inOut",
    scrollTrigger: {
      trigger: el,
      start: "top 85%",
    }
  });
});

// Elastic Pop
gsap.utils.toArray(".elastic-pop").forEach((el) => {
  gsap.from(el, {
    scale: 0,
    opacity: 0,
    duration: 1.2,
    ease: "elastic.out(1, 0.4)",
    scrollTrigger: {
      trigger: el,
      start: "top 85%",
    }
  });
});

// Background Parallax
gsap.utils.toArray(".bg-parallax").forEach((el) => {
  gsap.to(el, {
    backgroundPosition: "50% 100%",
    ease: "none",
    scrollTrigger: {
      trigger: el,
      start: "top bottom",
      end: "bottom top",
      scrub: true,
    }
  });
});

// Fade in with Rotation
gsap.utils.toArray(".fade-rotate").forEach((el) => {
  gsap.from(el, {
    opacity: 0,
    rotation: 30,
    duration: 1.2,
    ease: "power2.out",
    scrollTrigger: {
      trigger: el,
      start: "top 85%",
    }
  });
});

// Scale Bounce
gsap.utils.toArray(".scale-bounce").forEach((el) => {
  gsap.from(el, {
    scale: 0.3,
    opacity: 0,
    duration: 1,
    ease: "elastic.out(1, 0.6)",
    scrollTrigger: {
      trigger: el,
      start: "top 85%",
    }
  });
});


// ✅ Register Plugins
gsap.registerPlugin(ScrollTrigger, SplitText);

// ------------------------------
// 41. morph-shape (SVG morphing)
// ------------------------------
function morphShape(el) {
  gsap.to(el, {
    duration: 2,
    morphSVG: { shape: "#target-shape" },
    ease: "power2.inOut",
    scrollTrigger: { trigger: el, start: "top 80%" }
  });
}

// ------------------------------
// 42. liquid-distort (gooey effect)
// ------------------------------
function liquidDistort(el) {
  gsap.to(el, {
    duration: 2,
    filter: "url(#gooey)",
    ease: "sine.inOut",
    repeat: -1,
    yoyo: true
  });
}

// ------------------------------
// 43. scroll-scrub-rotate
// ------------------------------
function scrollScrubRotate(el) {
  gsap.to(el, {
    rotation: 360,
    ease: "none",
    scrollTrigger: {
      trigger: el,
      scrub: true
    }
  });
}

// ------------------------------
// 44. magnetic-button
// ------------------------------
function magneticButton(btn) {
  btn.addEventListener("mousemove", e => {
    const { left, top, width, height } = btn.getBoundingClientRect();
    const x = e.clientX - (left + width / 2);
    const y = e.clientY - (top + height / 2);
    gsap.to(btn, { x: x * 0.3, y: y * 0.3, duration: 0.3 });
  });
  btn.addEventListener("mouseleave", () => {
    gsap.to(btn, { x: 0, y: 0, duration: 0.3 });
  });
}

// ------------------------------
// 45. hover-tilt
// ------------------------------
function hoverTilt(el) {
  el.addEventListener("mousemove", e => {
    const { left, top, width, height } = el.getBoundingClientRect();
    const x = (e.clientX - left) / width - 0.5;
    const y = (e.clientY - top) / height - 0.5;
    gsap.to(el, { rotationY: x * 20, rotationX: y * -20, duration: 0.4 });
  });
  el.addEventListener("mouseleave", () => {
    gsap.to(el, { rotationX: 0, rotationY: 0, duration: 0.6 });
  });
}

// ------------------------------
// 46. text-split-reveal
// ------------------------------
function textSplitReveal(el) {
  let split = new SplitText(el, { type: "chars" });
  gsap.from(split.chars, {
    yPercent: 100,
    opacity: 0,
    stagger: 0.05,
    ease: "power4.out",
    scrollTrigger: { trigger: el, start: "top 80%" }
  });
}

// ------------------------------
// 47. image-mask-reveal
// ------------------------------
function imageMaskReveal(el) {
  gsap.fromTo(el,
    { clipPath: "inset(100% 0 0 0)" },
    {
      clipPath: "inset(0% 0 0 0)",
      duration: 1.5,
      ease: "power3.out",
      scrollTrigger: { trigger: el, start: "top 85%" }
    }
  );
}

// ------------------------------
// 48. scroll-speed-skew
// ------------------------------
function scrollSpeedSkew(el) {
  let proxy = { skew: 0 },
    skewSetter = gsap.quickSetter(el, "skewY", "deg"),
    clamp = gsap.utils.clamp(-20, 20);

  ScrollTrigger.create({
    onUpdate: self => {
      let skew = clamp(self.getVelocity() / -200);
      if (Math.abs(skew) > Math.abs(proxy.skew)) {
        proxy.skew = skew;
        gsap.to(proxy, {
          skew: 0,
          duration: 0.8,
          ease: "power3",
          overwrite: true,
          onUpdate: () => skewSetter(proxy.skew)
        });
      }
    }
  });
}

// ------------------------------
// 49. smooth-stagger-grid
// ------------------------------
function smoothStaggerGrid(el) {
  gsap.from(el.children, {
    opacity: 0,
    y: 50,
    stagger: {
      amount: 1,
      grid: "auto",
      from: "center"
    },
    ease: "power3.out",
    scrollTrigger: { trigger: el, start: "top 80%" }
  });
}

// ------------------------------
// 50. rotating-gallery
// ------------------------------
function rotatingGallery(el) {
  gsap.to(el.children, {
    rotateY: 360,
    transformOrigin: "50% 50% -300px",
    duration: 10,
    ease: "none",
    repeat: -1
  });
}

// ------------------------------
// 51. text-gradient-reveal
// ------------------------------
function textGradientReveal(el) {
  gsap.fromTo(el,
    { backgroundSize: "0% 100%" },
    {
      backgroundSize: "100% 100%",
      duration: 2,
      ease: "power2.out",
      scrollTrigger: { trigger: el, start: "top 90%" }
    }
  );
}

// ------------------------------
// 52. infinite-loop-marquee
// ------------------------------
function infiniteLoopMarquee(el) {
  gsap.to(el, {
    xPercent: -100,
    repeat: -1,
    duration: 10,
    ease: "linear"
  });
}

// ------------------------------
// 53. hover-reveal-image
// ------------------------------
function hoverRevealImage(trigger, img) {
  gsap.set(img, { autoAlpha: 0 });
  trigger.addEventListener("mouseenter", () => {
    gsap.to(img, { autoAlpha: 1, y: -20, duration: 0.4 });
  });
  trigger.addEventListener("mouseleave", () => {
    gsap.to(img, { autoAlpha: 0, y: 0, duration: 0.4 });
  });
}

// ------------------------------
// 54. scroll-clip-horizontal
// ------------------------------
function scrollClipHorizontal(el) {
  gsap.fromTo(el,
    { clipPath: "inset(0 100% 0 0)" },
    {
      clipPath: "inset(0 0% 0 0)",
      duration: 1.5,
      ease: "power3.out",
      scrollTrigger: { trigger: el, start: "top 85%" }
    }
  );
}

// ------------------------------
// 55. character-wave
// ------------------------------
function characterWave(el) {
  let split = new SplitText(el, { type: "chars" });
  gsap.from(split.chars, {
    y: 30,
    opacity: 0,
    stagger: 0.05,
    ease: "elastic.out(1,0.4)",
    scrollTrigger: { trigger: el, start: "top 80%" }
  });
}

// ------------------------------
// 56. svg-draw-path
// ------------------------------
function svgDrawPath(path) {
  gsap.from(path, {
    strokeDasharray: path.getTotalLength(),
    strokeDashoffset: path.getTotalLength(),
    duration: 2,
    ease: "power2.out",
    scrollTrigger: { trigger: path, start: "top 80%" }
  });
}

// ------------------------------
// 57. scroll-jelly
// ------------------------------
function scrollJelly(el) {
  gsap.fromTo(el,
    { scale: 0.9 },
    {
      scale: 1,
      ease: "elastic.out(1, 0.3)",
      duration: 1.2,
      scrollTrigger: { trigger: el, start: "top 90%" }
    }
  );
}

// ------------------------------
// 58. layered-parallax
// ------------------------------
function layeredParallax(layers) {
  layers.forEach((layer, i) => {
    gsap.to(layer, {
      yPercent: (i + 1) * 20,
      ease: "none",
      scrollTrigger: { trigger: layer, scrub: true }
    });
  });
}

// ------------------------------
// 59. morph-text
// ------------------------------
function morphText(el, words) {
  let tl = gsap.timeline({ repeat: -1, repeatDelay: 1 });
  words.forEach(word => {
    tl.to(el, { text: word, duration: 1.2, ease: "power2.inOut", delay: 1 });
  });
}

// ------------------------------
// 60. scroll-flip-card
// ------------------------------
function scrollFlipCard(el) {
  gsap.from(el, {
    rotationY: 180,
    duration: 1.5,
    ease: "back.out(1.7)",
    scrollTrigger: { trigger: el, start: "top 85%" }
  });
}











});




//--------- effects-----------

// 1.  reveal-fade-up       (element fades in and moves up)
// 2.  reveal-fade-down     (element fades in and moves down)
// 3.  reveal-left          (element slides in from left with fade)
// 4.  reveal-right         (element slides in from right with fade)
// 5.  scale-in             (element scales from 0 to full size)
// 6.  rotate-in            (element rotates in while appearing)
// 7.  flip-x               (flip animation along X-axis)
// 8.  flip-y               (flip animation along Y-axis)
// 9.  blur-in              (element appears while blur reduces to clear)
// 10. skew-in              (element skews in place while fading in)
// 11. text-type            (typewriter style text reveal)
// 12. stagger-children     (child elements animate one after another)
// 13. zoom-out             (element shrinks down from larger size)
// 14. clip-reveal          (clip-path reveal effect)
// 15. line-reveal          (lines draw/reveal on scroll)
// 16. fade-in              (basic fade-in animation)
// 17. pop-in               (element pops in with bounce)
// 18. slide-up             (element slides upward into view)
// 19. slide-down           (element slides downward into view)
// 20. parallax-in          (parallax entry on scroll)

// 21. text-scroll-horizontal (text moves horizontally on scroll)
// 22. text-scroll-vertical   (letters reveal vertically one by one)
// 23. spiral-image           (image rotates/spirals into position)
// 24. slider-image           (3D sliding image transition)
// 25. curtain-reveal         (stage curtain open effect)
// 26. wave-text              (letters animate in wave pattern)
// 27. bounce-in              (element drops in with bounce)
// 28. tilt-reveal            (tilted/skewed reveal effect)
// 29. slide-overlap          (sliding panels overlap each other)
// 30. parallax-float         (elements float with parallax scroll)
// 31. zoom-rotate            (zoom in while rotating)
// 32. floating-card          (cards float gently on hover/scroll)
// 33. rotate-3d              (3D rotation entry)
// 34. split-reveal           (content splits open to reveal inside)
// 35. shake-in               (element shakes as it appears)
// 36. elastic-pop            (elastic scaling pop effect)
// 37. bg-parallax            (background moves slower than foreground)
// 38. fade-rotate            (fade-in combined with rotation)
// 39. scale-bounce           (scales up with bouncy easing)
// 40. curtain-split          (curtain splits from center outward)

// 41. Magnetic Cursor Reveal – elements slightly attract/repel based on cursor + fade/scale in when hovered.

// 42. Morphing Shapes – SVG blobs morph into another shape on scroll.

// 43. Distortion Hover Effect – images warp (using displacement filter) as you hover/scroll.

// 44. Split Text Scramble – text appears with scrambled letters, then resolves to real text.

// 45. Liquid Mask Reveal – elements revealed by a fluid, blobby mask (SVG filter or clipPath).

// 46. 3D Perspective Cards – stacked cards tilt + parallax separately while scrolling.

// 47. Image Sequence Scroll – scrolling scrubs through hundreds of images (like 3D renders).

// 48. Magnetic Section Pull – entire section "snaps" and stretches slightly before locking into view.

// 49. Diagonal Mask Reveal – section wipes in with angled or curved mask.

// 50. Text Outline Stroke Fill – text animates from stroked outline → filled typography.

// 51. Glass Distortion Overlay – frosted-glass blur overlay morphs to reveal content.

// 52. Layered Parallax Depth – multiple background layers move at different depths (like Webflow showcases).

// 53. Image Shatter Effect – image breaks into pieces (clipPaths) then reforms.

// 54. Gooey Menu Reveal – blobs merge/split (gooey SVG filter) when menu opens.

// 55. Text Line Sweep – each line wipes with animated gradient masks.

// 56. Image Curtain Unfold – image appears like fabric folding away.

// 57. Scroll Pin with 3D Rotation – section pins, then rotates in 3D (like flipping a book page).

// 58. Gradient Morph Backgrounds – animated gradient morphs on scroll between sections.

// 59. Image Depth Distortion – fake 3D depth using two layered images (foreground + bg) parallax.

// 60. Liquid Ink Reveal – watercolor/ink spreading effect mask (SVG displacement).


// Classes

// ---------- Basic & Intermediate Effects ----------
 // .reveal-fade-up
 // .reveal-fade-down
 // .reveal-left
 // .reveal-right
 // .scale-in
 // .rotate-in
 // .flip-x
 // .flip-y
 // .blur-in
 // .skew-in
 // .text-type
 // .stagger-children
 // .zoom-out
 // .clip-reveal
 // .line-reveal
 // .fade-in
 // .pop-in
 // .slide-up
 // .slide-down
 // .parallax-in

// ---------- Advanced Scroll/Reveal ----------
 // .text-scroll-horizontal
 // .text-scroll-vertical
 // .spiral-image
 // .slider-image
 // .curtain-reveal
 // .wave-text
 // .bounce-in
 // .tilt-reveal
 // .slide-overlap
 // .parallax-float
 // .zoom-rotate
 // .floating-card
 // .rotate-3d
 // .split-reveal
 // .shake-in
 // .elastic-pop
 // .bg-parallax
 // .fade-rotate
 // .scale-bounce
 // .curtain-split

// ---------- Special / Interactive ----------
 // .morph-shape
 // .liquid-distort
 // .scroll-scrub-rotate
 // .magnetic-button
 // .hover-tilt
 // .text-split-reveal
 // .image-mask-reveal
 // .scroll-speed-skew
 // .smooth-stagger-grid
 // .rotating-gallery
 // .text-gradient-reveal
 // .infinite-loop-marquee
 // .hover-reveal-image
 // .scroll-clip-horizontal
 // .character-wave
 // .svg-draw-path
 // .scroll-jelly
 // .layered-parallax
 // .morph-text
 // .scroll-flip-card

// ---------- Extra Conceptual (Webflow-level) ----------
 // .magnetic-cursor-reveal
 // .morphing-shapes
 // .distortion-hover
 // .split-text-scramble
 // .liquid-mask-reveal
 // .perspective-cards
 // .image-sequence-scroll
 // .magnetic-section-pull
 // .diagonal-mask-reveal
 // .text-outline-fill
 // .glass-distortion
 // .layered-parallax-depth
 // .image-shatter
 // .gooey-menu
 // .text-line-sweep
 // .image-curtain-unfold
 // .scroll-pin-3d
 // .gradient-morph-bg
 // .image-depth-distortion
 // .liquid-ink-reveal
