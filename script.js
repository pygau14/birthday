// Music player functionality
let musicPlaying = false;
let audioLoaded = false;

function toggleMusic() {
    const audio = document.getElementById('backgroundMusic');
    const button = document.getElementById('musicButton');
    const status = document.getElementById('musicStatus');
    
    if (!audio) {
        console.error('Audio element not found');
        status.textContent = 'Audio element missing';
        return;
    }
    
    // Set volume to maximum for better audibility
    audio.volume = 1.0;
    
    // Check if audio is loaded
    if (audio.readyState === 0) {
        console.log('Audio file not loaded yet. Loading now...');
        status.textContent = 'Loading...';
        audio.load();
    }
    
    const musicIcon = button.querySelector('.music-icon');
    
    if (musicPlaying) {
        audio.pause();
        musicIcon.classList.remove('playing');
        musicPlaying = false;
        status.textContent = 'Paused';
    } else {
        // Ensure volume is set before playing
        audio.volume = 1.0;
        const playPromise = audio.play();
        
        if (playPromise !== undefined) {
            playPromise.then(() => {
                musicIcon.classList.add('playing');
                musicPlaying = true;
                audioLoaded = true;
                status.textContent = 'Playing...';
                console.log('Music playing successfully');
            }).catch(error => {
                console.error('Error playing audio:', error);
                musicIcon.classList.remove('playing');
                status.textContent = 'Error: ' + error.message;
                alert('Cannot play music.\n\nCommon issues:\n1. File permissions (file:// URL)\n2. Browser autoplay policy\n3. Audio format not supported\n\nTry: Open via file explorer → right-click index.html → Open with Chrome');
            });
        }
    }
}

// Audio will be loaded in the main window load event

// Create realistic fireflies with wings
function createFireflies() {
    const starsContainer = document.getElementById('stars');
    const numFireflies = 12;

    for (let i = 0; i < numFireflies; i++) {
        const fireflyContainer = document.createElement('div');
        fireflyContainer.className = 'firefly-container';
        
        // Firefly body (glowing part)
        const fireflyBody = document.createElement('div');
        fireflyBody.className = 'firefly-body';
        
        // Firefly wings (two wings)
        const wing1 = document.createElement('div');
        wing1.className = 'firefly-wing wing-left';
        
        const wing2 = document.createElement('div');
        wing2.className = 'firefly-wing wing-right';
        
        fireflyContainer.appendChild(wing1);
        fireflyContainer.appendChild(wing2);
        fireflyContainer.appendChild(fireflyBody);
        
        // Random starting position
        fireflyContainer.style.left = Math.random() * 100 + '%';
        fireflyContainer.style.top = Math.random() * 100 + '%';
        fireflyContainer.style.animationDelay = Math.random() * 20 + 's';
        fireflyContainer.style.animationDuration = (Math.random() * 20 + 25) + 's';
        
        starsContainer.appendChild(fireflyContainer);
        
        // Add individual glow animation
        fireflyBody.style.animationDelay = Math.random() * 2 + 's';
    }
}

