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

//adding new section was causing a complete update that resulted in a user data loss
//push to list (state)
let draggedItem;
function render(element) {
    const newSection = renderUtil(element);

    mainDiv.appendChild(newSection);
    //list.push...
}

function initializationState(element){
    element.id = Date.now();
    itemState.create(element.id);
    ////
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
//moved this function out of the "render" to keep the code cleaner
//currently box id is missing
function renderUtil(element) {
    const header = document.createElement("p"); //name of the section
    header.textContent = element.value

    const category = document.createElement("div");
    category.classList.add("cat_main")
    category.appendChild(header); //add name
    const tasksBox = document.createElement("div")
    createDragArea(tasksBox)
    //delete this
    const taskInputBox = document.createElement("div");
    const input_id = Date.now();
    taskInputBox.innerHTML = `<input type="text" placeholder="Add New Task" id=${input_id}><br>`

    //when user clicks enter his task is being added to the top of the current container
    taskInputBox.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            const taskInput = document.getElementById(input_id);
            //this node can use ItemView as a constructor
            const deleteButton = document.createElement("button");
            deleteButton.innerText = "X"
            deleteButton.onclick = function foo(){
                itemState.remove(this.parentNode.id)
                this.parentNode.remove();
            }
            const item = document.createElement("p");
            createDraggable(item)
            initializationState(item)
            item.textContent = taskInput.value;
            item.appendChild(deleteButton)
            tasksBox.appendChild(item)
            taskInput.value = "";
        }
    })

    category.append(taskInputBox,tasksBox);
    return category;
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




