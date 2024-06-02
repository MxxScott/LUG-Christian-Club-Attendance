// firebase configurations
// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-analytics.js";
//   adding firestore 
import { getFirestore, collection, addDoc, getDocs } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js"
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
const db = getFirestore(app);

//importing neccessary functions
import { authenUser } from "./import_func.js";
// seclecting necessary elements
const loginBtn = document.getElementById(`button2`);
const userName = document.getElementById("Username");
const userPassword = document.getElementById("password");
const addMemSubBtn = document.getElementById(`mem-sub-butn`);
const name = document.getElementById(`name`);
const role = document.getElementById(`role`);
const studyProgramme = document.getElementById(`studyProgramme`);
const level = document.getElementById(`level`);
const contact = document.getElementById(`contact`);

const addmemButton = document.getElementById(`addmem-button`);
const addmemForm = document.getElementById(`addmem-form`);
const exitAddMemIcon = document.getElementById(`exit-addmem-icon`);

//LIST-PAGE JAVASCRIPT
// importing neccessary functions
import { createEle } from "./import_func.js";
// List Home Button Navigation
const HomeNav = document.getElementById(`home-button-list`);
// getting the table element
const listTable = document.getElementById(`our-list-table`);
// getting the attendance button
const attBtn = document.getElementById("sidebar_button");
HomeNav.addEventListener(`click`, () => {
  // Redirect to the index.html page
  window.location.href = `index.html`;
});

// Get the view buttons
const listViewButton = document.getElementById('list-view');
const gridViewButton = document.getElementById('grid-view');

let inactive = gridViewButton; // Use 'let' for reassigning variables
let active = listViewButton;
let inactivetemp;

// Add event listeners to BOTH buttons
listViewButton.addEventListener('mousedown', () => {
  listViewButton.classList.add('active');
});

listViewButton.addEventListener('mouseup', () => {
  gridViewButton.classList.remove('active');
  inactivetemp = inactive;
  inactive = active;
  active = inactivetemp;
});

gridViewButton.addEventListener('mousedown', () => {
  gridViewButton.classList.add('active');
});

gridViewButton.addEventListener('mouseup', () => {
  listViewButton.classList.remove('active');
  inactivetemp = inactive;
  inactive = active;
  active = inactivetemp;
});

// **************************************************************
// loading member list from database and previewing on the screen for users to see
let membersQuery;
let documents;
document.addEventListener(`DOMContentLoaded`, async () => {
  membersQuery = await getDocs(collection(db, "members"));
  documents = membersQuery.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  // creating elements for each member
  documents.forEach((mem) => {
    const trEle = createEle("tr", "first_row");
    listTable.append(trEle);
    const td1 = createEle("td", "col1");
    const td2 = createEle("td", "col2");
    const td3 = createEle("td", "col3");
    const td4 = createEle("td", "col4");
    const td5 = createEle("td", "col5");
    // adding innertext values
    td1.textContent = `${mem.name}`;
    td2.textContent = `${mem.course}`;
    td3.textContent = `${mem.role}`;
    td4.textContent = `${mem.contact}`;
    //the attendance is an object, so i am just printing the lenght of the object
    td5.textContent = `${Object.keys(mem.attendance).length}`;
    // appending to tr as children
    trEle.append(td1)
    trEle.append(td2)
    trEle.append(td3)
    trEle.append(td4)
    trEle.append(td5)

  })

})

// ************************************************
// creating the attendance form dynamically
attBtn.addEventListener(`click`, () => {
  // creating a form for making attendance when the attendance btn is clicked
  const mainDiv = document.getElementById("main_section");
  const attFormContainer = createEle("div", "att-form-container");
  if (attBtn.childNodes[3].textContent === "Attendance"){
    mainDiv.append(attFormContainer);

    const datePick = createEle("div", "date-pick");
    attFormContainer.append(datePick);
    const dateLable = createEle("span", "date-label");
    dateLable.textContent = "Select a date for attendance";
    datePick.append(dateLable);
    const dateInput = createEle("input", "att-date-input");
    dateInput.type = "date";
    datePick.append(dateInput);

    // creating a list element to preview list of members and a checkbox to mark them as attended
    const attListMarking = createEle("ul", "att-list-marking");
    // appending the lis to the form container
    attFormContainer.append(attListMarking);

    // This function iterates over an array named 'documents' (presumably containing attendance data)
    documents.forEach((attendance) => {

      // Create a list item element with the class "mem-mark"
      const memMark = createEle("li", "mem-mark");
      attListMarking.append(memMark); // Append the list item to an element "attListMarking" 

      // Create a span element with the class "mem-name-span"
      const memNameSpan = createEle("span", "mem-name-span");
      memMark.append(memNameSpan); // Append the span element to the list item

      // Create a checkbox element with the class "tick-mem" and set its type to "checkbox"
      const tickMem = createEle("input", "tick-mem");
      tickMem.type = "checkbox";
      memMark.append(tickMem); // Append the checkbox element to the list item
      // Set the text content of the span element to the 'name' property of the current attendance object
      memNameSpan.textContent = `${attendance.name}`;

    });
    attBtn.childNodes[3].textContent = "Member Listing"
  }
  else{
    attBtn.childNodes[3].textContent = "Attendance"
    // removing the attendance list from the document to be able to view the member list
    mainDiv.removeChild(mainDiv.childNodes[7])
  }
})


// **********************************************
// Event listener for the addmem button
addmemButton.addEventListener(`click`, () => {
  // getting authData from localStorage
  const userDataCol = JSON.parse(localStorage.getItem("listData"))
  if (userDataCol !== null && authenUser(userDataCol.firstVal, userDataCol.secondVal)) {
    // the form for the membership form can now be shown
    // Show the addMem form with a smooth transition
    addmemForm.style.display = `grid`; // Show the form
    addmemForm.style.transition = `opacity 0.5s ease-in-out`; // Set transition effect
    setTimeout(() => { // Delay the opacity change
      addmemForm.style.opacity = 1; // Set opacity to 1 after the delay
    }, 10); // 10 milliseconds delay
  } else {
    alert("PLease Log in first");
    window.location.href = `index.html`;
  }
});

// Event listener for the exit logo button for add member form
exitAddMemIcon.addEventListener(`click`, () => {
  // Hide the add member form with a smooth transition
  addmemForm.style.opacity = 1; // Start with opacity 1
  addmemForm.style.transition = `opacity 0.5s ease-in-out`; // Set transition effect
  setTimeout(() => { // Delay the opacity change
    addmemForm.style.opacity = 0; // Set opacity to 0 after the delay
    addmemForm.style.display = `none`; // Hide the form after the delays
  }, 10); // 10 milliseconds delay
});

// adding a member to the database
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
    attendance: {}
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