var nameGroup,
    phoneGroup,
    saveButton,
    profileImage,
    profileImageButton,
    deactivateButton;

function load(id)
{
    nameGroup = new InputGroup(document.getElementById("user-name__label"),
                               document.getElementById("user-name__input"),
                               document.getElementById("user-name__message"));
                                
    phoneGroup = new InputGroup(document.getElementById("user-phone__label"),
                                document.getElementById("user-phone__input"),
                                document.getElementById("user-phone__message"));
                                
    saveButton = document.getElementById("profile__button-submit");
    profileImage = document.getElementById("profile__image");
    profileImageButton = document.getElementById("profile__image-button");
    profileImageInput = document.getElementById("profile__file-input");
    deactivateButton = document.getElementById("profile__button-deactivate");
    profileImage.type = "file";
    profileImage.setAttribute("src", getProfileImage(id));
    
    saveButton.addEventListener("click", function(){ updateProfile(); });
    profileImageButton.addEventListener("click", function(){ selectProfileImage(); });
    deactivateButton.addEventListener("click", function(){ deactiveProfile(); });
}

function updateProfile()
{
    if(checkInputs())
    {
        postAction("update", "profile-form", "profile");
    }
}

function selectProfileImage()
{
    profileImageInput.click();
}

function imageSelected()
{
    postAction("image", "profile-form", "profile");
}

function deactiveProfile()
{
    if(confirm("Are you sure you want to deactivate your account?"))
    {
        postAction("deactivate", "profile-form", "profile");
    }
}

function checkInputs()
{
    var allValid = true;
    
    if(inputIsEmpty(phoneGroup.input.value))
    {
        phoneGroup.setMessageText("required");
        phoneGroup.setGroupState("alert");
        
        allValid = false;
    }
    else if(phoneNumberIsInvalid(phoneGroup.input.value))
    {
        phoneGroup.setMessageText("invalid");
        phoneGroup.setGroupState("warning");
        
        allValid = false;
    }
    
    if(inputIsEmpty(nameGroup.input.value))
    {
        nameGroup.setMessageText("required");
        nameGroup.setGroupState("alert");
        
        allValid = false;
    }
    
    return allValid;
}