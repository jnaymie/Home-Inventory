/**
 * Validates input for an InputGroup and stores information on
 * the state and message displayed by the InputGroup if validation fails.
 * @author Joshua Naymie <jnaymie@gmail.com>
 */
class Validator
{
    /**
     * Constructor for Validator
     * @param {function|RegExp} validation  The method of validation the validator will use.
     *                                      Can be a Function or RegExp object. 
     * @param {string} invalidState         The state to set an InputGroup to when validation fails.
     * @param {string} message              The message the InputGroup will display when validation fails.
     */
    constructor(validation, invalidState, message)
    {
        if(validation instanceof RegExp)
        {
            this.validate = this.validateRegExp;
            this.regex = validation;
        }
        else if(typeof validation === "function")
        {
            this.validate = validation;
        }
        else
        {
            console.log(this);
            throw `Invalid validation - ${validation}`;
        }

        this.invalidState = invalidState;
        this.message = message;
    }

    /**
     * Validates input based on a regular expression
     * @param {string} input The input to validate
     * @returns Returns true if the input passes the RegExp test. Otherwise returns false.
     */
    validateRegExp(input)
    {
        return this.regex.test(input);
    }
}