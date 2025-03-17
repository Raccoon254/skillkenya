# Skill Kenya

Skill Kenya is an online learning platform built with Svelte and TailwindCSS. It provides an interactive and user-friendly experience for learners looking to gain new skills.

- Note that we have this website separate from the learning platform. The learning platform is a separate project.

## Features
- Built with **Svelte** for high performance and reactivity.
- Styled using **TailwindCSS** and **DaisyUI** for a modern UI.
- Countdown timer for upcoming events or courses.
- Email form for newsletter sign-ups.
- FAQ section for common inquiries.
- Comparison section to highlight platform benefits.

## Technologies Used
- **Svelte 5.1.3**
- **Vite** for fast development and builds.
- **TailwindCSS 3.4.14** for styling.
- **DaisyUI** for pre-built UI components.
- **PostCSS** and **Autoprefixer** for CSS optimization.

## Installation
### Prerequisites
Ensure you have **Node.js** installed on your system.

### Setup
1. Clone the repository:
   ```bash
   git clone https://github.com/Raccoon254/skillkenya.git
   cd skillkenya
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the development server:
   ```bash
   npm run dev
   ```
   The app will be available at `http://localhost:5173/`.

## Building for Production
To create a production-ready build, run:
```bash
npm run build
```

## Folder Structure
```
SkillKenya/
├── README.md
├── index.html
├── jsconfig.json
├── package-lock.json
├── package.json
├── postcss.config.js
├── src
│    ├── App.svelte
│    ├── app.css
│    ├── assets
│    │    └── svelte.svg
│    ├── components
│    │    ├── BetaProgram.svelte
│    │    ├── ComparisonSection.svelte
│    │    ├── CountdownTimer.svelte
│    │    ├── EmailForm.svelte
│    │    └── FAQ.svelte
│    ├── lib
│    ├── main.js
│    └── vite-env.d.ts
├── svelte.config.js
├── tailwind.config.js
└── vite.config.js

```

## Contribution
Contributions are welcome! Feel free to fork the repo and submit a pull request.

## License
This project is licensed under the MIT License.

---
Developed with ❤️ by Skill Kenya Team