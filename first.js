let highestZ = 1;

class Paper {
  holdingPaper = false;

  prevMouseX = 0; // Initial/default coordinates of mouse
  prevMouseY = 0;

  mouseX = 0; // Current coordinates of mouse
  mouseY = 0;

  velocityX = 0; // Speed of animation
  velocityY = 0;

  currentPaperX = 0; // New position of paper
  currentPaperY = 0;

  init(paper) {
    const onMouseDown = (e) => {
      this.holdingPaper = true;
      paper.style.zIndex = highestZ; // Increase z-index of selected paper
      highestZ += 1;

      if (e.type === 'mousedown' && e.button === 0) {
        // Mouse down
        this.prevMouseX = e.clientX;
        this.prevMouseY = e.clientY;
      } else if (e.type === 'touchstart') {
        // Touch start
        this.prevMouseX = e.touches[0].clientX;
        this.prevMouseY = e.touches[0].clientY;
      }
    };

    const onMouseMove = (e) => {
      if (this.holdingPaper) {
        if (e.type === 'mousemove') {
          this.mouseX = e.clientX;
          this.mouseY = e.clientY;
        } else if (e.type === 'touchmove') {
          this.mouseX = e.touches[0].clientX;
          this.mouseY = e.touches[0].clientY;
        }

        this.velocityX = this.mouseX - this.prevMouseX;
        this.velocityY = this.mouseY - this.prevMouseY;

        this.currentPaperX += this.velocityX;
        this.currentPaperY += this.velocityY;

        this.prevMouseX = this.mouseX;
        this.prevMouseY = this.mouseY;

        paper.style.transform = `translateX(${this.currentPaperX}px) translateY(${this.currentPaperY}px)`;
      }
    };

    const onMouseUp = () => {
      this.holdingPaper = false;
    };

    // Add mouse event listeners
    paper.addEventListener('mousedown', onMouseDown);
    document.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);

    // Add touch event listeners
    paper.addEventListener('touchstart', onMouseDown);
    document.addEventListener('touchmove', onMouseMove);
    window.addEventListener('touchend', onMouseUp);
  }
}

const papers = Array.from(document.querySelectorAll('.paper'));

papers.forEach((paper) => {
  const p = new Paper();
  p.init(paper);
});
