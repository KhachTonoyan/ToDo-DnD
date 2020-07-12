import AddCategory from "../../addCategory/addCategory.js"

const {containerAddCat,inputAddCat,buttonAddCat} = new AddCategory()
const mainDiv = document.createElement("div")
mainDiv.classList.add("list")

function render(list){
    mainDiv.innerHTML="";
    list.map(({name,id}) => {
        const category = document.createElement("div");
        category.innerHTML = `<h3>${name}</h3>`;
        return category
    }).forEach(element => {
        mainDiv.appendChild(element)
    })
}


export default class ListView {
    constructor(){
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