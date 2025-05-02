document.addEventListener('DOMContentLoaded', function() {
    // Sample data for Chitkara University posts
    const samplePosts = [
        {
            id: 1,
            author: 'Rahul Sharma',
            department: 'CSE',
            avatar: 'RS',
            title: 'Looking for study partners for Data Structures',
            content: 'I\'m preparing for the upcoming Data Structures exam. Would anyone like to form a study group? We can meet in the library or online.',
            tags: ['CSE', 'Data Structures', 'Study Group'],
            date: '2 hours ago',
            likes: 5,
            comments: 3
        },
        {
            id: 2,
            author: 'Priya Singh',
            department: 'ECE',
            avatar: 'PS',
            title: 'Upcoming Hackathon - Team Members Needed',
            content: 'The annual Chitkara Hackathon is coming up next month. I\'m looking for 2 more team members with skills in IoT and Python. DM me if interested!',
            tags: ['Hackathon', 'ECE', 'Programming'],
            date: '1 day ago',
            likes: 12,
            comments: 7
        },
        {
            id: 3,
            author: 'Amit Kumar',
            department: 'BBA',
            avatar: 'AK',
            title: 'Best places to study on campus?',
            content: 'New student here. Where are the quietest places to study on campus? The main library seems always crowded.',
            tags: ['BBA', 'Study Tips', 'New Student'],
            date: '3 days ago',
            likes: 8,
            comments: 5
        },
        {
            id: 4,
            author: 'Neha Gupta',
            department: 'Pharmacy',
            avatar: 'NG',
            title: 'Shared notes for Pharmacology',
            content: 'I\'ve compiled comprehensive notes for the Pharmacology course. Sharing the Google Drive link below for anyone who needs them.',
            tags: ['Pharmacy', 'Notes', 'Resources'],
            date: '4 days ago',
            likes: 15,
            comments: 4
        },
        {
            id: 5,
            author: 'Vikram Joshi',
            department: 'ME',
            avatar: 'VJ',
            title: 'Mechanical Workshop Volunteers Needed',
            content: 'The mechanical department is organizing a workshop next week and needs volunteers. Great opportunity to learn practical skills!',
            tags: ['ME', 'Workshop', 'Volunteer'],
            date: '5 days ago',
            likes: 10,
            comments: 6
        },
        {
            id: 6,
            author: 'Sanjana Patel',
            department: 'Architecture',
            avatar: 'SP',
            title: 'Campus Photography Club - First Meeting',
            content: 'We\'re starting a photography club on campus. First meeting this Friday at 4pm near the fountain. Bring your cameras!',
            tags: ['Photography', 'Club', 'Architecture'],
            date: '1 week ago',
            likes: 20,
            comments: 9
        }
    ];

    // DOM Elements
    const postsContainer = document.getElementById('postsContainer');
    const loginBtn = document.getElementById('loginBtn');
    const registerBtn = document.getElementById('registerBtn');
    const createPostBtn = document.getElementById('createPostBtn');
    const authModal = document.getElementById('authModal');
    const postModal = document.getElementById('postModal');
    const closeBtns = document.querySelectorAll('.close-btn');
    const tabBtns = document.querySelectorAll('.tab-btn');
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    const postForm = document.getElementById('postForm');
    const departmentCards = document.querySelectorAll('.department-card');

    // Display sample posts
    function displayPosts() {
        if (!postsContainer) return;
        postsContainer.innerHTML = '';
        samplePosts.forEach(post => {
            const postElement = document.createElement('div');
            postElement.className = 'post-card';
            postElement.innerHTML = `
                <div class="post-header">
                    <div class="post-avatar">${post.avatar}</div>
                    <div class="post-author">
                        <h4>${post.author}</h4>
                        <p>${post.department} • ${post.date}</p>
                    </div>
                </div>
                <div class="post-content">
                    <h3>${post.title}</h3>
                    <p>${post.content}</p>
                    <div class="post-tags">
                        ${post.tags.map(tag => `<span class="post-tag">${tag}</span>`).join('')}
                    </div>
                </div>
                <div class="post-footer">
                    <div class="post-actions">
                        <div class="post-action">
                            <i class="far fa-thumbs-up"></i>
                            <span>${post.likes}</span>
                        </div>
                        <div class="post-action">
                            <i class="far fa-comment"></i>
                            <span>${post.comments}</span>
                        </div>
                    </div>
                    <div class="post-action">
                        <i class="far fa-bookmark"></i>
                    </div>
                </div>
            `;
            postsContainer.appendChild(postElement);
        });
    }

    // Modal functions
    function openModal(modal) {
        if (modal) modal.style.display = 'flex';
    }

    function closeModal(modal) {
        if (modal) modal.style.display = 'none';
    }

    function switchTab(tabName) {
        tabBtns.forEach(btn => {
            btn.classList.toggle('active', btn.dataset.tab === tabName);
        });

        if (loginForm && registerForm) {
            loginForm.style.display = tabName === 'login' ? 'block' : 'none';
            registerForm.style.display = tabName === 'register' ? 'block' : 'none';
        }
    }

    // User management functions
    function checkLoginStatus() {
        const user = JSON.parse(localStorage.getItem('currentUser'));
        if (user) {
            updateUIForLoggedInUser(user);
            closeModal(authModal);
        } else {
            updateUIForLoggedOutUser();
        }
    }

    function registerUser(name, email, studentId, department, password) {
        const users = JSON.parse(localStorage.getItem('users')) || [];
        
        if (users.some(user => user.email === email)) {
            alert('User with this email already exists!');
            return;
        }
        
        const newUser = {
            id: Date.now().toString(),
            name,
            email,
            studentId,
            department,
            password, // Note: In production, hash passwords!
            createdAt: new Date().toISOString(),
            avatar: name.split(' ').map(n => n[0]).join('')
        };
        
        users.push(newUser);
        localStorage.setItem('users', JSON.stringify(users));
        localStorage.setItem('currentUser', JSON.stringify(newUser));
        
        alert('Registration successful! You are now logged in.');
        checkLoginStatus();
        if (registerForm) registerForm.reset();
    }

    function loginUser(email, password) {
        const users = JSON.parse(localStorage.getItem('users')) || [];
        const user = users.find(u => u.email === email && u.password === password);
        
        if (user) {
            localStorage.setItem('currentUser', JSON.stringify(user));
            alert('Login successful!');
            checkLoginStatus();
            if (loginForm) loginForm.reset();
        } else {
            alert('Invalid email or password!');
        }
    }

    function logoutUser() {
        localStorage.removeItem('currentUser');
        alert('You have been logged out.');
        checkLoginStatus();
    }

    function updateUIForLoggedInUser(user) {
        const authButtons = document.querySelector('.auth-buttons');
        if (authButtons) {
            authButtons.innerHTML = `
                <div class="user-menu">
                    <button id="userMenuBtn">
                        <i class="fas fa-user-circle"></i> ${user.name.split(' ')[0]}
                    </button>
                    <div class="user-dropdown">
                        <a href="profile.html"><i class="fas fa-user"></i> Profile</a>
                        <a href="#"><i class="fas fa-cog"></i> Settings</a>
                        <button id="logoutBtn"><i class="fas fa-sign-out-alt"></i> Logout</button>
                    </div>
                </div>
            `;
            
            const userMenuBtn = document.getElementById('userMenuBtn');
            const userDropdown = document.querySelector('.user-dropdown');
            const logoutBtn = document.getElementById('logoutBtn');
            
            if (userMenuBtn && userDropdown) {
                userMenuBtn.addEventListener('click', () => {
                    userDropdown.style.display = userDropdown.style.display === 'block' ? 'none' : 'block';
                });
            }
            
            document.addEventListener('click', (e) => {
                if (userDropdown && !e.target.closest('.user-menu')) {
                    userDropdown.style.display = 'none';
                }
            });
            
            if (logoutBtn) {
                logoutBtn.addEventListener('click', logoutUser);
            }
        }
        
        if (createPostBtn) createPostBtn.disabled = false;
    }

    function updateUIForLoggedOutUser() {
        const authButtons = document.querySelector('.auth-buttons');
        if (authButtons) {
            authButtons.innerHTML = `
                <button id="loginBtn">Login</button>
                <button id="registerBtn">Register</button>
            `;
            initModals();
        }
        
        if (createPostBtn) createPostBtn.disabled = true;
    }

    // Initialize modal functionality
    function initModals() {
        const loginBtn = document.getElementById('loginBtn');
        const registerBtn = document.getElementById('registerBtn');
        
        if (loginBtn) {
            loginBtn.addEventListener('click', () => {
                openModal(authModal);
                switchTab('login');
            });
        }
        
        if (registerBtn) {
            registerBtn.addEventListener('click', () => {
                openModal(authModal);
                switchTab('register');
            });
        }
        
        closeBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                const modal = this.closest('.modal');
                closeModal(modal);
            });
        });
        
        tabBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                const tabName = this.dataset.tab;
                switchTab(tabName);
            });
        });
        
        window.addEventListener('click', (e) => {
            if (e.target === authModal) {
                closeModal(authModal);
            }
            if (e.target === postModal) {
                closeModal(postModal);
            }
        });
    }

    // Event Listeners
    if (createPostBtn) {
        createPostBtn.addEventListener('click', () => {
            openModal(postModal);
        });
    }

    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const emailInput = document.getElementById('loginEmail');
            const passwordInput = document.getElementById('loginPassword');
            if (emailInput && passwordInput) {
                loginUser(emailInput.value, passwordInput.value);
            } else {
                alert('Login form elements are missing!');
            }
        });
    }

    if (registerForm) {
        registerForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const nameInput = document.getElementById('regName');
            const emailInput = document.getElementById('regEmail');
            const studentIdInput = document.getElementById('regStudentId');
            const departmentInput = document.getElementById('regDepartment');
            const passwordInput = document.getElementById('regPassword');
            const confirmPasswordInput = document.getElementById('regConfirmPassword');
            
            if (nameInput && emailInput && studentIdInput && departmentInput && passwordInput && confirmPasswordInput) {
                if (passwordInput.value !== confirmPasswordInput.value) {
                    alert('Passwords do not match!');
                    return;
                }
                registerUser(
                    nameInput.value,
                    emailInput.value,
                    studentIdInput.value,
                    departmentInput.value,
                    passwordInput.value
                );
            } else {
                alert('Registration form elements are missing!');
            }
        });
    }

    if (postForm) {
        postForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const titleInput = document.getElementById('postTitle');
            const contentInput = document.getElementById('postContent');
            const tagsInput = document.getElementById('postTags');
            const user = JSON.parse(localStorage.getItem('currentUser')) || { name: 'Current User', department: 'Your Department', avatar: 'CU' };
            
            if (titleInput && contentInput && tagsInput) {
                const newPost = {
                    id: samplePosts.length + 1,
                    author: user.name,
                    department: user.department,
                    avatar: user.avatar,
                    title: titleInput.value,
                    content: contentInput.value,
                    tags: tagsInput.value.split(',').map(tag => tag.trim()),
                    date: 'Just now',
                    likes: 0,
                    comments: 0
                };
                
                samplePosts.unshift(newPost);
                displayPosts();
                postForm.reset();
                closeModal(postModal);
                alert('Post created successfully!');
            } else {
                alert('Post form elements are missing!');
            }
        });
    }

    departmentCards.forEach(card => {
        card.addEventListener('click', function() {
            const department = this.dataset.dept;
            const deptName = this.querySelector('h3') ? this.querySelector('h3').textContent : 'Unknown';
            alert(`Showing posts from ${deptName} department`);
            // In a real app, you would filter posts by department here
        });
    });

    // Initialize the page
    initModals();
    checkLoginStatus();
    displayPosts();
});