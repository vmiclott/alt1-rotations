# Alt1 ability rotations

## Installation

Open the Chromium browser in Alt1 and go to https://vmiclott.github.io/alt1-rotations/.
An "Add App" button should appear.
When adding the app, give the necessary permissions and press confirm.

## Ability rotation example

```
[
  { "name": "smokeCloud", "tick": 0, "keybind": "\\" },
  { "name": "deathSkulls", "tick": 0, "keybind": "d" },
  { "name": "soulSap", "tick": 3, "keybind": "r" },
  { "name": "touchOfDeath", "tick": 6, "keybind": "w" },
  { "name": "necromancy", "tick": 9, "keybind": "q" },
  { "name": "soulSap", "tick": 12, "keybind": "r" },
  { "name": "livingDeath", "tick": 15, "keybind": "f" },
  { "name": "touchOfDeath", "tick": 18, "keybind": "w" },
  { "name": "deathSkulls", "tick": 21, "keybind": "d" },
  { "name": "fingerOfDeath", "tick": 24, "keybind": "e" },
  { "name": "necromancy", "tick": 27, "keybind": "q" },
  { "name": "necromancy", "tick": 30, "keybind": "q" },
  { "name": "necromancy", "tick": 33, "keybind": "q" },
  { "name": "fingerOfDeath", "tick": 36, "keybind": "e" },
  { "name": "necromancy", "tick": 39, "keybind": "q" },
  { "name": "deathSkulls", "tick": 42, "keybind": "d" },
  { "name": "touchOfDeath", "tick": 45, "keybind": "w" },
  { "name": "necromancy", "tick": 48, "keybind": "q" },
  { "name": "necromancy", "tick": 51, "keybind": "q" },
  { "name": "fingerOfDeath", "tick": 54, "keybind": "e" },
  { "name": "fingerOfDeath", "tick": 57, "keybind": "e" },
  { "name": "necromancy", "tick": 60, "keybind": "q" },
  { "name": "lifeTransfer", "tick": 63, "keybind": "3" },
  { "name": "soulSap", "tick": 66, "keybind": "r" },
  { "name": "deathSkulls", "tick": 69, "keybind": "d" },
  { "name": "reflect", "tick": 72, "keybind": "6" },
  { "name": "volleyOfSouls", "tick": 75, "keybind": "a" },
  { "name": "touchOfDeath", "tick": 78, "keybind": "w" },
  { "name": "weaponSpecialAttack", "tick": 81, "keybind": "F4" }
]
```

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
