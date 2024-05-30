// Select the login button, login form, exit logo, and list button elements
const loginButton = document.getElementById(`login-button`);
const loginForm = document.getElementById(`login-form`);
const exitLogo = document.getElementById(`exit-icon`);
const listButton = document.getElementById(`list-button`);
// selecting login button, the first and second input to check for authentication and also 
// the addMenber btn on the main page
const loginBtn = document.getElementById(`form_log_in`);
const firstInput = document.getElementById("firstInput");
const secondInput = document.getElementById("secondInput");
const addMember = document.getElementById(`addMember`);

// creating a function for authentication
function authenUser(firstVal, secondVal)
{
  
  first = `frema@sec.lug.club`;
  second = `logMeIntoIt`;

  if (firstVal === first && secondVal === second)
    return true
  else
    return false
}

// Event listener for the login button
loginButton.addEventListener(`click`, () => {
  // Show the login form with a smooth transition
  loginForm.style.display = `grid`; // Show the form
  // loginForm.style.opacity = 0; // Start with opacity 0
  loginForm.style.transition = `opacity 0.5s ease-in-out`; // Set transition effect
  setTimeout(() => { // Delay the opacity change
    loginForm.style.opacity = 1; // Set opacity to 1 after the delay
  }, 10); // 10 milliseconds delay

  
});

// Event listener for the exit logo button
exitLogo.addEventListener(`click`, () => {
  // Hide the login form with a smooth transition
  // loginForm.style.opacity = 1; // Start with opacity 1
  loginForm.style.transition = `opacity 0.5s ease-in-out`; // Set transition effect
  setTimeout(() => { // Delay the opacity change
    loginForm.style.opacity = 0; // Set opacity to 0 after the delay
    loginForm.style.display = `none`; // Hide the form after the delay
  }, 10); // 10 milliseconds delay
});

// Event listener for the members list button
listButton.addEventListener(`click`, () => {
  // getting authData from localStorage
  userDataCol = JSON.parse(localStorage.getItem("listData"))
  if (userDataCol !== null && authenUser(userDataCol.firstVal, userDataCol.secondVal)){
    // Redirect to the list.html page
    window.location.href = 'list.html';
  }else{
    alert("PLease Log in first");
  }
});

// addding event listener to be able to validate user input when submit is clicked
loginBtn.addEventListener(`click`, ()=>{

  // getting the form field values
  firstVal = firstInput.value;
  secondVal = secondInput.value;
  
  if (authenUser(firstVal, secondVal)){
    // if it passes the authentication, then the list page will load
    window.location.href = 'list.html';
    // keeping the data into localStorage
    const data = {firstVal, secondVal};
    localStorage.setItem(`listData`, JSON.stringify(data));

    loginForm.style.opacity = 0; 
    loginForm.style.display = `none`; 
  }else{
    alert("Please Enter a valid authenticationn details");
  }
})
// adding eventlistener to be able to authenticate user before a member is added
addMember.addEventListener(`click`, ()=>{
    // getting authData from localStorage
  userDataCol = JSON.parse(localStorage.getItem("listData"))
  if (userDataCol !== null && authenUser(userDataCol.firstVal, userDataCol.secondVal)){
    // the form for the membership form can now be shown
    console.log("write code here")
  }else{
    alert("PLease Log in first");
    window.location.href = `index.html`;
  }
})