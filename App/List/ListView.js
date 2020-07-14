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

closeModal.onclick = function() {
  modal.style.display = "none";
  itemState.change(thisItemID,descriptionArea.value,comentsArea.value)
  thisItemID = "";
}
window.onclick = function(event) {
  if (event.target === modal) {
    modal.style.display = "none";
    itemState.change(thisItemID,descriptionArea.value,comentsArea.value)
    thisItemID = "";
  }
}


let draggedItem;
function render(element) {
    const newSection = renderUtil(element.value);
    // console.log(element)

    mainDiv.appendChild(newSection);
}

function initializationState(element, parent_id){
    element.id = Date.now();
    itemState.create(element.id, parent_id);

    element.ondblclick = function() {
        modal.style.display = "block";
        thisItemID = this.id;
        const {coments,description} = itemState.get(thisItemID)
        comentsArea.value = coments;
        descriptionArea.value = description;
      }
}

function createDraggable(element){
    element.draggable = true;
    element.id = Date.now();
    element.classList.add("draggableItem");
    element.ondragstart = function(){
        draggedItem = this;
        setTimeout(() => this.classList.add("hide"))
    }
    element.ondragend = function(){
        console.log("end")
        this.classList.remove("hide")
    }
}
function createDragArea(element){
    element.classList.add("dragArea")
    element.ondragover = function(e){
        e.preventDefault()
    }
    element.ondragenter = function(){
        this.classList.add("dragEnter")
    }
    element.ondragleave = function(){
        this.classList.remove("dragEnter")
    }
    element.ondrop = function(){
        this.append(draggedItem)
        this.classList.remove("dragEnter")
    }
}

function renderUtil(element) {
    const header = document.createElement("p"); 
    header.textContent = element

    const category = document.createElement("div");
    const parent_id = Date.now();
    category.classList.add("cat_main")
    category.appendChild(header);
    const tasksBox = document.createElement("div")
    createDragArea(tasksBox)
    const taskInputBox = document.createElement("div");
    const input_id = Date.now();
    taskInputBox.innerHTML = `<input type="text" placeholder="Add New Task" id=${input_id}><br>`

    let list = [];

    list.push("test");
    list.push("test2");
    list.forEach(x => tasksBox.appendChild(addItemUtil(x, parent_id)))

    taskInputBox.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            const taskInput = document.getElementById(input_id);
            tasksBox.appendChild(addItemUtil(taskInput.value, parent_id))
            taskInput.value = "";
        }
    })
    category.append(taskInputBox,tasksBox);
    return category;
}

//brought this piece of code out to keep the DRY principle
function addItemUtil(val, parent_id){
    const deleteButton = document.createElement("button");
            deleteButton.innerText = "X"
            deleteButton.onclick = function foo(){
                itemState.remove(this.parentNode.id)
                this.parentNode.remove();
            }
            const item = document.createElement("p");
            createDraggable(item)
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