// Fireworks function with romantic messages
function createFireworks() {
    const canvas = document.getElementById('confetti-canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Clear canvas first
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const fireworkColors = [
        '#ff6b9d', '#ffa5d8', '#ffb3e6', '#ffc2d6', '#ffd1e8',
        '#ffa5c8', '#ff8cc8', '#ffb5d8', '#d98ba3', '#ffccd5',
        '#ff9ec8', '#ffbdd4', '#ffd1e6'
    ];

    // Personal appreciation messages - genuine and heartfelt
    const messages = [
        "You are enough, even when you feel like you're not doing enough.",
        "Your laughter carries light, it changes the energy around you.",
        "You are allowed to take your time to heal, to choose yourself, and to grow.",
        "I'm grateful for every version of you that trusted me with a little part of her heart.",
        "I see the woman you're becoming, more powerful, wise, and soft.",
        "You have the rare ability to make ordinary moments feel special.",
        "I wish for your heart to find peace in places that once brought pain.",
        "You are magic, not because of how you look, but because of how you make people feel.",
        "I hope you never doubt your worth again, it's infinite.",
        "You've made me understand love beyond words, beyond mistakes.",
        "You are deserving of a love that never makes you question your value.",
        "I'm proud of your journey, even the parts I wasn't there for.",
        "You are my reminder that love isn't perfect, but it can still be pure.",
        "May this new year of your life bring you calm mornings and fearless nights.",
        "No matter where life takes us, a part of my heart will always wish you peace, happiness, and love.",
        "Thank you for everything my cutest kid, adu will always be proud of you!"
    ];

    const particles = [];
    const messageElements = [];
    let animationId;
    let fireworkCount = 0;

    // Create multiple fireworks - one for each message
    const numFireworks = messages.length; // Show all messages
    
    function createFirework(fireworkIndex) {
        // Use center-upper area for better visibility
        const startX = canvas.width / 2 + (Math.random() - 0.5) * (canvas.width * 0.3);
        const startY = canvas.height * 0.35 + (Math.random() - 0.5) * (canvas.height * 0.2);
        
        // Launch rocket
        let rocketY = canvas.height;
        const rocketSpeed = 5; // Increased speed for faster launch
        const targetY = startY;
        
        function launchRocket() {
            if (rocketY > targetY) {
                // Clear previous rocket trail
                ctx.fillStyle = 'rgba(20, 20, 30, 0.1)';
                ctx.fillRect(0, 0, canvas.width, canvas.height);
                
                // Draw realistic rocket trail with particles
                const trailLength = canvas.height - rocketY;
                for (let t = 0; t < trailLength; t += 3) {
                    const trailY = canvas.height - t;
                    ctx.beginPath();
                    ctx.fillStyle = `rgba(255, ${200 - t * 0.5}, ${100 - t * 0.3}, ${1 - t / trailLength * 0.7})`;
                    ctx.arc(startX + (Math.random() - 0.5) * 2, trailY, 1, 0, Math.PI * 2);
                    ctx.fill();
                }
                
                // Draw rocket with orange/yellow tip
                ctx.beginPath();
                ctx.fillStyle = '#ffffff';
                ctx.arc(startX, rocketY, 2, 0, Math.PI * 2);
                ctx.fill();
                ctx.beginPath();
                ctx.fillStyle = '#ffa500';
                ctx.arc(startX, rocketY - 3, 1, 0, Math.PI * 2);
                ctx.fill();
                
                rocketY -= rocketSpeed;
                requestAnimationFrame(launchRocket);
            } else {
                // Explode
                explode(startX, targetY, fireworkIndex);
            }
        }

        function explode(x, y, msgIndex) {
            // Realistic firework explosion - multiple layers
            const mainParticleCount = 45;
            const sparkleCount = 60;
            const angleStep = (Math.PI * 2) / mainParticleCount;
            
            // Main explosion particles
            for (let i = 0; i < mainParticleCount; i++) {
                const angle = i * angleStep;
                const speed = Math.random() * 8 + 4;
                const vx = Math.cos(angle) * speed;
                const vy = Math.sin(angle) * speed;
                const color = fireworkColors[Math.floor(Math.random() * fireworkColors.length)];
                
                particles.push({
                    x: x,
                    y: y,
                    vx: vx,
                    vy: vy,
                    color: color,
                    size: Math.random() * 3.5 + 2,
                    opacity: 1,
                    gravity: 0.1,
                    trail: false,
                    type: 'main',
                    twinkle: Math.random() < 0.3
                });
            }
            
            // Enhanced sparkles - multiple types for realism
            for (let i = 0; i < sparkleCount; i++) {
                const angle = Math.random() * Math.PI * 2;
                const speed = Math.random() * 7 + 2;
                const vx = Math.cos(angle) * speed;
                const vy = Math.sin(angle) * speed;
                const color = fireworkColors[Math.floor(Math.random() * fireworkColors.length)];
                
                // Create different types of sparkles
                const sparkleType = Math.random();
                
                particles.push({
                    x: x,
                    y: y,
                    vx: vx,
                    vy: vy,
                    color: color,
                    size: sparkleType > 0.7 ? Math.random() * 2 + 1 : Math.random() * 1.5 + 0.5,
                    opacity: 1,
                    gravity: 0.05 + Math.random() * 0.03,
                    trail: true,
                    type: 'sparkle',
                    twinkle: true,
                    lifetime: Math.random() * 60 + 60, // frames before fading
                    age: 0
                });
            }
            
            // Add golden/white sparkles for extra shimmer
            for (let i = 0; i < 40; i++) {
                const angle = Math.random() * Math.PI * 2;
                const speed = Math.random() * 5 + 1;
                const vx = Math.cos(angle) * speed;
                const vy = Math.sin(angle) * speed;
                
                particles.push({
                    x: x,
                    y: y,
                    vx: vx,
                    vy: vy,
                    color: Math.random() > 0.5 ? '#fffacd' : '#fff8dc',
                    size: Math.random() * 2 + 0.3,
                    opacity: 1,
                    gravity: 0.04,
                    trail: true,
                    type: 'shimmer',
                    twinkle: true,
                    lifetime: Math.random() * 50 + 50,
                    age: 0
                });
            }

            // Create message element - ensure it stays on screen
            const messageDiv = document.createElement('div');
            messageDiv.className = 'firework-message';
            messageDiv.textContent = messages[msgIndex];
            messageDiv.style.position = 'fixed';
            
            // Ensure message stays within screen bounds
            const maxWidth = Math.min(600, window.innerWidth * 0.75); // Max width, responsive
            const padding = 40;
            
            // Calculate safe X position (ensure it doesn't go off screen)
            let safeX = x;
            if (safeX < padding + maxWidth / 2) {
                safeX = padding + maxWidth / 2;
            } else if (safeX > window.innerWidth - padding - maxWidth / 2) {
                safeX = window.innerWidth - padding - maxWidth / 2;
            }
            
            // Calculate safe Y position (ensure it doesn't go off screen)
            let safeY = y;
            const estimatedHeight = messages[msgIndex].length > 80 ? 120 : 80; // Estimate based on length
            if (safeY < padding + estimatedHeight / 2) {
                safeY = padding + estimatedHeight / 2;
            } else if (safeY > window.innerHeight - padding - estimatedHeight / 2) {
                safeY = window.innerHeight - padding - estimatedHeight / 2;
            }
            
            messageDiv.style.left = safeX + 'px';
            messageDiv.style.top = safeY + 'px';
            messageDiv.style.transform = 'translate(-50%, -50%)';
            messageDiv.style.opacity = '0';
            messageDiv.style.fontSize = 'clamp(1.2rem, 3vw, 2rem)';
            messageDiv.style.fontWeight = '600';
            messageDiv.style.color = '#ffa5d8';
            messageDiv.style.maxWidth = maxWidth + 'px';
            messageDiv.style.textAlign = 'center';
            messageDiv.style.padding = '0';
            messageDiv.style.background = 'transparent';
            messageDiv.style.borderRadius = '0';
            messageDiv.style.pointerEvents = 'none';
            messageDiv.style.zIndex = '10000';
            messageDiv.style.transition = 'all 0.6s ease-out';
            messageDiv.style.wordWrap = 'break-word';
            messageDiv.style.lineHeight = '1.6';
            messageDiv.style.boxShadow = 'none';
            messageDiv.style.textShadow = '0 2px 10px rgba(255, 165, 216, 0.5), 0 0 20px rgba(255, 165, 216, 0.3)';
            document.body.appendChild(messageDiv);

            // Animate message appearance
            setTimeout(() => {
                messageDiv.style.opacity = '1';
                messageDiv.style.transform = 'translate(-50%, -50%) scale(1.05)';
            }, 150);

            // Remove message after reading (faster timing)
            setTimeout(() => {
                messageDiv.style.opacity = '0';
                messageDiv.style.transform = 'translate(-50%, -50%) scale(0.9)';
                setTimeout(() => {
                    messageDiv.remove();
                }, 600);
            }, 4000); // Message stays visible for 4 seconds
        }

        launchRocket();
    }

    function animate() {
        // Clear canvas with fade effect for trail
        ctx.fillStyle = 'rgba(20, 20, 30, 0.12)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Update and draw particles - more realistic
        for (let i = particles.length - 1; i >= 0; i--) {
            const p = particles[i];
            
            // Update particle age if applicable
            if (p.age !== undefined) {
                p.age++;
            }
            
            // Calculate twinkle effect
            let currentOpacity = p.opacity;
            if (p.twinkle) {
                const twinklePhase = (Date.now() % 400) / 400;
                currentOpacity = p.opacity * (0.7 + Math.sin(twinklePhase * Math.PI * 2) * 0.3);
            }
            
            // Draw extended trail for sparkles
            if (p.trail && p.opacity > 0.2) {
                const trailLength = p.type === 'shimmer' ? 4 : 3;
                for (let t = 0; t < trailLength; t++) {
                    const trailX = p.x - p.vx * t * 0.3;
                    const trailY = p.y - p.vy * t * 0.3;
                    const trailOpacity = currentOpacity * (1 - t / trailLength) * 0.4;
                    
                    ctx.beginPath();
                    ctx.arc(trailX, trailY, p.size * (1 - t / trailLength * 0.5), 0, Math.PI * 2);
                    ctx.fillStyle = p.color.includes('rgba') 
                        ? p.color.replace(/[\d.]+\)$/g, `${trailOpacity})`)
                        : p.color.replace(')', `, ${trailOpacity})`).replace('rgb', 'rgba').replace('#', 'rgba(');
                    // Handle hex colors
                    if (p.color.startsWith('#')) {
                        const r = parseInt(p.color.slice(1, 3), 16);
                        const g = parseInt(p.color.slice(3, 5), 16);
                        const b = parseInt(p.color.slice(5, 7), 16);
                        ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${trailOpacity})`;
                    }
                    ctx.fill();
                }
            }
            
            // Draw main particle with glow
            ctx.save();
            
            // Enhanced glow for shimmer particles
            if (p.type === 'shimmer' || p.type === 'sparkle') {
                ctx.shadowBlur = p.size * 4;
                ctx.shadowColor = p.color;
            } else {
                ctx.shadowBlur = p.size * 2;
                ctx.shadowColor = p.color;
            }
            
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            
            // Handle hex colors for fillStyle
            if (p.color.startsWith('#')) {
                const r = parseInt(p.color.slice(1, 3), 16);
                const g = parseInt(p.color.slice(3, 5), 16);
                const b = parseInt(p.color.slice(5, 7), 16);
                ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${currentOpacity})`;
            } else {
                ctx.fillStyle = p.color.replace(')', `, ${currentOpacity})`).replace('rgb', 'rgba');
            }
            ctx.fill();
            
            ctx.restore();

            // Update particle with realistic physics
            p.x += p.vx;
            p.y += p.vy;
            p.vy += p.gravity;
            
            // Different fade rates for different particle types
            if (p.type === 'shimmer') {
                p.opacity -= 0.015; // Shimmer sparkles fade slowly
            } else if (p.type === 'sparkle') {
                p.opacity -= 0.018; // Regular sparkles
            } else if (p.type === 'cracker') {
                p.opacity -= 0.025; // Crackers fade quickly like real sky crackers
            } else {
                p.opacity -= 0.012; // Main particles fade slowest
            }
            
            p.vx *= 0.98; // Air resistance
            p.vy *= 0.99;

            // Remove faded particles
            if (p.opacity <= 0 || p.y > canvas.height + 50 || p.x < -50 || p.x > canvas.width + 50) {
                particles.splice(i, 1);
            }
        }
        
        if (particles.length > 0) {
            animationId = requestAnimationFrame(animate);
        }
    }

    // Launch fireworks sequentially - faster timing for better experience
    // Each message displays for 4 seconds + 0.6s fade = 4.6s total per message
    // Wait 5 seconds between each for faster rhythm
    for (let f = 0; f < numFireworks; f++) {
        setTimeout(() => {
            createFirework(f);
            if (f === 0) {
                animate();
            }
        }, f * 5000); // 5 seconds between each firework - faster rhythm
    }
    
    // Create background sparklers/crackers at random intervals
    createBackgroundSparklers();
    
    // Stop animation after all fireworks
    setTimeout(() => {
        if (animationId) {
            cancelAnimationFrame(animationId);
        }
        setTimeout(() => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            // Remove blur effect and return to normal
            document.body.classList.remove('celebration-mode');
        }, 3000);
    }, numFireworks * 5000 + 5000); // Adjusted for faster timing
    
    // Background sparklers/crackers function
    function createBackgroundSparklers() {
        const canvas = document.getElementById('confetti-canvas');
        const ctx = canvas.getContext('2d');
        const totalDuration = numFireworks * 5000 + 5000;
        const numSparklers = 15; // Limited number of background crackers
        
        function createSparkler() {
            // Random position in upper 60% of screen (sky area)
            const x = Math.random() * canvas.width;
            const y = Math.random() * canvas.height * 0.6;
            
            // Small burst of sparkles
            const sparkCount = Math.floor(Math.random() * 15) + 10;
            const sparklerColors = ['#fff', '#fffacd', '#ffd700', '#ffec8b', '#ffa500'];
            
            for (let i = 0; i < sparkCount; i++) {
                const angle = (Math.PI * 2 / sparkCount) * i + Math.random() * 0.5;
                const speed = Math.random() * 3 + 1;
                const vx = Math.cos(angle) * speed;
                const vy = Math.sin(angle) * speed;
                const color = sparklerColors[Math.floor(Math.random() * sparklerColors.length)];
                
                particles.push({
                    x: x,
                    y: y,
                    vx: vx,
                    vy: vy,
                    color: color,
                    size: Math.random() * 1.5 + 0.5,
                    opacity: 1,
                    gravity: 0.08,
                    trail: true,
                    type: 'cracker',
                    twinkle: true,
                    lifetime: 40,
                    age: 0
                });
            }
        }
        
        // Create sparklers at random intervals
        for (let i = 0; i < numSparklers; i++) {
            setTimeout(() => {
                createSparkler();
            }, Math.random() * totalDuration);
        }
    }
}

