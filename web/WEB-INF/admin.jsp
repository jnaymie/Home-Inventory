<%-- 
    Document   : admin
    Created on : Jul 25, 2021, 12:49:15 PM
    Author     : Main
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>Admin</title>
    </head>
    <body>
        <h1>Home Inventory</h1>
        <h3>Menu</h3>
        <ul>
            <li><a href="inventory">Inventory</a></li>
            <li><a href="admin">Admin</a></li>
            <li><a href="categories">Categories</a></li>
            <li><a href="login?logout">Logout</a></li>
        </ul>
        
        <h2>Manage Users</h2>
        
        <table>
            <tr>
                <th>Username</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Delete</th>
                <th>Edit</th>
                <th>Admin</th>
                <th>Active</th>
            </tr>
            <c:forEach items="${users}" var="user">
                <tr>
                    <form method="POST">
                        <input name="userkey" type="hidden" value="${user.getEmail()}">
                        <td name="username" value="${user.getEmail()}">${user.getEmail()}</td>
                        <td name="firstname" value="${user.getFirstName()}">${user.getFirstName()}</td>
                        <td name="lastname" value="${user.getLastName()}">${user.getLastName()}</td>
                        <td><input type="submit" name="action" value="Delete"></td>
                        <td><input type="submit" name="action" value="Edit"></td>
                        <td><input type="checkbox" name="action" value="Admin" disabled<c:if test="${user.isAdmin() == true}"> checked</c:if>/></td>
                        <td><input type="checkbox" name="action" value="Active" disabled<c:if test="${user.isActive() == true}"> checked</c:if>/></td>
                    </form>
                </tr>
            </c:forEach>
        </table>
        
        <c:if test="${isEdit == true}"><h2>Edit User</h2></c:if>
        <c:if test="${isEdit == false}"><h2>Add User</h2></c:if>
        
        <form method="POST">
            <label>Email:</label>
            <c:if test="${isEdit == true}">
                <input type="hidden" name="email" value="${editUser.getEmail()}">
                <label>${editUser.getEmail()}</label>
            </c:if>
            <c:if test="${isEdit == false}">
                <input type="text" name="email" value="${editUser.getEmail()}">
            </c:if>
            
            <br>
            <label>Password:</label>
            <input type="text" name="password" value="${editUser.getPassword()}">
            <br>
            <label>Phone:</label>
            <input type="text" name="phone" value="${editUser.getPhone()}">
            <br>
            <label>First Name:</label>
            <input type="text" name="firstname" value="${editUser.getFirstName()}">
            <br>
            <label>Last Name:</label>
            <input type="text" name="lastname" value="${editUser.getLastName()}">
            <br>
            <c:if test="${isEdit == true}">
                <label>Admin:</label>
                <input type="checkbox" name="admin" <c:if test="${editUser.isAdmin()}">checked</c:if>>
                <br>
                <label>Active:</label>
                <input type="checkbox" name="active" <c:if test="${editUser.isActive()}">checked</c:if>>
                <br>
            </c:if>
            <c:if test="${isEdit == true}">
                <button type="submit" name="action" value="Save">Save</button>
                <button type="submit" name="action" value="Cancel">Cancel</button>
            </c:if>
            <c:if test="${isEdit == false}">
                <button type="submit" name="action" value="Add">Save</button>
            </c:if>
            <c:if test="${message != null}">
                <h2>${message}</h2>
            </c:if>
            
        </form>
    </body>
</html>