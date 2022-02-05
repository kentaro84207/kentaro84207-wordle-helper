const dict = require("./dict");

function readUserInput(question) {
  const readline = require("readline").createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  return new Promise((resolve, reject) => {
    readline.question(question, (answer) => {
      resolve(answer);
      readline.close();
    });
  });
}

(async function main() {
  let result = [...dict];
  const ans = await readUserInput("current answer: ");
  [...ans].forEach((s, i) => {
    if (/^[A-Z]+$/.test(s)) {
      result = result.filter((word) => {
        return word.charAt(i) === s.toLowerCase();
      });
    } else if (/^[a-z]+$/.test(s)) {
      result = result.filter((word) => {
        return word.indexOf(s) !== -1 && word.charAt(i) !== s;
      });
    }
  });
  console.log(result);
  const exclusion = await readUserInput("exclusion: ");
  [...exclusion].forEach((s) => {
    result = result.filter((word) => {
      return word.indexOf(s) === -1;
    });
  });
  console.log(result);
})();
