// Select the login button, login form, exit logo, and list button elements
const loginButton = document.getElementById(`login-button`);
const loginForm = document.getElementById(`login-form`);
const exitLogo = document.getElementById(`exit-icon`);
const listButton = document.getElementById(`list-button`);

// Event listener for the login button
loginButton.addEventListener(`click`, () => {
  // Show the login form with a smooth transition
  loginForm.style.display = `grid`; // Show the form
  // loginForm.style.opacity = 1; // Start with opacity 0
  loginForm.style.transition = `opacity 0.5s ease-in-out`; // Set transition effect
  setTimeout(() => { // Delay the opacity change
    loginForm.style.opacity = 1; // Set opacity to 1 after the delay
  }, 10); // 10 milliseconds delay
});

// Event listener for the exit logo button
exitLogo.addEventListener(`click`, () => {
  // Hide the login form with a smooth transition
  loginForm.style.opacity = 1; // Start with opacity 1
  loginForm.style.transition = `opacity 0.5s ease-in-out`; // Set transition effect
  setTimeout(() => { // Delay the opacity change
    loginForm.style.opacity = 0; // Set opacity to 0 after the delay
    loginForm.style.display = `none`; // Hide the form after the delay
  }, 10); // 10 milliseconds delay
});

// Event listener for the members list button
listButton.addEventListener(`click`, () => {
  // Redirect to the list.html page
  window.location.href = 'list.html';
});

// console.dir(document);