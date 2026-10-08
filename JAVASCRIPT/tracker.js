document.addEventListener('DOMContentLoaded', () => {
    let container = document.getElementById('tracker-container');
    let apps = JSON.parse(localStorage.getItem('applications')) || [];
    
    if (apps.length === 0) {
        container.innerHTML = '<p style="color: var(--text-light);">No applications tracked yet. Visit <a href="jobs.html" style="color: var(--primary);">Browse Jobs</a> to apply!</p>';
        return;
    }
    
    container.innerHTML = apps.map(a => `
        <div class="job-card">
            <div>
                <h3>${a.title}</h3>
                <div class="company">${a.company}</div>
                <div class="details-row">
                    <span>Applied: ${a.dateApplied || 'Recent'}</span>
                    <span style="color: var(--success); font-weight: 600;">Status: ${a.status}</span>
                </div>
            </div>
            <button class="btn" style="background-color: #ef4444;" onclick="withdraw(${a.id})">Withdraw Application</button>
        </div>
    `).join('');
});

function withdraw(id) {
    let apps = JSON.parse(localStorage.getItem('applications')) || [];
    apps = apps.filter(a => a.id !== id);
    localStorage.setItem('applications', JSON.stringify(apps));
    location.reload();
}