// Celebration function
function celebrate() {
    // Add blur effect to entire page
    document.body.classList.add('celebration-mode');
    
    // Start the music automatically if not already playing
    if (!musicPlaying) {
        const audio = document.getElementById('backgroundMusic');
        const button = document.getElementById('musicButton');
        const status = document.getElementById('musicStatus');
        
        if (audio) {
            // Set volume to maximum before playing
            audio.volume = 1.0;
            const playPromise = audio.play();
            
            if (playPromise !== undefined) {
                playPromise.then(() => {
                    const musicIcon = button.querySelector('.music-icon');
                    if (musicIcon) musicIcon.classList.add('playing');
                    musicPlaying = true;
                    audioLoaded = true;
                    status.textContent = 'Playing...';
                    console.log('Music started with celebration!');
                }).catch(error => {
                    console.log('Could not auto-play music:', error);
                });
            }
        }
    }
    
    // Trigger fireworks
    createFireworks();

    // Play celebration animation
    const birthdayIcon = document.querySelector('.birthday-icon');
    birthdayIcon.style.animation = 'none';
    setTimeout(() => {
        birthdayIcon.style.animation = 'bounce 0.5s ease';
    }, 10);
}

// Countdown timer
function updateCountdown() {
    // Set countdown to Manya's birthday: November 1st
    const now = new Date();
    const currentYear = now.getFullYear();
    const nextBirthday = new Date(currentYear, 10, 1); // Month 10 = November
    
    // If birthday has already passed this year, set it for next year
    if (now > nextBirthday) {
        nextBirthday.setFullYear(currentYear + 1);
    }

    const diff = nextBirthday - now;

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    document.getElementById('days').textContent = days;
    document.getElementById('hours').textContent = hours;
    document.getElementById('minutes').textContent = minutes;
    document.getElementById('seconds').textContent = seconds;
}

