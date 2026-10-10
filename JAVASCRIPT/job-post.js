let isSignupMode = false;

document.addEventListener('DOMContentLoaded', () => {
    if (!localStorage.getItem('employerAccounts')) {
        localStorage.setItem('employerAccounts', JSON.stringify([]));
    }
    
    let loggedUser = localStorage.getItem('employerLoggedInUser');
    if (loggedUser) {
        showDashboard(loggedUser);
    }
});

function toggleAuthMode(event) {
    event.preventDefault();
    isSignupMode = !isSignupMode;
    
    let title = document.getElementById('auth-title');
    let subtitle = document.getElementById('auth-subtitle');
    let btn = document.getElementById('auth-btn');
    let toggleText = document.getElementById('auth-toggle-text');
    let toggleLink = document.getElementById('auth-toggle-link');

    if (isSignupMode) {
        title.innerText = 'Employer Sign Up';
        subtitle.innerText = 'Create an account to start publishing and managing jobs.';
        btn.innerText = 'Create Account';
        toggleText.innerText = 'Already have an account?';
        toggleLink.innerText = 'Log In';
    } else {
        title.innerText = 'Employer Login';
        subtitle.innerText = 'Please log in to post and manage your company listings.';
        btn.innerText = 'Log In';
        toggleText.innerText = "Don't have an account?";
        toggleLink.innerText = 'Sign Up';
    }
}

function handleEmployerAuth(event) {
    event.preventDefault();
    let email = document.getElementById('auth-email').value.trim();
    let password = document.getElementById('auth-password').value.trim();
    
    let accounts = JSON.parse(localStorage.getItem('employerAccounts')) || [];

    if (isSignupMode) {
        let existing = accounts.find(acc => acc.email === email);
        if (existing) {
            alert('An account with this email already exists. Please log in.');
            return;
        }
        accounts.push({ email, password });
        localStorage.setItem('employerAccounts', JSON.stringify(accounts));
        alert('Account created successfully!');
        localStorage.setItem('employerLoggedInUser', email);
        showDashboard(email);
    } else {
        let user = accounts.find(acc => acc.email === email && acc.password === password);
        if (!user) {
            alert('Invalid login credentials or account does not exist.');
            return;
        }
        localStorage.setItem('employerLoggedInUser', email);
        showDashboard(email);
    }
}

function showDashboard(email) {
    document.getElementById('auth-section').style.display = 'none';
    document.getElementById('dashboard-section').style.display = 'block';
    document.getElementById('welcome-msg').innerText = `Welcome, ${email}`;
    loadEmployerJobListings();
}

function logoutEmployer() {
    localStorage.removeItem('employerLoggedInUser');
    document.getElementById('dashboard-section').style.display = 'none';
    document.getElementById('auth-section').style.display = 'block';
    document.getElementById('auth-email').value = '';
    document.getElementById('auth-password').value = '';
}

function handleJobPost(event) {
    event.preventDefault();
    
    let loggedInEmployer = localStorage.getItem('employerLoggedInUser');

    let newJob = {
        id: Date.now(),
        employer: loggedInEmployer,
        title: document.getElementById('post-title').value,
        company: document.getElementById('post-company').value,
        location: document.getElementById('post-location').value,
        salary: document.getElementById('post-salary').value,
        type: document.getElementById('post-type').value,
        description: document.getElementById('post-desc').value
    };
    
    let jobs = JSON.parse(localStorage.getItem('jobs')) || [];
    jobs.unshift(newJob);
    localStorage.setItem('jobs', JSON.stringify(jobs));
    
    document.getElementById('post-job-form').reset();
    alert('Job published successfully!');
    loadEmployerJobListings();
}

function loadEmployerJobListings() {
    let container = document.getElementById('employer-jobs-container');
    let jobs = JSON.parse(localStorage.getItem('jobs')) || [];
    
    if (jobs.length === 0) {
        container.innerHTML = '<p style="color: var(--text-light);">No job listings created yet.</p>';
        return;
    }

    container.innerHTML = jobs.map(j => `
        <div style="display: flex; justify-content: space-between; align-items: center; padding: 12px 0; border-bottom: 1px solid #e2e8f0;">
            <div>
                <strong>${j.title}</strong> (${j.company}) - <span style="color: var(--text-light);">${j.location}</span>
            </div>
            <button class="btn" style="background-color: #ef4444; padding: 6px 12px; font-size: 0.85rem;" onclick="deleteJob(${j.id})">Delete</button>
        </div>
    `).join('');
}

function deleteJob(id) {
    if (confirm('Are you sure you want to delete this job listing?')) {
        let jobs = JSON.parse(localStorage.getItem('jobs')) || [];
        jobs = jobs.filter(j => j.id !== id);
        localStorage.setItem('jobs', JSON.stringify(jobs));
        loadEmployerJobListings();
    }
}