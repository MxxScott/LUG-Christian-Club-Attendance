// these are general functions that maybe used to achieve certain functionalities


// creating a function for authentication
export function authenUser(firstVal, secondVal) {
    const first = `frema@sec.lug.club`;
    const second = `logMeIntoIt`;
  
    if (firstVal === first && secondVal === second)
      return true
    else
      return false
}

// creating an element with thier classNames, dynamically using the dom
export function createEle(eleName, eleClass){
    const ele = document.createElement(eleName);
    ele.classList.value = eleClass;

    return ele;
}

//dynamic form creater passing the member list from the database, and the table elment
export function dynamicCreate(documents, listTable){
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
}