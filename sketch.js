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

var max = 0;


function setup()
{
    setupSound()
    createCanvas(500,500)
    
    p = new Particle();
}

function draw()
{
    drawSound()
    colorMode(HSB)
    background(bass,50,50)
    
    colorMode(RGB)
    
    //Variable Tieing
    //All of these variables are being tied to vectors
    bassMapped = map(bass,0,255,-5,0)
    midMapped = map(mid,0,255,-1,1)
    trebleMapped = map(treble,0,255,-1,1)
    
    //Misc
    
    
    
    
    if(isPlaying) //This is a boolean to check if the song is playing
        {
                var p = new Particle()
                particles.push(p)
        }
    
    for(var i = 0; i < particles.length; i++)
        {
            particles[i].show();
            particles[i].update();
            
            if(particles[i].gone())
                {
                    particles.splice(i,1)
                }
        }
    
    
    rect(0,300,bass,20)
    
    //HUD Related function
    fill(255)
    text("Please use a MP3 File to start playing",290,30)
    
    if(amplitude.volume > max)
        {
            max = amplitude.volume
            console.log(amplitude.volume)
        }
}

class Particle {
    
    constructor() { //This is where all of the variables are intially intialised
        
        this.location = createVector(width/2,height/2)
        this.velocity = createVector(random(-1,1),random(-4,-1))
        
        
        this.bassVector = createVector(0,bassMapped)
        
        this.gravity = createVector(0,0.05)
        
        this.trans = 255;
        
        this.size = bass * 0.03 + 10
    }
    
    update()
    {
        
        this.trans --
        
        this.velocity.add(this.gravity);
        
        
        if(bass > 50)
            {
                        this.location.add(this.velocity);

            }
        
        if(bass > 100)
            {
                        this.location.add(this.bassVector)

            }
        
    }
    
    gone()
    {
        return this.trans < 0
    }
    
    show() {
        
        noStroke()
        fill(255,0,0,this.trans)
        ellipse(this.location.x,this.location.y,this.size,this.size)
    }
    
}