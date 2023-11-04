# reviewHub

Hoisted link: https://trishadas13.github.io/reviewCorner/

<h2>HTML code description:</h2>

✔ "nav": The navigation section contains a title "🎬 Review Hub 🎬" indicating that this is a hub for movie reviews. It also includes an input field with the placeholder "Search your movie here...." for users to search for movies.

✔ "div class="container"": This is the main content container for the web page.

✔ "div class="movieContainer"": Initially, it displays "Please Enter a search term." This is where movie listings or search results are likely to be displayed dynamically.

✔ "div class="paginationStore"": This section is intended to store pagination controls for navigating through multiple pages of movie listings.

✔ "div class="pagination"": Within the pagination store, this is where buttons for navigating between different pages of movie listings are likely to appear.

✔ "dialog class="mydialog": A dialog box, probably used for displaying additional information about a movie when a user clicks on a movie title or thumbnail. It has a container with the class "modal" where the modal content will be dynamically appended. This is typically used for displaying movie details, reviews, or related information.

<h2>CSS code description:</h2>

✔ Font Import: It imports two fonts from Google Fonts - "Acme" and "Cormorant."

✔ Universal Reset: The * selector is used to reset margins, paddings, and set the box-sizing to border-box to ensure consistent styling across elements.

✔ Body Styles: The body element is set to occupy the full width of the viewport and is centered both horizontally and vertically. The background is a linear gradient.

✔ Sticky Navigation Bar: The nav element is styled to be sticky at the top of the page. It has a background color, displays flexbox properties to center its content both horizontally and vertically, and uses the "Acme" font with letter-spacing and a font size of 32px.

✔ Input Styles: The input elements are styled to have a width of 50%, specific text color, font size, border-radius, padding, and box-shadow. They have a background color that changes on focus.

✔ Movie Containers: The .movieContainer class styles the grid that holds movie elements. The movies are displayed in a 4-column grid on larger screens. The font is "Acme" with a font size of 30px and font weight of 700.

✔ Movie Card Styles: The .movie class styles individual movie cards. They have a fixed width and height, a background color, a box shadow, and the overflow is hidden. Hovering over the movie image scales it up slightly.

✔ Modal Dialog Styles: The .mydialog class is used for the modal dialog. It's set to be hidden with zero opacity initially. When open, it becomes visible and has a background overlay.

✔ Modal Content Styles: The .modal class styles the modal content. It has a fixed height, background color, a maximum width of 600px, and a box shadow. Inside the modal, there's a .modalImg class for the movie image and details, and a .text class for text content.

✔ Button Styles: There are various buttons in the code, such as close buttons in the modal, review buttons, and a button in the pagination section. They have background color, border-radius, cursor, and other styles. On :active, they change color.

✔ Responsive Design: Media queries are used to adjust the layout for smaller screens. The number of columns in the movie grid decreases as the screen width reduces. The navigation font size is also adjusted for smaller screens.

<h2>JS code description:</h2>

✔ API Integration:

The code fetches data from the OMDB API (a movie database) to search for movies based on user input (the input field). The API key (apiKey) is used to access the data.

✔ Debouncing Search:

A debouncing function (debounce) is implemented to delay the API request while the user is typing in the search input. This helps reduce the number of unnecessary requests and improves the user experience.
Create and Display Movies:

The fetchAPI function sends a request to the OMDB API and processes the response to create an array of movie objects. These objects contain information such as movie titles, release years, and poster images.

✔ Pagination:

A simple pagination feature is implemented, allowing users to navigate through multiple pages of search results. Users can click "Previous" and "Next" buttons to move between pages.

✔ Show Movie Details (Dialog Box):

Users can click on a movie poster to view additional details in a dialog box. The dialog box displays the movie poster, title, and a review text area. Users can write reviews for the movie, and the review is saved in local storage.

✔ Close Dialog Box:

The dialog box can be closed by clicking the "Close" button.

✔ Local Storage:

User reviews for movies are saved in local storage, associated with the movie title. This allows reviews to persist even after refreshing the page.

✔ Event Listeners:

Event listeners are set up to handle user interactions, such as clicking movie posters, saving reviews, and navigating between pages.

✔ Pagination Handling:

The code manages and updates the current page number in the pagination area.

✔ Error Handling:

The code includes error handling to manage scenarios where there are too many search results, no results are found, or the user hasn't entered a search term.
Dark and Light Theme (Not Documented):
The code includes a "toggle" feature that presumably allows users to switch between dark and light themes. However, the exact behavior of this feature is not documented in the provided code.

<h2>Summary:</h2>

To use this code, you should ensure that your HTML includes the required elements (input, movieContainer, mydialog, etc.) and you have set up the necessary styling and HTML structure to support this functionality. Additionally, you must obtain an OMDB API key for accessing movie data.
