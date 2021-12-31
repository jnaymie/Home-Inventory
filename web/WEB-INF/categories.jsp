<%-- 
    Document   : categories
    Created on : Aug 17, 2021, 7:14:06 PM
    Author     : Main
--%>

<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>Categories</title>
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
        
        <h2>Manage Categories</h2>
        
        <table>
            <tr>
                <th>ID</th>
                <th>Name</th>
            </tr>
            <c:forEach items="${categories}" var="category">
                <tr>
                    <form method="POST">
                        <input name="categorykey" type="hidden" value="${category.getCategoryID()}">
                        <td name="username" value="${category.getCategoryName()}">${category.getCategoryName()}</td>
                        <td><input type="submit" name="action" value="Delete"></td>
                        <td><input type="submit" name="action" value="Edit"></td>
                    </form>
                </tr>
            </c:forEach>
        </table>
        
        <c:if test="${isEdit == true}"><h2>Edit Category</h2></c:if>
        <c:if test="${isEdit == false}"><h2>Add Category</h2></c:if>
        
        <form method="POST">
            <label>Name:</label>
            <input name="categories__edit-id" type="hidden" value="${editCategory.getCategoryID()}">
            <input name="categories__edit-name" type="text" name="name" value="${editCategory.getCategoryName()}">
            <br>
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