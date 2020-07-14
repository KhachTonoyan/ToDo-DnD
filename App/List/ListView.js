import AddCategory from "../../addCategory/addCategory.js"
import itemState from "../Details/ItemState.js"

const { containerAddCat, inputAddCat, buttonAddCat } = new AddCategory();
const mainDiv = document.createElement("div");
mainDiv.className = "mainDiv";
mainDiv.classList.add("list")
const modal = document.getElementById("myModal");
const closeModal = document.getElementById("close");
const comentsArea = document.getElementById("Coments")
const descriptionArea = document.getElementById("Description")
let thisItemID = "";

closeModal.onclick = function () {
    changeUtil();
}
window.onclick = function (event) {
    if (event.target === modal) {
        changeUtil();
    }
}

function changeUtil() {
    modal.style.display = "none";
    let changedItem = itemState.change(thisItemID, descriptionArea.value, comentsArea.value)
    list.get(changedItem.parent_id)[changedItem.id] = changedItem;
    
    thisItemID = "";
}

///////
let list = new Map();
///////

let draggedItem;
function render(element) {
    const newSection = renderUtil(element.value);

    mainDiv.appendChild(newSection);
}

function initializationState(element, parent_id) {
    let newItem = itemState.create(element.id, parent_id);

    list.get(parent_id)[newItem.id] = newItem;
    console.log(list.get(parent_id))

    element.ondblclick = function () {
        modal.style.display = "block";
        thisItemID = this.id;
        const { coments, description } = itemState.get(thisItemID)
        comentsArea.value = coments;
        descriptionArea.value = description;
    }
}

//test

function createDraggable(element, parent_id) {
    element.draggable = true;
    element.id = Date.now();
    element.classList.add("draggableItem");
    element.ondragstart = function () {
        draggedItem = this;
        setTimeout(() => this.classList.add("hide"))
    }
    element.ondragend = function (e) {
        let newParent = parseInt(e.toElement.parentNode.parentNode.id);
        console.log(list.get(parent_id));
        const elid = element.id;
        list.get(parent_id)[elid].parent_id = newParent;
        list.get(newParent).elid = list.get(parent_id)[elid];
        delete list.get(parent_id).elid;
        this.classList.remove("hide")
    }
}
function createDragArea(element) {
    element.classList.add("dragArea")
    element.ondragover = function (e) {
        e.preventDefault()
    }
    element.ondragenter = function () {
        this.classList.add("dragEnter")
    }
    element.ondragleave = function () {
        this.classList.remove("dragEnter")
    }
    element.ondrop = function () {
        this.append(draggedItem)
        this.classList.remove("dragEnter")
    }
}

function renderUtil(element) {
    const header = document.createElement("p");
    header.textContent = element

    const category = document.createElement("div");
    const parent_id = Date.now();
    list.set(parent_id, {}); ///
    console.log(parent_id);
    category.id = parent_id;
    category.classList.add("cat_main")
    category.appendChild(header);
    const tasksBox = document.createElement("div")
    createDragArea(tasksBox)
    const taskInputBox = document.createElement("div");
    const input_id = Date.now();
    taskInputBox.innerHTML = `<input type="text" placeholder="Add New Task" id=${input_id}><br>`

    // list.forEach(x => tasksBox.appendChild(addItemUtil(x, parent_id)))

    taskInputBox.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            const taskInput = document.getElementById(input_id);
            tasksBox.appendChild(addItemUtil(taskInput.value, parent_id))
            taskInput.value = "";
        }
    })
    category.append(taskInputBox, tasksBox);
    return category;
}

//brought this piece of code out to keep the DRY principle
function addItemUtil(val, parent_id) {
    const deleteButton = document.createElement("button");
    deleteButton.innerText = "X"
    deleteButton.onclick = function foo() {
        itemState.remove(this.parentNode.id)
        this.parentNode.remove();
    }
    const item = document.createElement("p");
    item.id = Date.now();
    createDraggable(item, parent_id)
    initializationState(item, parent_id)
    item.textContent = val;
    item.appendChild(deleteButton)
    return item;
}



export default class ListView {
    constructor() {
        this.addInput = inputAddCat;
        this.addContainer = containerAddCat;
        this.addButton = buttonAddCat;
        this.mainDiv = mainDiv;
    }
    bindOnAddToList = (cb) => {
        this.add = cb
        this.addButton.onclick = () => this.add(this.addInput)
    }
    listUpdate = (list) => {
        render(list)
    }
}




