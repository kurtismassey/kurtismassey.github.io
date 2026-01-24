/**
 * Main initialisation
 */

// Initialise home page terminal
function initHomeTerminal() {
    const commandText = document.getElementById('command-text');
    const terminalOutput = document.getElementById('terminal-output');

    // Hide the static cursor initially
    const staticCursor = document.querySelector('.terminal-cursor');
    if (staticCursor) {
        staticCursor.style.display = 'none';
    }

    // Type the command, then type out output
    typeWriter(commandText, 'whoami', 80, () => {
        setTimeout(() => {
            // Create container
            terminalOutput.innerHTML = `
                <div class="terminal-output-line terminal-name-line">
                    <span class="terminal-name"></span>
                </div>
                <div class="terminal-output-line terminal-subtitle-line">
                    <span class="terminal-subtitle"></span>
                </div>
                <div class="terminal-output-line terminal-location-line">
                    <span class="terminal-location"></span>
                </div>
                <div class="terminal-output-line terminal-status-line">
                    <span class="terminal-status">
                        <span class="status-prefix" style="opacity: 0;">></span>
                        <span class="status-text"></span>
                    </span>
                </div>
                <div class="terminal-output-line terminal-status-line">
                    <span class="terminal-status">
                        <span class="status-prefix" style="opacity: 0;">></span>
                        <span class="status-text status-ready"></span>
                    </span>
                </div>
            `;

            // Get references
            const nameSpan = terminalOutput.querySelector('.terminal-name');
            const subtitleSpan =
                terminalOutput.querySelector('.terminal-subtitle');
            const locationSpan =
                terminalOutput.querySelector('.terminal-location');
            const firstStatusLine = terminalOutput.querySelectorAll(
                '.terminal-status-line',
            )[0];
            const firstStatusPrefix =
                firstStatusLine.querySelector('.status-prefix');
            const statusText = firstStatusLine.querySelector(
                '.status-text:not(.status-ready)',
            );
            const secondStatusLine = terminalOutput.querySelectorAll(
                '.terminal-status-line',
            )[1];
            const secondStatusPrefix =
                secondStatusLine.querySelector('.status-prefix');
            const readyText = secondStatusLine.querySelector('.status-ready');

            // Type name
            typeWriter(nameSpan, homeData.name, 60, () => {
                // Type subtitle
                setTimeout(() => {
                    typeCategoryBadges(subtitleSpan, () => {
                        // Type location
                        setTimeout(() => {
                            typeLocationCommand(locationSpan, () => {
                                // Type status
                                setTimeout(() => {
                                    firstStatusPrefix.style.transition =
                                        'opacity 0.3s ease';
                                    firstStatusPrefix.style.opacity = '1';

                                    typeWriter(
                                        statusText,
                                        homeData.statusMessages.initialised,
                                        50,
                                        () => {
                                            setTimeout(() => {
                                                secondStatusPrefix.style.transition =
                                                    'opacity 0.3s ease';
                                                secondStatusPrefix.style.opacity =
                                                    '1';

                                                typeWriter(
                                                    readyText,
                                                    homeData.statusMessages
                                                        .ready,
                                                    50,
                                                    () => {
                                                        // Fade out and remove status after delay
                                                        setTimeout(() => {
                                                            const statusLines =
                                                                terminalOutput.querySelectorAll(
                                                                    '.terminal-status-line',
                                                                );
                                                            statusLines.forEach(
                                                                (line) => {
                                                                    line.style.opacity =
                                                                        '0';
                                                                    line.style.transform =
                                                                        'translateY(-10px)';
                                                                    line.style.transition =
                                                                        'all 0.5s ease';
                                                                },
                                                            );
                                                            // Remove from DOM after transition
                                                            setTimeout(() => {
                                                                statusLines.forEach(
                                                                    (line) =>
                                                                        line.remove(),
                                                                );
                                                            }, 500);
                                                        }, 800);
                                                    },
                                                );
                                            }, 300);
                                        },
                                    );
                                }, 400);
                            });
                        }, 300);
                    });
                }, 300);
            });
        }, 400);
    });
}

