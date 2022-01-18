const INPUTGROUP_STATE_DEFAULT = "default";
const INPUTGROUP_STATE_WARNING = "warning";
const INPUTGROUP_STATE_ERROR   = "error";

/**
 * Creates and manages label, input and user message elements for user input.
 * Allows for multiple validations of the inputs value.
 * @author Joshua Naymie <jnaymie@gmail.com>
 */
class InputGroup
{
    /**
     * Constructor for InputGroup
     * @param {string} className  The base CSS class name used.
     *                            A class for each element and desired state must also exist.
     */
    constructor(className, id)
    {
        this.validators = [];

        this.className = className;

        this.createElements();
        this.setupElements(id);
        this.setState(INPUTGROUP_STATE_DEFAULT, "-");
    }

    /**
     * Creates all elements used by the InputGroup
     */
    createElements()
    {
        this.container = document.createElement("div"); 

        this.label = document.createElement("label");
        this.input = document.createElement("input");
        this.message = document.createElement("label");
    }

    /**
     * Sets the InputGroup's label text.
     * @param {string} text  The text to set the InputGroup's label to.
     */
    setLabelText(text)
    {
        this.label.innerText = text;
    }

    /**
     * Assigns all elements their base CSS class.
     * Append all elements to the container.
     */
    setupElements(id)
    {
        this.container.classList.add(this.className);

        this.label.id = `${id}__label`;
        this.label.name = `${id}__label`;
        this.label.classList.add(`${this.className}__label`);
        this.container.appendChild(this.label);

        this.input.id = `${id}__input`;
        this.input.name = `${id}__input`;
        this.input.classList.add(`${this.className}__input`);
        this.container.appendChild(this.input);

        this.message.id = `${id}__message`;
        this.message.name = `${id}__message`;
        this.message.classList.add(`${this.className}__message`);
        this.container.appendChild(this.message);
    }

    /**
     * Sets the InputGroup's state.
     * Removes existing CSS state classes and adds new ones.
     * Outputs error to console if new state is invalid.
     * @param {string} state    The state to assign. Can be 'default', 'warning', 'error'.
     *                          Throws exception if parameter is not one of the aforementioned.
     * @param {string} message  The message to be displayed to the user.
     *                          Set to empty string if parameter not provided.
     */
    setState(state, message)
    {
        switch(state)
        {
            case INPUTGROUP_STATE_DEFAULT:
            case INPUTGROUP_STATE_WARNING:
            case INPUTGROUP_STATE_ERROR:
                this.removeStateClasses();
                this.state = state;
                this.addStateClasses();
                if(message != null)
                {
                    this.message.innerText = message;
                }
                break;

            default:
                console.log(this);
                throw `invalid state - ${state}`;
        }
    }

    /**
     * Adds CSS state classes to every element based on the InputGroup's current state
     */
    addStateClasses()
    {
        this.label.classList.add(`${this.className}__label--${this.state}`);
        this.input.classList.add(`${this.className}__input--${this.state}`);
        this.message.classList.add(`${this.className}__message--${this.state}`);
    }

    /**
     * Removes the CSS state classes based on the InputGroup's current state
     */
    removeStateClasses()
    {
        this.label.classList.remove(`${this.className}__label--${this.state}`);
        this.input.classList.remove(`${this.className}__input--${this.state}`);
        this.message.classList.remove(`${this.className}__message--${this.state}`);
    }
    
    /**
     * Sets action taken on pressing the enter key.
     * Removes any previous enter function.
     * Can be a function, another InputGroup, or an HTML Element.
     * If InputGroup or HTML Element. Focus will be switched on enter.
     * @param {function | InputGroup | Element} action
     */
    setEnterFunction(action)
    {
        this.removeEnterFunction();
        
        if(typeof action === "function")
        {
            this.enterFunction = action;
        }
        else
        {
            let element = action instanceof InputGroup ? action.input : action;
            
            this.enterFunction = (e) => { if(e.keyCode === 13) {element.focus();} };
        }
        
        this.input.addEventListener("keydown", this.enterFunction)
    }
    
    /**
     * Removes any existing enter function
     */
    removeEnterFunction()
    {
        if(this.enterFunction != null)
        {
            this.input.removeEventListener("keydown", this.enterFunction);
        }
    }

    /**
     * Adds a Validator to the InputGroup.
     * @param {RegExp} validation         The RegExp object to be checked against
     * @param {string} invalidState  The state the InputGroup will be set to if input is invalid.
     *                               Ex: INPUT_GROUP_WARNING_STATE
     * @param {string} message       The message shown if input is invalid
     */
    addValidator(validation, invalidState, message)
    {
        this.validators.push(new Validator(validation, invalidState, message));
    }

    /**
     * Removes a Validator with a matching RegExp object.
     * @param {RegExp} validation  The RegExp object to match.
     */
    removeValidator(validation)
    {
        for(let i=0; i<this.validators.length; i++)
        {
            if((this.validators[i].validate === validation)
            || (this.validators[i].regex === validation))
            {
                this.validators.splice(i, 1);
            }
        }
    }

    /**
     * Tests input's current value against all attached Validators
     * @returns true if all validations pass, otherwise returns false
     */
    validateInput()
    {
        for(let i=0; i<this.validators.length; i++)
        {
            if(!this.validators[i].validate(this.input.value))
            {
                this.setState(this.validators[i].invalidState, this.validators[i].message);
                
                return false;
            }
        }

        if(this.state !== INPUTGROUP_STATE_DEFAULT)
        {
            this.setState(INPUTGROUP_STATE_DEFAULT);
        }

        return true;
    }
}