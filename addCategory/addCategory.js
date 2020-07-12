export default class AddCategory{  // Singleton
    constructor(){
        if(AddCategory.isCreated){
            return AddCategory.instanse
        }
        AddCategory.instanse = this;
        AddCategory.isCreated = true;
        this.containerAddCat = document.createElement("div");
        this.inputAddCat = document.createElement("input");
        this.buttonAddCat = document.createElement("button");
        this.buttonAddCat.textContent = "Add Category";
        this.containerAddCat.append(this.inputAddCat,this.buttonAddCat)
    }
}
