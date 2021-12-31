var userIDGroup,
    userPasswordGroup,
    userIDButton,
    newAccountButton,
    userPasswordButton;

//-------------------------

function load()
{
    if(userFound)
    {
        userPasswordGroup = new InputGroup(document.getElementById("user-password__label"),
                                           document.getElementById("user-password__input"),
                                           document.getElementById("user-password__message"));
                                           
        userPasswordButton = document.getElementById("user-password__button");
        userPasswordButton.addEventListener("click", function(){ userPasswordButtonPressed(); });
    }
    else
    {
        userIDGroup = new InputGroup(document.getElementById("input__label"),
                                     document.getElementById("user-id__input"),
                                     document.getElementById("user-id__message"));
                                         
        userIDButton = document.getElementById("user-id__button-continue");
        newAccountButton = document.getElementById("user-id__button-signup");
        
        userIDButton.addEventListener("click", function(){ userIDButtonPressed(); });
        newAccountButton.addEventListener("click", function(){ newAccountButtonPressed(); }); 
    }
}

//-------------------------

function userIDButtonPressed()
{
    console.log("ssss");
    var userID = userIDGroup.getInputText();
    
    if(inputIsEmpty(userID))
    {
        userIDGroup.setMessageText("required");
        userIDGroup.setGroupState("alert");
    }
    else if(!userIDIsValid(userID))
    {
        userIDGroup.setMessageText("invalid");
        userIDGroup.setGroupState("warning");
    }
    else
    {
        var loginType = document.getElementById("login_type");
        
        if(emailRegEx.test(userID))
        {
            loginType.value = "email";
        }
        else if(phoneRegEx.test(userID))
        {
            loginType.value = "phone";
        }
        
        postAction("continue", "loginform", "login");
    }
}

//-------------------------

function newAccountButtonPressed()
{
    postAction("newaccount", "loginform", "login");
}

function userPasswordButtonPressed()
{
    console.log("ssss");
    if(inputIsEmpty(userPasswordGroup.getInputText()))
    {
        
        userPasswordGroup.setMessageText("required");
        userPasswordGroup.setGroupState("alert");
    }
    else
    {
        console.log("login");
        postAction("login", "loginform", "login");
    }
}

//-------------------------

function userIDIsValid(userID)
{
    emailRegEx = new RegExp(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/);
    phoneRegEx = new RegExp(/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/);
    
    var valid = false;
    
    if(emailRegEx.test(userID))
    {
        valid = true;
    }
    else if(phoneRegEx.test(userID))
    {
        return true;
    }
    
    return valid;
}

function setUserState()
{
    if(userIDInputState !== null
    && !userIDInputState.equals(""))
    {
        switch(userIDInputState )
        {
            case "no_user_found":
                
                break;
                
            case "user_inactive":
                userIDGroup.setGroupState("warning");
                break;
        }
    }
}