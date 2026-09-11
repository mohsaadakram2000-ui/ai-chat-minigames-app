// Authentication
const users = JSON.parse(localStorage.getItem('users')) || [];
let currentUser = JSON.parse(localStorage.getItem('currentUser')) || null;

// Initialize app
window.addEventListener('DOMContentLoaded', () => {
    if (currentUser) {
        showMainScreen();
        renderMinigames();
    } else {
        showLoginScreen();
    }
});

// Toggle between login and signup
function toggleSignup() {
    document.getElementById('loginScreen').classList.toggle('active');
    document.getElementById('signupScreen').classList.toggle('active');
    return false;
}

// Show/Hide screens
function showLoginScreen() {
    document.getElementById('loginScreen').classList.add('active');
    document.getElementById('signupScreen').classList.remove('active');
    document.getElementById('mainScreen').classList.remove('active');
}

function showMainScreen() {
    document.getElementById('mainScreen').classList.add('active');
    document.getElementById('loginScreen').classList.remove('active');
    document.getElementById('signupScreen').classList.remove('active');
}

// Login
document.getElementById('loginForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const user = users.find(u => u.email === email && u.password === password);
    if (user) {
        currentUser = { email: user.email, name: user.name };
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
        showMainScreen();
        renderMinigames();
        document.getElementById('loginForm').reset();
    } else {
        alert('Invalid email or password');
    }
});

// Signup
document.getElementById('signupForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('fullname').value;
    const email = document.getElementById('signup-email').value;
    const password = document.getElementById('signup-password').value;
    const confirmPassword = document.getElementById('confirm-password').value;

    if (password !== confirmPassword) {
        alert('Passwords do not match');
        return;
    }

    if (users.find(u => u.email === email)) {
        alert('Email already registered');
        return;
    }

    users.push({ name, email, password });
    localStorage.setItem('users', JSON.stringify(users));
    alert('Account created successfully. Please login.');
    toggleSignup();
    document.getElementById('signupForm').reset();
});

// Logout
function logout() {
    currentUser = null;
    localStorage.removeItem('currentUser');
    showLoginScreen();
    document.getElementById('chatBox').innerHTML = '';
}

// AI Chat (Mock AI responses)
const aiResponses = [
    'That is an interesting question!',
    'I can help you with that.',
    'Let me think about that for a moment...',
    'Based on what you asked, I would suggest...',
    'That is a great point! Have you considered...',
    'I understand. Here is what I think...',
    'Interesting! Let me provide some insights...',
    'That depends on several factors...'
];

function sendMessage() {
    const chatInput = document.getElementById('chatInput');
    const message = chatInput.value.trim();

    if (!message) return;

    // Add user message
    addMessage(message, 'user');
    chatInput.value = '';

    // Simulate AI response
    setTimeout(() => {
        const randomResponse = aiResponses[Math.floor(Math.random() * aiResponses.length)];
        addMessage(randomResponse, 'ai');
    }, 500);
}

function addMessage(text, sender) {
    const chatBox = document.getElementById('chatBox');
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${sender}`;
    messageDiv.innerHTML = `<div class="message-content">${text}</div>`;
    chatBox.appendChild(messageDiv);
    chatBox.scrollTop = chatBox.scrollHeight;
}

// Allow Enter key to send message
document.addEventListener('keypress', (e) => {
    if (e.key === 'Enter' && document.getElementById('chatInput') === document.activeElement) {
        sendMessage();
    }
});

// Minigames Data
const minigames = [
    { name: 'Memory Match', icon: '🧠', id: 1 },
    { name: 'Flappy Bird', icon: '🐦', id: 2 },
    { name: 'Tic Tac Toe', icon: '⭕', id: 3 },
    { name: 'Snake Game', icon: '🐍', id: 4 },
    { name: 'Rock Paper Scissors', icon: '✂️', id: 5 },
    { name: 'Whack a Mole', icon: '🔨', id: 6 },
    { name: 'Quiz Master', icon: '❓', id: 7 },
    { name: 'Simon Says', icon: '🎮', id: 8 },
    { name: 'Puzzle Game', icon: '🧩', id: 9 },
    { name: '2048', icon: '🔢', id: 10 },
    { name: 'Maze Runner', icon: '🏃', id: 11 },
    { name: 'Catch Game', icon: '🎯', id: 12 },
    { name: 'Dice Roller', icon: '🎲', id: 13 },
    { name: 'Word Scramble', icon: '🔤', id: 14 },
    { name: 'Trivia Game', icon: '🧠', id: 15 }
];

function renderMinigames() {
    const container = document.getElementById('minigamesContainer');
    container.innerHTML = '';

    minigames.forEach(game => {
        const card = document.createElement('div');
        card.className = 'minigame-card';
        card.innerHTML = `
            <div class="game-icon">${game.icon}</div>
            <div class="game-name">${game.name}</div>
        `;
        card.onclick = () => playGame(game);
        container.appendChild(card);
    });
}

function playGame(game) {
    alert(`🎮 ${game.name} Game Started!\n\nThis is a demo. Click OK to continue.\n\nScore: ${Math.floor(Math.random() * 100)} points`);
}
