document.addEventListener("DOMContentLoaded", event => {
  // Register GSAP plugins
  gsap.registerPlugin(SplitText, ScrollTrigger);

  // Set initial opacity for split text
  gsap.set(".split", { opacity: 1 });

  // Line-by-line reveal animation
  document.fonts.ready.then(() => {
    // Animate sections
    let containers = gsap.utils.toArray(".eingerueckt, .fliesstext");

    containers.forEach((container) => {
      let textElements = container.querySelectorAll(".split");
      if (!textElements.length) return;

      textElements.forEach((text) => {
        SplitText.create(text, {
          type: "words,lines",
          mask: "lines",
          linesClass: "line",
          autoSplit: true,
          onSplit: (instance) => {
            return gsap.from(instance.lines, {
              yPercent: 120,
              stagger: 0.1,
              scrollTrigger: {
                trigger: container,
                scrub: true,
                start: "clamp(top 80%)",
                end: "clamp(bottom center)"
              }
            });
          }
        });
      });
    });
  });
});
