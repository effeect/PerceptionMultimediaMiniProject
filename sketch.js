/*
There are five main variables you can access that give out values, they spit out values between 0 and 255 :
    - bass
    - lowMid
    - mid
    - highMid
    - treble
    - level (from 0 to 1)
*/

var particles = [];

var bassMapped;
var midMapped;
var trebleMapped; 

function setup()
{
    setupSound()
    createCanvas(500,500)
    
    p = new Particle();
}

function draw()
{
    drawSound()
    
    background(0)
    
    var p = new Particle()
    particles.push(p)
    
    for(var i = 0; i < particles.length; i++)
        {
            particles[i].show();
            particles[i].update();
            
            if(particles[i].gone())
                {
                    particles.splice(i,1)
                }
        }
}

class Particle {
    
    constructor() { //This is where all of the variables are intially intialised
        
        this.location = createVector(width/2,height/2)
        this.velocity = createVector(random(-1,1),random(-4,-1))
        
        this.gravity = createVector(0,0.05)
        
        this.x = width/2
        this.y = height/2
        this.vx = random(-1,1)
        this.vy = random(-5,-1)
        
        this.trans = 255;
    }
    
    update()
    {
        this.x += this.vx 
        this.y += this.vy
        this.trans --
        
        this.velocity.add(this.gravity);
        
        this.location.add(this.velocity);
        
        
    }
    
    gone()
    {
        return this.trans < 0
    }
    
    show() {
        stroke(255)
        fill(255,random(0,200),0,this.trans)
        ellipse(this.location.x,this.location.y,16)
    }
    
}