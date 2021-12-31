function postAction(anAction, form, page)
{
    var input = document.getElementById("action").value = anAction;
    
    postActionToInput(anAction, input, form, page);
}

function postActionToInput(anAction, input, form, page)
{
    console.log(anAction);
    input.value = anAction;
    
    document.getElementById(form).action = page;
    document.getElementById(form).method = "POST";
    document.getElementById(form).submit();
}

//-------------------------

function inputIsEmpty(input)
{
    if(input === "" || input === null)
    {
        return true;
    }
    
    return false;
}

//-------------------------

var emailRegEx = new RegExp(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/),
    phoneRegEx = new RegExp(/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/);
    
function emailIsInvalid(email)
{
    return !emailRegEx.test(email);
}

//---------------

function phoneNumberIsInvalid(phoneNumber)
{
    return !phoneRegEx.test(phoneNumber);
}

//-------------------------

function getProfileImage(id)
{
    console.log(id);
    var image = new Image("content/images/user/" + id + ".jpg");
    
    if(true)//image.height > 0)
    {
        return "content/images/user/" + id + ".jpg";
    }
    else
    {
        return "content/images/user/default_profile.png";
    }
}