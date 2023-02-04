// set the letters to choose from
// const letters = "abcdefghijklmnopqrstuvwxyz";
const letters = "ابتثجحخدذرزسشصضطعغفقكلمنهويئةء";
let lettersContainer = document.querySelector(".letters");

// let lettersArray = letters.split("")
let lettersArray = Array.from(letters);
//generate letters span
lettersArray.forEach((letter) => {
  // create span
  let span = document.createElement("span");
  span.appendChild(document.createTextNode(letter));
  span.className = "letter-box";
  //add span to container
  lettersContainer.appendChild(span);
});

//####################################################
//using fetching a json file
//####################################################

// fetching the file and run game function
let test = fetch("words.json")
  .then((result) => {
    let myData = result.json();
    return myData;
  })
  .then((data) => {
    let jWords = data[0];
    //rung game function
    game(jWords);
  });

//##############################################################
// creating the game function

function game(jWord) {
  // get the keys in array
  let allKeys = Object.keys(jWord);
  let randomNumber = Math.floor(Math.random() * allKeys.length);

  //get random category
  let randomCategory = allKeys[randomNumber];
  //get random word
  let randomWord =
    jWord[randomCategory][
      Math.floor(Math.random() * jWord[randomCategory].length)
    ];

  console.log(`${randomCategory}: ${randomWord}`);
  // put the category into page
  document.querySelector(".from").innerHTML = randomCategory;

  // select letters guess container
  let lettersGuessContainer = document.querySelector(".letter-guess");

  // convert the random word to array
  let lettersAndSpace = Array.from(randomWord);

  // create spans depend on word
  lettersAndSpace.forEach((letter) => {
    //create spans
    let wordSpan = document.createElement("span");
    // wordSpan.appendChild(document.createTextNode(letter));
    if (letter == " ") {
      wordSpan.className = "space";
    }
    lettersGuessContainer.append(wordSpan);
  });

  // set wrong attempts
  let wrongAttempt = 0;

  //get the draw
  let hangmanDraw = document.querySelector(".hangman-draw");

  //handling clicking
  document.addEventListener("click", (e) => {
    let theStatus = false;
    if (e.target.className == "letter-box") {
      e.target.classList.add("clicked");

      // get clicked letter
      let clickedLetter = e.target.innerHTML;

      //looping on the random word to check
      lettersAndSpace.forEach((wordLetter, index) => {
        //if the clicked letter is correct
        if (clickedLetter === wordLetter.toLowerCase()) {
          lettersGuessContainer.children[index].innerHTML = clickedLetter;
          theStatus = true;
        }
      });
      // outside loop
      //if the letter is wrong
      if (theStatus !== true) {
        // increase the wrong const
        wrongAttempt++;
        if (wrongAttempt === 7) {
          lettersContainer.classList.add("finished");
          endGame();
        }
        // add classes to the draw
        hangmanDraw.classList.add(`wrong-${wrongAttempt}`);
      }
    }

    let guessedWordarray = [];
    let finishedWord = "";
    for (let i = 0; i < lettersGuessContainer.children.length; i++) {
      guessedWordarray.push(lettersGuessContainer.children[i].innerHTML || " ");
      finishedWord = guessedWordarray.join("");
    }
    if (finishedWord === randomWord.toLowerCase()) {
      winGame();
    }
  });
}

//##############################################################
// lossing function
function endGame(randomWord) {
  // create div
  let div = document.createElement("div");
  div.appendChild(
    // document.createTextNode(
    //   `Game Over, The Word Is " ${randomWord.toUpperCase()} "`
    // )
    document.createTextNode(
      `للأسف لقد خسرت والكلمة كانت "${randomWord}" حاول مجددا`
    )
  );
  // add class on div
  div.className = "pop";

  document.body.appendChild(div);
  document.querySelector(".container").style.opacity = 0.1;
  document.querySelector(".container").onclick = () => {
    window.location.reload();
  };
}
//##############################################################
// winning function
function winGame(randomWord, wrongAttempt) {
  // create div
  let div = document.createElement("div");
  div.appendChild(
    // document.createTextNode(`congratulations, The Word Is \n "${randomWord.toUpperCase()}"
    document.createTextNode(
      `مبروك لقد ربحت والكلمة هي "${randomWord}" ولديك "${wrongAttempt}" محاولة خاطئة`
    )
  );
  // add class on div
  div.className = "pop";
  document.body.appendChild(div);
  lettersContainer.classList.add("finished");
  document.querySelector(".container").style.opacity = 0.2;
  document.querySelector(".container").onclick = () => {
    window.location.reload();
  };
}
//##############################################################

