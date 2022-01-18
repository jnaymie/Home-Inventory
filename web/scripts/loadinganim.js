class LoadingAnim
{
    constructor()
    {
        this.container = document.createElement("div");
        this.container.classList.add("loading-anim");
        
        this.container.appendChild(document.createElement("div"));
        this.container.appendChild(document.createElement("div"));
        this.container.appendChild(document.createElement("div"));
    }
}