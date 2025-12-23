document.addEventListener("DOMContentLoaded", () => {
  // Check if screen is mobile (less than 768px)
  const isMobile = window.matchMedia("(max-width: 768px)").matches;
  
  if (isMobile) {
    // Get all image containers
    const imageContainers = document.querySelectorAll(".image-container");
    
    imageContainers.forEach(container => {
      const svgLayer = container.querySelector(".svg-layer");
      const photoLayer = container.querySelector(".photo-layer");
      
      // Create scroll-triggered animation
      // SVG visible at start -> fade to photo in middle -> fade back to SVG at end
      gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: "top 75%",
          end: "bottom 25%",
          scrub: 1
        }
      })
      .fromTo(svgLayer, { opacity: 1 }, { opacity: 0, duration: 0.5 })
      .fromTo(photoLayer, { opacity: 0 }, { opacity: 1, duration: 0.5 }, "<")
      .to(svgLayer, { opacity: 1, duration: 0.5 })
      .to(photoLayer, { opacity: 0, duration: 0.5 }, "<");
    });
  }
});