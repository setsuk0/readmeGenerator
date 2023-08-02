const inquirer = require("inquirer");
const fs = require("fs");
const util = require("util");
const writeFileAsync = util.promisify(fs.writeFile);

const questions = [
  {
    type: "input",
    name: "description",
    message: "What was your motivation for this project",
  },

  {
    type: "input",
    name: "purpose",
    message: "Why did you build this project?",
  },

  {
    type: "input",
    name: "problemSolving",
    message: "What problem does this project solve?",
  },

  {
    type: "input",
    name: "instructions",
    message: "How does this project work?",
  },

  {
    type: "list",
    name: "license",
    message: "Which license do you want to use?",
    choices: [
      "MIT License",
      "GNU GPLv3",
      "Apache License 2.0",
      "BSD 3-Clause License",],
  },
];

inquirer.prompt(questions).then((answers) => {
  writeFileAsync("README.md", generateREADME(answers)).then(() =>
    console.log("README.md generated successfully!")
  );
});

const generateREADME = (answers) => {
  return `
  # ${answers.title}
  
  ${licenseBadge(answers.license)}
  
  ## Table of Contents
  - [Description](#description)
  - [Purpose](#purpose)
  - [Problem Solving](#problemSolving)
  - [License](#license)
  
  ## Description
  
  ${answers.description}
  
  ## Purpose
  
  ${answers.purpose}
  
  ## Problem-Solving
  
  ${answers.problemSolving}
  
  ## License
  
  This project features the following license: ${answers.license}.
} 
}`;

const licenseBadge = (license) => {
  switch (license) {
    case "MIT License":
      return "[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)";
    case "GNU GPLv3":
      return "[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)";
    default:
      return "";
  }
}
};
