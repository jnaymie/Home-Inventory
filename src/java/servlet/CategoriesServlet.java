/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package servlet;

import java.io.IOException;
import java.io.PrintWriter;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.*;
import service.*;

/**
 *
 * @author Main
 */
public class CategoriesServlet extends HttpServlet
{
    private static final
    String CATEGORIES_ATT = "categories",
           CATEGORIES_JSP_DIR = "/WEB-INF/categories.jsp",
           CATEGORIES_REDIR = "categories",
           IS_EDIT = "isEdit",
           USER_ID = "userID";
    
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
        InventoryService inventoryService = new InventoryService();
        try
        {
            request.setAttribute("categories", inventoryService.getAllCategories());
            request.setAttribute("isEdit", false);
            getServletContext().getRequestDispatcher(CATEGORIES_JSP_DIR).forward(request, response);
        }
        catch(Exception exception)
        {
            exception.printStackTrace();
        }
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
            case "Save":
                updateCategory(request, response);
                break;
            
            case "Add":
                addCategory(request, response);
                break;
                
            case "Edit":
                editCategory(request, response);
                break;
                
            case "Delete":
                deleteCategory(request, response);
                break;
                
            case "Cancel":
                response.sendRedirect(CATEGORIES_REDIR);
                break;
        }
    }

    private void updateCategory(HttpServletRequest request, HttpServletResponse response)
    {
        InventoryService inventoryService = new InventoryService();
        
        try
        {
            switch(inventoryService.updateCategory(Integer.parseInt(request.getParameter("categories__edit-id")),
                                                                    request.getParameter("categories__edit-name")))
            {
                case EMPTY_INPUT:
                    request.setAttribute("message", "Input cannot be empyt");
                    request.setAttribute(IS_EDIT, false);
                    getServletContext().getRequestDispatcher(CATEGORIES_JSP_DIR).forward(request, response);
                    return;
                    
                case SUCCESS:
                    response.sendRedirect(CATEGORIES_REDIR);
                    return;
            }
        }
        catch(Exception e)
        {
            e.printStackTrace();
        }
    }

    private void addCategory(HttpServletRequest request, HttpServletResponse response)
    {
        InventoryService inventoryService = new InventoryService();
        
        try
        {
            switch(inventoryService.insertNewCategory(request.getParameter("categories__edit-name")))
            {
                case EMPTY_INPUT:
                    request.setAttribute("message", "Input cannot be empyt");
                    request.setAttribute(IS_EDIT, false);
                    getServletContext().getRequestDispatcher(CATEGORIES_JSP_DIR).forward(request, response);
                    return;
                    
                case SUCCESS:
                    response.sendRedirect(CATEGORIES_REDIR);
                    return;
            }
        }
        catch(Exception e)
        {
            e.printStackTrace();
        }
    }

    private void editCategory(HttpServletRequest request, HttpServletResponse response)
    {
        InventoryService inventoryService = new InventoryService();
        
        try
        {
            request.setAttribute(IS_EDIT, true);
            request.setAttribute("categories", inventoryService.getAllCategories());
            request.setAttribute("editCategory", inventoryService.getCategory(Integer.parseInt(request.getParameter("categorykey"))));
            
            getServletContext().getRequestDispatcher(CATEGORIES_JSP_DIR).forward(request, response);
        }
        catch(Exception exception)
        {
            exception.printStackTrace();
        }
    }

    private void deleteCategory(HttpServletRequest request, HttpServletResponse response)
    {
        InventoryService inventoryService = new InventoryService();
        
        try
        {
            switch(inventoryService.deleteCategory(Integer.parseInt(request.getParameter("categorykey"))))
            {
                case EMPTY_INPUT:
                    request.setAttribute("message", "Input cannot be empyt");
                    request.setAttribute(IS_EDIT, false);
                    getServletContext().getRequestDispatcher(CATEGORIES_JSP_DIR).forward(request, response);
                    return;
                    
                case SUCCESS:
                    response.sendRedirect(CATEGORIES_REDIR);
                    return;
            }
        }
        catch(Exception e)
        {
            e.printStackTrace();
        }
    }
}
