// prime canvas
const canvas = document.getElementById('myCanvas');
const context = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

// Array to hold flower data
let flowers = [];

// Function to create a flower object
function createFlower(x, y, size, petalColor, centerColor) {
    return {
        x: x,
        y: y,
        size: size,
        petalColor: petalColor,
        centerColor: centerColor,
        rotationAngle: 0,
        targetRotationSpeed: 0,
        rotationSpeed: 0,
        proximityThreshold: size * 4 // Proximity based on flower size
    };
}

// draw flower (same as before)
function drawFlower(ctx, flower) {
    const { x, y, size, petalColor, centerColor, rotationAngle } = flower;
    const angle = (Math.PI * 2) / 8;

        // draw the stalk first so its underneath everything. 
    ctx.beginPath();
    ctx.moveTo(x, y + size); // Start point below the flower center
    ctx.quadraticCurveTo(x - size / 2, y + size * 3, x, y + size * 5); // Curved stalk
    ctx.strokeStyle = "green";  // Green color for the stalk
    ctx.lineWidth = size / 8;      // Stalk thickness (adjust as needed)
    ctx.stroke();
    ctx.closePath();

    // draw the petals 
    for (let i = 0; i < 8; i++) {
        const petalX = x + size * Math.cos(angle * i);
        const petalY = y + size * Math.sin(angle * i);

        ctx.beginPath();
        ctx.arc(petalX, petalY, size / 2.3, angle * i + Math.PI / 1, angle * i - Math.PI / 2, true);
        ctx.fillStyle = petalColor;
        ctx.fill();
        ctx.closePath();
    }

    // rotation
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(rotationAngle);
    ctx.translate(-x, -y);

    // draw the center
    ctx.beginPath();
    ctx.arc(x, y, size / 1.0, 0, Math.PI * 2);
    ctx.fillStyle = "beige";
    ctx.fill();
    ctx.closePath();

    // Draw the eyes
    ctx.beginPath();
    const eyeSize = size / 10; // Adjust eye size
    ctx.arc(x - size / 2, y - size / 3, eyeSize, 0, Math.PI * 2); // Left eye
    ctx.arc(x + size / 2, y - size / 3, eyeSize, 0, Math.PI * 2); // Right eye
    ctx.fillStyle = "gray"; // Eye color
    ctx.fill();
    ctx.closePath();

    // Draw the smile
    ctx.beginPath();
    ctx.arc(x, y + size / 10, size / 1.5, 0, Math.PI, false); // The smile curve
    ctx.strokeStyle = "gray"; // Smile color
    ctx.lineWidth = eyeSize / 2; // Smile thickness
    ctx.stroke();
    ctx.fill();
    ctx.closePath();

    ctx.restore();
}


// Create some initial flowers
flowers.push(createFlower(200, 300, 50, 'pink', 'yellow'));
flowers.push(createFlower(500, 200, 70, 'lightblue', 'orange'));
flowers.push(createFlower(700, 400, 30, 'lightgreen', 'purple'));
flowers.push(createFlower(350, 500, 60, 'lightcoral', 'brown'));



canvas.addEventListener('mousemove', (event) => {
    const rect = canvas.getBoundingClientRect();
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;

    flowers.forEach(flower => {
        const distance = Math.sqrt((mouseX - flower.x) ** 2 + (mouseY - flower.y) ** 2);

        if (distance < flower.proximityThreshold) {
            flower.targetRotationSpeed = 0.2;
        } else {
            flower.targetRotationSpeed = 0;
        }
    });
});

function animate() {
    context.clearRect(0, 0, canvas.width, canvas.height);

    flowers.forEach(flower => {
        const speedDelta = flower.targetRotationSpeed - flower.rotationSpeed;
        flower.rotationSpeed += speedDelta * 0.1;

        flower.rotationAngle += flower.rotationSpeed;
        drawFlower(context, flower);
    });

    requestAnimationFrame(animate);
}

animate();