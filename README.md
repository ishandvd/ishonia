# 💍 Ishan & Sonia — Engagement RSVP Website

A magical, Disney-inspired React engagement celebration RSVP site, built with Vite and deployed via Netlify.

---

## 🚀 Local Setup

```bash
# 1. Install dependencies
npm install

# 2. Start dev server
npm run dev
# → http://localhost:5173
```

---

## 🌐 Deploy to Netlify

### Option A — Netlify CLI (recommended)

```bash
# Install CLI globally (once)
npm install -g netlify-cli

# Login
netlify login

# Link to a new or existing site
netlify init

# Preview deploy
npm run build && netlify deploy --dir=dist

# Production deploy
netlify deploy --dir=dist --prod
```

### Option B — Drag & Drop

1. Run `npm run build` — this creates a `dist/` folder
2. Go to [app.netlify.com](https://app.netlify.com)
3. Drag the `dist/` folder onto the deploy zone

---

## 📝 Connecting Your Tally Form

1. Create your form at [tally.so](https://tally.so)
2. Publish it and grab the form ID from the URL:
   `https://tally.so/r/` **`w4gKpQ`** ← this part
3. Open `src/components/RSVP.jsx` and update:
   ```js
   const TALLY_FORM_ID = 'w4gKpQ'  // ← your actual ID here
   ```
4. Redeploy

---

## 🖼️ Adding Your Photo

Open `src/components/Story.jsx` and replace the placeholder `<div>` with:

```jsx
<img
  src="/your-photo.jpg"
  alt="Ishan and Sonia"
  style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '2px' }}
/>
```

Put the photo in the `public/` folder and reference it as `/your-photo.jpg`.

---

## ✏️ Other Customisations

| What               | Where                              |
|--------------------|------------------------------------|
| RSVP deadline      | `src/components/RSVP.jsx`          |
| Event 2 venue/date | `src/components/Events.jsx`        |
| Story text         | `src/components/Story.jsx`         |
| Colours / fonts    | `src/index.css` (CSS variables)    |

---

## 📁 Project Structure

```
ishan-sonia-rsvp/
├── public/                   ← static assets (photos go here)
├── src/
│   ├── components/
│   │   ├── StarCanvas.jsx    ← animated star background
│   │   ├── MagicDust.jsx     ← cursor sparkle trail
│   │   ├── FloatingSparkles.jsx
│   │   ├── CornerOrnaments.jsx
│   │   ├── Hero.jsx + .module.css
│   │   ├── Story.jsx + .module.css
│   │   ├── Events.jsx + .module.css
│   │   ├── RSVP.jsx + .module.css   ← 👈 put Tally ID here
│   │   ├── Footer.jsx + .module.css
│   │   └── useReveal.js      ← scroll reveal hook
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css             ← global styles & CSS variables
├── index.html
├── vite.config.js
├── netlify.toml
└── package.json
```
