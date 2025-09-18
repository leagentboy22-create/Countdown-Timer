// Password visibility toggle
function togglePassword() {
    const passwordInput = document.getElementById('password');
    const toggleBtn = document.querySelector('.toggle-password');
    
    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        toggleBtn.textContent = '🔒';
    } else {
        passwordInput.type = 'password';
        toggleBtn.textContent = '👁️';
    }
}

// Password strength meter
function checkPasswordStrength(password) {
    let strength = 0;
    
    if (password.length >= 8) strength++;
    if (password.match(/[a-z]+/)) strength++;
    if (password.match(/[A-Z]+/)) strength++;
    if (password.match(/[0-9]+/)) strength++;
    if (password.match(/[!@#$%^&*(),.?":{}|<>]+/)) strength++;
    
    return strength;
}

function updatePasswordStrength() {
    const password = document.getElementById('reg-password')?.value;
    if (!password) return;
    
    const strength = checkPasswordStrength(password);
    const strengthBar = document.querySelector('.strength-bar');
    const strengthText = document.querySelector('.strength-text');
    
    let width = 0;
    let color = '';
    let text = '';
    
    switch (strength) {
        case 0:
        case 1:
            width = 25;
            color = '#ff4757';
            text = 'Weak';
            break;
        case 2:
        case 3:
            width = 50;
            color = '#ffa502';
            text = 'Medium';
            break;
        case 4:
            width = 75;
            color = '#2ed573';
            text = 'Strong';
            break;
        case 5:
            width = 100;
            color = '#2ed573';
            text = 'Very Strong';
            break;
    }
    
    strengthBar.style.background = color;
    strengthBar.querySelector('::after').style.width = width + '%';
    strengthText.textContent = 'Password strength: ' + text;
    strengthText.style.color = color;
}

// Form validation
document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const username = document.getElementById('username').value.trim();
            const password = document.getElementById('password').value;
            const errorMessage = document.getElementById('errorMessage');
            
            // Basic validation
            if (!username || !password) {
                showError('Please fill in all fields', errorMessage);
                return;
            }
            
            // Simulate login process (in real app, this would call an API)
            simulateLogin(username, password, errorMessage);
        });
    }
    
    if (registerForm) {
        registerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const username = document.getElementById('reg-username').value.trim();
            const email = document.getElementById('reg-email').value.trim();
            const password = document.getElementById('reg-password').value;
            const confirmPassword = document.getElementById('confirm-password').value;
            const errorMessage = document.getElementById('registerMessage');
            
            // Validation
            if (!username || !email || !password || !confirmPassword) {
                showError('Please fill in all fields', errorMessage);
                return;
            }
            
            if (password !== confirmPassword) {
                showError('Passwords do not match', errorMessage);
                return;
            }
            
            if (password.length < 8) {
                showError('Password must be at least 8 characters long', errorMessage);
                return;
            }
            
            // Simulate registration (in real app, this would call an API)
            simulateRegistration(username, email, password, errorMessage);
        });
        
        // Add password strength monitoring
        const passwordInput = document.getElementById('reg-password');
        if (passwordInput) {
            passwordInput.addEventListener('input', updatePasswordStrength);
        }
    }
});

function showError(message, element) {
    element.textContent = message;
    element.style.display = 'block';
    element.parentElement.classList.add('shake');
    
    setTimeout(() => {
        element.parentElement.classList.remove('shake');
    }, 300);
}

function showSuccess(message, element) {
    element.textContent = message;
    element.style.display = 'block';
    element.style.background = '#d4edda';
    element.style.color = '#155724';
    element.style.borderColor = '#c3e6cb';
}

// Simulation functions (replace with actual API calls)
function simulateLogin(username, password, errorElement) {
    // This is a simulation - in real app, use HTTPS and proper authentication
    const validUsers = JSON.parse(localStorage.getItem('users') || '{}');
    
    if (validUsers[username] && validUsers[username].password === btoa(password)) {
        showSuccess('Login successful! Redirecting...', errorElement);
        
        // Store session (in real app, use secure cookies or tokens)
        sessionStorage.setItem('currentUser', username);
        
        // Redirect to dashboard (simulated)
        setTimeout(() => {
            alert('Login successful! Welcome ' + username);
            // window.location.href = 'dashboard.html';
        }, 1000);
    } else {
        showError('Invalid username or password', errorElement);
    }
}

function simulateRegistration(username, email, password, errorElement) {
    const users = JSON.parse(localStorage.getItem('users') || '{}');
    
    if (users[username]) {
        showError('Username already exists', errorElement);
        return;
    }
    
    // Store user (in real app, this would hash the password server-side)
    users[username] = {
        email: email,
        password: btoa(password), // Basic encoding - in real app, use proper hashing
        createdAt: new Date().toISOString()
    };
    
    localStorage.setItem('users', JSON.stringify(users));
    
    showSuccess('Registration successful! Redirecting to login...', errorElement);
    
    setTimeout(() => {
        window.location.href = 'index.html';
    }, 2000);
}

// Session management
function checkSession() {
    const currentUser = sessionStorage.getItem('currentUser');
    if (currentUser && window.location.pathname.endsWith('index.html')) {
        // User is already logged in, redirect to dashboard
        window.location.href = 'dashboard.html';
    }
}

// Initialize session check
checkSession();