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

// creating an element dynamically using the dom
export function createEle(eleName, eleClass){
    const ele = document.createElement(eleName);
    ele.classList.value = eleName;

    return ele;
}