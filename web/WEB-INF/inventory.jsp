<%-- 
    Document   : inventory
    Created on : Jul 25, 2021, 2:55:21 PM
    Author     : Main
--%>

<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <script src="scripts/inventory.js"></script>
        <script src="scripts/models.js"></script>
        <script src="scripts/functions.js"></script>
        <script>${generatedVars}</script>
        
        <link rel="stylesheet" type="text/css" href="styles/styles.css" />
        <link rel="stylesheet" type="text/css" href="styles/styles_inventory.css" />
        <title>Inventory</title>
    </head>
    <body onload="load();" style="margin: 0; padding: 0;">
        
        <%@ include file="header.jsp" %>
        <script>loadHeader('${user.getEmail()}', '${user.getFirstName()}', ${user.isAdmin()});</script>
        
        <h1 id="test123"></h1>
        
        <h2>Inventory for ${user.getFirstName()} ${user.getLastName()}</h2>
        
        <div style="display: flex; flex-direction: column; align-items: center;">
            <p style="margin:0;">Search</p>
            <input id="search_input" type="text" style="margin-bottom: 10px;">
            <div id="inventory__table" style="overflow-y: auto;" class="inventory__table">
<!--                <div class="inventory__table-row inventory__table-header">
                    <div class="inventory__table-cell width-30">
                        <p>Item</p>
                    </div>
                    <div class="inventory__table-cell width-30">
                        <p>Category</p>
                    </div>
                    <div class="inventory__table-cell width-20">
                        <p>Price</p>
                    </div>
                    <div class="inventory__table-cell width-20">
                        <p>Modify</p>
                    </div>
                </div>-->
<!--                <div class="inventory__table-row">
                    <form id="" method="POST">
                        <div class="inventory__table-cell width-30">
                            <p>Item</p>
                            <div style="width: 42%"></div>
                        </div>
                        <div class="inventory__table-cell width-30">
                            <p>Category</p>
                        </div>
                        <div class="inventory__table-cell width-20">
                            <p>Price</p>
                        </div>
                        <div class="inventory__table-cell width-20">
                            <p>Modify</p>
                        </div>
                    </form>
                </div>-->
            </div>
        </div>
        
        
<!--        <table>
            <tr>
                <th>Category</th>
                <th>Name</th>
                <th>Price</th>
                <th>Delete</th>
            </tr>
            <c:forEach items="${itemlist}" var="item">
                <tr>
                    <form method="POST">
                        <input name="itemkey" type="hidden" value="${item.getItemID()}">
                        <td name="itemcategory" value="${item.getCategory().getCategoryName()}">${item.getCategory().getCategoryName()}</td>
                        <td name="itemname" value="${item.getItemName()}">${item.getItemName()}</td>
                        <td name="itemprice" value="${item.getItemPrice()}">${item.getItemPrice()}</td>
                        <td><input type="submit" name="action" value="Delete"></td>
                    </form>
                </tr>
            </c:forEach>
        </table>-->
        
        <h2>Add Item</h2>
        
        <form method="POST">
            <label>Category:</label>
            <select name="category">
                <c:forEach items="${categories}" var="category">
                    <option value="${category.getCategoryID()}">${category.getCategoryName()}</option>
                </c:forEach>
            </select>
            <br>
            <label>Name:</label>
            <input type="text" name="itemname">
            <br>
            <label>Price:</label>
            <input type="number" name="itemprice">
            <br>
            <button type="submit" name="action" value="add">Save</button>
        </form>
        <c:if test="${message != null}"><h2>${message}</h2></c:if>
    </body>
</html>