class createItemState {
    constructor(id, parent_id, message, comments, description) {
        this.id = id;
        this.description = description || "";
        this.coments = comments || "";
        this.parent_id = parent_id;
        this.message = message;
    }
}

class ItemState {
    constructor() {
        this.items = {}
    }
    create(id, parent_id, message, comments, description) {
        let newItem = new createItemState(id, parent_id, message, comments, description);
        this.items = { ...this.items, [id]: newItem }
        return newItem;
    }
    remove(id) {
        delete this.items[id]
    }
    get(id) {
        return this.items[id]
    }
    getList() {
        return this.items;
    }
    change(id, description, coments) {
        this.items[id].description = description;
        this.items[id].coments = coments;
        return this.items[id];
    }
}

export default new ItemState()