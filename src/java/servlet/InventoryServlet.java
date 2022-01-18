/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package servlet;

import java.io.IOException;
import java.util.List;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.*;
import model.*;
import service.AccountService;
import service.InventoryService;

/**
 *
 * @author Main
 */
public class InventoryServlet extends HttpServlet
{
    private static final
    String INVENTORY_JSP_DIR = "/WEB-INF/inventory.jsp";
    
    // <editor-fold defaultstate="collapsed" desc="HttpServlet methods. Click on the + sign on the left to edit the code.">
    /**
     * Handles the HTTP <code>GET</code> method.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
    throws ServletException, IOException
    {
        HttpSession session = request.getSession(false);
        
        AccountService accountService = new AccountService();
        InventoryService inventoryService = new InventoryService();
        try
        {
//            User user = accountService.get((String) session.getAttribute("username"));
            String userID = (String) session.getAttribute(Global.USER_ID);
            request.setAttribute("generatedVars", generateJavaScriptVars(userID));
            request.setAttribute("user", accountService.get(userID));
            request.setAttribute("categories", inventoryService.getAllCategories());
        }
        catch(Exception exception)
        {
            exception.printStackTrace();
        }
        
        getServletContext().getRequestDispatcher(INVENTORY_JSP_DIR).forward(request, response);
    }

    /**
     * Handles the HTTP <code>POST</code> method.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
    throws ServletException, IOException
    {
        switch(request.getParameter("action"))
        {
            case "add":
                addItem(request, response);
                break;
                
            case "update":
                updateItem(request, response);
                response.sendRedirect("inventory");
                break;
                
            case "delete":
                removeItem(request, response);
                break;
            
        }
    }

    private void addItem(HttpServletRequest request, HttpServletResponse response)
    {
        InventoryService inventoryService = new InventoryService();
        
        try
        {
            switch(inventoryService.insertItem(request.getParameter("itemname"),
                                               request.getParameter("itemprice"), 
                                               request.getParameter("category"), 
                                      (String) request.getSession(false).getAttribute("userID")))
            {
                case SUCCESS:
                    response.sendRedirect("inventory");
                    break;
                
                case EMPTY_INPUT:
                    request.setAttribute("categories", inventoryService.getAllCategories());
                    request.setAttribute("message", "Please enter all fields");
                    
                    getServletContext().getRequestDispatcher(INVENTORY_JSP_DIR).forward(request, response);
                    break;
                    
                case INVALID_PERMISSION:
                    break;
                    
                case INVALID_PRICE:
                    request.setAttribute("categories", inventoryService.getAllCategories());
                    request.setAttribute("message", "invalid price");
                    
                    getServletContext().getRequestDispatcher(INVENTORY_JSP_DIR).forward(request, response);
                    break;
                    
                case INVALID_CATEGORYID:
                    request.setAttribute("categories", inventoryService.getAllCategories());
                    request.setAttribute("message", "invalid price");
                    
                    getServletContext().getRequestDispatcher(INVENTORY_JSP_DIR).forward(request, response);
                    break;
            }
        }
        catch(Exception exception)
        {
            exception.printStackTrace();
        }
        
    }

    private void removeItem(HttpServletRequest request, HttpServletResponse response)
    {
        AccountService accountService = new AccountService();
        InventoryService inventoryService = new InventoryService();
        
        try
        {
            switch(inventoryService.deleteItem(Integer.parseInt(request.getParameter("itemID")),
                                               (String) request.getSession().getAttribute("userID")))
            {
                case SUCCESS:
                    response.sendRedirect("inventory");
                    break;
                    
                case EMPTY_INPUT:
                    request.setAttribute("categories", inventoryService.getAllCategories());
                    request.setAttribute("message", "Please fill all fields to save a new item");
                    
                    getServletContext().getRequestDispatcher(INVENTORY_JSP_DIR).forward(request, response);
                    break;
                    
                case INVALID_PERMISSION:
                    
                    request.setAttribute("categories", inventoryService.getAllCategories());
                    request.setAttribute("message", "You do not have permession do delete this item");
                    
                    getServletContext().getRequestDispatcher(INVENTORY_JSP_DIR).forward(request, response);
                    break;
            }
            
            
        }
        catch(Exception exception)
        {
            exception.printStackTrace();
        }
    }
    
    private String generateJavaScriptVars(String userID) 
    {
        String s = "";
        AccountService accountService = new AccountService();
        InventoryService inventoryService = new InventoryService();
        try
        {
            User user = accountService.get(userID);
            List<Category> categories = inventoryService.getAllCategories();
            List<Item> items = user.getItemList();
            
            boolean hasItems = items.size() > 0,
                    hasCategories = categories.size() > 0;
            
            
            if(hasItems || hasCategories)
            {
                s += "var ";
                
                if(hasItems)
                {
                    s += "items = [";
                    
                    for(int i=0; i<items.size(); i++)
                    {
                        Item item = items.get(i);
                        s += "new Item(" + item.getItemID() + ",\"" + item.getItemName() + "\"," + item.getItemPrice() + "," + item.getCategory().getCategoryID() + ")";
                        s += i < items.size() - 1 ? "," : "";
                    }
                    s += "]";
                }
                
                if(hasCategories)
                {
                    if(hasItems)
                    {
                        s += ",";
                    }
                    s += "categories = [";
                    for(int i=0; i<categories.size(); i++)
                    {
                        Category category = categories.get(i);
                        s += "new Category(" + category.getCategoryID() + ",\"" + category.getCategoryName() + "\")";
                        s += i < categories.size() - 1 ? "," : "";
                    }
                    s += "]";
                }
                
                s += ";";
                
            }
        }
        catch(Exception e)
        {
            e.printStackTrace();
        }
        
        return s;
    }

    private void updateItem(HttpServletRequest request, HttpServletResponse response)
    {
        InventoryService inventoryService = new InventoryService();
        
        try
        {
            switch(inventoryService.updateItemByCategoryName(request.getParameter("itemID"),
                                                             request.getParameter("name_input"),
                                                             request.getParameter("price_input"),
                                                             request.getParameter("category_input"),
                                                    (String) request.getSession().getAttribute(Global.USER_ID)))
            {
                case EMPTY_INPUT:
                    System.out.println("empty-update");
                    break;
                    
                case SUCCESS:
                    System.out.println("success-update");
                    break;
                    
                default:
                    System.out.println("default-update");
            }
        }
        catch(Exception exception)
        {
            exception.printStackTrace();
        }
    }
}
