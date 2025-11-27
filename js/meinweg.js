document.addEventListener("DOMContentLoaded", () => {
  const janSchmidt = document.getElementById("jan-schmidt");
  const pronunciation = document.getElementById("pronunciation-text");

  // Set initial state - hidden
  gsap.set(pronunciation, {
    opacity: 0,
    y: -10,
    height: 0
  });

  // Hover in animation
  janSchmidt.addEventListener("mouseenter", () => {
    gsap.to(pronunciation, {
      duration: 0.4,
      opacity: 0.5,
      y: 0,
      height: "auto",
      ease: "power2.out"
    });
  });

  // Hover out animation
  janSchmidt.addEventListener("mouseleave", () => {
    gsap.to(pronunciation, {
      duration: 0.3,
      opacity: 0,
      y: -10,
      height: 0,
      ease: "power2.in"
    });
  });
});
