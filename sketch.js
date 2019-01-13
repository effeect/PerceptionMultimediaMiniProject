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

//Mapped Variables
var bassMapped;
var midMapped;
var trebleMapped; 

//Sliders (FOR GUI)
var bassSlider;
var midSlider;
var trebleSlider;

var levelMapped;

function setup()
{
    setupSound()
    createCanvas(800,500)
    //HUD RELATED FUNCTIONS
    //Bass Values
    bassSlider = createSlider(0,255,150)
    bassSlider.position(20,430)
    //Mid Values
    midSlider = createSlider(0,255,120)
    midSlider.position(20,460)
    //Treble Values
    trebleSlider = createSlider(0,255,40)
    trebleSlider.position(20,490)
}

function draw()
{
    drawSound()
    background(0)
/*  UNCOMMENT THIS TO ALLOW FOR INTERACTIVE BACKGROUND (NOT RECOMMENDED)
    levelMapped = map(level,0,1,0,255)
    background(levelMapped)
*/  
    
    //All of these variables are being tied to vectors
    bassMapped = map(bass,0,255,0,-0.03)
    midMapped = map(mid,0,255,0,-0.03)
    trebleMapped = map(treble,0,255,0,-0.03)
    
    if(isPlaying) //This is a boolean to check if the song is playing
        {
            //Particle generation happens here
                var b = new bassParticle()
                var m = new midParticle()
                var t = new trebleParticle()
                
                //THIS GENERATES THE PARTICLES. The .value() function is the slider value in the GUI. Can be modified to any value between 0 and 255
                if(bass > bassSlider.value())
                    {
                        particles.push(b)
                    }
                if(mid > midSlider.value())
                    {
                        particles.push(m)

                    }
                if(treble > trebleSlider.value())
                    {
                        particles.push(t)

                    }
                
        }
    
    //This loop runs all of the particles at once
    for(var i = 0; i < particles.length; i++)
        {
            
            particles[i].show(); //RENDERING
            particles[i].update(); //DYNAMICS
            
            //ACTS AS DECONSTRUCTOR
            if(particles[i].gone())
                {
                    particles.splice(i,1) 
                }
        }
    
/* 
    //BAR TO REPRESENT bass, mid and treble values. Used for debugging but can be enabled for normal use
    
    fill(255)
    rect(0,300,bass,20)
    fill(0,255,0)
    rect(0,320,mid,20)
    fill(0,0,255)
    rect(0,340,treble,20)
    fill(0)
    rect(0,400,300,100)
*/
    fill(255)
    text("Bass Threshold : " + bassSlider.value(), 170,423)
    text("Mid Threshold : " + midSlider.value(), 170,453)
    text("Treble Threshold : " + trebleSlider.value(), 170,483)
    
    //HUD Related function
    fill(255)
    text("Please use a MP3 File to start playing",290,30)
    
    //Note, using Math.trunc is not currently supported by IE. It supports all other major browsers according to this article https://pawelgrzybek.com/rounding-and-truncating-numbers-in-javascript/
    text("Bass = " + Math.trunc(bass), 25,350)
    text("Mid = " + Math.trunc(mid), 25,370)
    text("Treble = " + Math.trunc(treble), 25,390)

}

//List of particles

class bassParticle { //RED CIRCLE
    
    constructor() { //This is where all of the variables are intially intialised
        this.location = createVector(width/2,height/2)
        this.velocity = createVector(random(-1,1),random(-4,-1))
        this.gravity = createVector(random(-0.04,0.04),0.05)
        this.trans = 300;
        this.size = bass * 0.08 + 10
    }
    
    update()
    {
        this.bassVector = createVector(0,bassMapped)
        this.trans --
        this.velocity.add(this.bassVector)
        this.velocity.add(this.gravity);
        this.location.add(this.velocity);
    }
    
    gone()
    {
        return this.trans < 0
    }
    
    show() {
        stroke(0)
        fill(255,0,0,this.trans)
        ellipse(this.location.x,this.location.y,this.size,this.size)
    }
    
}

class midParticle { //GREEN SQUARE
    
    constructor() { //This is where all of the variables are intially intialised
        this.location = createVector(width/3,height/2)
        this.velocity = createVector(random(-1,1),random(-4,-1))
        this.gravity = createVector(random(-0.04,0.04),0.05)
        this.trans = 300;
        this.size = mid * 0.08 + 10
    }
    
    update() //Updates 60 times a second
    {
        this.midVector = createVector(0,midMapped)
        this.trans -- 
        this.velocity.add(this.midVector)
        this.velocity.add(this.gravity);
        this.location.add(this.velocity);

    }
    
    gone()
    {
        return this.trans < 0
    }
    
    show() {
        
        stroke(0)
        fill(0,255,0,this.trans)
        rect(this.location.x,this.location.y,this.size,this.size)
    }
}

class trebleParticle { //BLUE TRIANGLE
    
    constructor() { //This is where all of the variables are intially intialised
        this.location = createVector(width/3 * 2,height/2)
        this.velocity = createVector(random(-1,1),random(-4,-1))
        this.gravity = createVector(random(-0.04,0.04),0.05)
        this.trans = 300;
        this.size = treble * 0.08 + 10
    }
    
    update()
    {
        this.trebleVector = createVector(0,trebleMapped)
        this.trans --
        this.velocity.add(this.trebleVector)
        this.velocity.add(this.gravity);
        this.location.add(this.velocity);
    }
    
    gone()
    {
        return this.trans < 0
    }
    
    show() {
        stroke(0)
        fill(0,0,255,this.trans)
        triangle(this.location.x,this.location.y,this.location.x + this.size, this.location.y, this.location.x + (this.size/2),this.location.y - this.size)
    }
    
}



