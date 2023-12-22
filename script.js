import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import {
  getDatabase,
  ref,
  push,
  onValue,
  remove,
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";

const appSettings = {
  databaseURL:
    "https://playground-96441-default-rtdb.asia-southeast1.firebasedatabase.app/",
};

const inputFieldEl = document.querySelector("#input-field");
const addButtonEl = document.querySelector("#add-button");
const form = document.querySelector("form");
const shoppingList = document.querySelector("#shopping-list");
const app = initializeApp(appSettings);
const database = getDatabase(app);
const itemsInDB = ref(database, "items");
const listItems = document.querySelector("li");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  let inputValue = inputFieldEl.value;
  push(itemsInDB, inputValue);
  form.reset();
});

onValue(itemsInDB, (snapshot) => {
  if (snapshot.exists()) {
    let itemEntries = Object.entries(snapshot.val());
    shoppingList.innerHTML = "";
    for (let i = 0; i < itemEntries.length; i++) {
      let currentItem = itemEntries[i];
      let currentItemID = currentItem[0];
      let currentItemValue = currentItem[1];
      let newEl = document.createElement("li");
      newEl.textContent = `${currentItemValue}`;
      newEl.addEventListener("click", () => {
        let exactLocation = ref(database, `items/${currentItemID}`);
        remove(exactLocation);
      });
      shoppingList.append(newEl);
    }
  } else {
    shoppingList.innerHTML = "<li>No Items Added."
  }
});
