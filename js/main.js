document.addEventListener("DOMContentLoaded", event => {
  // Function to add hover animations to a button
  function addButtonAnimation(button) {
    const buttonText = button.querySelector(".button-text");
    
    button.addEventListener("mouseenter", () => {
      const randomRotation = Math.random() < 0.5 ? -10 : 10;
      
      // Kill any existing animations
      gsap.killTweensOf(button);
      gsap.killTweensOf(buttonText);
      
      gsap.to(button, {
        duration: 1,
        scale: 1.2,
        rotation: randomRotation,
        ease: "elastic.out(1,0.4)"
      });

      // Animate text upwards and fade out
      gsap.to(buttonText, {
        duration: 0.1,
        y: -20,
        opacity: 0,
        ease: "power2.in",
        onComplete: () => {
          // Reset position to below and scale up
          gsap.set(buttonText, { y: 20, scale: 1.3 });
          // Animate back to visible from below
          gsap.to(buttonText, {
            duration: 0.1,
            y: 0,
            opacity: 1,
            ease: "power2.out"
          });
        }
      });
    });

    button.addEventListener("mouseleave", () => {
      // Kill any existing animations
      gsap.killTweensOf(button);
      gsap.killTweensOf(buttonText);
      
      gsap.to(button, {
        duration: 0.5,
        scale: 1,
        rotation: 0,
        ease: "elastic.out(1,0.5)"
      });

      // Animate text downwards and fade out
      gsap.to(buttonText, {
        duration: 0.1,
        y: 30,
        opacity: 0,
        ease: "power2.in",
        onComplete: () => {
          // Reset to original size and position below
          gsap.set(buttonText, { y: -30, scale: 1 });
          // Animate back to visible from below
          gsap.to(buttonText, {
            duration: 0.1,
            y: 0,
            opacity: 1,
            ease: "power2.out"
          });
        }
      });
    });
  }

  // Apply animations to all action buttons
  const actionButtons = document.querySelectorAll("#action-button");
  actionButtons.forEach(button => {
    addButtonAnimation(button);
  });

  // Apply animations to all navigation buttons
  const navButtons = document.querySelectorAll(".nav-button");
  navButtons.forEach(button => {
    addButtonAnimation(button);
  });
});