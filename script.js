document.addEventListener('DOMContentLoaded', function() {
    // Müzik Kontrolü
    const bgMusic = document.getElementById('bgMusic');
    const musicToggle = document.getElementById('musicToggle');
    let isMusicPlaying = false;
    
    musicToggle.addEventListener('click', function() {
        if (isMusicPlaying) {
            bgMusic.pause();
            musicToggle.textContent = '🔇 Müzik Aç';
            isMusicPlaying = false;
        } else {
            bgMusic.play()
                .then(() => {
                    musicToggle.textContent = '🔊 Müzik Kapat';
                    isMusicPlaying = true;
                })
                .catch(e => {
                    musicToggle.textContent = '❌ Müzik Açılamadı';
                    console.error("Müzik çalma hatası:", e);
                });
        }
    });
    
    // Konfeti ve sayfa geçişleri
    const jsConfetti = new JSConfetti();
    let currentStage = 1;
    const totalStages = 4;
    
    const stages = {
        1: document.getElementById('stage1'),
        2: document.getElementById('stage2'),
        3: document.getElementById('stage3'),
        4: document.getElementById('stage4')
    };
    
    // Tıklama ve dokunma olayları
    function setupStageInteraction(stageElement) {
        if (stageElement) {
            stageElement.addEventListener('click', nextStage);
            stageElement.addEventListener('touchstart', nextStage, { passive: true });
        }
    }
    
    // Tüm tıklanabilir alanları ayarla
    setupStageInteraction(document.querySelector('.title-text'));
    setupStageInteraction(document.querySelector('#stage2 .clickable'));
    setupStageInteraction(document.querySelector('#stage3 .clickable'));
    
    function nextStage() {
        stages[currentStage].classList.remove('active');
        triggerConfetti();
        
        currentStage++;
        if (currentStage <= totalStages) {
            stages[currentStage].classList.add('active');
            
            if (currentStage === 4) {
                startContinuousAnimations();
            }
        }
    }
    
    function triggerConfetti() {
        jsConfetti.addConfetti({
            emojis: ['🎉', '🎊', '✨', '🎈', '🎁', '🥳'],
            emojiSize: 40,
            confettiNumber: 60,
        });
    }
    
    function startContinuousAnimations() {
        setInterval(triggerConfetti, 3000);
        setInterval(addRandomEmoji, 800);
        
        for (let i = 0; i < 5; i++) {
            setTimeout(addRandomEmoji, i * 300);
        }
    }
    
    function addRandomEmoji() {
        const emojis = ['🎈', '🎉', '🎊', '✨', '🎁', '🥳', '🍰', '🎂', '👑'];
        const emoji = document.createElement('div');
        emoji.className = 'emoji';
        emoji.textContent = emojis[Math.floor(Math.random() * emojis.length)];
        emoji.style.left = Math.random() * 90 + '%';
        emoji.style.animationDuration = (6 + Math.random() * 6) + 's';
        document.querySelector('.floating-elements').appendChild(emoji);
        
        setTimeout(() => {
            emoji.remove();
        }, 10000);
    }
    
    // Soru işaretleri ekle
    for (let i = 0; i < 8; i++) {
        addRandomQuestionMark();
    }
    
    function addRandomQuestionMark() {
        const mark = document.createElement('div');
        mark.className = 'question-marks';
        mark.textContent = '?';
        mark.style.left = Math.random() * 90 + '%';
        mark.style.top = Math.random() * 90 + '%';
        mark.style.animationDelay = Math.random() * 2 + 's';
        document.getElementById('stage1').appendChild(mark);
    }
    
    // iOS Safari için viewport düzeltme
    function setViewportHeight() {
        let vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
    }
    
    window.addEventListener('resize', setViewportHeight);
    setViewportHeight();
});