// Intersection Observer for scroll animations
function setupScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    // Observe all sections for scroll animations
    document.querySelectorAll('section').forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(50px)';
        section.style.transition = 'opacity 1s ease-in, transform 1s ease-in';
        observer.observe(section);
    });

    // Observe memory cards for staggered animation
    document.querySelectorAll('.memory-card').forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        observer.observe(card);
        
        const cardObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }, index * 100);
                }
            });
        }, { threshold: 0.1 });
        cardObserver.observe(card);
    });
}

// Enhanced parallax and scroll effects
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const windowHeight = window.innerHeight;
    
    // Parallax effect for stars background
    const stars = document.querySelector('.stars');
    if (stars) {
        stars.style.transform = `translateY(${scrolled * 0.2}px)`;
    }
    
    // Hero section fade and blur effect
    const hero = document.querySelector('.hero');
    const heroContent = document.querySelector('.hero-content');
    
    if (hero && heroContent) {
        // Calculate scroll percentage for hero section
        const heroScrollPercent = Math.min(scrolled / (windowHeight * 0.5), 1);
        
        // Apply parallax effect to hero content
        heroContent.style.transform = `translateY(${scrolled * 0.5}px)`;
        
        // Add blur and fade when scrolling past hero
        if (scrolled > windowHeight * 0.2) {
            hero.classList.add('scrolled');
        } else {
            hero.classList.remove('scrolled');
        }
        
        // Smooth opacity transition
        const opacity = 1 - (heroScrollPercent * 0.7);
        hero.style.opacity = opacity;
    }
    
    // Parallax effect for floating hearts
    const hearts = document.querySelectorAll('.heart');
    hearts.forEach((heart, index) => {
        const speed = (index % 2 === 0 ? 0.3 : 0.5);
        heart.style.transform = `translateY(${scrolled * speed}px)`;
    });
    
    // Add smooth reveal animation for sections
    const sections = document.querySelectorAll('section:not(.hero)');
    sections.forEach(section => {
        const sectionTop = section.getBoundingClientRect().top;
        const sectionVisible = windowHeight - 150;
        
        if (sectionTop < sectionVisible) {
            section.style.opacity = '1';
            section.style.transform = 'translateY(0)';
        }
    });
});

// Video tab switching functionality
function switchVideo(index) {
    const videoPlayer = document.getElementById('videoPlayer');
    const videoTabs = document.querySelectorAll('.video-tab');
    
    if (!videoPlayer) return;
    
    // Get video source from the clicked tab
    const clickedTab = videoTabs[index];
    const videoSrc = clickedTab.getAttribute('data-video');
    
    // Update active tab
    videoTabs.forEach((tab, i) => {
        if (i === index) {
            tab.classList.add('active');
        } else {
            tab.classList.remove('active');
        }
    });
    
    // Save current time and volume if needed
    const wasPlaying = !videoPlayer.paused;
    const currentTime = videoPlayer.currentTime;
    const currentVolume = videoPlayer.volume;
    
    // Load new video
    videoPlayer.src = videoSrc;
    videoPlayer.load();
    
    // Set volume to maximum or keep user's volume if higher
    videoPlayer.volume = Math.max(currentVolume, 1.0);
    
    // Auto-play if the previous video was playing
    if (wasPlaying) {
        videoPlayer.play().catch(error => {
            console.log('Auto-play prevented:', error);
        });
    }
}

