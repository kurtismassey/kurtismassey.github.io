/**
 * Core Animation Utilities
 */

// Keep the newest streamed content in view
function followStream(element) {
    const streamWindow = element.closest('.stream-window');
    if (streamWindow) {
        streamWindow.scrollTop = streamWindow.scrollHeight;
    }
}

// Return to the start once a stream finishes, so the reader begins at the top
function rewindStream(element) {
    const streamWindow = element.closest('.stream-window');
    if (streamWindow) {
        streamWindow.scrollTo({ top: 0, behavior: 'smooth' });
    }
}

// Terminal text typing effect
function typeWriter(element, text, speed = 50, callback) {
    let i = 0;
    element.textContent = '';

    const cursor = document.createElement('span');
    cursor.className = 'typing-cursor';
    cursor.textContent = '█';
    cursor.style.color = 'var(--matrix-green)';
    cursor.style.animation = 'blink 1s infinite';
    element.appendChild(cursor);

    function type() {
        if (i < text.length) {
            cursor.remove();
            element.textContent += text.charAt(i);
            element.appendChild(cursor);
            i++;
            setTimeout(type, speed);
        } else if (callback) {
            cursor.remove();
            setTimeout(callback, 300);
        }
    }
    type();
}

// Type terminal text
function typeTerminalText(element, text, callback) {
    let i = 0;
    element.textContent = '';

    const cursor = document.createElement('span');
    cursor.className = 'typing-cursor';
    cursor.textContent = '█';
    cursor.style.color = 'var(--matrix-green)';
    cursor.style.animation = 'blink 1s infinite';
    element.appendChild(cursor);

    function type() {
        if (i < text.length) {
            cursor.remove();
            element.textContent += text.charAt(i);
            element.appendChild(cursor);
            followStream(element);
            i++;
            setTimeout(type, 10);
        } else if (callback) {
            cursor.remove();
            setTimeout(callback, 100);
        }
    }
    type();
}
