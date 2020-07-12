export default class AddItem{
    constructor(){
        this.containerAddItem = document.createElement("div");
        this.inputAddItem = document.createElement("input");
        this.buttonAddItem = document.createElement("button");
        this.buttonAddItem.innerHTML = "Add Item";
        this.containerAddItem.append(this.inputAddItem,this.buttonAddItem)
    }
}
