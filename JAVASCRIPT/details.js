document.addEventListener('DOMContentLoaded', () => {
    let params = new URLSearchParams(window.location.search);
    let jobId = parseInt(params.get('id'));
    let jobs = JSON.parse(localStorage.getItem('jobs')) || [];
    let job = jobs.find(j => j.id === jobId);
    
    let box = document.getElementById('job-details-container');
    
    if (!job) {
        box.innerHTML = '<h2>Job Not Found</h2><p>This listing may have expired.</p><br><a href="jobs.html" class="btn">Back to Jobs</a>';
        return;
    }
    
    box.innerHTML = `
        <h1 style="color: var(--secondary); margin-bottom: 5px;">${job.title}</h1>
        <div class="company" style="font-size: 1.1rem; margin-bottom: 20px;">${job.company}</div>
        <div class="details-row" style="font-size: 1rem; margin-bottom: 25px;">
            <span>📍 ${job.location}</span>
            <span>💰 ${job.salary}</span>
            <span>⏱️ ${job.type}</span>
        </div>
        <h3 style="margin-bottom: 10px;">Role Description</h3>
        <p style="color: var(--text-light); line-height: 1.6; margin-bottom: 30px;">${job.description}</p>
        <button class="btn" onclick="submitApplication(${job.id})">Submit Application</button>
    `;
});

function submitApplication(id) {
    let jobs = JSON.parse(localStorage.getItem('jobs')) || [];
    let job = jobs.find(j => j.id === id);
    let apps = JSON.parse(localStorage.getItem('applications')) || [];
    
    if (!apps.some(a => a.id === id)) {
        apps.push({ ...job, status: 'Under Review', dateApplied: new Date().toLocaleDateString() });
        localStorage.setItem('applications', JSON.stringify(apps));
        alert('Application successfully submitted!');
    } else {
        alert('You have already applied for this position.');
    }
    window.location.href = 'tracker.html';
}