class createItemState{
    constructor(id){
        this.id = id;
        this.description = "";
        this.coments="";
    }
}

class ItemState{
    constructor(){
        this.items = []
    }
    create(id){
        let newItem = new createItemState(id);
        this.items.push(newItem)
    }
    remove(id){
        this.items=this.items.filter(item => item.id !== id)
    }
    get(id){
        for(let item of this.items){
            if(item.id === id){
                return item
            }
        }
    }
    change(id,description,coments){
        for(let i=0;i<this.items.length;i++){
            if(this.items[i].id === id){
                this.items[i].description = description;
                this.items[i].coments = coments;
                return
            }
        }
    }
}

export default new ItemState()