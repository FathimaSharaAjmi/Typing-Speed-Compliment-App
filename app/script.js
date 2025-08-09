class TypingSpeedApp {
    constructor() {
        this.words = [
    "typing", "keyboard", "speed", "accuracy", "practice", "challenge", "progress", "skill", "focus", "improve"
];



this.sentences = [ 
    "It was the best of times, it was the worst of times.",
    "All happy families are alike; each unhappy family is unhappy in its own way.",
    "To be or not to be, that is the question.",
    "In a hole in the ground there lived a hobbit."
];

        this.texts = [
            "The quick brown fox jumps over the lazy dog. This pangram contains every letter of the alphabet and is perfect for testing typing skills.",
            "In a hole in the ground there lived a hobbit. Not a nasty, dirty, wet hole filled with the ends of worms and an oozy smell, nor yet a dry, bare, sandy hole.",
            "To be or not to be, that is the question. Whether 'tis nobler in the mind to suffer the slings and arrows of outrageous fortune.",
            "It was the best of times, it was the worst of times. It was the age of wisdom, it was the age of foolishness, it was the epoch of belief.",
            "All happy families are alike; each unhappy family is unhappy in its own way. Everything was in confusion in the Oblonskys' house."
        ];

        this.quotes = this.texts.filter(text => /[\s,\.]/.test(text)); // Contains spaces, commas, or periods
        
        this.currentText = '';
        this.startTime = null;
        this.isTestActive = false;
        this.currentIndex = 0;
        this.correctChars = 0;
        this.totalChars = 0;
        
        this.initializeElements();
        this.bindEvents();
        this.updateCompliment("Ready to see how amazing your typing is? Click Start Test!", "🎉");
    }
    
    initializeElements() {
        this.textTypeSelect = document.getElementById('textTypeSelect');
        this.textDisplay = document.getElementById('textDisplay');
        this.typingInput = document.getElementById('typingInput');
        this.startBtn = document.getElementById('startBtn');
        this.resetBtn = document.getElementById('resetBtn');
        this.wpmElement = document.getElementById('wpm');
        this.accuracyElement = document.getElementById('accuracy');
        this.timerElement = document.getElementById('timer');
        this.complimentText = document.getElementById('complimentText');
        this.complimentIcon = document.querySelector('.compliment-icon');
        this.progressFill = document.getElementById('progressFill');
    }
    
    bindEvents() {
        this.startBtn.addEventListener('click', () => this.startTest());
        this.resetBtn.addEventListener('click', () => this.resetTest());
        this.typingInput.addEventListener('input', (e) => this.handleTyping(e));
        this.typingInput.addEventListener('paste', (e) => e.preventDefault());
            }
            
        startTest() {
            const selectedType = this.textTypeSelect.value;

            if (selectedType === 'words') {
                this.currentText = this.words[Math.floor(Math.random() * this.words.length)];
            } else if (selectedType === 'quotes') {
                this.currentText = this.quotes[Math.floor(Math.random() * this.quotes.length)];
            } else if (selectedType === 'sentences') {
                this.currentText = this.sentences[Math.floor(Math.random() * this.sentences.length)];
            }

            this.textDisplay.innerHTML = this.highlightText();
            this.typingInput.disabled = false;
            this.typingInput.value = '';
            this.typingInput.focus();
            //this.startBtn.disabled = true;
            this.isTestActive = true;
            this.startTime = Date.now();
            this.currentIndex = 0;
            this.correctChars = 0;
            this.totalChars = 0;

            this.updateCompliment("You've got this! Start typing and show off your skills! 💪", "🚀");
            this.startTimer();
            }

    
    resetTest() {
        this.isTestActive = false;
        this.typingInput.disabled = true;
        this.typingInput.value = '';
        this.startBtn.disabled = false;
        this.currentIndex = 0;
        this.correctChars = 0;
        this.totalChars = 0;
        this.textDisplay.innerHTML = "Click \"Start Test\" to begin typing!";
        this.wpmElement.textContent = '0';
        this.accuracyElement.textContent = '100%';
        this.timerElement.textContent = '0s';
        this.progressFill.style.width = '0%';
        this.updateCompliment("Ready for another round? Your fingers are warmed up now! 🔥", "🎯");
    }
    
    handleTyping(e) {
        if (!this.isTestActive) return;
        
        const typedText = e.target.value;
        this.currentIndex = typedText.length;
        this.totalChars = Math.max(this.totalChars, this.currentIndex);
        
        // Count correct characters
        this.correctChars = 0;
        for (let i = 0; i < Math.min(typedText.length, this.currentText.length); i++) {
            if (typedText[i].toLowerCase() === this.currentText[i].toLowerCase()) {
                this.correctChars++;
            }
        }
        
        this.updateDisplay();
        this.updateStats();
        this.updateProgress();
        this.updateComplimentBasedOnSpeed();
        
        // Check if test is complete
        if (typedText.trim().toLowerCase() === this.currentText.trim().toLowerCase()) {
    this.completeTest();
}

    }
    
    updateDisplay() {
        const typedText = this.typingInput.value;
        let highlightedText = '';
        
        for (let i = 0; i < this.currentText.length; i++) {
            const char = this.currentText[i];
            
            if (typedText[i] && typedText[i].toLowerCase() === char.toLowerCase()) {
                highlightedText += `<span class="correct">${char}</span>`;
            } 
            else if (typedText[i]) {
                highlightedText += `<span class="incorrect">${char}</span>`;
            } 
            else if (i === typedText.length) {
                highlightedText += `<span class="current">${char}</span>`;
            } 
            else {
                highlightedText += char;
            }

        
        this.textDisplay.innerHTML = highlightedText;
        }
    }
    
    highlightText() {
        return `<span class="current">${this.currentText[0]}</span>${this.currentText.slice(1)}`;
    }
    
    updateStats() {
        const timeElapsed = (Date.now() - this.startTime) / 1000 / 60; // in minutes
        const wordsTyped = this.correctChars / 5; // standard: 5 characters = 1 word
        const wpm = Math.round(wordsTyped / timeElapsed) || 0;
        const accuracy = this.totalChars > 0 ? Math.round((this.correctChars / this.totalChars) * 100) : 100;
        
        this.wpmElement.textContent = wpm;
        this.accuracyElement.textContent = `${accuracy}%`;
    }
    
    updateProgress() {
        const progress = (this.currentIndex / this.currentText.length) * 100;
        this.progressFill.style.width = `${progress}%`;
    }
    
    updateComplimentBasedOnSpeed() {
        const timeElapsed = (Date.now() - this.startTime) / 1000 / 60;
        const wordsTyped = this.correctChars / 5;
        const wpm = Math.round(wordsTyped / timeElapsed) || 0;
        const accuracy = this.totalChars > 0 ? Math.round((this.correctChars / this.totalChars) * 100) : 100;
        
        // Don't update compliments too frequently
        if (this.currentIndex % 10 !== 0 && this.currentIndex !== this.currentText.length) return;
        
        let compliment = '';
        let icon = '';
        
        if (wpm >= 80) {
            const fastCompliments = [
                "Lightning fast! Your fingers are flying! ⚡",
                "Incredible speed! You're a typing machine! 🚀",
                "Blazing fast! Are you even human? 🔥",
                "Supersonic typing! You're breaking records! 💨"
            ];
            compliment = fastCompliments[Math.floor(Math.random() * fastCompliments.length)];
            icon = "⚡";
        } else if (wpm >= 60) {
            const goodCompliments = [
                "Excellent speed! You're really getting into the zone! 🎯",
                "Great pace! Your typing skills are impressive! 👏",
                "Fantastic rhythm! Keep up the excellent work! 🎵",
                "Wonderful speed! You're doing amazingly well! ✨"
            ];
            compliment = goodCompliments[Math.floor(Math.random() * goodCompliments.length)];
            icon = "🎯";
        } else if (wpm >= 40) {
            const steadyCompliments = [
                "Steady and sure! Quality over speed - great approach! 🎨",
                "Nice consistent pace! You're building great habits! 📈",
                "Solid typing! Consistency is key to improvement! 💪",
                "Good rhythm! You're finding your perfect pace! 🎼"
            ];
            compliment = steadyCompliments[Math.floor(Math.random() * steadyCompliments.length)];
            icon = "🎨";
        } else if (wpm >= 20) {
            const encouragingCompliments = [
                "Taking your time - that's smart! Accuracy matters! 🎯",
                "Thoughtful typing! You're being careful and precise! 🔍",
                "Great focus! Every expert started where you are! 🌱",
                "Perfect practice pace! You're building solid foundations! 🏗️"
            ];
            compliment = encouragingCompliments[Math.floor(Math.random() * encouragingCompliments.length)];
            icon = "🌱";
        } else {
            const beginnerCompliments = [
                "Everyone starts somewhere! You're doing great! 🌟",
                "Take your time! Every keystroke is progress! 🚶",
                "Patience is a virtue! You're learning perfectly! 📚",
                "Slow and steady wins the race! Keep going! 🐢"
            ];
            compliment = beginnerCompliments[Math.floor(Math.random() * beginnerCompliments.length)];
            icon = "🌟";
        }
        
        // Add accuracy-based compliments
        if (accuracy >= 95) {
            compliment += " And your accuracy is outstanding! 🎯";
        } else if (accuracy >= 85) {
            compliment += " Great accuracy too! 👌";
        }
        
        this.updateCompliment(compliment, icon);
    }
    
        completeTest() {
            this.isTestActive = false;
            this.typingInput.disabled = true;
            this.startBtn.disabled = false;
            
            const timeElapsed = (Date.now() - this.startTime) / 1000 / 60;
            const wordsTyped = this.correctChars / 5;
            const finalWpm = Math.round(wordsTyped / timeElapsed);
            const finalAccuracy = Math.round((this.correctChars / this.totalChars) * 100);
            
            let finalCompliment = '';
            let finalIcon = '';
            
            if (finalWpm >= 80 && finalAccuracy >= 95) {
                finalCompliment = `INCREDIBLE! ${finalWpm} WPM with ${finalAccuracy}% accuracy! You're a typing champion! keep up the great work!!`;
                finalIcon = "🏆";
            } else if (finalWpm >= 60 && finalAccuracy >= 90) {
                finalCompliment = `EXCELLENT! ${finalWpm} WPM with ${finalAccuracy}% accuracy! Outstanding performance! your efforts really shows and it's really working `;
                finalIcon = "🥇";
            } else if (finalWpm >= 40 && finalAccuracy >= 85) {
                finalCompliment = `GREAT JOB! ${finalWpm} WPM with ${finalAccuracy}% accuracy! You're improving wonderfully!impresive progress....your typing skills are sharpening fast`;
                finalIcon = "🥈";
            } else if (finalWpm >= 20) {
                finalCompliment = `WELL DONE! ${finalWpm} WPM with ${finalAccuracy}% accuracy! Keep practicing, you're getting better!your focus and speed are truly commendable`;
                finalIcon = "🥉";
            } else {
                finalCompliment = `FANTASTIC EFFORT! ${finalWpm} WPM with ${finalAccuracy}% accuracy! Every journey begins with a single step! typing like a champ way to go`;
                finalIcon = "🌟";
            }
            
            // Show popup
            const popup = document.getElementById('complimentPopup');
            const popupText = document.getElementById('complimentPopupText');
            const popupIcon = document.getElementById('complimentPopupIcon');
            
            popupText.textContent = finalCompliment;
            popupIcon.textContent = finalIcon;
            popupIcon.style.display='block';  // add bouncing animation class
            popup.style.display='block';

            
            // Close button functionality
            const closeBtn = document.getElementById('complimentCloseBtn');
            closeBtn.onclick = () => {
            popup.style.display = 'none';
            };

            
            this.progressFill.style.width = '100%';
        }

    updateCompliment(text, icon) {
        this.complimentText.textContent = text;
        this.complimentIcon.textContent = icon;
        
        // Add a little animation
        this.complimentIcon.style.animation = 'none';
        setTimeout(() => {
            this.complimentIcon.style.animation = 'bounce 2s infinite';
        }, 10);
    }
    
    startTimer() {
        const updateTimer = () => {
            if (!this.isTestActive) return;
            
            const elapsed = Math.floor((Date.now() - this.startTime) / 1000);
            this.timerElement.textContent = `${elapsed}`;
            
            setTimeout(updateTimer, 1000);
        };
        
        updateTimer();
    }
}

// Initialize the app when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new TypingSpeedApp();
});