/**
 * Section animations and rendering
 */

// Animate certifications
function animateCertifications() {
    const container = document.getElementById('cert-output');
    if (!container) return;

    let delay = 200;
    const baseDelay = 100;

    // Group by category
    const grouped = certifications.reduce((acc, cert) => {
        if (!acc[cert.category]) acc[cert.category] = [];
        acc[cert.category].push(cert);
        return acc;
    }, {});

    Object.keys(grouped).forEach((category) => {
        const certs = grouped[category];
        const categoryColor = certCategoryColors[category] || colours.green;

        // Category header
        setTimeout(() => {
            const categoryHeader = document.createElement('div');
            categoryHeader.className = 'cert-category-header';
            categoryHeader.style.setProperty('--category-color', categoryColor);

            const categoryName = document.createElement('span');
            categoryName.className = 'cert-category-name';
            categoryName.textContent = `[${certs[0].categoryLabel.toUpperCase()}]`;

            categoryHeader.appendChild(categoryName);
            container.appendChild(categoryHeader);
        }, delay);

        delay += baseDelay * 2;

        // Certifications in this category
        certs.forEach((cert) => {
            setTimeout(() => {
                const line = document.createElement('div');
                line.className = 'cert-terminal-line';
                line.style.setProperty('--category-color', categoryColor);

                const badge = document.createElement('span');
                badge.className = 'cert-badge';
                badge.textContent = '●';
                badge.style.color = categoryColor;

                const nameSpan = document.createElement('span');
                nameSpan.className = 'cert-name-inline';

                const metaSpan = document.createElement('span');
                metaSpan.className = 'cert-meta-inline';

                const linkSpan = document.createElement('span');
                linkSpan.className = 'cert-link-inline';
                const link = document.createElement('a');
                link.href = cert.url;
                link.target = '_blank';
                link.textContent = ' [VIEW]';
                link.style.color = categoryColor;
                linkSpan.appendChild(link);
                linkSpan.style.opacity = '0';

                line.appendChild(badge);
                line.appendChild(nameSpan);
                line.appendChild(metaSpan);
                line.appendChild(linkSpan);
                line.style.opacity = '0';
                container.appendChild(line);

                // Type out animation
                let currentIndex = 0;
                const fullText = cert.name;
                const typeName = () => {
                    if (currentIndex < fullText.length) {
                        nameSpan.textContent = fullText.substring(
                            0,
                            currentIndex + 1,
                        );
                        line.style.opacity = '1';
                        currentIndex++;
                        setTimeout(typeName, 40);
                    } else {
                        // Add meta after name is typed
                        setTimeout(() => {
                            metaSpan.textContent = ` | ${cert.issuer} | ${cert.date}`;
                            setTimeout(() => {
                                linkSpan.style.opacity = '1';
                            }, 200);
                        }, 100);
                    }
                };

                setTimeout(() => typeName(), 50);
            }, delay);

            delay += baseDelay * 4;
        });

        delay += baseDelay * 2;
    });
}

// Initialise certifications observer
function initCertificationsObserver() {
    const certSection = document.getElementById('certifications');
    if (!certSection) return;

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting && entry.intersectionRatio > 0.3) {
                    const container = document.getElementById('cert-output');
                    if (container && container.children.length === 0) {
                        animateCertifications();
                    }
                    observer.unobserve(entry.target);
                }
            });
        },
        {
            threshold: 0.3,
        },
    );

    observer.observe(certSection);
}

