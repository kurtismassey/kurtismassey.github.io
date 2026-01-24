/**
 * Matrix Effect
 */

const canvas = document.getElementById('matrix');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const matrix =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()_+-=[]{}|;:,.<>?アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';
const fontSize = 14;
const columns = canvas.width / fontSize;

const drops = [];
for (let x = 0; x < columns; x++) {
    drops[x] = Math.random() * -100;
}

function draw() {
    ctx.fillStyle = 'rgba(10, 10, 10, 0.04)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = '#00ff88';
    ctx.font = fontSize + 'px monospace';

    for (let i = 0; i < drops.length; i++) {
        const text = matrix[Math.floor(Math.random() * matrix.length)];
        const y = drops[i] * fontSize;

        // Fade effect for trailing characters
        const opacity = Math.min(
            1,
            (canvas.height - y) / (canvas.height * 0.3),
        );
        ctx.globalAlpha = opacity * 0.6;

        ctx.fillText(text, i * fontSize, y);

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
            drops[i] = 0;
        }
        drops[i]++;
    }
    ctx.globalAlpha = 1.0;
}

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const newColumns = canvas.width / fontSize;
    const currentLength = drops.length;
    if (newColumns > currentLength) {
        for (let i = currentLength; i < newColumns; i++) {
            drops.push(Math.random() * -100);
        }
    } else if (newColumns < currentLength) {
        drops.splice(newColumns);
    }
});

setInterval(draw, 35);
