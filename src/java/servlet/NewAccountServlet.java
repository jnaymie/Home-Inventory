/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package servlet;

import java.io.IOException;
import java.io.PrintWriter;
import jakarta.servlet.*;
import jakarta.servlet.http.*;
import model.RequestStatus;
import service.AccountService;

/**
 *
 * @author Main
 */
public class NewAccountServlet extends HttpServlet
{
    private static final
    String SIGNUP_JSP_DIR = "/WEB-INF/signup.jsp";
    
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException
    {
        getServletContext().getRequestDispatcher(SIGNUP_JSP_DIR).forward(request, response);
    }
    
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException
    {
        
        if(request.getParameter("action").equals("createaccount"))
        {
            try
            {
                AccountService accountService = new AccountService();
                ServletContext context = getServletContext();
                String fullPath = context.getRealPath("/content/images/user/");
                switch(accountService.insertNewUser(request.getParameter("user-name__input"),
                                                    request.getParameter("user-email__input"),
                                                    request.getParameter("user-phone__input"),
                                                    request.getParameter("user-pass1__input"),
                                                    request.getParameter("user-pass2__input"),
                                                    fullPath))

                {
                    case SUCCESS:
                        request.setAttribute("newUser", true);
                        request.setAttribute("user", accountService.get(request.getParameter("user-email__input")));
                        getServletContext().getRequestDispatcher("/WEB-INF/profile.jsp").forward(request, response);
                        break;
                        
                    default:
                        response.sendRedirect("signup");
                        break;
                }
            }
            catch(Exception exception)
            {
                exception.printStackTrace();
            }
        }
    }
}