// Animate about terminal output
function animateAboutTerminal() {
    const outputContainer = document.getElementById('about-output');

    if (!outputContainer) return;

    const { bio, award } = aboutData;

    // Clear container
    outputContainer.innerHTML = '';
    outputContainer.style.opacity = '0';

    setTimeout(() => {
        outputContainer.style.opacity = '1';

        // Type bio
        setTimeout(() => {
            const bioLine = document.createElement('div');
            bioLine.className = 'terminal-output-line';
            bioLine.style.color = 'var(--text-light)';
            bioLine.style.lineHeight = '1.8';
            bioLine.style.marginBottom = '1.5rem';
            outputContainer.appendChild(bioLine);
            typeTerminalText(bioLine, bio, () => {
                // Add separator
                setTimeout(() => {
                    const separator = document.createElement('div');
                    separator.className = 'terminal-separator';
                    separator.textContent = '─'.repeat(60);
                    separator.style.color = 'var(--border-color)';
                    separator.style.margin = '1.5rem 0';
                    outputContainer.appendChild(separator);

                    // Type award title
                    setTimeout(() => {
                        const awardTitleLine = document.createElement('div');
                        awardTitleLine.className = 'terminal-output-line';
                        awardTitleLine.style.color = 'var(--matrix-green)';
                        awardTitleLine.style.fontWeight = '600';
                        awardTitleLine.style.fontSize = '1.1rem';
                        awardTitleLine.style.marginBottom = '0.5rem';
                        outputContainer.appendChild(awardTitleLine);
                        typeTerminalText(awardTitleLine, award.title, () => {
                            // Type issuer
                            setTimeout(() => {
                                const issuerLine =
                                    document.createElement('div');
                                issuerLine.className = 'terminal-output-line';
                                issuerLine.style.color = 'var(--text-grey)';
                                issuerLine.style.fontStyle = 'italic';
                                issuerLine.style.marginBottom = '0.75rem';
                                outputContainer.appendChild(issuerLine);
                                typeTerminalText(
                                    issuerLine,
                                    award.issuer,
                                    () => {
                                        // Type description
                                        setTimeout(() => {
                                            const descLine =
                                                document.createElement('div');
                                            descLine.className =
                                                'terminal-output-line';
                                            descLine.style.color =
                                                'var(--text-light)';
                                            descLine.style.marginTop = '0.5rem';
                                            descLine.style.lineHeight = '1.6';
                                            outputContainer.appendChild(
                                                descLine,
                                            );
                                            typeTerminalText(
                                                descLine,
                                                award.description,
                                                () => {
                                                    // Add separator before skills
                                                    setTimeout(() => {
                                                        const skillsSeparator =
                                                            document.createElement(
                                                                'div',
                                                            );
                                                        skillsSeparator.className =
                                                            'terminal-separator';
                                                        skillsSeparator.textContent =
                                                            '─'.repeat(60);
                                                        skillsSeparator.style.color =
                                                            'var(--border-color)';
                                                        skillsSeparator.style.margin =
                                                            '1.5rem 0';
                                                        outputContainer.appendChild(
                                                            skillsSeparator,
                                                        );

                                                        // Add skills badges
                                                        setTimeout(() => {
                                                            renderSkillsBadges(
                                                                outputContainer,
                                                            );
                                                        }, 200);
                                                    }, 300);
                                                },
                                            );
                                        }, 200);
                                    },
                                );
                            }, 200);
                        });
                    }, 300);
                }, 300);
            });
        }, 200);
    }, 300);
}

