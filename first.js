let highestZ=1;

class Paper
{

    holdingPaper=false;

    prevMouseX=0;//initial/default coordinates of mouse
    prevMouseY=0;

    mouseX=0;//current coordinates of mouse
    mouseY=0;

    velocityX=0;//kitna speed se animation hoga
    velocityY=0;

    currentPaperX=0;//new position of paper
    currentPaperY=0;


    init(paper){

        paper.addEventListener('mousedown',(e)=>{

            this.holdingPaper=true;
            paper.style.zIndex=highestZ;//on selecting the particular paper uska z-index bada ho jaaye wrt other papers
            highestZ+= 1;
            //e.button===0 left click,1--> scroll and 2 for right click
            if(e.button === 0){
                this.prevMouseX=this.mouseX;
                this.prevMouseY=this.mouseY;
                //prev mouse ka position current mouse ka position ban jaa raha hai
            }
        })

        document.addEventListener('mousemove',(e)=>
        {
            //we are storing the current mouse position in the mouseX and mouseY variables
            this.mouseX=e.clientX;//method that return x-coordinate of mouse event
            this.mouseY=e.clientY;//method that return y-coordinate of mouse event

            this.velocityX=this.mouseX - this.prevMouseX;//final position-initial position
            this.velocityY=this.mouseY - this.prevMouseY;

            if(this.holdingPaper){
                this.currentPaperX += this.velocityX;//find the current position of paper
                this.currentPaperY += this.velocityY;

                this.prevMouseX=this.mouseX;//prev position ko update kar de rahe hai
                this.prevMouseY=this.mouseY;

                paper.style.transform = `translateX(${this.currentPaperX}px) translateY(${this.currentPaperY}px)`;
            }

        })

        window.addEventListener('mouseup',(e)=>
        {
            this.holdingPaper=false;
        })

    }
}

const papers=Array.from(document.querySelectorAll('.paper'))

papers.forEach( paper =>{
    const p=new Paper();
    p.init(paper);
})