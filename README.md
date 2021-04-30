# Celestia Korolev

## Contribute
```bash
$ npm i
# pnpm also works

$ npm run dev
# Use npm run sass:FILENAME for live sass compiler

$ npm run build
```
## Coding Guide
Refer to Thales Code Guidance System (CoGS)

## The Name

V1 was called *Galileo* since he made the first Telescope and let us see Beyond the atmosphere <br/>
V2 is therefore called *Korolev* since he designed the first rocket and took us there

## Plans

- Convert to SvelteKit
- Add postcss for vendor prefixes (autoprefixer)
- Fetch any very large data files during build, don't ship. Ex Astronomical Events.
- Create build script to update /meta and then npm run build
- Host images in publicly accessible links, google redirects cannot be preloaded and look SHIT.