// Render skills badges with colour-coded categories
function renderSkillsBadges(outputContainer) {
    const skillsContainer = document.createElement('div');
    skillsContainer.className = 'about-skills-container';
    outputContainer.appendChild(skillsContainer);

    // Create colour key/legend
    const legend = document.createElement('div');
    legend.className = 'skills-legend';
    legend.style.marginBottom = '1rem';
    legend.style.display = 'flex';
    legend.style.flexWrap = 'wrap';
    legend.style.gap = '1rem';
    legend.style.fontSize = '0.75rem';
    legend.style.fontFamily = "'Courier New', 'Monaco', monospace";

    Object.entries(skillCategories).forEach(([category, data]) => {
        const legendItem = document.createElement('div');
        legendItem.className = 'legend-item';
        legendItem.style.display = 'flex';
        legendItem.style.alignItems = 'center';
        legendItem.style.gap = '0.4rem';

        const colorDot = document.createElement('span');
        colorDot.className = 'legend-dot';
        colorDot.style.width = '8px';
        colorDot.style.height = '8px';
        colorDot.style.borderRadius = '50%';
        colorDot.style.backgroundColor = data.color;
        colorDot.style.boxShadow = `0 0 6px ${data.color}`;

        const label = document.createElement('span');
        label.textContent = category;
        label.style.color = 'var(--text-grey)';

        legendItem.appendChild(colorDot);
        legendItem.appendChild(label);
        legend.appendChild(legendItem);
    });

    skillsContainer.appendChild(legend);

    // Create skills wrapper
    const skillsWrapper = document.createElement('div');
    skillsWrapper.className = 'about-skills-wrapper';
    skillsWrapper.style.display = 'flex';
    skillsWrapper.style.flexWrap = 'wrap';
    skillsWrapper.style.gap = '0.35rem';
    skillsContainer.appendChild(skillsWrapper);

    // Flatten all skills with category info
    let allSkills = [];
    Object.entries(skillCategories).forEach(([category, data]) => {
        data.skills.forEach((skill) => {
            allSkills.push({ skill, category, color: data.color });
        });
    });

    // Add skills badges with animation and category colours
    allSkills.forEach((item, index) => {
        const badge = document.createElement('span');
        badge.className = 'about-skill-badge';
        badge.textContent = item.skill;
        badge.style.setProperty('--skill-color', item.color);
        badge.style.borderColor = item.color;
        badge.style.color = item.color;
        // Convert hex to rgba for background
        const r = parseInt(item.color.slice(1, 3), 16);
        const g = parseInt(item.color.slice(3, 5), 16);
        const b = parseInt(item.color.slice(5, 7), 16);
        badge.style.background = `rgba(${r}, ${g}, ${b}, 0.08)`;
        badge.style.textShadow = `0 0 4px ${item.color}`;

        // Store colour for hover effect
        badge.dataset.color = item.color;
        badge.dataset.colorRgb = `${r}, ${g}, ${b}`;
        badge.style.opacity = '0';
        badge.style.transform = 'scale(0.9)';
        skillsWrapper.appendChild(badge);

        // Add hover effect
        badge.addEventListener('mouseenter', function () {
            const rgb = this.dataset.colorRgb;
            this.style.background = `rgba(${rgb}, 0.15)`;
        });
        badge.addEventListener('mouseleave', function () {
            const rgb = this.dataset.colorRgb;
            this.style.background = `rgba(${rgb}, 0.08)`;
        });

        setTimeout(() => {
            badge.style.transition = 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
            badge.style.opacity = '1';
            badge.style.transform = 'scale(1)';
        }, index * 50);
    });

    // Add cursor at end
    setTimeout(
        () => {
            const cursor = document.createElement('span');
            cursor.className = 'terminal-cursor';
            cursor.textContent = '█';
            cursor.style.marginLeft = '0.25rem';
            skillsContainer.appendChild(cursor);

            setTimeout(() => {
                cursor.remove();
            }, 2000);
        },
        allSkills.length * 50 + 200,
    );
}

// Animate experience terminal output
function animateExperienceTerminal() {
    const container = document.getElementById('experience-terminal');
    if (!container) return;

    let roleIndex = 0;
    const orgBlocks = [];

    // First: Create all blocks and add them to the DOM (hidden)
    experienceData.forEach((org, orgIndex) => {
        const orgBlock = document.createElement('div');
        orgBlock.className = 'experience-block';
        orgBlock.style.setProperty('--job-color', org.color);
        orgBlock.style.opacity = '0';
        orgBlock.style.transform = 'translateX(-30px) scale(0.95)';
        orgBlock.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';

        // Organisation header
        const orgHeader = document.createElement('div');
        orgHeader.className = 'experience-org-header';

        const orgNameSpan = document.createElement('span');
        orgNameSpan.className = 'experience-company';
        orgNameSpan.textContent = `[ORG] ${org.company}`;

        orgHeader.appendChild(orgNameSpan);
        orgBlock.appendChild(orgHeader);

        // Add roles with all content pre-filled
        if (org.roles && Array.isArray(org.roles)) {
            org.roles.forEach((role, roleIdx) => {
                const roleDiv = document.createElement('div');
                roleDiv.className = 'experience-role';

                // Role header
                const roleHeader = document.createElement('div');
                roleHeader.className = 'experience-header';

                const titleSpan = document.createElement('span');
                titleSpan.className = 'experience-title';
                titleSpan.textContent = `  └─ [${roleIndex + 1}] ${role.title}`;

                roleHeader.appendChild(titleSpan);
                roleDiv.appendChild(roleHeader);

                // Duration
                const durationDiv = document.createElement('div');
                durationDiv.className = 'experience-duration';
                durationDiv.textContent = `      └─ ${role.duration}`;
                roleDiv.appendChild(durationDiv);

                // Description - filled in immediately
                const descDiv = document.createElement('div');
                descDiv.className = 'experience-description';
                descDiv.textContent = role.description || '';
                roleDiv.appendChild(descDiv);

                // Tech tags - all created immediately
                const techDiv = document.createElement('div');
                techDiv.className = 'experience-tech';
                if (role.tech && Array.isArray(role.tech)) {
                    role.tech.forEach((tech) => {
                        const tag = document.createElement('span');
                        tag.className = 'tech-tag';
                        tag.textContent = tech;
                        tag.style.opacity = '0';
                        tag.style.transform = 'scale(0.9)';
                        techDiv.appendChild(tag);
                    });
                }
                roleDiv.appendChild(techDiv);

                orgBlock.appendChild(roleDiv);
                roleIndex++;
            });
        }

        // Add to DOM immediately (but hidden)
        container.appendChild(orgBlock);
        orgBlocks.push(orgBlock);
    });

    // Second: Animate blocks in sequence
    orgBlocks.forEach((orgBlock, orgIndex) => {
        const delay = 200 + orgIndex * 400;

        setTimeout(() => {
            orgBlock.style.opacity = '1';
            orgBlock.style.transform = 'translateX(0) scale(1)';

            // Animate tech tags after card appears
            setTimeout(() => {
                const tags = orgBlock.querySelectorAll('.tech-tag');
                tags.forEach((tag, tagIndex) => {
                    setTimeout(() => {
                        tag.style.transition =
                            'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
                        tag.style.opacity = '1';
                        tag.style.transform = 'scale(1)';
                    }, tagIndex * 50);
                });
            }, 200);
        }, delay);
    });
}

