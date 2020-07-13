class createItemState{
    constructor(id){
        this.id = id;
        this.description = "";
        this.coments="";
    }
}

class ItemState{
    constructor(){
        this.items = {}
    }
    create(id){
        let newItem = new createItemState(id);
        this.items = {...this.items,[id]:newItem}
        console.log(this.items)
    }
    remove(id){
        delete this.items[id]
    }
    get(id){
        return this.items[id]
    }
    change(id,description,coments){
        this.items[id].description = description;
        this.items[id].coments = coments;
    }
}

export default new ItemState()