// Fullscreen slideshow functionality
let currentVideoIndex = 0;
let isSlideshowActive = false;
const videoSources = ['videos/1.mp4', 'videos/2.mp4', 'videos/3.mp4'];

function startFullscreenSlideshow() {
    const fullscreenContainer = document.getElementById('fullscreenVideoContainer');
    const fullscreenPlayer = document.getElementById('fullscreenVideoPlayer');
    const regularPlayer = document.getElementById('videoPlayer');
    
    if (!fullscreenContainer || !fullscreenPlayer) return;
    
    // Reset to first video
    currentVideoIndex = 0;
    isSlideshowActive = true;
    
    // Hide the regular player's controls during slideshow
    if (regularPlayer) {
        regularPlayer.pause();
    }
    
    // Show fullscreen container
    fullscreenContainer.classList.add('active');
    document.body.style.overflow = 'hidden';
    
    // Request fullscreen
    if (fullscreenContainer.requestFullscreen) {
        fullscreenContainer.requestFullscreen().catch(err => {
            console.log('Fullscreen request failed:', err);
        });
    } else if (fullscreenContainer.webkitRequestFullscreen) {
        fullscreenContainer.webkitRequestFullscreen();
    } else if (fullscreenContainer.msRequestFullscreen) {
        fullscreenContainer.msRequestFullscreen();
    }
    
    // Start playing first video
    playNextVideo();
    
    // Handle video end event
    fullscreenPlayer.addEventListener('ended', handleVideoEnd);
    
    // Handle fullscreen exit
    document.addEventListener('fullscreenchange', handleFullscreenExit);
    document.addEventListener('webkitfullscreenchange', handleFullscreenExit);
    document.addEventListener('msfullscreenchange', handleFullscreenExit);
}

function playNextVideo() {
    const fullscreenPlayer = document.getElementById('fullscreenVideoPlayer');
    const fullscreenContainer = document.getElementById('fullscreenVideoContainer');
    const videoWrapper = fullscreenContainer?.querySelector('.video-wrapper');
    
    if (!fullscreenPlayer || !isSlideshowActive) return;
    
    if (currentVideoIndex >= videoSources.length) {
        // All videos played, exit slideshow
        exitFullscreenSlideshow();
        return;
    }
    
    // Load and play current video
    fullscreenPlayer.src = videoSources[currentVideoIndex];
    fullscreenPlayer.volume = 1.0;
    fullscreenPlayer.load();
    
    const playPromise = fullscreenPlayer.play();
    
    if (playPromise !== undefined) {
        playPromise.catch(error => {
            console.log('Auto-play prevented:', error);
            // Try to play manually or show controls
            fullscreenPlayer.controls = true;
        });
    }
}

function handleVideoEnd() {
    // Move to next video
    currentVideoIndex++;
    if (isSlideshowActive) {
        // Small delay before next video
        setTimeout(() => {
            playNextVideo();
        }, 500);
    }
}

function handleFullscreenExit() {
    if (!document.fullscreenElement && 
        !document.webkitFullscreenElement && 
        !document.msFullscreenElement) {
        exitFullscreenSlideshow();
    }
}

function exitFullscreenSlideshow() {
    const fullscreenContainer = document.getElementById('fullscreenVideoContainer');
    const fullscreenPlayer = document.getElementById('fullscreenVideoPlayer');
    
    if (!fullscreenContainer) return;
    
    isSlideshowActive = false;
    
    // Exit fullscreen
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
    }
    
    // Hide container
    fullscreenContainer.classList.remove('active');
    document.body.style.overflow = 'auto';
    
    // Stop video
    if (fullscreenPlayer) {
        fullscreenPlayer.pause();
        fullscreenPlayer.src = '';
        fullscreenPlayer.removeEventListener('ended', handleVideoEnd);
    }
    
    // Remove event listeners
    document.removeEventListener('fullscreenchange', handleFullscreenExit);
    document.removeEventListener('webkitfullscreenchange', handleFullscreenExit);
    document.removeEventListener('msfullscreenchange', handleFullscreenExit);
    
    // Reset index
    currentVideoIndex = 0;
}

// Allow clicking on fullscreen container to exit
document.addEventListener('DOMContentLoaded', function() {
    const fullscreenContainer = document.getElementById('fullscreenVideoContainer');
    if (fullscreenContainer) {
        fullscreenContainer.addEventListener('click', function(e) {
            // Only exit if clicking on the container itself, not the video
            if (e.target === fullscreenContainer) {
                exitFullscreenSlideshow();
            }
        });
        
        // Allow escape key to exit
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && isSlideshowActive) {
                exitFullscreenSlideshow();
            }
        });
    }
});

// Initialize everything when page loads
window.addEventListener('load', () => {
    createFireflies();
    updateCountdown();
    setupScrollAnimations();
    
    // Initialize video player with volume
    const videoPlayer = document.getElementById('videoPlayer');
    if (videoPlayer) {
        videoPlayer.volume = 1.0;
    }
    
    // Load audio and set volume
    const audio = document.getElementById('backgroundMusic');
    if (audio) {
        // Set audio volume to maximum (1.0) for better audibility
        audio.volume = 1.0;
        audio.load();
        console.log('Audio element ready');
    }
    
    // Update countdown every second
    setInterval(updateCountdown, 1000);
    
    // Update confetti canvas on resize
    window.addEventListener('resize', () => {
        const canvas = document.getElementById('confetti-canvas');
        if (canvas) {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }
    });
});

