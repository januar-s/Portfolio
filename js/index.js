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
        // Different settings for h2 vs other elements
        const isH2 = text.tagName === "H2";
        const endPoint = isH2 ? "clamp(top 50%)" : "clamp(bottom center)";
        
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
                start: "clamp(top 85%)",
                end: endPoint
              }
            });
          }
        });
      });
    });
  });
});
