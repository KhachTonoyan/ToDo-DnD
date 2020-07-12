function isEmpty(text){
    if(text.trim()){
        return false
    }
    return true
}


export default class ListModel {
    constructor(){
        this.list = []
    }
    addToList = (element) => {
        if(!isEmpty(element.value)){
            this.list.push({name:element.value,items:[],id:Date.now()})
            element.value="";
            this.update(this.list)
        }
    }

    bindOnListUpdate = (cb) => {
        this.update = cb;
    }
}