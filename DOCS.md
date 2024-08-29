# Contribution Guide

## Data Updates

### Homepage

- Legacy Img: Edit `static/assets/legacy.svg`.
- Through the Telescope: `src/lib/data/home.json`.

### Team

- Management, Past & Lead: `src/lib/data/team.json`.

### Projects

- Projects: `src/lib/data/projects.json`.

### Observations

- Obs details: `src/lib/data/lookUp.json`.

### Events

- You need to edit a privately hosted gsheet containing the list of events.
- Convert to base64 and replace it to the path in `src/routes/events/+page.svelte`
- Whatever events you add to the sheet shall automatically reflect onto the website.

### Routes and Social Info

- Edit `src/lib/data/routes.json`.
- TODO:
  - Update YT channel to modern link.
  - Update Instagram to modern link.
 
