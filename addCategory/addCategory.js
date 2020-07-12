export default class AddCategory{  // Singleton
    constructor(){
        if(AddCategory.isCreated){
            return AddCategory.instanse
        }
        AddCategory.instanse = this;
        AddCategory.isCreated = true;
        this.containerAddCat = document.createElement("addSection");
        this.inputAddCat = document.createElement("input");
        this.inputAddCat.id = "addSection_inp" //gave it an id to controll from css
        this.inputAddCat.setAttribute("placeholder", "ADD NEW CATEGORY"); //added placeholder text
        this.buttonAddCat = document.createElement("button");
        this.buttonAddCat.id = "addSection_btn" //gave it an id to controll from css
        this.buttonAddCat.setAttribute("class", "fa fa-plus");
        this.containerAddCat.append(this.inputAddCat, this.buttonAddCat);
    }
}