// Add smooth scroll behavior
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Memory Story Slideshow Functions
let currentSlideIndex = 0;
let currentStory = null;
const stories = {
    'first-met': {
        title: 'When We First Met 🌅',
        slides: [
            {
                title: 'The Beginning',
                text: 'It all started on that beautiful day. The moment I first saw you, I knew my life was about to change forever.',
                image: 'images/first-met-1.jpg'
            },
            {
                title: 'That First Smile',
                text: 'Your smile lit up everything around you. I couldn\'t help but notice how your laughter filled the room with joy.',
                image: 'images/first-met-2.jpg'
            },
            {
                title: 'Our First Conversation',
                text: 'We talked for hours, and it felt like we\'d known each other forever. Time seemed to stand still.',
                image: 'images/first-met-3.jpg'
            },
            {
                title: 'Magic Began',
                text: 'That day, I knew you were someone special. Little did we know, this was just the beginning of our beautiful story.',
                image: 'images/first-met-4.jpg'
            }
        ]
    },
    'adventures': {
        title: 'Our Adventures Together 🎬',
        slides: [
            {
                title: 'Road Trips',
                text: 'Every journey we take together becomes an adventure. The open road, the music, and you by my side - what more could I ask for?',
                image: 'images/adventure-1.jpg'
            },
            {
                title: 'Exploring Together',
                text: 'From spontaneous road trips to planned getaways, every adventure with you is unforgettable.',
                image: 'images/adventure-2.jpg'
            },
            {
                title: 'Making Memories',
                text: 'Every place we visit, every photo we take, becomes a treasured memory in our story together.',
                image: 'images/adventure-3.jpg'
            }
        ]
    },
    'conversations': {
        title: 'Late Night Conversations 🌙',
        slides: [
            {
                title: 'Endless Talks',
                text: 'Those late night conversations where we share our dreams, fears, and everything in between. These moments are priceless.',
                image: 'images/conversation-1.jpg'
            },
            {
                title: 'Deep Connections',
                text: 'Your thoughts, dreams, and laughter - these are the moments I hold closest to my heart.',
                image: 'images/conversation-2.jpg'
            },
            {
                title: 'Time Stops',
                text: 'When we talk, hours feel like minutes. That\'s how special our connection is.',
                image: 'images/conversation-3.jpg'
            }
        ]
    },
    'music': {
        title: 'Our Song',
        slides: [
            {
                title: 'Dancing Together',
                text: 'Remember when we danced in the kitchen? Every song reminds me of those perfect moments.',
                image: 'images/music-1.jpg'
            },
            {
                title: 'Singing in the Car',
                text: 'Those car rides with our favorite songs playing - these are moments I\'ll treasure forever.',
                image: 'images/music-2.jpg'
            },
            {
                title: 'Our Soundtrack',
                text: 'Music has become the backdrop to our love story. Every song has a memory with you.',
                image: 'images/music-3.jpg'
            }
        ]
    },
    'birthdays': {
        title: 'Birthday Celebrations 🍰',
        slides: [
            {
                title: 'First Birthday Together',
                text: 'The first birthday we celebrated together was magical. I made a promise to celebrate many more.',
                image: 'images/birthday-1.jpg'
            },
            {
                title: 'Creating Traditions',
                text: 'Each year creates new traditions and memories. Today, on your 23rd birthday, we add another chapter.',
                image: 'images/birthday-2.jpg'
            },
            {
                title: 'More to Come',
                text: 'I can\'t wait to celebrate countless more birthdays with you, Manya. Here\'s to many more!',
                image: 'images/birthday-3.jpg'
            }
        ]
    },
    'future': {
        title: 'Our Future Together 🚀',
        slides: [
            {
                title: 'Dreams We\'ll Chase',
                text: 'I\'m excited about all the dreams we\'ll chase together. Our future is bright and full of possibilities.',
                image: 'images/future-1.jpg'
            },
            {
                title: 'Building Together',
                text: 'I can\'t wait to build our future together - filled with love, laughter, and endless adventures.',
                image: 'images/future-2.jpg'
            },
            {
                title: 'Forever and Always',
                text: 'Here\'s to our future - may it be as beautiful as you are. The best is yet to come, Manya!',
                image: 'images/future-3.jpg'
            }
        ]
    }
};

function openMemoryStory(storyId) {
    const modal = document.getElementById('memoryModal');
    const container = document.getElementById('slideshowContainer');
    
    currentStory = stories[storyId];
    currentSlideIndex = 0;
    
    // Clear previous content
    container.innerHTML = '';
    
    // Create slides
    currentStory.slides.forEach((slide, index) => {
        const slideDiv = document.createElement('div');
        slideDiv.className = 'slide' + (index === 0 ? ' active' : '');
        
        let content = `<div class="slide-content">
            <h2 class="slide-title">${slide.title}</h2>
            <p class="slide-text">${slide.text}</p>`;
        
        // Add image if it exists
        if (slide.image) {
            content += `<img src="${slide.image}" class="slide-image" alt="${slide.title}" onerror="this.style.display='none'">`;
        }
        
        content += '</div>';
        slideDiv.innerHTML = content;
        container.appendChild(slideDiv);
    });
    
    // Update counter
    updateSlideCounter();
    
    // Show modal
    modal.classList.add('show');
    document.body.style.overflow = 'hidden';
}

function closeMemoryStory() {
    const modal = document.getElementById('memoryModal');
    modal.classList.remove('show');
    document.body.style.overflow = 'auto';
}

function changeSlide(direction) {
    if (!currentStory) return;
    
    const slides = document.querySelectorAll('.slide');
    slides[currentSlideIndex].classList.remove('active');
    
    currentSlideIndex += direction;
    
    if (currentSlideIndex < 0) {
        currentSlideIndex = slides.length - 1;
    } else if (currentSlideIndex >= slides.length) {
        currentSlideIndex = 0;
    }
    
    slides[currentSlideIndex].classList.add('active');
    updateSlideCounter();
}

function updateSlideCounter() {
    const counter = document.getElementById('slideCounter');
    if (counter && currentStory) {
        counter.textContent = `${currentSlideIndex + 1} / ${currentStory.slides.length}`;
    }
}

