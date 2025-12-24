document.addEventListener("DOMContentLoaded", () => {
  const janSchmidt = document.getElementById("jan-schmidt");
  const pronunciation = document.getElementById("pronunciation-text");
  const zentrumTrigger = document.getElementById("zentrum-trigger");
  const arrowOlten = document.querySelector("#ArrowOlten");

  // Arrow Olten DrawSVG animation on hover
  if (zentrumTrigger && arrowOlten) {
    const arrowPath = arrowOlten.querySelector("path");
    
    // Initialize DrawSVG to 0 and opacity to 1
    if (arrowPath) {
      gsap.set(arrowPath, { drawSVG: "0%" });
      gsap.set(arrowOlten, { opacity: 1 });
    }

    zentrumTrigger.addEventListener("mouseenter", () => {
      gsap.to(arrowPath, { drawSVG: "0% 100%", duration: 1.5, ease: "power2.out" });
    });

    zentrumTrigger.addEventListener("mouseleave", () => {
      gsap.to(arrowPath, { drawSVG: "0%", duration: 0.5, ease: "power2.in" });
    });
  }

  // Animated word cycling
  const animatedWord = document.getElementById("animated-word");
  if (animatedWord) {
    const words = ["ehrliche", "ästhetische", "stimmungsvolle", "echte", "atmosphärische", "lebendige", "nachdenkliche"];
    let currentIndex = 0;
    
    function typeWord(word, callback) {
      let chars = word.split("");
      let textContent = "";
      
      chars.forEach((char, index) => {
        gsap.to({}, {
          duration: 0.1,
          delay: index * 0.1,
          onComplete: () => {
            textContent += char;
            animatedWord.childNodes[0].textContent = textContent;
            if (index === chars.length - 1 && callback) {
              gsap.delayedCall(2, callback);
            }
          }
        });
      });
    }
    
    function deleteWord(callback) {
      let currentText = animatedWord.childNodes[0].textContent;
      let chars = currentText.split("");
      
      for (let i = chars.length - 1; i >= 0; i--) {
        gsap.to({}, {
          duration: 0.05,
          delay: (chars.length - 1 - i) * 0.05,
          onComplete: () => {
            animatedWord.childNodes[0].textContent = currentText.substring(0, i);
            if (i === 0 && callback) {
              gsap.delayedCall(0.3, callback);
            }
          }
        });
      }
    }
    
    function cycleWords() {
      currentIndex = (currentIndex + 1) % words.length;
      typeWord(words[currentIndex], () => {
        deleteWord(cycleWords);
      });
    }
    
    // Wrap text content in a text node to preserve cursor
    const originalText = animatedWord.textContent;
    animatedWord.textContent = "";
    animatedWord.appendChild(document.createTextNode(originalText));
    
    // Start the cycle after initial display
    gsap.delayedCall(3, () => {
      deleteWord(cycleWords);
    });
  }

  // Set initial state - hidden
  gsap.set(pronunciation, {
    opacity: 0,
    y: -10,
    height: 0
  });

  // Hover in animation
  janSchmidt.addEventListener("mouseenter", () => {
    gsap.killTweensOf(pronunciation);
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
    gsap.killTweensOf(pronunciation);
    gsap.to(pronunciation, {
      duration: 0.3,
      opacity: 0,
      y: -10,
      height: 0,
      ease: "power2.in"
    });
  });
});
