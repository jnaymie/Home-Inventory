var nameGroup,
    emailGroup,
    phoneGroup,
    passwordGroup,
    confirmPassGroup;

//-------------------------

function load()
{
    nameGroup = new InputGroup(document.getElementById("user-name__label"),
                               document.getElementById("user-name__input"),
                               document.getElementById("user-name__message"));
                               
    emailGroup = new InputGroup(document.getElementById("user-email__label"),
                                document.getElementById("user-email__input"),
                                document.getElementById("user-email__message"));
                                
    phoneGroup = new InputGroup(document.getElementById("user-phone__label"),
                                document.getElementById("user-phone__input"),
                                document.getElementById("user-phone__message"));
                               
    passwordGroup = new InputGroup(document.getElementById("user-pass1__label"),
                                   document.getElementById("user-pass1__input"),
                                   document.getElementById("user-pass1__message"));
    
    confirmPassGroup = new InputGroup(document.getElementById("user-pass2__label"),
                                      document.getElementById("user-pass2__input"),
                                      document.getElementById("user-pass2__message"));
    
    document.getElementById("sign-up__button-submit").addEventListener("click", function(){ signUpButtonPressed(); });
}

//-------------------------

function signUpButtonPressed()
{
    if(validateInputs())
    {
        postAction("createaccount", "signup-form", "signup");
//
//        document.getElementById("action").value = "createaccount";
//
//        document.getElementById("signup-form").action = "signup";
//        document.getElementById("signup-form").method = "POST";
//        document.getElementById("signup-form").submit();
    }
}

//-------------------------

function validateInputs()
{
    var allValid = true;
    
    allValid = validateName() ? allValid : false;
    allValid = validateEmail() ? allValid : false;
    allValid = validatePhoneNumber() ? allValid : false;
    allValid = validatePassword() ? allValid : false;
    allValid = validateConfirmPassword() ? allValid : false;
    
    return allValid;
}

//---------------

function validateName()
{
    if(inputIsEmpty(nameGroup.getInputText()))
    {
        nameGroup.setMessageText("required");
        nameGroup.setGroupState("alert");
        
        return false;
    }
    
    nameGroup.setGroupState("default");
    return true;
}

//---------------

function validateEmail()
{
    if(inputIsEmpty(emailGroup.getInputText()))
    {
        emailGroup.setMessageText("required");
        emailGroup.setGroupState("alert");
        
        return false;
    }
    if(emailIsInvalid(emailGroup.getInputText()))
    {
        emailGroup.setMessageText("invalid");
        emailGroup.setGroupState("warning");
        
        return false;
    }
    
    emailGroup.setGroupState("default");
    return true;
}

//---------------

function validatePhoneNumber()
{
    if(inputIsEmpty(phoneGroup.getInputText()))
    {
        phoneGroup.setMessageText("required");
        phoneGroup.setGroupState("alert");
        
        return false;
    }
    if(phoneNumberIsInvalid(phoneGroup.getInputText()))
    {
        phoneGroup.setMessageText("invalid");
        phoneGroup.setGroupState("warning");
        
        return false;
    }
    
    phoneGroup.setGroupState("default");
    return true;
}

//---------------

function validatePassword()
{
    if(inputIsEmpty(passwordGroup.getInputText()))
    {
        passwordGroup.setMessageText("required");
        passwordGroup.setGroupState("alert");
        
        return false;
    }
    
    passwordGroup.setGroupState("default");
    return true;
}

//---------------

function validateConfirmPassword()
{
    if(inputIsEmpty(confirmPassGroup.getInputText()))
    {
        confirmPassGroup.setMessageText("required");
        confirmPassGroup.setGroupState("alert");
        
        return false;
    }
    
    confirmPassGroup.setGroupState("default");
    return true;
}