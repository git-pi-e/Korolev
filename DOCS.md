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
- TODO:
  - Current sheet has been deleted (thanks to Google's storage policy for BITS alumni)
  - Refer to [Thales](https://thales.sedscelestia.org/docs/Korolev/data/) for creation of API sheet again.
  - Host the sheet on a non-BITSian account so that it isn't deleted in future.

### Routes and Social Info

- Edit `src/lib/data/routes.json`.
- TODO:
  - Update YT channel to modern link.
  - Update Instagram to modern link.
 
