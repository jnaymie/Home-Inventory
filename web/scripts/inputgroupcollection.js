/**
 * A collection of InputGroups.
 * Handles adding and removing InputGroups from the collection
 * as well as validating all InputGroups in the collection.
 * @author Joshua Naymie <jnaymie@gmail.com>
 */
class InputGroupCollection
{
    constructor()
    {
        this.inputGroups = [];
    }

    /**
     * Adds an InputGroup to the collection
     * @param {InputGroup} group  The InputGroup to add
     */
    add(group)
    {
        this.inputGroups.push(group);
    }

    /**
     * Removes an InputGroup from the collection
     * @param {InputGroup} group  The InputGroup to remove
     */
    remove(group)
    {
        for(let i=0; i<this.inputGroups.length; i++)
        {
            if(this.inputGroups[i] === group)
            {
                this.inputGroups.splice(i, 1);
            }
        }
    }

    /**
     * Validates all InputGroups in the collection
     * @returns Returns true if all InputGroups are valid. Otherwise returns false.
     */
    validateAll()
    {
        let allValid = true;

        this.inputGroups.forEach(group => {
            allValid = group.validateInput() ? allValid : false;
        });

        return allValid;
    }
}