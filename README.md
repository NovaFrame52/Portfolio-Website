Terminal-style Portfolio
=======================

This is a small static "terminal" portfolio meant for hosting on Cloudflare Pages.

Features
- Interactive terminal interface with command history (arrow keys to navigate)
- Live clock displaying date & time in the top-right corner
- Resume download functionality
- Multiple commands to explore profile, projects, skills, & interests

Files
- index.html — Entry Point
- styles.css — Styling
- script.js — Commands & Typing Effects
- assets/Resume.pdf — Downloadable Resume
- assets/photo.jpg — Profile Photo
- assets/music/ambient-1.mp3 — First Ambient Music File
- assets/music/ambient-2.mp3 — Second Ambient Music File

Commands
- `help` — Show Available Commands
- `about` — Short Bio & Profile Photo
- `skills` — List Technologies
- `projects` — List All Projects
- `contact` — Contact info (Email, GitHub, LinkedIn)
- `now` — Current Focus & Interests
- `resume` — Download Resume PDF
- `clear` — Clear Terminal
- `mute` — Toggle Ambient Music

Deploy to Cloudflare Pages (static site)

1. Push this repository to GitHub.
2. In Cloudflare Pages, create a new project & connect to the repo.
3. Build command: leave blank. Build directory: `/` (root).
4. Save and deploy.

Customization

- Edit `script.js` to add commands or modify profile data
- Style via `styles.css` (CSS variables at the top control the color scheme)
- Add assets like photos or documents to the `assets/` folder
