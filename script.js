/* ==========================================================================
   TUSHAR YADAV RESUME INTERACTIVE ENGINE
   ========================================================================== */

// --- Global Constants & State Containers ---
let currentMode = 'mode-code';
let typingTimer = null;
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;

// Typing subtitle libraries mapped per layout state
const subtitleTexts = {
    'mode-code': [
        'const dev = new Trainee({ coachExp: "8mo" });',
        'dev.build({ responsive: true });',
        'dev.connect({ db: "MongoDB" });',
        'dev.compile({ stack: "Node_Express" });'
    ],
    'mode-genz': [
        'cooking elite web layouts at high velocity 🍳',
        'stashing data objects in mongodb, rent-free 📁',
        'backend servers running at peak speed, no cap 🏎️',
        'UI interfaces passing every aesthetic vibe check 💅'
    ],
    'mode-corp': [
        'Passionate Full-Stack Web Development Trainee.',
        'Building responsive interfaces and clean web designs.',
        'Developing scalable servers with Node.js & Express.js.',
        'Optimizing document architectures in MongoDB databases.'
    ]
};

// --- Initialization ---
document.addEventListener('DOMContentLoaded', () => {
    // 1. Initialize Mode Selector layout tab slider width
    adjustNavSlider();
    
    // 2. Start Hero Title Subtitle typing loops
    startTypingLoop();

    // 3. Initialize Interactive Cursor Glow tracking
    initCursorGlow();

    // 4. Initialize CLI terminal interactions
    initTerminalCLI();

    // 5. Initialize Intersection Observers for simulated IDE folder linking
    initScrollLinkedIDE();

    // 6. Resize handler for navigation slider widths
    window.addEventListener('resize', adjustNavSlider);
});

// --- Mouse cursor glowing tracking orb ---
function initCursorGlow() {
    const glow = document.getElementById('cursor-glow');
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let currentX = mouseX;
    let currentY = mouseY;

    window.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    // Lerp smoothing animation loop for hardware-accelerated movements
    function animateGlow() {
        const dx = mouseX - currentX;
        const dy = mouseY - currentY;
        
        currentX += dx * 0.12;
        currentY += dy * 0.12;

        glow.style.left = `${currentX}px`;
        glow.style.top = `${currentY}px`;

        requestAnimationFrame(animateGlow);
    }
    animateGlow();
}

// --- Sticky Navigation Slider Segment positioning ---
function adjustNavSlider() {
    const activeBtn = document.querySelector('.mode-btn.active');
    const sliderBg = document.querySelector('.mode-selector-bg');
    if (activeBtn && sliderBg) {
        sliderBg.style.width = `${activeBtn.offsetWidth}px`;
        sliderBg.style.transform = `translateX(${activeBtn.offsetLeft - 4}px)`;
    }
}

// --- Mode Switching Master Controller ---
function switchMode(newMode) {
    if (currentMode === newMode) return;

    // Reset classes
    document.body.className = newMode;
    currentMode = newMode;

    // Adjust button indicators
    document.querySelectorAll('.mode-btn').forEach(btn => btn.classList.remove('active'));
    
    let activeBtnId = 'btn-code';
    if (newMode === 'mode-genz') activeBtnId = 'btn-genz';
    if (newMode === 'mode-corp') activeBtnId = 'btn-corp';
    
    document.getElementById(activeBtnId).classList.add('active');
    adjustNavSlider();

    // Reset typing loops
    clearTimeout(typingTimer);
    wordIndex = 0;
    charIndex = 0;
    isDeleting = false;
    startTypingLoop();

    // Send dynamic notification logs to CLI terminal
    triggerTerminalLog(newMode);
}

// --- Explorer Folders toggle functionality ---
function toggleFolder(folderId) {
    const folder = document.getElementById(folderId);
    if (folder) {
        folder.classList.toggle('active');
    }
}

// --- Typing animations loop ---
function startTypingLoop() {
    const typingSpan = document.getElementById('typing-sub');
    if (!typingSpan) return;

    const currentWords = subtitleTexts[currentMode] || subtitleTexts['mode-code'];
    const currentWord = currentWords[wordIndex];

    if (isDeleting) {
        // Backspacing characters
        typingSpan.textContent = currentWord.substring(0, charIndex - 1);
        charIndex--;
    } else {
        // Typing characters
        typingSpan.textContent = currentWord.substring(0, charIndex + 1);
        charIndex++;
    }

    let delay = isDeleting ? 30 : 70;

    // Word completion handlers
    if (!isDeleting && charIndex === currentWord.length) {
        delay = 2000; // Pause at full word
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % currentWords.length;
        delay = 400; // Brief pause before starting next word
    }

    typingTimer = setTimeout(startTypingLoop, delay);
}

