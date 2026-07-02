🧑‍💻 Portfolio – Andreas Hüpgen
A personal developer portfolio website with bilingual support (DE/EN), glassmorphism design, and a fully custom contact form. Built with plain HTML, CSS, and JavaScript — no frameworks, no dependencies.
---
🚀 Live Demo
🔗 andreas-huepgen.de
---
✨ Features
🌐 Language toggle (DE/EN) with dynamic content switching
🎨 Dark glassmorphism design with teal accent color
🖱️ Custom cursor glow effect
🃏 Animated hero section with infinite-scroll tag carousel
🧠 Skills section with interactive tooltip for Growth Mindset
💼 Project showcase with modal detail view
💬 References carousel with dot navigation
📬 Contact form with PHP backend & client-side validation
🍔 Responsive burger menu for mobile
⚖️ Legal Notice & Privacy Policy pages
---
🛠️ Technologies
Vanilla JavaScript – no frameworks
HTML5 & CSS3 – modular stylesheets per section
PHP – server-side contact form handling
Google Fonts – Fira Code & Karla
CSS Custom Properties – consistent design system
Hostinger – static hosting
---
🏗️ Architecture
Page Structure
`index.html` – Single-page portfolio (Hero, About, Skills, Projects, References, Contact)
`legal-notice.html` – Impressum / Legal Notice
`privacy.html` – Privacy Policy
`contact.php` – Server-side contact form handler
JS Modules (`js/`)
`js/main.js` – Entry point, calls `initializePage()`
`js/data/de.js` – German content data
`js/data/en.js` – English content data
`js/features/language.js` – Language toggle logic
`js/features/cursor.js` – Custom cursor glow effect
`js/features/menu.js` – Burger menu & mobile nav
`js/features/projects.js` – Project list rendering & modal
`js/features/references.js` – References carousel
`js/features/contact.js` – Contact form validation & submission
`js/features/skills-tooltip.js` – Skills tooltip component
CSS Modules (`styles/`)
One stylesheet per section: `base`, `header`, `hero`, `about`, `skills`, `projects`, `references`, `contact`, `footer`
---
▶️ Installation
Clone repository:
```bash
git clone https://github.com/Hueppi92/portfolio
```
Open in browser:
```bash
cd portfolio && open index.html
```
> **Note:** The contact form requires a PHP-capable server to send emails. On a local setup without PHP, the form will not submit — all other features work fine.
---
📁 Project Structure
```
portfolio/
├── assets/
│   ├── icon/                       # SVG icons & favicon
│   └── logo/                       # Logo files
│
├── js/
│   ├── data/
│   │   ├── de.js                   # German content
│   │   └── en.js                   # English content
│   ├── features/
│   │   ├── cursor.js               # Cursor glow
│   │   ├── menu.js                 # Burger menu
│   │   ├── language.js             # DE/EN toggle
│   │   ├── projects.js             # Project cards & modal
│   │   ├── references.js           # References carousel
│   │   ├── contact.js              # Form validation
│   │   └── skills-tooltip.js       # Skills tooltip
│   └── main.js                     # Page initializer
│
├── styles/
│   ├── base.css                    # Reset & global styles
│   ├── header.css
│   ├── hero.css
│   ├── about.css
│   ├── skills.css
│   ├── projects.css
│   ├── references.css
│   ├── contact.css
│   └── footer.css
│
├── contact.php                     # Contact form backend
├── index.html                      # Main entry point
├── legal-notice.html               # Impressum
└── privacy.html                    # Privacy Policy
```
---
👨‍💻 Developer
Andreas Hüpgen
🔗 GitHub · LinkedIn · a.huepgen@web.de
