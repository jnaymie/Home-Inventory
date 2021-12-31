//INPUT GROUP
//-----------------------------------

var inputStyles = ["input__textbox__default",
                   "input__textbox__alert",
                   "input__textbox__warning",
                   "input__message__default",
                   "input__message__alert",
                   "input__message__warning"];

//-------------------------

class InputGroup
{
    constructor(label, input, message)
    {
        this.label = label;
        this.input = input;
        this.message = message;
    }
    
    //-------------------------
    
    setGroupState(state)
    {
        switch(state)
        {
            case "default":
                this.setElementClass(this.input, "input__textbox__default");
                this.setElementClass(this.message, "input__message__default");
                this.message.classList.add("hidden");
                break;
            
            case "alert":
                this.setElementClass(this.input, "input__textbox__alert");
                this.setElementClass(this.message, "input__message__alert");
                this.message.classList.remove("hidden");
                break;
                
            case "warning":
                this.setElementClass(this.input, "input__textbox__warning");
                this.setElementClass(this.message, "input__message__warning");
                this.message.classList.remove("hidden");
                break;
        }
    }
    
    //-------------------------
    
    setMessageText(text)
    {
        this.message.innerHTML = text;
    }
    
    //-------------------------
    
    setLabelText(text)
    {
        this.label.innterHtml = text;
    }
    
    //-------------------------
    
    setInputText(text)
    {
        this.input.value = text;
    }
    
    //-------------------------
    
    setElementClass(element, cssClass)
    {
        for(var i=0; i<inputStyles.length; i++)
        {
            element.classList.remove(inputStyles[i]);
        }
        element.classList.add(cssClass);
    }
    
    //-------------------------
    
    addInputListener(action, method)
    {
        this.input.addEventListener(action, method);
    }
    
    //-------------------------
    
    getInputText()
    {
        return this.input.value;
    }
}

//ITEM
//-----------------------------------

class Item
{
    constructor(id, name, price, category)
    {
        this.id = id;
        this.name = name;
        this.price = price;
        this.category = category;
    }
    
    getFormattedPrice()
    {
        return "$" + this.price;
    }
}

//CATEGORY
//-----------------------------------

class Category
{
    constructor(id, name)
    {
        this.id = id;
        this.name = name;
    }
}

//ITEM ROW
//-----------------------------------

class ItemRow
{
    constructor(item)
    {
        this.item = item;
        
        this.editable = true;
        
        this.createElements();
        this.setupElements();
        this.appendElements();
        this.changeEditable();
    }
    
    createElements()
    {
        this.form = document.createElement("form");
        this.tableRow = document.createElement("div");
        
        this.itemID = document.createElement("input");
        this.actionInput = document.createElement("input");
        
        this.nameCell = new ItemCell();
        this.categoryCell = new ItemCell();
        this.priceCell = new ItemCell();
        
        this.modifyDiv = document.createElement("div");
        this.editButton = document.createElement("button");
        this.editIcon = document.createElement("img");
        this.deleteButton = document.createElement("button");
        this.deleteIcon = document.createElement("img");
    }
    
    setupElements()
    {
        this.form.setAttribute("id", "item-" + this.item.id + "_form");
        this.form.setAttribute("method", "POST");
        
        
        this.tableRow.classList.add("inventory__table-row");
        
        this.itemID.setAttribute("name", "itemID");
        this.itemID.setAttribute("type", "hidden");
        this.itemID.value = this.item.id;
        
        this.actionInput.setAttribute("id", "item-" + this.item.id + "_id");
        this.actionInput.setAttribute("name", "action");
        this.actionInput.setAttribute("type", "hidden");
        
        //----------
        
        this.nameCell.div.classList.add("inventory__table-cell");
        this.nameCell.div.classList.add("width-30");
        
        this.nameCell.input.setAttribute("type", "text");
        this.nameCell.input.setAttribute("name", "name_input");
        this.nameCell.input.classList.add("inventory__table-input");
        this.nameCell.input.classList.add("inventory__table-input__uneditable");
        this.name = this.item.name;
        
        //----------
        
        this.categoryCell.div.classList.add("inventory__table-cell");
        this.categoryCell.div.classList.add("width-30");
        
        this.categoryCell.input.setAttribute("type", "text");
        this.categoryCell.input.setAttribute("name", "category_input");
        this.categoryCell.input.classList.add("inventory__table-input");
        this.categoryCell.input.classList.add("inventory__table-input__uneditable");
        this.category = getCategoryById(this.item.category).name;
        
        //----------
        
        this.priceCell.div.classList.add("inventory__table-cell");
        this.priceCell.div.classList.add("width-20");
        
        this.priceCell.input.setAttribute("type", "text");
        this.priceCell.input.setAttribute("name", "price_input");
        this.priceCell.input.classList.add("inventory__table-input");
        this.priceCell.input.classList.add("inventory__table-input__uneditable");
        this.price = this.item.price;
        
        //----------
        
        this.modifyDiv.classList.add("inventory__table-cell");
        this.modifyDiv.classList.add("inventory__modify-cell");
        this.modifyDiv.classList.add("width-20");
        
        this.editButton.setAttribute("type", "button");
        this.editButton.classList.add("inventory__modify-button");
        this.editButton.classList.add("editMarker");
        this.editButton.addEventListener("click", this.changeEditable.bind(this));
        
        this.editIcon.setAttribute("src", "content/images/edit.png");
        this.editIcon.setAttribute("width", "20");
        
        this.deleteButton.setAttribute("type", "button");
        this.deleteButton.classList.add("inventory__modify-button");
        this.deleteButton.classList.add("deleteMarker");
        this.deleteButton.addEventListener("click", this.deleteButtonPressed.bind(this));
        
        this.deleteIcon.setAttribute("src", "content/images/delete.png");
        this.deleteIcon.setAttribute("width", "20");
    }
    
