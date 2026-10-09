function handleJobPost(e) {
    e.preventDefault();
    
    let newJob = {
        id: Date.now(),
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
    
    alert('Job published successfully!');
    window.location.href = 'jobs.html';
}