# Terminal Football Game [Germany Edition]

## Overview

This repository contains a terminal-based football quiz game where you have to guess the players of a selected German national team based on their jersey numbers. The game allows you to choose between European Championship (EM) and World Cup (WM) teams.

## Installation

1. Clone this repository:
   ```bash
   git clone https://github.com/yourUsername/terminal-football-game.git
   cd terminal-football-game
   ```
2. Install the necessary dependencies:
   ```bash
   yarn
   ```

## Usage

Start the game with the following command:

```bash
node game.js
```

## Game Rules

1. First, choose between an EM or WM team.
2. Enter the year of the desired German national team.
   - For EM: Teams between 1992 and 2020
   - For WM: Teams between 1990 and 2022
3. Choose the jersey number of a player from the selected team.
4. Guess the name of the player based on the jersey number.

## Example

```bash
Choose between EM and WM
> em
Choose a German EM team between 1992 and 2020!
> 2016
Which player's jersey number do you want to guess?
> 10
What is the name of the player?
> Mesut Özil
Correct!
-----------NEW GAME----------
```

## Structure

- `game.js`: Main game file.
- `wm-teams.json`: Contains data of the German World Cup teams.
- `em-teams.json`: Contains data of the German European Championship teams.

## Functions

### `trimToLowerCase(string)`

Trims and converts a string to lowercase.

### `YearExtraction(teams)`

Extracts the years from the team data.

### `numberCheck(userInput, selectedTeam, teams)`

Checks if the entered jersey number is valid.

### `nameCheck(userInput, userNumber, teams, selectedTeam)`

Checks if the entered player name and jersey number match.

### `chat()`

Starts the interaction with the user and controls the game flow.

## Exiting

Type `exit` during the game to quit.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