// Close modals when clicking outside
window.onclick = function(event) {
    const memoryModal = document.getElementById('memoryModal');
    const surpriseModal = document.getElementById('surpriseModal');
    const flashcardsModal = document.getElementById('flashcardsModal');
    
    if (event.target === memoryModal) {
        closeMemoryStory();
    }
    if (event.target === surpriseModal) {
        closeSurpriseBox();
    }
    if (event.target === flashcardsModal) {
        closeFlashcards();
    }
}

// Keyboard navigation
document.addEventListener('keydown', function(e) {
    const modal = document.getElementById('memoryModal');
    if (modal.classList.contains('show')) {
        if (e.key === 'Escape') {
            closeMemoryStory();
        } else if (e.key === 'ArrowLeft') {
            changeSlide(-1);
        } else if (e.key === 'ArrowRight') {
            changeSlide(1);
        }
    }
    
    // Keyboard navigation for flashcards
    const flashcardsModal = document.getElementById('flashcardsModal');
    if (flashcardsModal && flashcardsModal.classList.contains('show')) {
        if (e.key === 'Escape') {
            closeFlashcards();
        } else if (e.key === 'ArrowLeft') {
            previousFlashcard();
        } else if (e.key === 'ArrowRight') {
            nextFlashcard();
        }
    }
    
    // Keyboard navigation for surprise modal
    const surpriseModal = document.getElementById('surpriseModal');
    if (surpriseModal && surpriseModal.classList.contains('show')) {
        if (e.key === 'Escape') {
            closeSurpriseBox();
        }
    }
});

// Surprise Box Data
const surpriseBoxData = {
    'first-date': {
        image: 'images/Our-first-date.jpg',
        text: 'The day we met still feels like a quiet memory that glows differently in my heart. I didn\'t know then that a random plan would turn into something so meaningful.',
        flashcards: [
            'Your smile that day, I still remember it like the first light after a long night. Maybe that\'s where everything truly began, with a moment that felt both ordinary and unforgettable.',
            'I can still picture that day! the colors, the laughter, the nervous pauses. Two people who barely knew each other, yet something already felt familiar. It wasn\'t just a meet, it was the beginning of a story I didn\'t know would change me. If I could relive a day, it would be that one, just to feel that spark again.',
            'We didn\'t know what we were stepping into that day, just two people meeting without expectations. You looked beautiful, not just because of how you looked, but because of the energy you carried. I remember being quiet sometimes, just looking at you, thinking how easy it felt to be around you. I didn\'t say it then, but I knew something about you would stay with me for a long time.'
        ]
    },
    'adventure': {
        image: 'images/Adventure Together.jpg',
        text: 'Every adventure with you felt like time paused, like the world allowed us a few days just to breathe and be us.',
        flashcards: [
            'Bir was where it all began- my birthday, the mountains, the wind, the peace in your presence, and you beside me. You made that day more than just another birthday, you made it mine in a way that felt alive and unforgettable. The laughter, the little moments, the way you looked at me mid-journey, it all felt like a dream I never wanted to end.',
            'Then came Rishikesh, a trip that carried both peace and weight. We could feel something shifting, like we were holding on tighter because our hearts already knew change was coming. It wasn\'t easy, but even in that silence, there was love. Even in the distance, there was effort. That trip taught me that love isn\'t always about forever, sometimes it\'s about giving your best even when the end is near.',
            'Both trips, one full of beginnings, one full of lessons, will always stay close to me. They remind me that we didn\'t just travel to places, we travelled through emotions, through growth, through each other\'s worlds.'
        ]
    },
    'laughing': {
        image: 'images/Laughing Together.jpg',
        text: 'If there\'s one thing that could silence every worry between us, it was laughter and slight humour. The kind that came out of nowhere- silly, loud, sometimes over the dumbest things like JUST BECAUSE but it always felt real.',
        flashcards: [
            'I still remember how your face changed when you laughed, eyes half closed, that small pause before you caught your breath again. Those moments made everything feel lighter, even when life wasn\'t.',
            'We had our share of fights and silence, but laughter always found its way back to us. It was our language, our way of saying we\'re okay without words.',
            'No matter where life takes us, those moments of uncontrollable laughter will always stay with me. They remind me that beyond everything- love, pain and confusion, we were two people who genuinely enjoyed being together.'
        ]
    },
    'special': {
        image: 'images/Special Moments.jpg',
        text: 'Some moments don\'t need pictures. They live in the heart, quietly replaying when everything else fades. The way you\'d look at me mid-conversation, the way your voice softened when you were half asleep, those little smiles when we caught each other\'s eyes, they\'re all etched in my memory.',
        flashcards: [
            {
                text: 'It wasn\'t always about grand gestures or perfect plans. It was about sitting together doing nothing, and still feeling like everything was right. About the small texts that made the day better, the hugs that said what words couldn\'t, and the silences that felt like peace, not distance.'
            },
            {
                text: 'Those moments: raw, simple, and real, became the heartbeat of our story. They made me realise that love isn\'t built on time, but on the moments that make you feel truly seen. Wherever life flows from here, I\'ll always carry those moments as quiet reminders of what it felt like to love deeply and honestly.'
            },
            {
                text: 'If I still have to capture a special moment in a picture, then it will be this one.',
                image: 'images/Special Moments.jpg'
            }
        ]
    }
};

let currentFlashcardIndex = 0;
let currentFlashcards = [];

