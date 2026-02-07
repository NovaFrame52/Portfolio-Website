Terminal-style Portfolio
=======================

This is a small static "terminal" portfolio meant for hosting on Cloudflare Pages.

Features
- Interactive terminal interface with command history (arrow keys to navigate)
- Live clock displaying date and time in the top-right corner
- Resume download functionality
- Multiple commands to explore profile, projects, skills, and interests

Files
- index.html — entry point
- styles.css — styling
- script.js — commands and typing effects
- assets/Resume.pdf — downloadable resume
- assets/photo.jpg — profile photo

Commands
- `help` — show available commands
- `about` — short bio and profile photo
- `skills` — list technologies
- `projects` — list all projects
- `contact` — contact info (email, GitHub, LinkedIn)
- `now` — current focus and interests
- `resume` — download resume PDF
- `clear` — clear terminal

Deploy to Cloudflare Pages (static site)

1. Push this repository to GitHub.
2. In Cloudflare Pages, create a new project and connect to the repo.
3. Build command: leave blank. Build directory: `/` (root).
4. Save and deploy.

Customization

- Edit `script.js` to add commands or modify profile data
- Style via `styles.css` (CSS variables at the top control the color scheme)
- Add assets like photos or documents to the `assets/` folder
