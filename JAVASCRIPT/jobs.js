document.addEventListener('DOMContentLoaded', () => {
    loadJobs();
    
    let params = new URLSearchParams(window.location.search);
    let query = params.get('search');
    if (query) {
        document.getElementById('job-search-filter').value = query;
        filterJobListings();
    }
});

function loadJobs(list = null) {
    let container = document.getElementById('job-listings-container');
    let jobs = list || JSON.parse(localStorage.getItem('jobs')) || [];
    
    if (jobs.length === 0) {
        container.innerHTML = '<p>No jobs available.</p>';
        return;
    }

    container.innerHTML = jobs.map(j => `
        <div class="job-card">
            <div>
                <h3>${j.title}</h3>
                <div class="company">${j.company}</div>
                <div class="details-row">
                    <span>${j.location}</span>
                    <span>${j.salary}</span>
                </div>
                <p>${j.description}</p>
            </div>
            <button class="btn" onclick="openDetails(${j.id})">View Job</button>
        </div>
    `).join('');
}

function filterJobListings() {
    let val = document.getElementById('job-search-filter').value.toLowerCase();
    let jobs = JSON.parse(localStorage.getItem('jobs')) || [];
    let filtered = jobs.filter(j => j.title.toLowerCase().includes(val) || j.company.toLowerCase().includes(val));
    loadJobs(filtered);
}

function openDetails(id) {
    window.location.href = `details.html?id=${id}`;
}