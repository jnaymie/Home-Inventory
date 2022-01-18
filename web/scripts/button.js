class Button
{
    constructor(className, id)
    {
        this.button = document.createElement("a");
        this.addClass(className);
        this.button.id = id;
    }
    
    /**
     * Sets the content of the Button.
     * Can set text directly with a string or assign custom element to append.
     * @param {string | Element} content  The text to set or element to append.
     */
    setContent(content)
    {
        this.clearContent();
        
        if(typeof content === "string")
        {
            let temp = document.createElement("span");
            temp.innerText = content;
            
            this.button.appendChild(temp);
        }
        else
        {
            this.button.appendChild(content);
        }
    }
    
    clearContent()
    {
        while(this.button.firstChild)
        {
            this.button.removeChild(this.button.firstChild);
        }
    }
    
    addClass(className)
    {
        this.button.classList.add(className);
    }
    
    removeClass(className)
    {
        this.button.classList.remove(className);
    }
    
    setOnClick(action)
    {
        this.button.addEventListener("click", action);
    }
}