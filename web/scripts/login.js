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
    
var currentState,
    serverResponse,
    hasLoginArea;

//-------------------------
var a = 0;
function setUIFromState(event)
{
    console.log(event.state.current);
    if(event.state != null)
    {
        switch(event.state.current)
        {
            case UI_PASSWORD:
                if(!trySwitchPassword())
                {
                    history.back();
                }
                break;
        }
//        switchUI(event.state.current);
    }
}

function load()
{
    window.addEventListener("popstate", setUIFromState);
    uiArea = document.getElementById("ui-area");
    mainDiv = document.getElementById("content-area");
    loginArea = document.createElement("div");
    
    switch(pageState)
    {
        case "login":
            hasLoginArea = true;
            currentState = UI_USERNAME;
            uiArea.classList.add("login-height");
            createLoginArea();
            createUsernameArea();
            break;
        
        case "signup":
            hasLoginArea = false;
            currentState = UI_SIGNUP;
            uiArea.classList.add("signup-height");
            createSignupArea();
            break;
        
        default:
            throw `Invalid page state - ${pageState}`;
            break;
    }
    
//    history.replaceState({ current: `${currentState}`}, "asd");
    
    
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

function trySwitchPassword()
{
    if(serverResponse != null
    && serverResponse.userFound)
    {
        console.log("TRUE");
        createPasswordArea(serverResponse.userId);
        return true;
    }
    console.log("FALSE");
    return false;
}

function createLoginArea()
{
    loginArea = document.createElement("div");
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
    newAccountButton.setOnClick(() => { setUI(UI_SIGNUP) });
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
    passwordSubmit.setOnClick(passwordButtonPressed);
    
    loginForm.appendChild(passwordSubmit.button);
    
    loginArea.appendChild(loginForm);
}

function createSignupArea()
{
    let nameInput = new InputGroup(CSS_MAIN_INPUT, "user-name"),
        emailInput = new InputGroup(CSS_MAIN_INPUT, "user-email"),
        phoneInput = new InputGroup(CSS_MAIN_INPUT, "user-phone"),
        password1Input = new InputGroup(CSS_MAIN_INPUT, "user-pass1"),
        password2Input = new InputGroup(CSS_MAIN_INPUT, "user-pass2"),
        inputCollection = new InputGroupCollection(),
        submitButton = new Button(CSS_BUTTON_BASE);
    
    let creator = new DocumentFragment();
    
    let header = document.createElement("p");
    header.classList.add("element__sign-in");
    header.innerText = "Create Account";
    creator.appendChild(header);
    
    let form = document.createElement("form");
    form.id = "signup-form";
    form.method = "POST";
    form.classList.add("structure__form");
    
    inputCollection.add(nameInput);
    inputCollection.add(emailInput);
    inputCollection.add(phoneInput);
    inputCollection.add(password1Input);
    inputCollection.add(password2Input);
    
    nameInput.setLabelText("Name:");
    nameInput.addValidator(REGEX_NOT_EMPTY, INPUTGROUP_STATE_ERROR, MESSAGE_REQUIRED);
    nameInput.addValidator(REGEX_LETTERS, INPUTGROUP_STATE_WARNING, MESSAGE_INVALID);
    nameInput.setEnterFunction(emailInput);
    form.appendChild(nameInput.container);
    
    form.appendChild(new PageBreak(CSS_PAGE_BREAK).pageBreak);
    
    emailInput.setLabelText("Email:");
    emailInput.addValidator(REGEX_NOT_EMPTY, INPUTGROUP_STATE_ERROR, MESSAGE_REQUIRED);
    emailInput.addValidator(REGEX_EMAIL, INPUTGROUP_STATE_WARNING, MESSAGE_INVALID);
    emailInput.setEnterFunction(phoneInput);
    form.appendChild(emailInput.container);
    
    phoneInput.setLabelText("Phone:");
    phoneInput.addValidator(REGEX_NOT_EMPTY, INPUTGROUP_STATE_ERROR, MESSAGE_REQUIRED);
    phoneInput.addValidator(REGEX_PHONE, INPUTGROUP_STATE_WARNING, MESSAGE_INVALID);
    phoneInput.setEnterFunction(password1Input);
    form.appendChild(phoneInput.container);
    
    form.appendChild(new PageBreak(CSS_PAGE_BREAK).pageBreak);
    
    password1Input.setLabelText("Password:");
    password1Input.addValidator(REGEX_NOT_EMPTY, INPUTGROUP_STATE_ERROR, MESSAGE_REQUIRED);
    password1Input.setEnterFunction(password2Input);
    form.appendChild(password1Input.container);
    
    password2Input.setLabelText("Confirm password:");
    password2Input.addValidator(REGEX_NOT_EMPTY, INPUTGROUP_STATE_ERROR, MESSAGE_REQUIRED);
    password2Input.setEnterFunction(password2Input);
    form.appendChild(password2Input.container);
    
    form.appendChild(new PageBreak(CSS_PAGE_BREAK).pageBreak);
    
    submitButton.setContent("Sign up");
    submitButton.setOnClick(() => {console.log("TEST")});
    form.appendChild(submitButton.button);
    
    creator.appendChild(form);
    mainDiv.appendChild(creator);
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
    if(request.readyState === 4)
    {
//        console.log(request.responseText);
        serverResponse = JSON.parse(request.responseText);
        
        if(serverResponse.userFound)
        {
//            setTimeout(() => {switchUI(UI_PASSWORD)}, 5000);
            setUI(UI_PASSWORD);
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

function setUI(uiType)
{
    switch(uiType)
    {
        case UI_USERNAME:
            window.history.pushState({ current: UI_USERNAME },"Login","/homeinventory/login");
            currentState = UI_USERNAME;
            switchUI(UI_USERNAME);
            break;
            
        case UI_PASSWORD:
            window.history.pushState({ current: UI_PASSWORD },"Login","/homeinventory/login");
            currentState = UI_PASSWORD;
            switchUI(UI_PASSWORD);
            break;
            
        case UI_SIGNUP:
            window.history.pushState({ current: UI_SIGNUP },"Login","/homeinventory/signup");
            currentState = UI_SIGNUP;
            switchUI(UI_SIGNUP);
            break;
            
        default:
            throw `Invalid uiType - ${uiType}`;
            break;
    }
    console.log(history);
//    window.history.pushState(currentState,"Signup","/homeinventory/signup");
}

function switchUI(uiType)
{
//    uiArea.addEventListener("transitionend", f = (uiType) => {
//        removeAllChildren(uiArea);
        switch(uiType)
        {
            case UI_USERNAME:
                setTimeout(() => {
                    if(hasLoginArea)
                    {
                        removeAllChildren(loginArea);
                    }
                    else
                    {
                        removeAllChildren(mainDiv);
                        createLoginArea();
                    }
                    uiArea.classList.add("login-height");
                    uiArea.classList.remove("signup-height");
                    createUsernameArea();
                    setTimeout(() => {  fadeIn(hasLoginArea ? loginArea : mainDiv); hasLoginArea = true; }, 500);
                }, fadeOut(hasLoginArea ? loginArea : mainDiv));
                
                break;

            case UI_PASSWORD:
                setTimeout(() => {
                    removeAllChildren(hasLoginArea ? loginArea : mainDiv);
                    uiArea.classList.add("login-height");
                    uiArea.classList.remove("signup-height");
                    createPasswordArea();
                    setTimeout(() => {  fadeIn(hasLoginArea ? loginArea : mainDiv); hasLoginArea = true;}, 500);
                }, fadeOut(hasLoginArea ? loginArea : mainDiv));
                   
                break;

            case UI_SIGNUP:
                
                setTimeout(() => {
                    removeAllChildren(mainDiv);
                    uiArea.classList.remove("login-height");
                    uiArea.classList.add("signup-height");
                    setTimeout(() => { createSignupArea(); fadeIn(mainDiv); hasLoginArea = false;}, 500);
                }, fadeOut(mainDiv));
                
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

function passwordButtonPressed()
{
//    console.log("ssss");
//    console.log(passwordInput.validateInput());
    if(passwordInput.validateInput())
    {
//        console.log("login");
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