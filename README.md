# WorkSphere

A frontend-only job portal and career matcher application built using HTML, CSS and JavaScript.

---

## 1. Project Overview

WorkSphere helps users connect talent with opportunity in one place. The platform provides two distinct sides: a Job Seeker side to search, view, apply for, and track jobs, and an Employer side with secure authentication to post, manage, and update job listings.

---

## 2. Key Features

* Dual-side application layout supporting both Job Seekers and Employers.
* Employer authentication system (Sign up, login, and logout).
* Browse, search, and filter job listings by job type (Full-time, Part-time, Remote, Internship).
* Comprehensive job description views and application submission.
* Interactive application status tracker table for job seekers.
* Create, edit, and delete job listings (Employer CRUD).
* Multi-layered data storage using Web Storage (`localStorage`), cookies, and IndexedDB.
* Responsive design for mobile, tablet and desktop.

---

## 3. Technology & Project Specifications

* **HTML5** – Structure, forms, and multi-page layout.
* **CSS3** – Styling and responsive design.
* **JavaScript** – DOM manipulation, events, modular script separation, CRUD operations.
* **Data Storage APIs** – Web Storage (`localStorage`), cookies, and IndexedDB for comprehensive data persistence.
* No external JavaScript libraries or frameworks.
* Frontend-only application featuring 5 dedicated pages.

---

## 4. Project Proposal

### Problem
Finding the right job or qualified candidate can be fragmented and inefficient without a centralized platform that seamlessly manages both job seeking and employer workflows.

### Goal
WorkSphere combines job search, application tracking, and employer job management into a single, lightweight frontend application utilizing multiple browser storage mechanisms.

### CRUD Operations

| Operation | Examples |
| :--- | :--- |
| **Create** | Employer accounts, job listings, job applications |
| **Read** | Job listings, search results, application tracking status, job descriptions |
| **Update** | Job postings details (Employer edit) |
| **Delete** | Job postings (Employer delete), job applications (Seeker withdrawal) |

---

## 5. Prerequisites

Before running the application, make sure you have the following installed on your system:
* **A Modern Web Browser**: Google Chrome, Mozilla Firefox, Microsoft Edge, or Safari.
* **A Code Editor** (Recommended): Visual Studio Code (VS Code) for managing and viewing files locally.

---

## 6. Setup & Step-by-Step Instructions to Run

1. **Clone or Download the Repository**:
   Open your terminal/command prompt and run the following command:
   ```bash
   git clone https://github.com/krrish009/worksphere.git
   ```
2. **Navigate to Project Directory**:
   ```bash
   cd worksphere
   ```
3. **Open the Project**:
   * Open the project folder in VS Code.
   * If you are using VS Code, it is recommended to install and use the **Live Server** extension. Click **"Go Live"** from the status bar, or open `index.html` directly in your modern web browser.

---

## 7. License
This project is licensed under the MIT License.
