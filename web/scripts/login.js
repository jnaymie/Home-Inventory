document.addEventListener('DOMContentLoaded', load, false);

const usernameValidation = (input) => { return (REGEX_PHONE.test(input) || REGEX_EMAIL.test(input)); };
const usernameSubmission = (e) => { if(e.keyCode === 13) { e.preventDefault(); userIDButtonPressed(); }; };

const MESSAGE_REQUIRED = "required";
const MESSAGE_INVALID = "invalid";
const UI_USERNAME = "username";
const UI_PASSWORD = "password";
const UI_SIGNUP = "signup";

var userIdInput,
    userIdSubmit,
    passwordInput,
    userIDButton,
    newAccountButton,
    userPasswordButton,
    uiArea,
    loginArea,
    userNameDisplay;
    
var serverResponse;

//-------------------------

function load()
{
    uiArea = document.getElementById("ui-area");
    mainDiv = document.getElementById("content-area");
    loginArea = document.createElement("div");
    
    switch(pageState)
    {
        case "login":
            uiArea.style.maxHeight = "244px";
            uiArea.style.minHeight = "244px";
            createLoginArea();
            createUsernameArea();
            break;
        
        case "signup":
            uiArea.classList.add("signup-height");
            createSignupArea();
            break;
        
        default:
            throw `Invalid page state - ${pageState}`;
            break;
    }
    
    
//    if(userFound)
//    {
//        passwordInput = new InputGroup("main-input", "user-password");
//        passwordInput.setLabelText("Email or phone number:");
//        passwordInput.addValidator(REGEX_NOT_EMPTY, INPUTGROUP_STATE_ERROR, MESSAGE_REQUIRED);
//        passwordInput.addValidator(usernameValidation, INPUTGROUP_STATE_WARNING, MESSAGE_INVALID);
//        // document.getElementById("username-input-area").appendChild(passwordInput);
//
//        // userPasswordGroup = new InputGroup(document.getElementById("user-password__label"),
//        //                                    document.getElementById("user-password__input"),
//        //                                    document.getElementById("user-password__message"));
//                                           
//        userPasswordButton = document.getElementById("user-password__button");
//        userPasswordButton.addEventListener("click", function(){ userPasswordButtonPressed(); });
//    }
//    else
//    {
//        let temp = new LoadingAnim();
//        document.getElementById("user-id__button-continue").appendChild(temp.container);
//        document.getElementById("temp").appendChild(temp.container);
//        
//        userIdInput = new InputGroup("main-input", "user-id-input");
//        userIdInput.setLabelText("Email or phone number:");
//        userIdInput.addValidator(REGEX_NOT_EMPTY, INPUTGROUP_STATE_ERROR, MESSAGE_REQUIRED);
//        userIdInput.addValidator(usernameValidation, INPUTGROUP_STATE_WARNING, MESSAGE_INVALID);
//        userIdInput.setEnterFunction(usernameSubmission);
//        document.getElementById("username-input-area").appendChild(userIdInput.container);
//        
//        userIdSubmit = new Button("input__button__base", "user-id-submit");
//        userIdSubmit.setContent("Continue");
//        userIdSubmit.addClass("inputspacing");
//        userIdSubmit.setOnClick(userIDButtonPressed);
//        document.getElementById("username-input-area").appendChild(userIdSubmit.button);
//        
//        
//        
//        // userIDGroup = new InputGroup(document.getElementById("input__label"),
//        //                              document.getElementById("user-id__input"),
//        //                              document.getElementById("user-id__message"));
//                                         
//        userIDButton = document.getElementById("user-id__button-continue");
//        newAccountButton = document.getElementById("user-id__button-signup");
//        
//        userIDButton.addEventListener("click", function(){ userIDButtonPressed(); });
//        newAccountButton.addEventListener("click", function(){ newAccountButtonPressed(); });
//    }
}

