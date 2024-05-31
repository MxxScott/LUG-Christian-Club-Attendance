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


// loading member list from database and previewing on the screen for users to see
document.addEventListener(`DOMContentLoaded`, async()=>{
  const membersQuery = await getDocs(collection(db, "members"));
  const documents = membersQuery.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

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