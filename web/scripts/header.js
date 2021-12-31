var profileDropdown,
    profileImage;

function loadHeader(id, firstName, isAdmin)
{
    profileDropdown = document.getElementById("header__profile-dropdown");
    profileImage = document.getElementById("header__profile-image");
    
    window.addEventListener("click", function(e) { outsideDropdownClicked(e); });
    document.getElementById("header__logo").addEventListener("click", function(){ logoClicked(); });
    profileImage.setAttribute("src", getProfileImage(id));
    profileImage.addEventListener("click", function(){ profileClicked(); });
    
    document.getElementById("header__profile-username").innerHTML = firstName;
    
    if(!isAdmin)
    {
        document.getElementById("adminLink").style.display = "none";
        document.getElementById("adminLinkHR").style.display = "none";
    }
}

function logoClicked()
{
    window.location.href = "inventory";
}

function profileClicked()
{
    profileDropdown.classList.toggle("header__profile-dropdown__hide");
    profileDropdown.classList.toggle("header__profile-dropdown__show");
    
}

function outsideDropdownClicked(event)
{
    if(!event.target.matches('.header__profile-image')
    && !event.target.matches('.header__profile-dropdown')
    && !event.target.matches('.header__profile-dropdown-link')
    && !event.target.matches('.header__profile-dropdown-hr'))
    {
        var elements = document.getElementsByClassName("header__profile-dropdown");
        for(var i = 0; i < elements.length; i++)
        {
            var currentElement = elements[i];
            if(currentElement.classList.contains('header__profile-dropdown__show'))
            {
                currentElement.classList.toggle('header__profile-dropdown__show');
                currentElement.classList.toggle('header__profile-dropdown__hide');
            }
        }
    }
}