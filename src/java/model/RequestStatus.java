/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package model;

/**
 *
 * @author Main
 */
public enum RequestStatus
{
    SUCCESS,
    EMPTY_INPUT,
    INVALID_USERNAME_PASSWORD,
    INACTIVE_USER,
    NO_USER_FOUND,
    ID_ALREADY_EXISTS,
    NO_CATEGORY_FOUND,
    NO_ITEM_FOUND,
    INVALID_PERMISSION,
    CANNOT_DELETE_SELF,
    INVALID_PRICE,
    INVALID_CATEGORYID,
    NON_MATCHING_PASSWORDS
}