// Display contributions
function animateContributionsJSON() {
    const outputContainer = document.getElementById('contributions-output');
    if (!outputContainer) return;

    // Build type definition
    let output = '<div class="ts-interface">';

    // Type definition
    output +=
        '<span class="ts-keyword">type</span> <span class="ts-interface-name">Category</span> <span class="ts-operator">=</span> <span class="ts-string">"personal"</span> <span class="ts-operator">|</span> <span class="ts-string">"open_source"</span>;\n\n';
    output +=
        '<span class="ts-keyword">interface</span> <span class="ts-interface-name">Contribution</span> <span class="ts-brace">{</span>\n';
    output +=
        '  <span class="ts-key">repo</span><span class="ts-operator">:</span> <span class="ts-keyword">string</span>;\n';
    output +=
        '  <span class="ts-key">desc</span><span class="ts-operator">:</span> <span class="ts-keyword">string</span>;\n';
    output +=
        '  <span class="ts-key">lang</span><span class="ts-operator">:</span> <span class="ts-keyword">string</span>;\n';
    output +=
        '  <span class="ts-key">stars</span><span class="ts-operator">:</span> <span class="ts-keyword">number</span> <span class="ts-operator">|</span> <span class="ts-keyword">string</span>;\n';
    output +=
        '  <span class="ts-key">url</span><span class="ts-operator">:</span> <span class="ts-keyword">string</span>;\n';
    output +=
        '  <span class="ts-key">category</span><span class="ts-operator">:</span> <span class="ts-interface-name">Category</span>;\n';
    output += '<span class="ts-brace">}</span>\n\n';

    // Contribution array
    output +=
        '<span class="ts-keyword">const</span> <span class="ts-property">contributions</span><span class="ts-operator">:</span> <span class="ts-interface-name">Contribution</span><span class="ts-brace">[]</span> <span class="ts-operator">=</span> <span class="ts-brace">[</span>\n';

    contributions.forEach((contrib, index) => {
        const isLast = index === contributions.length - 1;
        const starsStr =
            typeof contrib.stars === 'string'
                ? `"${contrib.stars}"`
                : contrib.stars;
        const descStr = contrib.desc ? `"${contrib.desc}"` : '""';

        const categoryClass =
            contrib.category === 'personal'
                ? 'ts-category-personal'
                : 'ts-category-open-source';
        output += '  <span class="ts-brace">{</span>\n';
        output += `    <span class="ts-key">repo</span><span class="ts-operator">:</span> <span class="ts-string">"${contrib.repo}"</span>,\n`;
        output += `    <span class="ts-key">desc</span><span class="ts-operator">:</span> <span class="ts-string">${descStr}</span>,\n`;
        output += `    <span class="ts-key">lang</span><span class="ts-operator">:</span> <span class="ts-string">"${contrib.lang}"</span>,\n`;
        output += `    <span class="ts-key">stars</span><span class="ts-operator">:</span> <span class="ts-number">${starsStr}</span>,\n`;
        output += `    <span class="ts-key">url</span><span class="ts-operator">:</span> <span class="ts-string">"<a href="${contrib.url}" target="_blank" class="ts-link">${contrib.url}</a>"</span>,\n`;
        output += `    <span class="ts-key">category</span><span class="ts-operator">:</span> <span class="ts-string ${categoryClass}">"${contrib.category}"</span>\n`;
        output += `  <span class="ts-brace">}</span>${isLast ? '' : ','}\n`;
    });

    output += '<span class="ts-brace">]</span>;\n';
    output += '</div>';

    // Display immediately
    outputContainer.innerHTML = output;
    outputContainer.style.opacity = '0';

    setTimeout(() => {
        outputContainer.style.transition = 'opacity 0.3s ease';
        outputContainer.style.opacity = '1';
    }, 50);
}

