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

let list = new Map();

let data = JSON.parse(localStorage.getItem("data"));

if (data && data.length != 0)
    data.forEach(el => {
        render(el[1].name, el[1])
    })


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
    localStorage.setItem("data", JSON.stringify(Array.from(list.entries())));
    thisItemID = "";
}


let draggedItem;
function render(element, childs) {
    const newSection = renderUtil(element, childs);

    mainDiv.appendChild(newSection);
}

function initializationState(element, parent_id, message, comments, description) {
    let newItem = itemState.create(element.id, parent_id, message, comments, description);

    list.get(parent_id)[newItem.id] = newItem;
    localStorage.setItem("data", JSON.stringify(Array.from(list.entries())));

    element.ondblclick = function () {
        modal.style.display = "block";
        thisItemID = this.id;
        const { coments, description } = itemState.get(thisItemID)
        comentsArea.value = coments;
        descriptionArea.value = description;
    }
}


function createDraggable(element, parent_id) {
    element.draggable = true;
    element.id = Date.now() * Math.random();
    element.classList.add("draggableItem");
    element.ondragstart = function () {
        draggedItem = this;
        setTimeout(() => this.classList.add("hide"))
    }
    element.ondragend = function (e) {
        let newParent = parseFloat(e.toElement.parentNode.parentNode.id);
        const elid = element.id;
        list.get(parent_id)[elid].parent_id = newParent;
        list.get(newParent)[elid] = list.get(parent_id)[elid];
        delete list.get(parent_id)[elid];
        localStorage.setItem("data", JSON.stringify(Array.from(list.entries()))); // bring out
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

function renderUtil(element, childs) {
    const header = document.createElement("p");
    header.textContent = element

    const category = document.createElement("div");
    let parent_id = Date.now() * Math.random();;

    if (childs && Object.keys(childs)[1]) parent_id = childs[Object.keys(childs)[1]].parent_id;
    else parent_id = Date.now() * Math.random();
    list.set(parent_id, { name: element });
    category.id = parent_id;
    category.classList.add("cat_main")
    category.appendChild(header);
    const tasksBox = document.createElement("div")
    createDragArea(tasksBox)
    const taskInputBox = document.createElement("div");
    const input_id = Date.now() * Math.random();
    taskInputBox.innerHTML = `<input type="text" placeholder="Add New Task" id=${input_id}><br>`

    if (childs) {
        for (const [key, value] of Object.entries(childs)) {
            if (!isNaN(key)) {
                tasksBox.appendChild(addItemUtil(value.message, parent_id, value.coments, value.description));
            }
        }
    }

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

function addItemUtil(val, parent_id, comments, description) {
    const item = document.createElement("p");
    item.id = Date.now() * Math.random();
    createDraggable(item, parent_id)
    initializationState(item, parent_id, val, comments, description)
    item.textContent = val;
    const deleteButton = document.createElement("button");
    deleteButton.innerText = "X"
    deleteButton.onclick = function foo() {
        list.forEach(el => {
            if (el[item.id]) {
                delete el[item.id];
            }
        })
        localStorage.setItem("data", JSON.stringify(Array.from(list.entries())));
        itemState.remove(this.parentNode.id)
        this.parentNode.remove();
    }
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
        render(list.value)
    }
}




