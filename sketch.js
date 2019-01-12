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
    bassSlider = createSlider(0,255,100)
    bassSlider.position(20,430)
    //Mid Values
    midSlider = createSlider(0,255,100)
    midSlider.position(20,460)
    //Treble Values
    trebleSlider = createSlider(0,255,100)
    trebleSlider.position(20,490)
}

function draw()
{
    drawSound()
    
    levelMapped = map(level,0,1,0,255)
    background(levelMapped)
    
    //Variable Tieing
    //All of these variables are being tied to vectors
    bassMapped = map(bass,0,255,0,-0.03)
    midMapped = map(mid,0,255,0,-0.03)
    trebleMapped = map(treble,0,255,0,-0.03)
    
    if(isPlaying) //This is a boolean to check if the song is playing
        {
                var p = new bassParticle()
                var b = new midParticle()
                var t = new trebleParticle()
                if(bass > bassSlider.value())
                    {
                        particles.push(p)
                    }
                if(mid > midSlider.value())
                    {
                        particles.push(b)

                    }
                if(treble > trebleSlider.value())
                    {
                        particles.push(t)

                    }
                
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
    
    
// Visual representation
//    fill(255)
//    rect(0,300,bass,20)
//    fill(0,255,0)
//    rect(0,320,mid,20)
//    fill(0,0,255)
//    rect(0,340,treble,20)
//    fill(0)
//    rect(0,400,300,100)
    
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

class bassParticle {
    
    constructor() { //This is where all of the variables are intially intialised
        this.location = createVector(width/2,height/2)
        this.velocity = createVector(random(-1,1),random(-4,-1))
        this.gravity = createVector(random(-0.04,0.04),0.05)
        this.trans = 255;
        this.size = bass * 0.03 + 10
    }
    
    update()
    {
//        if(this.location.y > 500 || this.location.y < 0)
//            {
//                this.velocity.mult(-1)
//            }
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
        
        noStroke()
        fill(255,0,0,this.trans)
        ellipse(this.location.x,this.location.y,this.size,this.size)
    }
    
}

class midParticle {
        constructor() { //This is where all of the variables are intially intialised
        
            
        this.location = createVector(width/3,height/2)
        this.velocity = createVector(random(-1,1),random(-4,-1))
        
        this.midVector = createVector(0,midMapped)
        
        this.gravity = createVector(random(-0.04,0.04),0.05)
        
        this.trans = 255;
        
        this.size = mid * 0.03 + 10
    }
    
    update()
    {
//        if(this.location.y > 500 || this.location.y < 0)
//            {
//                this.velocity.mult(-1)
//            }
        
        this.trans --
        
        this.velocity.add(this.gravity);
        

        this.location.add(this.velocity);
        this.location.add(this.midVector)



    }
    
    gone()
    {
        return this.trans < 0
    }
    
    show() {
        
        noStroke()
        fill(0,255,0,this.trans)
        rect(this.location.x,this.location.y,this.size,this.size)
    }
}

class trebleParticle {
    
    constructor() { //This is where all of the variables are intially intialised
        
        this.location = createVector(width/3 * 2,height/2)
        this.velocity = createVector(random(-1,1),random(-4,-1))
        
        
        this.trebleVector = createVector(0,trebleMapped)
        
        this.gravity = createVector(random(-0.04,0.04),0.05)
        
        this.trans = 255;
        
        this.size = treble * 0.03 + 10
    }
    
    update()
    {
//        if(this.location.y > 500 || this.location.y < 0)
//            {
//                this.velocity.mult(-1)
//            }
        
        this.trans --
        
        this.velocity.add(this.gravity);
        
        this.location.add(this.velocity);
        this.location.add(this.bassVector)

        
    }
    
    gone()
    {
        return this.trans < 0
    }
    
    show() {
        
        noStroke()
        fill(0,0,255,this.trans)
//        ellipse(this.location.x,this.location.y,this.size,this.size)
        triangle(this.location.x,this.location.y,this.location.x + this.size, this.location.y, this.location.x + (this.size/2),this.location.y - this.size)
    }
    
}



