const canvas = document.querySelector('canvas');

const context = canvas.getContext('2d');
canvas.width = innerWidth
canvas.height = innerHeight
const grd = context.createLinearGradient(0, 100, 200, 0)
grd.addColorStop(1,'purple')
grd.addColorStop(0,'pink')
const gravity = 0.5
class Player{
    constructor(){
        this.position = {
            x:100,
            y:100
        }
        this.velocity = {
            x:0,
            y:0
        }
        this.width = 30;
        this.height = 30;
    }

    draw(){
        context.fillStyle = grd;
        context.fillRect(this.position.x, this.position.y, this.width, this.height);
    }

    update(){
        this.draw()
        this.position.y += this.velocity.y;

        if(this.position.y + this.height + this.velocity.y<= canvas.height){
            this.velocity.y += gravity
        }else{
            this.velocity.y = 0
        }
    }
}

class Platform {
    constructor(){
        this.position = {
            x:200,
            y:100
        }
        this.width = 200;
        this.height = 20;
    }

    draw(){
        context.fillStyle = 'blue';
        context.fillRect(this.position.x, this.position.y, this.width, this.height);
    }
}

const player = new Player()
const platform = new Platform()

function animate (){
    requestAnimationFrame(animate)
    context.clearRect(0, 0, canvas.width, canvas.height)
    player.update()
    platform.draw()
}

animate()