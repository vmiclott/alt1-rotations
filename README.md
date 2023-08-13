# Alt1 ability rotations

## Installation

Open the Chromium browser in Alt1 and go to https://vmiclott.github.io/alt1-rotations/.
An "Add App" button should appear.
When adding the app, give the necessary permissions and press confirm.

## How to build, run and install the app locally

```
npm install
npm run dev
```

Open the Chromium browser in Alt1 and go to http://localhost:5173/alt1-rotations/.
An "Add App" button should appear.
When adding the app, give the necessary permissions and press confirm.

### Adding ability icons

1. Get a `.png` image from https://runescape.wiki/ (preferably 30px x 30px)
2. Copy it into `./src/assets/abilities`
3. Run `npm run generate-abilities`
4. Make a pull request with the changes