function createLoginArea()
{
    mainLabel = document.createElement("p");
    mainLabel.innerText = "Sign in";
    mainLabel.classList.add("element__sign-in");
    mainDiv.appendChild(mainLabel);
    mainDiv.appendChild(loginArea);
}

function createUsernameArea()
{
    let usernameArea = document.createElement("div");
    
    userIdInput = new InputGroup(CSS_MAIN_INPUT, "user-id-input");
    userIdInput.setLabelText("Email or phone number:");
    userIdInput.addValidator(REGEX_NOT_EMPTY, INPUTGROUP_STATE_ERROR, MESSAGE_REQUIRED);
    userIdInput.addValidator(usernameValidation, INPUTGROUP_STATE_WARNING, MESSAGE_INVALID);
    userIdInput.setEnterFunction(usernameSubmission);
    if(serverResponse != null && serverResponse.userFound)
    {
        userIdInput.input.value = serverResponse.userId;
    }
    usernameArea.appendChild(userIdInput.container);
    
    userIdSubmit = new Button(CSS_BUTTON_BASE, "user-id-submit");
    userIdSubmit.setContent("Continue");
    userIdSubmit.addClass(CSS_INPUT_SPACING);
    userIdSubmit.setOnClick(userIDButtonPressed);
    usernameArea.appendChild(userIdSubmit.button);
    
    usernameArea.appendChild(new PageBreak(CSS_PAGE_BREAK).pageBreak);
    
    newAccountButton = new Button(CSS_BUTTON_BASE);
    newAccountButton.setContent("Signup");
    newAccountButton.addClass(CSS_INPUT_SPACING);
    newAccountButton.setOnClick(() => { window.location.href = "signup"; } );
    usernameArea.appendChild(newAccountButton.button);
    
    loginArea.appendChild(usernameArea);
    
//    mainDiv.appendChild(loginArea);
    
//    setTimeout(() => { loginArea.classList.add("no_opacity"); }, 2000 );
//    setTimeout(() => {uiArea.classList.add("login-height"); setTimeout(() => { mainDiv.classList.remove("no_opacity"); mainDiv.classList.add("full_opacity"); }, 500);}, 50);
    
}

function createPasswordArea(userId)
{
    let loginForm = document.createElement("form");
    loginForm.id = "loginform";
    loginForm.method = "POST";
    
    let userIdInput = document.createElement("input");
    userIdInput.type = "hidden";
    userIdInput.id = "user-id-input";
    userIdInput.name = "user-id-input";
    userIdInput.value = serverResponse.userId;
    loginForm.appendChild(userIdInput);
    
    let actionInput = document.createElement("input");
    actionInput.type = "hidden";
    actionInput.id = "action";
    actionInput.name = "action";
    actionInput.value = "login";
    loginForm.appendChild(actionInput);
    
    userNameDisplay = document.createElement("p");
    userNameDisplay.innerText = `${serverResponse.userId} `;
    
    let changeLink = document.createElement("span");
    userNameDisplay.classList.add("username__display");
    changeLink.classList.add("username__link");
    changeLink.innerText = "Change";
    changeLink.addEventListener("click", () => { switchUI(UI_USERNAME); });
    userNameDisplay.appendChild(changeLink);
    
    loginForm.appendChild(userNameDisplay);
    
    passwordInput = new InputGroup(CSS_MAIN_INPUT, "password-input");
    passwordInput.setLabelText("Password:");
    passwordInput.addValidator(REGEX_NOT_EMPTY, INPUTGROUP_STATE_ERROR, MESSAGE_REQUIRED);
    passwordInput.setEnterFunction(usernameSubmission);
    passwordInput.input.type = "password";
    loginForm.appendChild(passwordInput.container);
    
    loginForm.appendChild(new PageBreak(CSS_PAGE_BREAK).pageBreak);
    
    let passwordSubmit = new Button(CSS_BUTTON_BASE);
    passwordSubmit.setContent("Login");
    passwordSubmit.setOnClick(() => {postAction("login", "loginform", "login");});
    
    loginForm.appendChild(passwordSubmit.button);
    
    loginArea.appendChild(loginForm);
    
    
}

