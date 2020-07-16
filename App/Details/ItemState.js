class createItemState{
    constructor(name,id,parentID){
        this.name = name;
        this.id = id;
        this.parentID = parentID;
        this.description = "";
        this.coments="";
    }
}

class ItemState{
    constructor(){
        this.items = JSON.parse(localStorage.getItem('items')) || {}
    }
    create(name,id,parentID){
        let newItem = new createItemState(name,id,parentID);
        this.items[parentID] = this.items[parentID] || {}
        this.items[parentID][id] = newItem;
    }
    remove(id,parentID){
        delete this.items[parentID][id]
    }
    get(id,parentID){
        return this.items[parentID][id]
    }
    change(id,parentID,description,coments){
        this.items[parentID][id].description = description;
        this.items[parentID][id].coments = coments;
    }
    changeLocation(id,parentID,newParentID){
        const item = this.items[parentID][id]
        delete this.items[parentID][id]
        this.items[newParentID] = this.items[newParentID] || {}
        this.items[newParentID][id] = item
    }
    getItems = () => this.items
    sendToLocalStorage = () =>{
        localStorage.setItem('items', JSON.stringify(this.items))
    }
}

export default new ItemState()