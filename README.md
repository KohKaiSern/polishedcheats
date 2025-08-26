# Polished Cheats

Polished Cheats is a GameShark cheat code auto-generator for the Pokémon Polished Crystal ROM Hack by Sylvie. It scrapes .sym and .asm files in order to provide customizable cheat codes.

## Features

- Generate any item
- Encounter any Pokémon
- Change DVs and EVs of a Pokémon
- Includes a Hidden Power Type calculator
- Change Abilities, Nature and Shininess of a Pokémon
- Change Gender, Moveset and Happiness of a Pokémon
- Modify the amount of money of the Player

## Tech Stack

- Vue.js (Frontend)
- Express.js (Backend API)
- Tailwind CSS v4 (Utility-First Styling)
- PrimeVue (Accessible Components)

## Project Structure

### `backend/api/`

This folder contains the file scrapers that generate formatted data based on Pokémon Polished Crystal ROM files. Each file focuses on a specific type of data extraction.

`getAddresses.js`
- Extracts memory addresses from .sym files
- Uses pre-defined symbols to choose the desired memory addresses

`getItems.js`
- Extracts items and their item types (balls, medicines, etc.)

`getMoves.js`
- Extracts movelist

`getNames.js`
- Extracts Pokémon names

`index.js`
- The server for the API. Supports the following endpoints:
    - /api/addresses
    - /api/items
    - /api/moves
    - /api/names

## License

This project is licensed under the MIT License.

## Acknowledgements

- Pokémon Polished Crystal by Sylvie (and contributors)
- LamLamLam for setting the technical groundwork in data extraction
- Jaidenlyons for finding most of the pre-defined symbols.
- PrimeVue, Vue.js, Express.js, Tailwind CSS