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
const saveButton = document.getElementById("save")
const clearButton = document.getElementById("clear")
let thisItemID = "";
let thisItemParentID = "";

closeModal.onclick = function() {
  modal.style.display = "none";
  itemState.change(thisItemID,thisItemParentID,descriptionArea.value,comentsArea.value)
  thisItemID = "";
}
window.onclick = function(event) {
  if (event.target === modal) {
    modal.style.display = "none";
    itemState.change(thisItemID,thisItemParentID,descriptionArea.value,comentsArea.value)
    thisItemID = "";
  }
}

//adding new section was causing a complete update that resulted in a user data loss
//push to list (state)
let draggedItem;
function render(element,config={newSection:true}) {
    const newSection = renderUtil(element,config);
    mainDiv.appendChild(newSection);
    if(config.newSection){
        return {
            name:newSection.childNodes[0].textContent,
            inputID: newSection.childNodes[1].firstChild.id,
            dragAreaID:newSection.childNodes[2].id
        }
    } 
    //list.push...
}

function initializationState(element,name,parent){

    if(name && parent)itemState.create(name,element.id,parent.id);
    ////
    element.ondblclick = function() {
        modal.style.display = "block";
        thisItemID = this.id;
        thisItemParentID = this.parentNode.id;
        console.log(thisItemParentID,thisItemID)
        const {coments,description} = itemState.get(thisItemID,thisItemParentID)
        comentsArea.value = coments;
        descriptionArea.value = description;
      }
}

function createDraggable(element,config={}){
    element.draggable = true;
    element.id = config.id || Date.now();
    element.classList.add("draggableItem");
    element.ondragstart = function(){
        draggedItem = this;
        setTimeout(() => this.classList.add("hide"))
    }
    element.ondragend = function(){
        this.classList.remove("hide")
    }
}
function createDragArea(element,config){
    element.id = config.dragAreaID || Date.now() * Math.random()
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
        itemState.changeLocation(draggedItem.id,draggedItem.parentNode.id,this.id)
        this.append(draggedItem)
        this.classList.remove("dragEnter")
    }
}
//moved this function out of the "render" to keep the code cleaner
//currently box id is missing
function renderUtil(element,config) {
    const header = document.createElement("p"); //name of the section
    header.textContent = config.name || element.value

    const category = document.createElement("div");
    category.classList.add("cat_main")
    category.appendChild(header); //add name
    const tasksBox = document.createElement("div")
    createDragArea(tasksBox,config)
    //delete this
    const taskInputBox = document.createElement("div");
    const input_id = config.inputID || Date.now();
    taskInputBox.innerHTML = `<input type="text" placeholder="Add New Task" id=${input_id}><br>`
    if(config.items){
        for(let key in config.items){

            const deleteButton = document.createElement("button");
            deleteButton.innerText = "X"
            const item = document.createElement("p");
            deleteButton.onclick = function() {
                itemState.remove(this.parentNode.id,item.parentNode.id)
                this.parentNode.remove();
            }
            initializationState(item)
            createDraggable(item,config.items[key])
            item.textContent = config.items[key].name
            item.appendChild(deleteButton)
            tasksBox.appendChild(item)

        }
    }
    //when user clicks enter his task is being added to the top of the current container
    taskInputBox.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            const taskInput = document.getElementById(input_id);
            //this node can use ItemView as a constructor
            const deleteButton = document.createElement("button");
            deleteButton.innerText = "X"
            const item = document.createElement("p");
            deleteButton.onclick = function() {
                itemState.remove(this.parentNode.id,item.parentNode.id)
                this.parentNode.remove();
            }
            createDraggable(item)
            initializationState(item,taskInput.value,tasksBox)
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
        this.saveButton = saveButton;
        this.clearButton = clearButton;
    }
    bindOnAddToList = (cb) => {
        this.add = cb
        this.addButton.onclick = () => this.add(this.addInput)
        setTimeout(() => this.onPageLoad())
    }
    listUpdate = (list,config) => {
        this.onCreatCat(render(list,config))
    }
    bindOnCreatCat = (cb) => {
        this.onCreatCat = cb
    }
    bindOnPageLoad = (cb) => {
        this.onPageLoad = cb
    }
    bindOnSendToLocalStorage = (cb) =>{
        this.saveButton.onclick = cb
    }
    bindOnClearLocalStorage = (cb) => {
        this.clearButton.onclick = cb
    }
}




