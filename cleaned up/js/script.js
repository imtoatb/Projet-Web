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



// HTML for the library fetching the json book data
document.addEventListener("DOMContentLoaded", function () {
  fetch('books.json')
    .then(response => response.json())
    .then(data => {
      const grid = document.getElementById("libraryGrid");
      const searchParams = new URLSearchParams(window.location.search);
      const category = searchParams.get("category");
      const country = searchParams.get("country");

      const filterInfo = document.getElementById("filterInfo");

      let message = "";

      if (category) {
        message += `Showing books in category: <strong>${category}</strong><br>`;
      }
      if (country) {
        message += `Showing books banned in <strong>${country}</strong><br>`;
      }

      if (message) {
        message += `<a href="library.html" style="color: #ccc; text-decoration: underline; font-size: 0.9rem;">← Go back to all books</a>`;
        filterInfo.innerHTML = message;
      }
      const defaultCategory = searchParams.get("category")?.toLowerCase() || "";
      const defaultCountry = searchParams.get("country")?.toLowerCase() || "";
      

      // Store references to rendered books
      const bookElements = [];

      // Render all books
      data.forEach(book => {
        const bookDiv = document.createElement("div");
        bookDiv.className = "book-item";
        bookDiv.dataset.category = book.category;
        bookDiv.innerHTML = `
          <a href="book.html?title=${encodeURIComponent(book.title)}" class="book-link">
            <img src="${book.image}" alt="Book cover" />
            <h3>${book.title}</h3>
            <p>Category: ${book.category}</p>
            <p>Country: ${book.country}</p>
            <p>Author: ${book.author}</p>
          </a>
        `;
        grid.appendChild(bookDiv);
        bookElements.push({
          element: bookDiv,
          title: book.title.toLowerCase(),
          category: book.category.toLowerCase(),
          country: book.country.toLowerCase()
        });

        document.getElementById("category-filter").value = defaultCategory;
        document.getElementById("country-filter").value = defaultCountry;
      });

      // Function to apply combined filters
      function applyFilters() {
        const searchTerm = document.getElementById("search-input").value.toLowerCase();
        const selectedCategory = document.getElementById("category-filter").value.toLowerCase() || defaultCategory;
        const selectedCountry = document.getElementById("country-filter").value.toLowerCase() || defaultCountry;

        bookElements.forEach(({ element, title, category, country }) => {
          const matchesCategory = !selectedCategory || category.includes(selectedCategory);
          const matchesSearch = !searchTerm || title.includes(searchTerm);
          const matchesCountry = !selectedCountry || country.includes(selectedCountry);
          element.style.display = matchesCategory && matchesSearch && matchesCountry ? "block" : "none";
        });
        }

      // Initial filtering by URL category (and empty search)
      applyFilters();

      // Enable live search
        document.getElementById("search-input").addEventListener("input", applyFilters);
        document.getElementById("category-filter").addEventListener("change", applyFilters);
        document.getElementById("country-filter").addEventListener("change", applyFilters);
    })
    .catch(error => console.error("Error loading books.json:", error));
});
