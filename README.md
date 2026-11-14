# Wedding Website — Riviera Maya, April 13, 2028

A static wedding site (HTML/CSS/JS, no build step) for GitHub Pages, set up the same way as the Avs Tracker.

## Updating the site

Almost everything guests see lives in **`details.js`**:

| What | Where in `details.js` |
|---|---|
| Your names | `couple` |
| Announcements ("Latest Updates") | `updates` — add new ones at the top |
| Schedule | `schedule` — set `tentative: false` once a time is confirmed |
| Travel agent (Mandy) | `agent` — add `phone` to show the Call button, `bookBy` for the room-block deadline |
| RSVP button | `rsvp.link` (e.g. a Google Form) and `rsvp.deadline` |
| FAQ | `faq` |

Resort facts (adults-only, check-in times, etc.) are in `index.html` under the `RESORT` comment.

After editing: commit and push. GitHub Pages republishes within a minute or two.

## Files

- `index.html` — page layout
- `style.css` — colors, fonts, layout (palette variables at the top)
- `details.js` — the content you'll update
- `app.js` — fills the page from `details.js`, countdown, mobile menu
- `images/` — your photo plus the tropical artwork (all SVGs, original to this site)

## Hosting on GitHub Pages

1. Create a new repo on GitHub (e.g. `wedding`) and push this folder to it.
2. **Settings → Pages** → Source: *Deploy from a branch*, branch `main`, folder `/ (root)` → Save.
3. In a minute it's live at `https://<your-username>.github.io/<repo-name>/`.

Optional: a custom domain (like `ourname-wedding.com`) can be added under **Settings → Pages → Custom domain**.

## Previewing locally

Just double-click `index.html` — it works straight from the file system.