// Type category badges
function typeCategoryBadges(subtitleSpan, callback) {
    const categories = Object.keys(homeCategoryColors);

    subtitleSpan.style.display = 'flex';
    subtitleSpan.style.flexWrap = 'wrap';
    subtitleSpan.style.gap = '0.5rem';
    subtitleSpan.style.alignItems = 'center';

    let currentCategoryIndex = 0;
    let currentIndex = 0;
    let currentText = '';

    function typeCategory() {
        if (currentCategoryIndex < categories.length) {
            const category = categories[currentCategoryIndex];
            const color = homeCategoryColors[category];

            const badge = document.createElement('span');
            badge.className = 'home-category-badge';
            badge.style.setProperty('--category-color', color);
            badge.style.borderColor = color;
            badge.style.color = color;
            badge.style.opacity = '0';
            badge.style.transform = 'scale(0.9)';

            // Convert hex to rgba
            const r = parseInt(color.slice(1, 3), 16);
            const g = parseInt(color.slice(3, 5), 16);
            const b = parseInt(color.slice(5, 7), 16);
            badge.style.background = `rgba(${r}, ${g}, ${b}, 0.08)`;
            badge.style.textShadow = `0 0 4px ${color}`;
            badge.dataset.colorRgb = `${r}, ${g}, ${b}`;

            subtitleSpan.appendChild(badge);

            // Type category name character by character
            function typeChar() {
                if (currentIndex < category.length) {
                    currentText += category.charAt(currentIndex);
                    badge.textContent = currentText;
                    currentIndex++;
                    setTimeout(typeChar, 25);
                } else {
                    // Category complete, animate badge in
                    badge.style.transition =
                        'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
                    badge.style.opacity = '1';
                    badge.style.transform = 'scale(1)';

                    // Add hover effect
                    badge.addEventListener('mouseenter', function () {
                        const rgb = this.dataset.colorRgb;
                        this.style.background = `rgba(${rgb}, 0.15)`;
                    });
                    badge.addEventListener('mouseleave', function () {
                        const rgb = this.dataset.colorRgb;
                        this.style.background = `rgba(${rgb}, 0.08)`;
                    });

                    // Move to next category
                    currentText = '';
                    currentIndex = 0;
                    currentCategoryIndex++;

                    if (currentCategoryIndex < categories.length) {
                        setTimeout(typeCategory, 100);
                    } else if (callback) {
                        callback();
                    }
                }
            }

            typeChar();
        }
    }

    typeCategory();
}

// Type location command
function typeLocationCommand(locationSpan, callback) {
    locationSpan.innerHTML = '';

    // Prompt
    const promptPart = document.createElement('span');
    promptPart.style.color = 'var(--matrix-green)';
    promptPart.textContent = '$';
    locationSpan.appendChild(promptPart);

    // Space
    const spacePart = document.createElement('span');
    spacePart.textContent = ' ';
    locationSpan.appendChild(spacePart);

    // Command
    const commandPart = document.createElement('span');
    commandPart.style.color = 'var(--text-light)';
    commandPart.textContent = 'echo $LOCATION';
    locationSpan.appendChild(commandPart);

    // Add response line
    setTimeout(() => {
        const responseLine = document.createElement('div');
        responseLine.className = 'terminal-output-line';
        responseLine.style.marginTop = '0.5rem';
        responseLine.style.fontSize = '0.9rem';
        responseLine.style.color = 'var(--text-light)';
        responseLine.style.fontFamily = "'Courier New', 'Monaco', monospace";

        const responseText = document.createElement('span');
        responseText.textContent = '';
        responseLine.appendChild(responseText);
        locationSpan.parentElement.appendChild(responseLine);

        // Type response
        typeWriter(responseText, homeData.location, 40, callback);
    }, 500);
}

// Smooth scrolling
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const target = document.querySelector(targetId);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start',
                });
            }
        });
    });
}

// Update active nav link
function updateActiveNav() {
    const sections = document.querySelectorAll('.section-full');
    const navLinks = document.querySelectorAll('.menu-item');

    let current = '';
    sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        if (window.scrollY >= sectionTop - 100) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach((link) => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

// Intersection Observer
function initFadeObserver() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px',
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.section').forEach((section) => {
        observer.observe(section);
    });
}

// Initialise components
document.addEventListener('DOMContentLoaded', () => {
    initHomeTerminal();
    initSmoothScrolling();
    initFadeObserver();
    initCertificationsObserver();
    initSectionAnimations();

    window.addEventListener('scroll', updateActiveNav);
    updateActiveNav();
});

// Initialise scroll indicators
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        setTimeout(initScrollIndicators, 1000);
    });
} else {
    setTimeout(initScrollIndicators, 1000);
}
