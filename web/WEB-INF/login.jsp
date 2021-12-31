<%-- 
    Document   : login
    Created on : Jul 25, 2021, 12:05:59 AM
    Author     : Main
--%>

<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>

<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
         <script src="scripts/login.js"></script>
         <script src="scripts/models.js"></script>
         <script src="scripts/functions.js"></script>
         <script>var userFound = ${userFound}${scriptParams}; </script>
         <script type="text/javascript" src="scripts/test.jsp"></script>

        <link rel="stylesheet" type="text/css" href="styles/styles.css" />
        <title>Login</title>
    </head>
    <body onload="load();">
        <div class="structure__center-align">
            <p class="element__logo">Home       nVentory</p>
            
            <c:if test="${alertMessage != null}">
                <div class="login-message">
                    <!--http://clipart-library.com/clipart/320879.htm-->
                    <img src="content/images/alert.png" width="75" height="66">
                    <p class="nomargin">${alertMessage}</p>
                </div>
            </c:if>
            <c:if test="${warningMessage != null}">
                <div class="login-message">
                    <img src="content/images/warning.png" width="75" height="66">
                    <p>${warningMessage}</p>
                </div>
            </c:if>
            
            <div class="structure__main-section">
                <p id="signin" class="element__sign-in">Sign in</p>
                <c:if test="${userFound == false}">
                    <form id="loginform" class="structure__form" method="POST">
                        <div class='structure__input-group'>
                            <input id="login_type" name="login_type" type="hidden">
                            <p class="input__label">Email or phone number</p>
                            <input id="user-id__input" name="user-id__input" class="input__textbox__base input__textbox__default" type="text"/>
                            <p id="user-id__message" class='input__message__base input__message__default hidden'>-</p>
                        </div>
                        <button id="user-id__button-continue" type='button' class="inputspacing input__button__base" type="button" value="contiue">Continue</button>
                        
                        <hr class="page-break">
                        <button id="user-id__button-signup" class="input__button__base" type="button" value="newaccount">New Account</button>
                        <input id="action" name='action' type="hidden">
                    </form>
                </c:if>
                
                <!------------------------>
                
                <c:if test="${userFound == true}">
                    <form id="loginform" class="structure__form" method="POST">
                        <p class="username__display">${userID} <a class='username__link' href="/homenventory/login">Change</a></p>
                        
                        <div class='structure__input-group inputspacing'>
                            <p class="input__label">Password</p>
                            <input id='user-password__input' class="input__textbox__base input__textbox__default" type="password" name="user-password__input"/>
                            <p id="user-password__message" class='input__message__base input__message__default hidden'>-</p>
                        </div>
                        
                        <hr class="page-break input-above">
                        <button id="user-password__button" class="input__button__base" name="user-password__button" type="button" value="contiue">Sign in</button>
                        <input id="action" name='action' type="hidden">
                        <input id="userID" name='userID' type="hidden" value="${userID}">
                    </form>
                </c:if>
            </div>
        </div>
    </body>
</html>