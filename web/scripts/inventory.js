var inventorySearch,
    inventoryTable,
    itemMap = new Map(),
    tableHeaderHTML = "<div class=\"inventory__table-row inventory__table-header\"><div class=\"inventory__table-cell inventory__table-cell__not-right inventory__table-cell__not-bottom width-30\"><p>Item</p></div><div class=\"inventory__table-cell inventory__table-cell__not-right inventory__table-cell__not-bottom width-30\"><p>Category</p></div><div class=\"inventory__table-cell inventory__table-cell__not-right inventory__table-cell__not-bottom width-20\"><p>Price</p></div><div class=\"inventory__table-cell inventory__table-cell__not-bottom width-20\"><p>Modify</p></div></div>";

function load()
{
    inventoryTable = document.getElementById("inventory__table");
    inventorySearch = document.getElementById("search_input");
    inventorySearch.addEventListener("input", limitSearch);
    populateInventoryTable(items);
}

function limitSearch()
{
    var limitedArray = [],
        arrayCounter = 0;
    
    for(var i=0; i<items.length; i++)
    {
        if(items[i].name.includes(inventorySearch.value))
        {
            limitedArray[arrayCounter++] = items[i];
        }
    }
    
    populateInventoryTable(limitedArray);
}

function populateInventoryTable(array)
{
    inventoryTable.innerHTML = "<div class=\"inventory__table-row inventory__table-header\">"
                             + "<div class=\"inventory__table-cell width-30\">"
                             + "<p>Item</p></div><div class=\"inventory__table-cell width-30\">"
                             + "<p>Category</p></div><div class=\"inventory__table-cell width-20\">"
                             + "<p>Price</p></div><div class=\"inventory__table-cell width-20\">"
                             + "<p>Modify</p></div></div>";


    for(var i=0; i<array.length; i++)
    {
        var item = array[i];
        var row = new ItemRow(item);
        
        itemMap.set(row.item.id, row);
        
        inventoryTable.appendChild(row.form);
//        s +=    "<form id=\"item-" + item.id + "_form\" method=\"POST\">" 
//          +         "<div class=\"inventory__table-row\">"
//          +             "<div class=\"inventory__table-cell width-30\">"
//          +                 "<p>" + item.name + "</p>"
//          +                 "<input id=\"\" style=\"position: absolute;\" type=\"text\" class=\"inventory__input-hidden\" disabled=\"disabled\">"
//          +             "</div>"
//          +             "<div class=\"inventory__table-cell width-30\">"
//          +                 "<p>" + getCategoryById(item.category).name + "</p>"
//          +             "</div>"
//          +             "<div class=\"inventory__table-cell width-20\">"
//          +                 "<p class=\"itemLabel-" + item.id + "\">" + item.getFormattedPrice() + "</p>"
//          +                 "<input id=\"\" type=\"text\" style=\"position: absolute; z-index: -1;\" class=\"hidden\" disabled=\"disabled\">"
//          +             "</div>"
//          +             "<div class=\"inventory__table-cell inventory__modify-cell width-20\">"
//          +                 "<button class=\"editMarker inventory__modify-button\"><img src=\"content/images/edit.png\" width=\"20\"></button>" //https://img.icons8.com/windows/32/000000/edit--v1.png
//          +                 "<button class=\"deleteMarker inventory__modify-button\"><img src=\"content/images/delete.png\" width=\"20\"></button>"
//          +             "</div>"
//          +         "</div>"
//          +     "</form>";
        
//        console.log(s);

//    var table = document.getElementById("inventory__table"),
//        row = document.createElement("div"),
//        item_div = document.createElement("div"),
//        item_p = document.createElement("p"),
//        cat_div = document.createElement("div"),
//        cat_p = document.createElement("p"),
//        price_div = document.createElement("div"),
//        price_p = document.createElement("p"),
//        mod_div = document.createElement("div"),
//        mod_p = document.createElement("p");
//
//        row.setAttribute("class", "inventory__table-row");
//        
//        item_div.setAttribute("class", "inventory__table-cell width-30");
//        item_p.appendChild(document.createTextNode("Item"));
//        item_div.appendChild(item_p);
//        
//        cat_div.setAttribute("class", "inventory__table-cell width-30");
//        cat_p.appendChild(document.createTextNode("Category"));
//        cat_div.appendChild(item_p);
//        
//        price_div.setAttribute("class", "inventory__table-cell width-20");
//        price_p.appendChild(document.createTextNode("Prices"));
//        price_div.appendChild(item_p);
//        
//        mod_div.setAttribute("class", "inventory__table-cell width-20");
//        mod_p.appendChild(document.createTextNode("Modifications"));
//        mod_div.appendChild(item_p);
//        
//        row.appendChild(item_div);
//        row.appendChild(cat_div);
//        row.appendChild(price_div);
//        row.appendChild(mod_div);
//        table.appendChild(row);
    }
}

function getCategoryById(id)
{   
    for(var i=0; i<categories.length; i++)
    {
        if(categories[i].id === id)
        {
            return categories[i];
        }
    }
    
    return null;
}