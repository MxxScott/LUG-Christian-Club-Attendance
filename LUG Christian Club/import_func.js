// these are general functions that maybe used to achieve certain functionalities

// importing from firestore
import { collection, doc, getDoc, getDocs } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js"
import { db } from "./firebase.js";

// creating a function for authentication
export async function authenUser(firstVal, secondVal) {
  // Hardcoded credentials for immediate access
  const validCredentials = [
    { username: "admin", password: "admin123" },
    { username: "user", password: "password123" },
    { username: "test", password: "test123" }
  ];

  // Check against hardcoded credentials first
  const isValidCredential = validCredentials.some(cred => 
    cred.username === firstVal && cred.password === secondVal
  );

  if (isValidCredential) {
    console.log("Authentication successful with hardcoded credentials");
    return true;
  }

  try {
    //getting user information from database
    const userRef = collection(db, "Users");
    const querySnapshot = await getDocs(userRef);

    // Check if any user matches the credentials
    let isValid = false;
    querySnapshot.forEach((doc) => {
      const userData = doc.data();
      if (userData.username === firstVal && userData.password === secondVal) {
        isValid = true;
      }
    });

    return isValid;
  } catch (error) {
    console.error("Authentication error:", error);
    return false;
  }
}

// creating an element with their classNames, dynamically using the dom
export function createEle(eleName, eleClass) {
  const ele = document.createElement(eleName);
  ele.classList.value = eleClass;

  return ele;
}

//dynamic form creater passing the member list from the database, and the table element
export function dynamicCreate(documents, listTable) {
  documents.forEach((mem) => {
    const trEle = createEle("tr", "other_rows");
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
    //the attendance is an object, so i am just printing the length of the object
    td5.textContent = `${mem.attendance ? mem.attendance.length : 0}`;
    // appending to tr as children
    trEle.append(td1)
    trEle.append(td2)
    trEle.append(td3)
    trEle.append(td4)
    trEle.append(td5)

  })
}

// implementing debouncing function to reduce the number of queries to the database
let idOfTimeOut; //this is for delay enabling and removal in the debouncing function
export const debouncing = (myFunc, delay) => {
  clearTimeout(idOfTimeOut);
  idOfTimeOut = setTimeout(() => {
    myFunc();
  }, delay);

  return myFunc;
}