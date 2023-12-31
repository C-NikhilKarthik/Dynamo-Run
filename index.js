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
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;

        if(this.position.y + this.height + this.velocity.y<= canvas.height){
            this.velocity.y += gravity
        }else{
            this.velocity.y = 0
        }
    }
}

class Platform {
    constructor({x, y}){
        this.position = {
            x:x,
            y:y
        }
        this.width = 200;
        this.height = 20;
    }

    draw(){
        context.fillStyle = 'green';
        context.fillRect(this.position.x, this.position.y, this.width, this.height);
    }
}

const player = new Player()
const platforms = [new Platform({x: 200,y: 100}), new Platform({x: 500, y: 200})]

const keys = {
    right:{
        pressed:false
    },
    left:{
        pressed:false
    }
}

let scrollOffSet = 0;

function animate (){
    requestAnimationFrame(animate)
    context.clearRect(0, 0, canvas.width, canvas.height)
    player.update()
    platforms.forEach(platform => {
        platform.draw()
    });

    if (keys.right.pressed && player.position.x < 400){
        player.velocity.x=5
    } else if (keys.left.pressed && player.position.x > 100){
        player.velocity.x= -5
    }
       else {
        player.velocity.x=0
        if(keys.right.pressed){
            scrollOffSet += 5
            platforms.forEach(platform => {
                platform.position.x -= 5
            });
        }

        else if(keys.left.pressed){
            scrollOffSet -= 5
            platforms.forEach(platform => {
                platform.position.x += 5
            });
        }
    }

    console.log(scrollOffSet);

    //Platform Collision Detection
    platforms.forEach(platform => {
        if (player.position.y + player.height <= platform.position.y && player.position.y + player.height + player.velocity.y >= platform.position.y && player.position.x + player.width >= platform.position.x && player.position.x <= platform.position.x + platform.width){
            player.velocity.y = 0
            player.position.y = platform.position.y - player.height
        }
    });

}

animate()

addEventListener('keydown', (event) => {
    const keyCode = event.key.charCodeAt(0);
    // console.log(keyCode)
  
    switch(keyCode){
        case 97:
            console.log('left')
            keys.left.pressed=true
            break;

            case 115:
                console.log('down')
                break;
                case 100:
                    console.log('right')
                   keys.right.pressed=true
                    break;
                    case 119:
                        console.log('up')
                        player.velocity.y -= 10
                        break;

        
    }
    console.log(keys.right.pressed)
  });

  addEventListener('keyup', (event) => {
    const keyCode = event.key.charCodeAt(0);
    // console.log(keyCode)
  
    switch(keyCode){
        case 97:
            console.log('left')
            keys.left.pressed=false
            break;

            case 115:
                console.log('down')
                break;
                case 100:
                    console.log('right')
                    keys.right.pressed=false
                   
                    break;
                    case 119:
                        console.log('up')
                        player.velocity.y -= 10
                        break;

        
    }
    console.log(keys.right.pressed)
  });
