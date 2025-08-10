// firebase configurations
// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-analytics.js";
//   adding firestore 
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDMVTwr45d0xPK5He6pv1bibApte1flpds",
  authDomain: "christian-club-online.firebaseapp.com",
  projectId: "christian-club-online",
  storageBucket: "christian-club-online.appspot.com",
  messagingSenderId: "599223982319",
  appId: "1:599223982319:web:2aa246d44bae1ddc6ca31a",
  measurementId: "G-PSCB7CHW3N"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app);

//INDEX-PAGE JAVASCRIPT
//importing neccessary functions
import { authenUser } from "./import_func.js";
// seclecting necessary elements
const loginBtn = document.getElementById(`button2`);
const userName = document.getElementById("Username");
const userPassword = document.getElementById("password");
const addMemSubBtn = document.getElementById(`mem-sub-button`);
const name = document.getElementById(`name`);
const role = document.getElementById(`role`);
const studyProgramme = document.getElementById(`studyProgramme`);
const level = document.getElementById(`level`);
const contact = document.getElementById(`contact`);

// Select the login button, login form, exit logo, and list button elements
const loginButton = document.getElementById(`login-button-index`);
const loginForm = document.getElementById(`login-form`);
const addmemButton = document.getElementById(`addmem-button`);
const addmemForm = document.getElementById(`addmem-form`);
// Get unique IDs for each exit logo
const exitLoginIcon = document.getElementById(`exit-login-icon`);
const exitAddMemIcon = document.getElementById(`exit-addmem-icon`);
const listButton = document.getElementById(`list-button`);



// Event listener for the login button
if (loginButton) {
  loginButton.addEventListener(`click`, () => {
    // Show the login form with a smooth transition
    loginForm.style.display = `grid`; // Show the form
    loginForm.style.transition = `opacity 0.5s ease-in-out`; // Set transition effect
    setTimeout(() => { // Delay the opacity change
      loginForm.style.opacity = 1; // Set opacity to 1 after the delay
    }, 10); // 10 milliseconds delay
  });
}

// Event listener for the addmem button
if (addmemButton) {
  addmemButton.addEventListener(`click`, async () => {
    // getting authData from localStorage
    const userDataCol = JSON.parse(localStorage.getItem("listData"))
    if (userDataCol !== null && await authenUser(userDataCol.firstVal, userDataCol.secondVal)) {
      // the form for the membership form can now be shown
      // Show the addMem form with a smooth transition
      addmemForm.style.display = `grid`; // Show the form
      addmemForm.style.transition = `opacity 0.5s ease-in-out`; // Set transition effect
      setTimeout(() => { // Delay the opacity change
        addmemForm.style.opacity = 1; // Set opacity to 1 after the delay
      }, 10); // 10 milliseconds delay
    } else {
      alert("Please Log in first");
      window.location.href = `index.html`;
    }
  });
}

// Event listener for the exit logo button for login form
if (exitLoginIcon) {
  exitLoginIcon.addEventListener(`click`, () => {
    // Hide the login form with a smooth transition
    // loginForm.style.opacity = 1; // Start with opacity 1
    loginForm.style.transition = `opacity 0.5s ease-in-out`; // Set transition effect
    setTimeout(() => { // Delay the opacity change
      loginForm.style.opacity = 0; // Set opacity to 0 after the delay
      loginForm.style.display = `none`; // Hide the form after the delays
    }, 10); // 10 milliseconds delay
  });
}

// Event listener for the exit logo button for add member form
if (exitAddMemIcon) {
  exitAddMemIcon.addEventListener(`click`, () => {
    // Hide the add member form with a smooth transition
    addmemForm.style.opacity = 1; // Start with opacity 1
    addmemForm.style.transition = `opacity 0.5s ease-in-out`; // Set transition effect
    setTimeout(() => { // Delay the opacity change
      addmemForm.style.opacity = 0; // Set opacity to 0 after the delay
      addmemForm.style.display = `none`; // Hide the form after the delays
    }, 10); // 10 milliseconds delay
  });
}

// Event listener for the members list button
if (listButton) {
  listButton.addEventListener(`click`, async () => {
    // getting authData from localStorage
    const userDataCol = JSON.parse(localStorage.getItem("listData"))
    if (userDataCol !== null && await authenUser(userDataCol.firstVal, userDataCol.secondVal)) {
      // Redirect to the list.html page
      window.location.href = 'list.html';
    } else {
      alert("Please Log in first");
    }
  });
}

// adding a member to the database
if (addMemSubBtn) {
  addMemSubBtn.addEventListener('click', async (e) => {
    // making sure empty fields are not submited to the database
    e.preventDefault();
    // getting the input field values all in one object
    const memberData = {
      name: name.value,
      role: role.value,
      course: studyProgramme.value,
      level: level.value,
      contact: contact.value,
      attendance: []
    }

    try {
      // Creating a collection of members and adding each member details as a document
      const docRef = await addDoc(collection(db, "members"), memberData)
      alert(`${memberData.name} Added successfully`);
    } catch (error) {
      alert(JSON.stringify(error));
    }
    // console.log(name.value)
    // alert(JSON.stringify(name.value));
  })
}

// logging into the system
if (loginBtn) {
  loginBtn.addEventListener(`click`, async () => {

    // getting the form field values
    const firstVal = userName.value;
    const secondVal = userPassword.value;

    if (await authenUser(firstVal, secondVal)) {
      // if it passes the authentication, then the list page will load
      window.location.href = 'list.html';
      // keeping the data into localStorage
      const data = { firstVal, secondVal };
      localStorage.setItem(`listData`, JSON.stringify(data));

      loginForm.style.opacity = 0;
      loginForm.style.display = `none`;
    } else {
      alert("Please Enter valid authentication details");
    }
  });
}