// Open surprise box
function openSurpriseBox(boxId) {
    const box = event.currentTarget;
    const data = surpriseBoxData[boxId];
    
    if (!data) return;
    
    // Add opening animation
    box.classList.add('opening');
    
    // Open modal after animation
    setTimeout(() => {
        const modal = document.getElementById('surpriseModal');
        const image = document.getElementById('surpriseImage');
        const imageContainer = document.getElementById('surpriseImageContainer');
        const text = document.getElementById('surpriseText');
        
        // For special moments box, hide image and show only text
        if (boxId === 'special') {
            imageContainer.style.display = 'none';
            text.textContent = data.text;
            text.style.cursor = 'pointer';
            currentFlashcards = data.flashcards;
            text.onclick = openFlashcards;
            
            // Add hint text on the text itself
            let hint = text.querySelector('.click-hint-flashcard');
            if (!hint) {
                hint = document.createElement('p');
                hint.className = 'click-hint-flashcard';
                hint.textContent = '✨ Click to see more memories ✨';
                hint.style.cssText = 'text-align: center; color: #ffa5d8; font-style: italic; margin-top: 15px; font-size: 0.9rem; opacity: 0.8;';
                text.appendChild(hint);
            }
        } else {
            // For other boxes, show image normally
            imageContainer.style.display = 'block';
            image.src = data.image;
            image.alt = boxId;
            text.textContent = data.text;
            text.style.cursor = 'default';
            text.onclick = null;
            
            // Store flashcard data if available
            if (data.flashcards) {
                image.style.cursor = 'pointer';
                currentFlashcards = data.flashcards;
                image.onclick = openFlashcards;
                // Add hint text
                const hint = document.createElement('p');
                hint.className = 'click-hint-flashcard';
                hint.textContent = '✨ Click on the image to see more memories ✨';
                hint.style.cssText = 'text-align: center; color: #ffa5d8; font-style: italic; margin-top: 15px; font-size: 0.9rem; opacity: 0.8;';
                if (!imageContainer.querySelector('.click-hint-flashcard')) {
                    imageContainer.appendChild(hint);
                }
            } else {
                image.style.cursor = 'default';
                image.onclick = null;
                currentFlashcards = [];
                // Remove hint if exists
                const hint = imageContainer.querySelector('.click-hint-flashcard');
                if (hint) hint.remove();
            }
        }
        
        modal.classList.add('show');
        document.body.style.overflow = 'hidden';
        
        // Reset box animation
        setTimeout(() => {
            box.classList.remove('opening');
        }, 100);
    }, 300);
}

// Close surprise box
function closeSurpriseBox() {
    const modal = document.getElementById('surpriseModal');
    modal.classList.remove('show');
    document.body.style.overflow = 'auto';
    
    // Reset all boxes
    document.querySelectorAll('.surprise-box').forEach(box => {
        box.classList.remove('opening');
    });
    
    // Clean up hints from both image container and text
    const imageContainer = document.getElementById('surpriseImageContainer');
    const text = document.getElementById('surpriseText');
    const hintInContainer = imageContainer?.querySelector('.click-hint-flashcard');
    const hintInText = text?.querySelector('.click-hint-flashcard');
    if (hintInContainer) hintInContainer.remove();
    if (hintInText) hintInText.remove();
    
    // Reset image container display
    if (imageContainer) {
        imageContainer.style.display = 'block';
    }
}

// Open flashcards
function openFlashcards() {
    if (currentFlashcards.length === 0) return;
    
    const flashcardsModal = document.getElementById('flashcardsModal');
    const container = document.getElementById('flashcardsContainer');
    
    // Clear previous flashcards
    container.innerHTML = '';
    
    // Create flashcards
    currentFlashcards.forEach((flashcardData, index) => {
        const flashcard = document.createElement('div');
        flashcard.className = 'flashcard' + (index === 0 ? ' active' : '');
        
        // Handle both string (legacy) and object (new format with optional image) formats
        let flashcardText = '';
        let flashcardImage = null;
        
        if (typeof flashcardData === 'string') {
            flashcardText = flashcardData;
        } else if (typeof flashcardData === 'object' && flashcardData.text) {
            flashcardText = flashcardData.text;
            flashcardImage = flashcardData.image || null;
        }
        
        let innerHTML = `<div class="flashcard-text">${flashcardText}</div>`;
        
        // Add image if provided
        if (flashcardImage) {
            innerHTML += `<img src="${flashcardImage}" class="flashcard-image" alt="Special moment" onerror="this.style.display='none'">`;
        }
        
        flashcard.innerHTML = innerHTML;
        container.appendChild(flashcard);
    });
    
    currentFlashcardIndex = 0;
    updateFlashcardCounter();
    
    // Close surprise modal and open flashcards
    closeSurpriseBox();
    setTimeout(() => {
        flashcardsModal.classList.add('show');
        document.body.style.overflow = 'hidden';
    }, 300);
}

// Close flashcards
function closeFlashcards() {
    const modal = document.getElementById('flashcardsModal');
    modal.classList.remove('show');
    document.body.style.overflow = 'auto';
    currentFlashcards = [];
}

// Navigate flashcards
function nextFlashcard() {
    const flashcards = document.querySelectorAll('.flashcard');
    if (flashcards.length === 0) return;
    
    flashcards[currentFlashcardIndex].classList.remove('active');
    currentFlashcardIndex = (currentFlashcardIndex + 1) % flashcards.length;
    flashcards[currentFlashcardIndex].classList.add('active');
    updateFlashcardCounter();
}

function previousFlashcard() {
    const flashcards = document.querySelectorAll('.flashcard');
    if (flashcards.length === 0) return;
    
    flashcards[currentFlashcardIndex].classList.remove('active');
    currentFlashcardIndex = (currentFlashcardIndex - 1 + flashcards.length) % flashcards.length;
    flashcards[currentFlashcardIndex].classList.add('active');
    updateFlashcardCounter();
}

function updateFlashcardCounter() {
    const counter = document.getElementById('flashcardCounter');
    const flashcards = document.querySelectorAll('.flashcard');
    if (counter && flashcards.length > 0) {
        counter.textContent = `${currentFlashcardIndex + 1} / ${flashcards.length}`;
    }
}