// --- Dynamic CLI terminal feedback on switches ---
function triggerTerminalLog(mode) {
    const logBox = document.getElementById('term-intro');
    if (!logBox) return;

    let output = '';
    if (mode === 'mode-code') {
        output = `tushar-yadav $ npx load-package --theme=developer<br>
                  [SUCCESS] Developer workspace configured.<br>
                  -> Root elements mapped to Fira Code variables.<br>
                  -> Terminal debugger instances running smoothly.<br>
                  -> Stack status: Ready to code. Try command <span class="highlight-cmd">skills</span>.`;
    } else if (mode === 'mode-genz') {
        output = `tushar-yadav $ npx vibecheck --status=cookin<br>
                  [VIBE CHECK] Elite, absolute vaporwave style configured! 💅<br>
                  -> Main character energy: 100% Locked-in.<br>
                  -> Slang dictionary: Injected, no cap.<br>
                  -> Stashing data in MongoDB, rent-free. Try typing <span class="highlight-cmd">secret</span>.`;
    } else if (mode === 'mode-corp') {
        output = `tushar-yadav $ run executive-dashboard.exe<br>
                  [SYSTEM] Professional view loaded successfully.<br>
                  -> Accessible layouts structured.<br>
                  -> Content filtered for recruiters and HR personnel.<br>
                  -> Core profile: Tushar Yadav, Full-Stack Trainee. Try command <span class="highlight-cmd">experience</span>.`;
    }

    logBox.innerHTML = output;
    
    // Auto scroll down in terminal
    const body = document.getElementById('term-body');
    if (body) body.scrollTop = body.scrollHeight;
}

// --- CLI Terminal commands execution parser ---
function initTerminalCLI() {
    const input = document.getElementById('term-cli-input');
    const body = document.getElementById('term-body');
    if (!input || !body) return;

    input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            const cmd = input.value.trim().toLowerCase();
            if (cmd === '') return;

            // Generate terminal prompt history logs
            const historyLine = document.createElement('div');
            historyLine.className = 'term-line';
            historyLine.innerHTML = `<span class="term-prompt">tushar-yadav $</span> <span class="term-input">${input.value}</span>`;
            
            // Insert history before the typing line
            const inputLine = document.getElementById('term-input-line');
            body.insertBefore(historyLine, inputLine);

            // Command switch evaluation
            const responseLine = document.createElement('div');
            responseLine.className = 'term-output';

            switch (cmd) {
                case 'help':
                    responseLine.innerHTML = `Available diagnostic tools:<br>
                                              - <span class="highlight-cmd">skills</span>: Visual logs of core technologies<br>
                                              - <span class="highlight-cmd">experience</span>: Career timeline trace summary<br>
                                              - <span class="highlight-cmd">projects</span>: Display repositories and links<br>
                                              - <span class="highlight-cmd">education</span>: Academic quest directories<br>
                                              - <span class="highlight-cmd">ping</span>: Simulate direct webhook mail server tests<br>
                                              - <span class="highlight-cmd">clear</span>: Clear terminal console history<br>
                                              - <span class="highlight-cmd">secret</span>: Easter egg check`;
                    break;
                case 'skills':
                    responseLine.innerHTML = `Scanning tech libraries... [COMPLETED]<br>
                                              <span class="highlight-cmd">FRONTEND:</span> HTML5 [█████████-] CSS3 [████████--] JS [████████--]<br>
                                              <span class="highlight-cmd">BACKEND :</span> Node.js [████████--] Express [████████--]<br>
                                              <span class="highlight-cmd">DATABASE:</span> MongoDB [████████--] Schema BSON [█████████-]`;
                    break;
                case 'experience':
                    responseLine.innerHTML = `Retrieving work history database...<br>
                                              <span class="highlight-cmd">Web Dev Trainee | Coaching Institute (8 Months)</span><br>
                                              - Coded dynamic responsive landing grids (HTML/CSS/JS)<br>
                                              - Structured REST web routes with Node/Express APIs<br>
                                              - Connected schema databases inside MongoDB databases`;
                    break;
                case 'projects':
                    responseLine.innerHTML = `Discovered active folders in ./projects:<br>
                                              📁 <span class="highlight-cmd">Responsive UI Layout System</span> - Semantic visual designs (CSS3/HTML5)<br>
                                              📁 <span class="highlight-cmd">Full-Stack Application Sandbox</span> - CRUD routers & server setups (Node/Mongo)`;
                    break;
                case 'education':
                    responseLine.innerHTML = `Academic directories accessed:<br>
                                              🎓 Fifth Mountain Academy | <span class="highlight-cmd">12th Grade (M.P. Board)</span> - 2024<br>
                                              🎓 Fifth Mountain Academy | <span class="highlight-cmd">10th Grade (M.P. Board)</span> - 2022`;
                    break;
                case 'ping':
                    responseLine.innerHTML = `Testing ping connection channels...<br>
                                              Email destination: <span class="highlight-cmd">tushar911.ty@gmail.com</span><br>
                                              Phone active grid: +91 9589045835<br>
                                              Handshake active. Ready to deploy email. Use form below!`;
                    break;
                case 'clear':
                    // Wipes out all child prompt histories except the input line
                    const lines = body.querySelectorAll('.term-line, .term-output');
                    lines.forEach(line => {
                        if (line.id !== 'term-input-line') {
                            line.remove();
                        }
                    });
                    input.value = '';
                    return;
                case 'secret':
                    responseLine.innerHTML = `<span class="highlight-cmd">VIBE CHECK RESULT: ELITE VIBES DETECTED! 🔓</span><br>
                                              No cap, you unlocked the main character cheat code. 👑<br>
                                              Tushar is officially certified. Absolute wizard cookin' premium code blocks.`;
                    break;
                default:
                    responseLine.innerHTML = `Bash error: command not found: <span class="highlight-cmd">${cmd}</span>. Type <span class="highlight-cmd">help</span> for manuals.`;
            }

            body.insertBefore(responseLine, inputLine);
            input.value = '';
            body.scrollTop = body.scrollHeight; // Auto scroll down
        }
    });

    // Make clicking the body container auto-focus on the CLI prompt field
    body.addEventListener('click', () => {
        input.focus();
    });
}