// Animate sections on scroll
function initSectionAnimations() {
    const sections = document.querySelectorAll('.section');

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting && entry.intersectionRatio > 0.2) {
                    const section = entry.target;

                    // Animate experience terminal
                    if (section.id === 'experience') {
                        const experienceTerminal = section.querySelector(
                            '#experience-terminal',
                        );
                        if (
                            experienceTerminal &&
                            experienceTerminal.children.length === 0
                        ) {
                            animateExperienceTerminal();
                        }
                    }

                    // Animate skills
                    if (section.id === 'skills') {
                        const categories =
                            section.querySelectorAll('.skill-category');
                        categories.forEach((cat, index) => {
                            setTimeout(() => {
                                cat.style.opacity = '0';
                                cat.style.transform = 'translateY(20px)';
                                cat.style.transition = 'all 0.6s ease';
                                setTimeout(() => {
                                    cat.style.opacity = '1';
                                    cat.style.transform = 'translateY(0)';
                                }, 50);
                            }, index * 150);
                        });
                    }

                    // Animate contributions JSON
                    if (section.id === 'contributions') {
                        const contributionsOutput = section.querySelector(
                            '#contributions-output',
                        );
                        if (
                            contributionsOutput &&
                            contributionsOutput.children.length === 0
                        ) {
                            animateContributionsJSON();
                        }
                    }

                    // Animate about section
                    if (section.id === 'about') {
                        const aboutOutput =
                            section.querySelector('#about-output');
                        if (aboutOutput && aboutOutput.children.length === 0) {
                            animateAboutTerminal();
                        }
                    }

                    observer.unobserve(section);
                }
            });
        },
        {
            threshold: 0.2,
        },
    );

    sections.forEach((section) => {
        observer.observe(section);
    });
}

// Show scroll indicators
function initScrollIndicators() {
    const indicators = document.querySelectorAll('.scroll-indicator');
    const allSections = document.querySelectorAll('.section-full');
    const lastSection = allSections[allSections.length - 1];

    // Wait for animations to complete
    setTimeout(() => {
        indicators.forEach((indicator, index) => {
            // Show if not the last section
            const section = indicator.closest('.section-full');

            if (section && section !== lastSection) {
                indicator.style.pointerEvents = 'auto';
                indicator.style.cursor = 'pointer';

                // Add click handler to scroll to next section
                indicator.addEventListener('click', () => {
                    const currentSection = indicator.closest('.section-full');
                    if (!currentSection) return;

                    // Find all sections in order
                    const sectionsArray = Array.from(allSections);
                    const currentIndex = sectionsArray.indexOf(currentSection);

                    // Get next section
                    if (currentIndex !== -1 && currentIndex < sectionsArray.length - 1) {
                        const nextSection = sectionsArray[currentIndex + 1];
                        nextSection.scrollIntoView({
                            behavior: 'smooth',
                            block: 'start',
                        });
                    }
                });

                // Wait for section content
                const observer = new IntersectionObserver(
                    (entries) => {
                        entries.forEach((entry) => {
                            if (entry.isIntersecting) {
                                setTimeout(() => {
                                    indicator.classList.add('visible');
                                }, 500);
                                observer.unobserve(entry.target);
                            }
                        });
                    },
                    { threshold: 0.3 },
                );

                observer.observe(section);
            }
        });
    }, 2000);
}
