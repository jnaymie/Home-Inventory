<%-- 
    Document   : newaccount
    Created on : Jul 29, 2021, 12:35:03 PM
    Author     : Main
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <script src="scripts/signup.js"></script>
        <script src="scripts/models.js"></script>
        <script src="scripts/functions.js"></script>
        <link rel="stylesheet" type="text/css" href="styles/styles.css" />
        <title>Create an Account</title>
    </head>
    <body onload="load();">
        <div class="structure__center-align">
            <p class="element__logo">Home       nVentory</p>
            
            <div class="structure__main-section">
                <p class="element__sign-in">Create Account</p>
                
                <!----- NAME ----->
                
                <form id="signup-form" class="structure__form" method="POST">
                    <div class='structure__input-group'>
                        <p id="user-name__label" class="input__label">Name</p>
                        <input id="user-name__input" name="user-name__input" class="input__textbox__base input__textbox__default" type="text"/>
                        <p id="user-name__message" class='input__message__base input__message__default hidden'>-</p>
                    </div>
                    
                    <hr class="page-break input-above">
                    
                    <!----- EMAIL/PHONE ----->
                    
                    <div class="structure__input-group">
                        <p id="user-email__label" class="input__label">Email</p>
                        <input id="user-email__input" name="user-email__input" class="input__textbox__base input__textbox__default" type="text"/>
                        <p id="user-email__message" class='input__message__base input__message__default hidden'>-</p>
                    </div>
                    <div class="structure__input-group">
                        <p id="user-phone__label" class="input__label">Phone</p>
                        <input id="user-phone__input" name="user-phone__input" class="input__textbox__base input__textbox__default" type="text"/>
                        <p id="user-phone__message" class='input__message__base input__message__default hidden'>-</p>
                    </div>
                    
                    <hr class="page-break input-above">
                    
                    <!----- PASSWORD ----->
                    
                    <div class="structure__input-group">
                        <p id="user-pass1__label" class="input__label">Password</p>
                        <input id="user-pass1__input" name="user-pass1__input" class="input__textbox__base input__textbox__default" type="password"/>
                        <p id="user-pass1__message" class='input__message__base input__message__default hidden'>-</p>
                    </div>
                    <div class="structure__input-group">
                        <p id="user-pass2__label" class="input__label">Confirm password</p>
                        <input id="user-pass2__input" name="user-pass2__input" class="input__textbox__base input__textbox__default" type="password"/>
                        <p id="user-pass2__message" class='input__message__base input__message__default hidden'>-</p>
                    </div>
                    
                    <hr class="page-break input-above">
                    
                    <button id="sign-up__button-submit" class="input__button__base" name="action" type="button" value="createaccount">Sign up</button>
                    <input id="action" name='action' type="hidden">
                </form>
            </div>
        </div>
</html>
