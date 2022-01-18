class PageBreak
{
    constructor(className)
    {
        this.pageBreak = document.createElement("hr");
        this.addClass(className);
    }
    
    addClass(className)
    {
        this.pageBreak.classList.add(className);
    }
    
    removeClass(className)
    {
        this.pageBreak.classList.remove(className);
    }
}