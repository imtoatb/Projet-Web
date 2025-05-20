// Function to generate random non-letter ASCII characters
function getRandomAsciiChar() {
  const asciiRange = [33, 47, 58, 64, 91, 96, 123, 126]; // ranges of non-letter ASCII characters
  const range = asciiRange[Math.floor(Math.random() * asciiRange.length)];
  return String.fromCharCode(range + Math.floor(Math.random() * 15)); // Generates a random ASCII char in the range
}

// Scramble and unscramble function
function scrambleText(element, originalText, interval) {
  let currentText = originalText.split('');
  
  // Scramble the text progressively from left to right
  let scrambleIndex = 0;
  let scrambleInterval = setInterval(() => {
    if (scrambleIndex < originalText.length) {
      currentText[scrambleIndex] = getRandomAsciiChar(); // Replace the character with a random ASCII char
      element.innerText = currentText.join(''); // Update the displayed text
      scrambleIndex++;
    } else {
      clearInterval(scrambleInterval);
      // Once scrambling is done, start unscrambling after a small delay
      setTimeout(() => {
        unscrambleText(element, originalText, 100);
      }, 500); // Delay before starting to unscramble
    }
  }, 100); // Scramble every 100ms

  // Reset to scrambled text after the specified interval (5 seconds)
  setTimeout(() => {
    scrambleIndex = 0;
    currentText = originalText.split('').map(() => getRandomAsciiChar());
    element.innerText = currentText.join('');
    scrambleText(element, originalText, interval); // Start the process again
  }, interval);
}

// Unscramble function to gradually unscramble from left to right
function unscrambleText(element, originalText, interval) {
  let currentText = element.innerText.split('');
  let unscrambleIndex = 0;

  // Gradually unscramble the text one character at a time from left to right
  let unscrambleInterval = setInterval(() => {
    if (unscrambleIndex < originalText.length) {
      currentText[unscrambleIndex] = originalText[unscrambleIndex]; // Replace with original text one char at a time
      element.innerText = currentText.join(''); // Update the displayed text
      unscrambleIndex++;
    } else {
      clearInterval(unscrambleInterval); // Stop once fully unscrambled
    }
  }, interval); // Adjust speed of unscrambling by changing this interval (100ms for smoother effect)
}

// Start scrambling on the element
document.addEventListener('DOMContentLoaded', () => {
  const textElement = document.getElementById('scrambled-word');
  const originalText = textElement.innerText;
  
  scrambleText(textElement, originalText, 5000); // Scramble every 5 seconds
});
