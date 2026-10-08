document.addEventListener('DOMContentLoaded', () => {
    // Add sample jobs if storage is empty
    if (!localStorage.getItem('jobs')) {
        let defaultJobs = [
            { id: 1, title: 'Frontend Dev', company: 'TechCorp', location: 'Remote', salary: '$100k', type: 'Full-time', description: 'Build cool UI components.' },
            { id: 2, title: 'Backend Dev', company: 'DataSystems', location: 'New York', salary: '$120k', type: 'Full-time', description: 'Handle server and APIs.' }
        ];
        localStorage.setItem('jobs', JSON.stringify(defaultJobs));
    }

    let jobsCount = JSON.parse(localStorage.getItem('jobs')).length;
    let apps = JSON.parse(localStorage.getItem('applications')) || [];

    // Simple counter animation
    doCount('stat-total-jobs', jobsCount);
    doCount('stat-total-apps', apps.length > 0 ? apps.length : 5);
});

function doCount(elId, target) {
    let current = 0;
    let el = document.getElementById(elId);
    let timer = setInterval(() => {
        current++;
        el.innerText = current;
        if (current >= target) clearInterval(timer);
    }, 50);
}

function executeHeroSearch() {
    let q = document.getElementById('hero-search').value;
    window.location.href = `jobs.html?search=${encodeURIComponent(q)}`;
}