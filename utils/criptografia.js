
class Criptografia {

    getInvertedLetterFromAlphabetForLetter(letter, letterToChange) {
         
        const abc = 'abcdefghijklmnopqrstuvwxyz0123456789=ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        const posLetter = abc.indexOf( letter );
        
        if (posLetter == -1) {
         console.log('Password letter ' + letter + ' not allowed.');
         return null;
        }
        const part1 = abc.substring(posLetter, abc.length);
        const part2 = abc.substring(0, posLetter);
        
        const newABC = '' + part1 + '' + part2; 
        
        const posLetterToChange = newABC.indexOf( letterToChange );
        
        if (posLetterToChange == -1) {
         console.log('Password letter ' + letter + ' not allowed.');
         return null;
        }
        
        const letterAccordingToAbc = abc.split('')[ posLetterToChange ];
        
        return letterAccordingToAbc; 
     }
 
     getLetterFromAlphabetForLetter(letter, letterToChange) {
         // this is the alphabet we know, plus numbers and the = sign 
         const abc = 'abcdefghijklmnopqrstuvwxyz0123456789=ABCDEFGHIJKLMNOPQRSTUVWXYZ';
          
         // get the position of the given letter, according to our abc
         const posLetter = abc.indexOf( letter );
         
         // if we cannot get it, then we can't continue
         if (posLetter == -1) {
          console.log('Password letter ' + letter + ' not allowed.');
          return null;
         }
         // according to our abc, get the position of the letter to encrypt
         const posLetterToChange = abc.indexOf( letterToChange );
         
         // again, if any error, we cannot continue...
         if (posLetterToChange == -1) {
          console.log('Password letter ' + letter + ' not allowed.');
          return null;
         }
         
         // let's build the new abc. this is the important part
         const part1 = abc.substring(posLetter, abc.length);
         const part2 = abc.substring(0, posLetter);
         const newABC = '' + part1 + '' + part2;
         
         // we get the encrypted letter
         const letterAccordingToAbc = newABC.split('')[ posLetterToChange ];
         
         // and return to the routine...
         return letterAccordingToAbc; 
     }
 
     criptografa(text) {
  
         return text
     }
 
     descriptografa(text) {
  
         return text;
     }
}

module.exports = Criptografia;