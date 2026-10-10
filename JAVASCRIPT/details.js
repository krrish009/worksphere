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
        
        <hr style="margin: 30px 0; border: 0; border-top: 1px solid #e2e8f0;">
        
        <h3 style="margin-bottom: 15px;">Submit Your Application</h3>
        <form id="apply-form" onsubmit="submitApplicationWithResume(event, ${job.id})">
            <div class="form-group">
                <label>Upload Resume (PDF / DOCX)</label>
                <input type="file" id="applicant-resume" class="form-control" accept=".pdf,.doc,.docx" required>
            </div>
            <button type="submit" class="btn" style="width: 100%; margin-top: 10px;">Submit Application with Resume</button>
        </form>
    `;
});

function submitApplicationWithResume(event, id) {
    event.preventDefault();
    
    let loggedInSeeker = localStorage.getItem('seekerLoggedInUser');
    if (!loggedInSeeker) {
        alert('Please log in as a Job Seeker to submit an application.');
        window.location.href = 'seeker-login.html';
        return;
    }

    let fileInput = document.getElementById('applicant-resume');
    let file = fileInput.files[0];
    
    if (!file) {
        alert('Please upload your resume file.');
        return;
    }

    // Read the file using FileReader
    let reader = new FileReader();
    reader.onload = function(e) {
        let resumeDataUrl = e.target.result;
        let resumeName = file.name;

        let jobs = JSON.parse(localStorage.getItem('jobs')) || [];
        let job = jobs.find(j => j.id === id);
        let apps = JSON.parse(localStorage.getItem('applications')) || [];
        
        if (!apps.some(a => a.id === id && a.applicant === loggedInSeeker)) {
            apps.push({
                ...job,
                applicant: loggedInSeeker,
                resumeName: resumeName,
                resumeFile: resumeDataUrl,
                status: 'Under Review',
                dateApplied: new Date().toLocaleDateString()
            });
            localStorage.setItem('applications', JSON.stringify(apps));
            alert('Application and resume successfully submitted!');
            window.location.href = 'tracker.html';
        } else {
            alert('You have already applied for this position.');
            window.location.href = 'tracker.html';
        }
    };
    
    reader.readAsDataURL(file);
}