// --- Scroll Linked active item in simulated IDE sidebar explorer ---
function initScrollLinkedIDE() {
    const sections = document.querySelectorAll('section.section');
    const fileItems = document.querySelectorAll('.file-item');

    const options = {
        root: document.getElementById('scroll-container'),
        rootMargin: '-30% 0px -40% 0px', // Center active thresholds
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const activeSectionId = entry.target.id;
                
                // Highlight exact item file link matching the scrolled section active state
                fileItems.forEach(item => {
                    if (item.getAttribute('href') === `#${activeSectionId}`) {
                        item.classList.add('active');
                        // Auto scroll the explorer sidebar in case it's small to keep it visible
                        item.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                    } else {
                        item.classList.remove('active');
                    }
                });
            }
        });
    }, options);

    sections.forEach(section => observer.observe(section));

    // Handle clicks on file-explorer sidebar lists to trigger scrolling manually
    fileItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = item.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                targetSection.scrollIntoView({ behavior: 'smooth' });
                
                // On mobile devices, auto close the explorer drawer sidebar after selection
                const sidebar = document.getElementById('sidebar');
                if (sidebar) sidebar.classList.remove('drawer-open');
            }
        });
    });
}

// --- Quick copy short-cut handlers ---
function copyText(str, msg) {
    navigator.clipboard.writeText(str).then(() => {
        const toast = document.getElementById('toast');
        const toastMsg = toast.querySelector('.toast-msg');
        if (toast) {
            toastMsg.textContent = msg;
            toast.classList.add('show');
            setTimeout(() => {
                toast.classList.remove('show');
            }, 2500);
        }
    }).catch(err => {
        console.error('Clipboard write error: ', err);
    });
}

// --- Interactive Webhook mail push simulator ---
function handleContactSubmit(event) {
    event.preventDefault();

    const name = document.getElementById('sender-name').value;
    const email = document.getElementById('sender-email').value;
    const msg = document.getElementById('sender-msg').value;

    const statusBadge = document.getElementById('webhook-status');
    const logsOutput = document.getElementById('form-logs');
    const submitBtn = document.getElementById('btn-submit');

    // Block buttons during fake process
    submitBtn.disabled = true;
    statusBadge.textContent = 'SENDING_PING';
    statusBadge.style.color = '#eab308';
    statusBadge.style.background = 'rgba(234, 179, 8, 0.1)';

    let logLines = [
        `$ curl -X POST -H "Content-Type: application/json" \\`,
        `  -d '{"name":"${name}","email":"${email}"}' \\`,
        `  https://api.tushar.dev/v1/ping`,
        `$ [HANDSHAKE] Establishing secure socket connections...`,
        `$ [SYN-ACK] Handshake accepted with remote SMTP server.`,
        `$ [PUSHING] Uploading metadata parameters... [100%]`,
        `$ [SUCCESS 200 OK] Vibe check sent! Tushar will respond in record time. 🚀`
    ];

    logsOutput.innerHTML = '';
    let lineIdx = 0;

    function renderLogLines() {
        if (lineIdx < logLines.length) {
            const line = document.createElement('div');
            line.textContent = logLines[lineIdx];
            logsOutput.appendChild(line);
            logsOutput.scrollTop = logsOutput.scrollHeight;
            lineIdx++;
            setTimeout(renderLogLines, 500);
        } else {
            // Success configurations
            statusBadge.textContent = 'PING_SUCCESS_200';
            statusBadge.style.color = '#10b981';
            statusBadge.style.background = 'rgba(16, 185, 129, 0.1)';
            submitBtn.disabled = false;
            
            // Clear input fields
            document.getElementById('contact-form').reset();
            
            // Reset status after a brief duration
            setTimeout(() => {
                statusBadge.textContent = 'SYSTEM_IDLE';
                statusBadge.style.color = 'var(--accent-main)';
                statusBadge.style.background = 'rgba(var(--accent-main-rgb), 0.1)';
                logsOutput.innerHTML = '$ awaiting connection parameters...';
            }, 6000);
        }
    }

    renderLogLines();
}

// --- Simulated Mobile Sidebar Explorer Drawer controllers ---
function toggleMobileExplorer() {
    const sidebar = document.getElementById('sidebar');
    if (sidebar) {
        sidebar.classList.toggle('drawer-open');
    }
}