//##############################################################
//using inline object
//##############################################################
//get random word
// const words = {
//   " أسم من العائلة": [
//     "حسام الدين",
//     "حمزة",
//     "حسناء",
//     "وفاء",
//     "حمدي",
//     "نورهان",
//     "جودي",
//   ],
//   "لغة برمجة": ["بايثون", "جافا سكريبت", "جافا", "مات لاب"],
//   "اسم فيلم": [
//     "الفيل الازرق",
//     "بحبك",
//     "البس عشان خارجين",
//     "كتكوت",
//     "اللمبي",
//     "البدلة",
//     "بنك الحظ",
//     "عمر وسلمي",
//     "الجزيرة",
//   ],
//   "بلد عربي": [
//     "الجزائر",
//     "البحرين",
//     "مصر",
//     "العراق",
//     "الاردن",
//     "الكويت",
//     "لبنان",
//     "المغرب",
//     "المملكة العربية السعودية",
//     "سوريا",
//     "الامارات العربية المتحدة",
//   ],
// };

// let allKeys = Object.keys(words);
// let randomNumber = Math.floor(Math.random() * allKeys.length);

// //random category
// let randomCategory = allKeys[randomNumber];
// //random word
// let randomWord =
//   words[randomCategory][
//     Math.floor(Math.random() * words[randomCategory].length)
//   ];

// console.log(`${randomCategory}: ${randomWord}`);
// // put the category into page
// document.querySelector(".from").innerHTML = randomCategory;

// // select letters guess container
// let lettersGuessContainer = document.querySelector(".letter-guess");

// // convert the random word to array
// let lettersAndSpace = Array.from(randomWord);

// // create spans depend on word
// lettersAndSpace.forEach((letter) => {
//   //create spans
//   let wordSpan = document.createElement("span");
//   // wordSpan.appendChild(document.createTextNode(letter));
//   if (letter == " ") {
//     wordSpan.className = "space";
//   }
//   lettersGuessContainer.append(wordSpan);
// });

// // set wrong attempts
// let wrongAttempt = 0;

// //get the draw

// let hangmanDraw = document.querySelector(".hangman-draw");
// let guessedWord = document.querySelectorAll(".letter-guess span");

// //handling clicking
// document.addEventListener("click", (e) => {
//   let theStatus = false;
//   if (e.target.className == "letter-box") {
//     e.target.classList.add("clicked");

//     // get clicked letter
//     let clickedLetter = e.target.innerHTML;

//     //
//     lettersAndSpace.forEach((wordLetter, index) => {
//       //if the clicked letter is correct
//       if (clickedLetter === wordLetter.toLowerCase()) {
//         lettersGuessContainer.children[index].innerHTML = clickedLetter;
//         theStatus = true;
//       }
//     });
//     // outside loop
//     //if the letter is wrong
//     if (theStatus !== true) {
//       // increase the wrong const
//       wrongAttempt++;
//       if (wrongAttempt === 7) {
//         lettersContainer.classList.add("finished");
//         endGame();
//       }
//       // add classes to the draw
//       hangmanDraw.classList.add(`wrong-${wrongAttempt}`);
//     }
//   }

//   let guessedWordarray = [];
//   let finishedWord = "";
//   for (let i = 0; i < lettersGuessContainer.children.length; i++) {
//     guessedWordarray.push(lettersGuessContainer.children[i].innerHTML || " ");
//     finishedWord = guessedWordarray.join("");
//   }
//   if (finishedWord === randomWord.toLowerCase()) {
//     winGame();
//   }
// });
