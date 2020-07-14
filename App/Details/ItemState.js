class createItemState{
    constructor(id, parent_id){
        this.id = id;
        this.description = "";
        this.coments="";
        this.parent_id = parent_id;
    }
}

class ItemState{
    constructor(){
        this.items = {}
    }
    create(id, parent_id){
        let newItem = new createItemState(id, parent_id);
        this.items = {...this.items,[id]:newItem}
        console.log(this.items)
    }
    remove(id){
        delete this.items[id]
    }
    get(id){
        return this.items[id]
    }
    getList(){
        return this.items;
    }
    change(id,description,coments){
        this.items[id].description = description;
        this.items[id].coments = coments;
    }
}

export default new ItemState()