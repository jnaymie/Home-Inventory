/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package servlet;

import java.io.IOException;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.*;
import model.*;
import service.AccountService;

/**
 *
 * @author Main
 */
public class LoginServlet extends HttpServlet
{
    private static final
    String LOGIN_JSP_DIR = "/WEB-INF/login.jsp",
           USER_FOUND = "userFound",
           WARNING_MESSAGE = "warningMessage",
           ALERT_MESSAGE = "alertMessage",
           USER_ID = "user-id-input",
           PAGE_STATE = "pageState",
            
           PARAMS_FORMAT = ", userIDInputState = %s";
    
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
        HttpSession session = request.getSession();
        session.invalidate();
        if(request.getParameter("logout") != null)
        {
            request.setAttribute("message", "Logout succesful!");
        }
        
        switch(request.getServletPath())
        {
            case "/login":
                request.setAttribute(PAGE_STATE, "\"login\"");
                break;
                
            case "/signup":
                request.setAttribute(PAGE_STATE, "\"signup\"");
                break;
                
            default:
                request.setAttribute(PAGE_STATE, "WRONG");
                break;
        }
        
        request.setAttribute("scriptParams", getScriptParams(PARAMS_FORMAT, new Object[] { "\"default\"" }));
        request.setAttribute("userFound", false);
        getServletContext().getRequestDispatcher(LOGIN_JSP_DIR).forward(request, response);
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
        HttpSession session = request.getSession();
        session.invalidate();
        
        switch(request.getParameter("action"))
        {
            case "continue":
                checkUsername(request, response);
                break;
                
            case "newaccount":
                response.sendRedirect("signup");
                break;
                
            case "login":
                login(request, response);
                break;
                
            default:
                System.out.println("default-login");
        }
    }
    
    private void checkUsername(HttpServletRequest request, HttpServletResponse response)
    {
        AccountService accountService = new AccountService();
        
        try
        {
            String userID = request.getParameter("user-id__input");
            if(request.getParameter("login_type").equals("email"))
            {
                switch(accountService.checkUserID(request.getParameter("user-id__input")))
                {
                    case SUCCESS:
                        request.setAttribute(USER_FOUND, true);
                        request.setAttribute(USER_ID, userID);
                        getServletContext().getRequestDispatcher(LOGIN_JSP_DIR).forward(request, response);
                        break;

                    case EMPTY_INPUT:
                        request.setAttribute("scriptParams", getScriptParams(PARAMS_FORMAT, new Object[] { "\"empty\"" }));
                        request.setAttribute(USER_FOUND, false);
                        request.setAttribute("alertMessage", "Please provide all required input");
                        getServletContext().getRequestDispatcher(LOGIN_JSP_DIR).forward(request, response);
                        break;

                    case NO_USER_FOUND:
                        request.setAttribute("scriptParams", getScriptParams(PARAMS_FORMAT, new Object[] { "\"no_user_found\"" }));
                        request.setAttribute(USER_FOUND, false);
                        request.setAttribute("warningMessage", "User not found");
                        getServletContext().getRequestDispatcher(LOGIN_JSP_DIR).forward(request, response);
                        break;

                    case INACTIVE_USER:
                        request.setAttribute("scriptParams", getScriptParams(PARAMS_FORMAT, new Object[] { "\"user_inactive\"" }));
                        request.setAttribute(USER_FOUND, false);
                        request.setAttribute("warningMessage", "This account is inactive");
                        getServletContext().getRequestDispatcher(LOGIN_JSP_DIR).forward(request, response);
                        break;
                }
            }
            else if(request.getParameter("login_type").equals("phone"))
            {
                String phone = request.getParameter("user-id__input");
                phone = phone.replaceAll("[^\\d]", "");
                
                switch(accountService.checkUserIDByPhone(phone))
                {
                    case SUCCESS:
                        request.setAttribute(USER_FOUND, true);
                        request.setAttribute(USER_ID, accountService.getByPhone(phone).getEmail());
                        getServletContext().getRequestDispatcher(LOGIN_JSP_DIR).forward(request, response);
                        break;

                    case EMPTY_INPUT:
//                        request.setAttribute("scriptParams", getScriptParams(PARAMS_FORMAT, new Object[] { "\"empty\"" }));
                        request.setAttribute(USER_FOUND, false);
                        request.setAttribute("alertMessage", "Please provide all required input");
                        getServletContext().getRequestDispatcher(LOGIN_JSP_DIR).forward(request, response);
                        break;

                    case NO_USER_FOUND:
//                        request.setAttribute("scriptParams", getScriptParams(PARAMS_FORMAT, new Object[] { "\"no_user_found\"" }));
                        request.setAttribute(USER_FOUND, false);
                        request.setAttribute("warningMessage", "User not found");
                        getServletContext().getRequestDispatcher(LOGIN_JSP_DIR).forward(request, response);
                        break;

                    case INACTIVE_USER:
//                        request.setAttribute("scriptParams", getScriptParams(PARAMS_FORMAT, new Object[] { "\"user_inactive\"" }));
                        request.setAttribute(USER_FOUND, false);
                        request.setAttribute("warningMessage", "This account is inactive");
                        getServletContext().getRequestDispatcher(LOGIN_JSP_DIR).forward(request, response);
                        break;
                }
            }
        }
        catch(Exception exception)
        {
            exception.printStackTrace();
        }
    }
    
    private void login(HttpServletRequest request, HttpServletResponse response)
    {
        AccountService accountService = new AccountService();
        
        try
        {
            HttpSession session = request.getSession();
            
            String userID = request.getParameter(USER_ID),
                   userPassword = request.getParameter("password-input__input");
            
            User user = accountService.get(userID);
            
            if(user == null)
            {
                request.setAttribute(ALERT_MESSAGE, "The user could not be found!");
                request.setAttribute(USER_FOUND, false);
                getServletContext().getRequestDispatcher(LOGIN_JSP_DIR).forward(request, response);
                return;
            }
            if(!user.getPassword().equals(userPassword))
            {
                request.setAttribute(WARNING_MESSAGE, "The password does not match this account!");
                request.setAttribute(USER_FOUND, true);
                request.setAttribute(USER_ID, userID);
                getServletContext().getRequestDispatcher(LOGIN_JSP_DIR).forward(request, response);
                return;
            }
            
            session.setAttribute(Global.USER_ID, request.getParameter(USER_ID));

            if(user.isAdmin())
            {
                response.sendRedirect("admin");
                return;
            }
            else
            {
                System.out.println("----====INVENTORY REDIR====----");
                response.sendRedirect("inventory");
                return;
            }
        }
        catch(Exception exception)
        {
            exception.printStackTrace();
        }
    }
    
    private String getScriptParams(String paramsFormat, Object[] parameters)
    {
        return String.format(PARAMS_FORMAT, parameters);
    }
}