# Celestia - Korolev

**Note**: This is a remake of the Korolev project with modern SvelteKit.

## Contribute

```bash
git clone https://github.com/SEDSCelestiaBPGC/Korolev
cd Korolev

# Install dependecies
pnpm i

# Start dev server
pnpm run dev

# Use pnpm run sass:FILENAME for live sass compiler

# Build
pnpm run cd
```

## Coding Guide

Refer to Thales Code Guidance System (CoGS)

## The Name

V1 was called *Galileo* since he made the first Telescope and let us see Beyond the atmosphere.\
V2 is therefore called *Korolev* since he designed the first rocket and took us there

## Plans

- Add postcss for vendor prefixes (autoprefixer)
- Fetch any very large data files during build, don't ship. Ex Astronomical Events.
- Host images in publicly accessible links, google redirects cannot be preloaded and look SHIT.

### Tests

- Create Browser test to check for all files update.
- Create Compiler test to check all components.

## Docs

For contribution help, please refer to the [DOCS.md](./DOCS.md).