    appendElements()
    {
        this.deleteButton.appendChild(this.deleteIcon);
        this.editButton.appendChild(this.editIcon);
        
        this.modifyDiv.appendChild(this.editButton);
        this.modifyDiv.appendChild(this.deleteButton);
        
        this.nameCell.div.appendChild(this.nameCell.input);
        
        this.categoryCell.div.appendChild(this.categoryCell.input);
        
        this.priceCell.div.appendChild(this.priceCell.input);
        
        this.tableRow.appendChild(this.actionInput);
        this.tableRow.appendChild(this.itemID);
        this.tableRow.appendChild(this.nameCell.div);
        this.tableRow.appendChild(this.categoryCell.div);
        this.tableRow.appendChild(this.priceCell.div);
        this.tableRow.appendChild(this.modifyDiv);
        
        this.form.appendChild(this.tableRow);
    }
    
    changeEditable()
    {
        this.editable = !this.editable;
        if(this.editable)
        {
            this.name = this.nameCell.input.value;
            this.category = this.categoryCell.input.value;
            this.price = Number.parseFloat(this.priceCell.input.value);
            console.log(this.editable);

            this.editable = true;
//            this.editButton.addEventListener("click", this.setUneditable.bind(this));
//            this.editButton.removeEventListener("click", this.setEditable.bind(this));
            this.deleteIcon.setAttribute("src", "content/images/checkmark.png");
            this.editIcon.setAttribute("src", "content/images/xmark.png");
            this.nameCell.setEditable();
            this.categoryCell.setEditable();
            this.priceCell.setEditable();
        }
        else
        {
            console.log(this.editable);
            this.nameCell.input.value = this.name;
            this.categoryCell.input.value = this.category;
            this.priceCell.input.value = this.price.toFixed(2);

            this.editable = false;
//            this.editButton.addEventListener("click", this.setEditable.bind(this));
//            this.editButton.removeEventListener("click", this.setUneditable.bind(this));
            this.deleteIcon.setAttribute("src", "content/images/delete.png");
            this.editIcon.setAttribute("src", "content/images/edit.png");
            this.nameCell.setUneditable();
            this.categoryCell.setUneditable();
            this.priceCell.setUneditable();
        }
        
    }
    
    
    deleteButtonPressed()
    {
        console.log("delete button pressed");
        var form = "item-" + this.item.id + "_form";
        
        if(this.editable)
        {
            this.actionInput.value = "update";
            document.getElementById(form).action = "inventory";
            document.getElementById(form).method = "POST";
            document.getElementById(form).submit();
        }
        else
        {
            this.actionInput.value = "delete";
            document.getElementById(form).action = "inventory";
            document.getElementById(form).method = "POST";
            document.getElementById(form).submit();
        }
    }

}

class ItemCell
{
    constructor()
    {
        this.inputShowing = false;
        this.div = document.createElement("div");
        this.input = document.createElement("input");
    }
    
    toggleDisplay(text)
    {
        if(this.inputShowing)
        {
            this.showLabel(text);
            this.inputShowing = false;
        }
        else
        {
            this.showInput(text);
            this.inputShowing = true;
        }
    }
    
    showInput(text)
    {
        this.input.classList.remove("inventory__table-element__hidden");
        this.input.classList.add("inventory__table-element__shown");
        this.input.removeAttribute("disabled", "disabled");
        this.input.value = text;
    }
    
    showLabel(text)
    {
        this.label.classList.remove("inventory__table-element__hidden");
        this.label.classList.add("inventory__table-element__shown");
        this.label.removeAttribute("disabled", "disabled");
        
        this.input.classList.remove("inventory__table-element__shown");
        this.input.classList.add("inventory__table-element__hidden");
        this.input.setAttribute("disabled", "disabled");
        this.input.value = text;
    }
    
    setEditable()
    {
        this.input.removeAttribute("readonly", "readonly");
        this.input.classList.remove("inventory__table-input__uneditable");
        this.input.classList.add("inventory__table-input__editable");
    }
    
    setUneditable()
    {
        this.input.setAttribute("readonly", "readonly");
        this.input.classList.remove("inventory__table-input__editable");
        this.input.classList.add("inventory__table-input__uneditable");
    }
}