//-------------------------
var request;
function userIDButtonPressed()
{
    if(userIdInput.validateInput())
    {
        userIdSubmit.setContent(new LoadingAnim().container);
        
        let userId = userIdInput.input.value;
        let idType;

        if(REGEX_EMAIL.test(userId))
        {
            idType = "email";
        }
        else if(REGEX_PHONE.test(userId))
        {
            idType = "phone";
        }

        let ajaxUrl = `accountchecker?userId=${userId}&idType=${idType}`;

        if(window.XMLHttpRequest)
        {
            request=new XMLHttpRequest();
        }
        else if(window.ActiveXObject)
        {
            request=new ActiveXObject("Microsoft.XMLHTTP");
        }

        try
        {
            request.onreadystatechange=getServerResponse;
            request.open("GET",ajaxUrl,true);
            request.send();
        }
        catch(e)
        {
            alert("Unable to connect to server");
        }
    }
//    if(userIdInput.validateInput())
//    {
//        var userID = userIdInput.input.value;
//
//        var loginType = document.getElementById("login_type");
//        
//        if(REGEX_EMAIL.test(userID))
//        {
//            loginType.value = "email";
//        }
//        else if(REGEX_PHONE.test(userID))
//        {
//            loginType.value = "phone";
//        }
//        
//        postAction("continue", "loginform", "login");
//    }
}


function getServerResponse()
{
    if(request.readyState===4)
    {
//        console.log(request.responseText);
        serverResponse = JSON.parse(request.responseText);
        
        if(serverResponse.userFound)
        {
//            setTimeout(() => {switchUI(UI_PASSWORD)}, 5000);
            switchUI(UI_PASSWORD);
//            removeAllChildren(loginArea);
//            createPasswordArea(serverResponse.userId);
//            uiArea.classList.add("fade-out");
//            setTimeout(f = () => { uiArea.classList.add("fade-in"); uiArea.classList.remove("fade-out"); setTimeout(f = () => { uiArea.classList.remove("fade-in"); }, 360);}, 360);
        }
        else
        {
            userIdInput.setState(INPUTGROUP_STATE_ERROR, "user not found");
        }
//        console.log(`userFound: ${serverResponse.userFound}\nuserId: ${serverResponse.userId}\nstate: ${serverResponse.state}\nmessage: ${serverResponse.message}`);
    }
}

function switchUI(uiType)
{
//    uiArea.addEventListener("transitionend", f = (uiType) => {
//        removeAllChildren(uiArea);
        switch(uiType)
        {
            case UI_USERNAME:
                setTimeout(() => { removeAllChildren(loginArea); createUsernameArea(); fadeIn(loginArea); }, fadeOut(loginArea));
                break;

            case UI_PASSWORD:
                setTimeout(() => { removeAllChildren(loginArea); createPasswordArea(); fadeIn(loginArea); }, fadeOut(loginArea));
                break;

            case SIGNUP:
                
                break;
            
            default:
                throw `Invalid uiType - ${uiType}`;
                break;
        }
//    });
//    uiArea.classList.add("fade-out");
    
    
}

function fadeOut(element)
{
    element.classList.remove("full_opacity");
    element.classList.add("no_opacity");
    
    return CSS_FADE_TIME_MS;
}

function fadeIn(element)
{
    element.classList.remove("no_opacity");
    element.classList.add("full_opacity");
    
    return CSS_FADE_TIME_MS;
}

//-------------------------

function newAccountButtonPressed()
{
    postAction("newaccount", "loginform", "login");
}

function userPasswordButtonPressed()
{
    console.log("ssss");
    if(inputIsEmpty(passwordInput.getInputText()))
    {
        
        passwordInput.setMessageText("required");
        passwordInput.setGroupState("alert");
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
                userIdInput.setGroupState("warning");
                break;
        }
    }
}