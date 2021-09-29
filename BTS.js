var canvas = document.getElementById("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
var ctx = canvas.getContext("2d");

window.addEventListener("resize", function() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

mouse = {
    x: undefined,
    y: undefined
}

window.addEventListener("mousemove", function(event) {
    mouse.x = event.x;
    mouse.y = event.y;
});

var colourArray = ["#8BBEFF", "#7797FC", "#3D4ED4", "#282A96", "#150054"];

function Particle(x, y, dx, dy, radius, minRadius, maxRadius, colour) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.maxRadius = maxRadius;
    this.minRadius = minRadius;
    this.colour = colour;

    this.draw = function() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        ctx.fillStyle = colour;
        ctx.fill();
    }

    this.update = function() {
        if(this.x + this.radius > canvas.width || this.x - this.radius < 0) {
            this.dx = -this.dx;
        }
        if(this.y + this.radius > canvas.height || this.y - this.radius < 0) {
            this.dy = -this.dy;
        }

        if(mouse.x - this.x < 50 && mouse.x - this.x > -50 && mouse.y - this.y < 50 && mouse.y - this.y > -50) {
            if(this.radius < this.maxRadius)
                this.radius += 1;
        } else if(this.radius > this.minRadius) {
            this.radius += -1;
        }

        this.x += this.dx;
        this.y += this.dy;

        this.draw();
    }
}

particleArray = [];

for(var i = 0; i < 5000; i++) {
    var radius = (Math.random() * 4) + 1;
    var x = Math.random() * (canvas.width - radius * 2) + radius;
    var y = Math.random() * (canvas.height - radius * 2) + radius;
    var dx = Math.random() - 0.5;
    var dy = Math.random() - 0.5;
    var maxRadius = (Math.random() * 30) + 30;
    var minRadius = (Math.random() * 4) + 1;
    var colour = colourArray[Math.floor(Math.random() * colourArray.length)];

    particleArray.push(new Particle(x, y, dx, dy, radius, minRadius, maxRadius, colour));
}

function animate() {
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for(i = 0; i < particleArray.length; i++) {
        particleArray[i].update();
    }
}

animate();