<%-- 
    Document   : profile
    Created on : Aug 14, 2021, 1:59:16 AM
    Author     : Main
--%>

<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <script src="scripts/profile.js"></script>
        <script src="scripts/models.js"></script>
        <script src="scripts/functions.js"></script>
        <link rel="stylesheet" type="text/css" href="styles/styles.css" />
        <title>Profile</title>
    </head>
    <body onload="load('${user.getEmail()}');" style="margin: 0; padding: 0;">
        <%@ include file="header.jsp" %>
        <script>loadHeader('${user.getEmail()}', '${user.getFirstName()}', ${user.isAdmin()});</script>
        <br>
        
        <div class="structure__center-align">
            
            <div class="structure__main-section">
                <p class="element__sign-in">Profile</p>
                <c:if test="${newUser == true}">
                    <p>Welcome ${user.getName()}!</p>
                </c:if>
                
                
                <!----- NAME ----->
                
                <form enctype='multipart/form-data' id="profile-form" class="structure__form" method="POST">
                    <div style="display: flex; flex-direction: column; margin-bottom: 10px;">
                        <img id="profile__image" width="120" height="120" style="border-radius: 50%; margin-bottom: 5px;">
                        <button id="profile__image-button" type="button">Change profile image</button>
                        <input id="profile__file-input" name="file" size="60" type="file" style="display: none;" onchange="imageSelected();">
                    </div>
                    <div class='structure__input-group'>
                        <p id="user-name__label" class="input__label">Name</p>
                        <input id="user-name__input" name="user-name__input" class="input__textbox__base input__textbox__default" type="text" value="${user.getName()}" onchange=""/>
                        <p id="user-name__message" class='input__message__base input__message__default hidden'>-</p>
                    </div>
                    
                    <!----- EMAIL/PHONE ----->
                    
                    
                    <div class="structure__input-group">
                        <p id="user-phone__label" class="input__label">Phone</p>
                        <input id="user-phone__input" name="user-phone__input" class="input__textbox__base input__textbox__default" type="text" value="${user.getPhone()}"/>
                        <p id="user-phone__message" class='input__message__base input__message__default hidden'>-</p>
                    </div>
                    
                    <hr class="page-break input-above">
                    
                    <button id="profile__button-submit" class="input__button__base" name="action" type="button" value="save">Save</button>
                    
                    <hr class="page-break input-above">
                    
                    <button id="profile__button-deactivate" class="input__button__base" type="button">Deactivate</button>
                    <input id="action" name='action' type="hidden">
                </form>
            </div>
        </div>
    </body>
</html>