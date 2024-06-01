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


//LIST-PAGE JAVASCRIPT
// importing neccessary functions
import { createEle } from "../import_func.js";
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
document.addEventListener(`DOMContentLoaded`, async()=>{
  membersQuery = await getDocs(collection(db, "members"));
  documents = membersQuery.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  // creating elements for each member
  documents.forEach((mem) =>{
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
attBtn.addEventListener(`click`, ()=>{
  // creating a form for making attendance when the attendance btn is clicked
  const mainDiv = document.getElementById("main_section");
  const attFormContainer = createEle("div", "att-form-container");
  mainDiv.append(attFormContainer);

  const datePick = createEle("div", "date-pick");
  attFormContainer.append(datePick);
  const dateLable = createEle("span", "date-label");
  dateLable.textContent = "Select a date for attendance";
  datePick.append(dateLable);
  const dateInput = createEle("input", "att-date-input");
  dateInput.type = "date";
  datePick.append(dateInput);
  
  // creating a list element to preview list of members and a checkbox to mark them ass attended
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

})