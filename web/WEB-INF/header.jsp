<%-- 
    Document   : header
    Created on : Aug 4, 2021, 1:14:25 PM
    Author     : Main
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<script src="scripts/header.js"></script>

<link rel="stylesheet" href="styles/styles_header.css">
<link rel="stylesheet" href="styles/styles.css">
<div id="header" class="header">
    <div id="header__logo" class="header__logo-section">
        <p class="header__logo top-logo">Home</p>
        <p class="header__logo bottom-logo">nVentory</p>
    </div>
    <div id="header__profile" class="header__profile">
        <img id="header__profile-image" class="header__profile-image" src="content/images/profile-photo.png">
        <label id="header__profile-username"></label>
        <!--<p class="header__profile-label">Josh N.</p>-->
        <div id="header__profile-dropdown" class="header__profile-dropdown header__profile-dropdown__hide">
            <a class="header__profile-dropdown-link" href="profile">Profile</a>
            <hr class="header__profile-dropdown-hr">
            <a id="adminLink" class="header__profile-dropdown-link" href="admin">Admin</a>
            <hr id="adminLinkHR" class="header__profile-dropdown-hr">
            <a class="header__profile-dropdown-link" href="login">Sign out</a>
        </div>
    </div>
</div>