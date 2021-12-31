/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package servlet;

import java.io.IOException;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.*;
import service.AccountService;

/**
 *
 * @author Main
 */
public class AdminServlet extends HttpServlet
{
    private static final
    String USERS_ATT = "users",
           USER_KEY_PARAM = "userkey",
           ADMIN_JSP_DIR = "/WEB-INF/admin.jsp",
           ADMIN_REDIR = "admin",
           IS_EDIT = "isEdit";
    
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
        AccountService accountService = new AccountService();
        
        try
        {
            request.setAttribute(USERS_ATT, accountService.getAll());
            request.setAttribute(IS_EDIT, false);
        }
        catch(Exception exception)
        {
            exception.printStackTrace();
        }
        
        getServletContext().getRequestDispatcher(ADMIN_JSP_DIR).forward(request, response);
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
            case "Add":
                addUser(request, response);
                break;
                
            case "Save":
                updateUser(request, response);
                break;
                
            case "Cancel":
                response.sendRedirect(ADMIN_REDIR);
                break;
                
            case "Edit":
                editUser(request, response);
                break;
                
            case "Delete":
                deleteUser(request, response);
                break;
        }
    }

    private void addUser(HttpServletRequest request, HttpServletResponse response)
    {
        AccountService accountService = new AccountService();
        try
        {
            switch(accountService.insert(request.getParameter("username"),
                                         request.getParameter("password"),
                                         request.getParameter("email"),
                                         request.getParameter("firstname"),
                                         request.getParameter("lastname"),
                                         true,
                                         false))
            {
                case EMPTY_INPUT:
                    request.setAttribute("message", "Please fill all fields to add a user");
                    request.setAttribute(USERS_ATT, accountService.getAll());
                    request.setAttribute(IS_EDIT, false);
                    getServletContext().getRequestDispatcher(ADMIN_JSP_DIR).forward(request, response);
                    break;
                    
                case SUCCESS:
                    response.sendRedirect(ADMIN_REDIR);
                    break;
            }
        }
        catch(Exception exception)
        {
            exception.printStackTrace();
        }
    }
    
    private void editUser(HttpServletRequest request, HttpServletResponse response)
    {
        AccountService accountService = new AccountService();
        
        try
        {
            request.setAttribute(IS_EDIT, true);
            request.setAttribute(USERS_ATT, accountService.getAll());
            request.setAttribute("editUser", accountService.get(request.getParameter(USER_KEY_PARAM)));
            
            getServletContext().getRequestDispatcher(ADMIN_JSP_DIR).forward(request, response);
        }
        catch(Exception exception)
        {
            exception.printStackTrace();
        }
    }

    private void deleteUser(HttpServletRequest request, HttpServletResponse response)
    {
        AccountService accountService = new AccountService();
        
        try
        {
            switch(accountService.delete(request.getParameter(USER_KEY_PARAM), (String)request.getSession().getAttribute("username")))
            {
                case SUCCESS:
                    request.setAttribute("message", "User deleted succesfully");
                    request.setAttribute(USERS_ATT, accountService.getAll());
                    request.setAttribute(IS_EDIT, false);
                    getServletContext().getRequestDispatcher(ADMIN_JSP_DIR).forward(request, response);
                    break;
                    
                case CANNOT_DELETE_SELF:
                    request.setAttribute("message", "Cannot delete current user");
                    request.setAttribute(USERS_ATT, accountService.getAll());
                    request.setAttribute(IS_EDIT, false);
                    getServletContext().getRequestDispatcher(ADMIN_JSP_DIR).forward(request, response);
                    break;
            }
        }
        catch(Exception exception)
        {
            exception.printStackTrace();
        }
    }

    private void updateUser(HttpServletRequest request, HttpServletResponse response)
    {
        AccountService accountService = new AccountService();
        try
        {
            switch(accountService.update(request.getParameter("email"),
                                         request.getParameter("password"),
                                         request.getParameter("phone"),
                                         request.getParameter("firstname"),
                                         request.getParameter("lastname"),
                                         request.getParameter("active").equals("on"),
                                         request.getParameter("admin").equals("on")))
            {
                case EMPTY_INPUT:
                    request.setAttribute("message", "Please fill all fields to edit a user");
                    request.setAttribute(IS_EDIT, false);
                    getServletContext().getRequestDispatcher(ADMIN_JSP_DIR).forward(request, response);
                    break;
                    
                case NO_USER_FOUND:
                    request.setAttribute("message", "User was not found in database");
                    request.setAttribute(IS_EDIT, false);
                    getServletContext().getRequestDispatcher(ADMIN_JSP_DIR).forward(request, response);
                    break;
                    
                case SUCCESS:
                    response.sendRedirect(ADMIN_REDIR);
                    break;
            }
        }
        catch(Exception exception)
        {
            exception.printStackTrace();
        }
    }
}