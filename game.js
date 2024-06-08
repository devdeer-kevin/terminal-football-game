import readline from "node:readline";
import { readFile } from "fs/promises";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const trimToLowerCase = (string) => {
  return string.trim().toLowerCase();
};

const wmTeams = JSON.parse(
  await readFile(new URL("./wm-teams.json", import.meta.url)),
);
const emTeams = JSON.parse(
  await readFile(new URL("./em-teams.json", import.meta.url)),
);

function YearExtraction(teams) {
  const yearsArray = [];
  for (const team in teams) {
    yearsArray.push(team);
  }
  return yearsArray;
}

const globalWMTeamsArray = YearExtraction(wmTeams);
const globalEMTeamsArray = YearExtraction(emTeams);

const numberCheck = (userInput, selectedTeam, teams) => {
  if (isNaN(userInput)) {
    console.log("Bitte eine Zahl eingeben.");
    return false;
  }
  if (userInput <= 0 || userInput > teams[selectedTeam].length) {
    console.log(
      "Die Zahl muss größer als 0 und kleiner gleich " +
        teams[selectedTeam].length +
        " sein",
    );
    return false;
  }
  return true;
};

const nameCheck = (userInput, userNumber, teams, selectedTeam) => {
  if (!isNaN(userInput)) {
    console.log("Bitte einen Namen eingeben.");
    return false;
  }

  const correctMatch = teams[selectedTeam].find(
    (player) =>
      trimToLowerCase(player.name) == userInput.toString().toLowerCase() &&
      player.number == userNumber,
  );
  if (correctMatch === undefined) {
    return false;
  } else {
    return true;
  }
};

const chat = () => {
  const contestSelection = () => {
    rl.question("Wähle zwischen EM und WM\n", async (selectedContest) => {
      trimToLowerCase(selectedContest) === "em" ||
      trimToLowerCase(selectedContest) === "wm"
        ? teamSelection(selectedContest)
        : contestSelection();
    });
  };
  const teamSelection = (selectedContest) => {
    if (selectedContest === "em") {
      rl.question(
        "Wähle ein deutsches EM-Team zwischen 1992 und 2020!\n",
        async (selectedTeam) => {
          globalEMTeamsArray.find((team) => team === selectedTeam)
            ? numberSelection(selectedTeam, selectedContest)
            : teamSelection(selectedContest);
        },
      );
    }
    if (selectedContest === "wm") {
      rl.question(
        "Wähle ein deutsches WM-Team zwischen 1990 und 2022!\n",
        async (selectedTeam) => {
          globalWMTeamsArray.find((team) => team === selectedTeam)
            ? numberSelection(selectedTeam, selectedContest)
            : teamSelection(selectedContest);
        },
      );
    }
  };
  const numberSelection = (selectedTeam, selectedContest) => {
    rl.question(
      "Den Spieler mit welcher Trikotnummer willst du erraten?\n",
      async (userNumber) => {
        if (userNumber === "exit") {
          rl.close();
          return;
        }
        const onSuccess = () => {
          playerName(userNumber, selectedTeam, selectedContest);
        };
        const onFailure = () => {
          numberSelection(selectedTeam, selectedContest);
        };
        if (selectedContest === "em") {
          const isCorrect = numberCheck(
            userNumber,
            selectedTeam,
            emTeams,
            selectedContest,
          );
          isCorrect ? onSuccess() : onFailure();
        }
        if (selectedContest === "wm") {
          const isCorrect = numberCheck(
            userNumber,
            selectedTeam,
            wmTeams,
            selectedContest,
          );
          isCorrect ? onSuccess() : onFailure();
        }
      },
    );
  };
  const playerName = (userNumber, selectedTeam, selectedContest) => {
    rl.question("Wie heißt der Spieler?\n", async (message) => {
      if (message === "exit") {
        rl.close();
        return;
      }
      const onSuccess = () => {
        console.log("Richtig!\n-----------NEUES SPIEL----------");
        chat();
      };
      const onFailure = () => {
        playerName(userNumber, selectedTeam, selectedContest);
      };
      if (selectedContest === "em") {
        const isCorrect = nameCheck(message, userNumber, emTeams, selectedTeam);
        isCorrect ? onSuccess() : onFailure();
      }
      if (selectedContest === "wm") {
        const isCorrect = nameCheck(message, userNumber, wmTeams, selectedTeam);
        isCorrect ? onSuccess() : onFailure();
      }
    });
  };
  contestSelection();
  teamSelection();
  numberSelection();
  playerName();
};
console.log(
  'Rate, welcher Spieler zu welcher Trikotnummer gehört. Gib "exit" ein, um zu beenden.',
);
chat();
