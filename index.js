import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import{ getDatabase, ref, push, onValue, remove} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = { 
	databaseURL : "https://playground-6fdef-default-rtdb.asia-southeast1.firebasedatabase.app/"
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const shoppingListInDB = ref(database, "shoppingList")

let addBtn = document.getElementById("add-btn")
let inputEl = document.getElementById("input-el")
let shoppingList = document.getElementById("shopping-list")

addBtn.addEventListener("click", function(){
	let inputValue =  inputEl.value
	push(shoppingListInDB, inputValue)
	clearInput()
})

onValue(shoppingListInDB, function(snapshot){
if (snapshot.exists()){
	let itemsArray = Object.entries(snapshot.val())
	clearShoppingList()
	for (let i = 0; i < itemsArray.length ; i++){
	let currentItem = itemsArray[i]
	let currentItemID = currentItem[0]
	let currentItemValue = currentItem[1]

	appendItemToShoppingList(itemsArray[i])
} }
else {
	shoppingList.innerHTML = "No items here yet..."
}
})

function clearShoppingList(){
	shoppingList.innerHTML = ""
}

function clearInput(){
	inputEl.value = ""
}

function appendItemToShoppingList(item){
	//shoppingList.innerHTML += `<li> ${itemValue} </li>`
	let itemID = item[0]
	let itemValue = item[1]

	let newEl = document.createElement("li")
	newEl.addEventListener("click", function(){
		let exactLocationOfItemInDB = ref ( database, `shoppingList/${itemID}`)
		remove(exactLocationOfItemInDB)
	})
	newEl.textContent = itemValue
	shoppingList.append(newEl)

}