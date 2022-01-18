/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/JSP_Servlet/Servlet.java to edit this template
 */
package servlet;

import java.io.IOException;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.*;
import java.util.logging.Level;
import java.util.logging.Logger;
import model.RequestStatus;
import service.AccountService;

/**
 *
 * @author Main
 */
public class AccountCheckerServlet extends HttpServlet
{
    private static final
    String AJAX_JSP_DIR = "/WEB-INF/accountChecker.jsp",
           NULL = "null",
           WARNING = "\"warningMessage\"",
           ALERT = "\"alertMessage\"",
           OUTPUT_FORMAT = "{\"userFound\":%b, \"userId\":\"%s\", \"state\":%s, \"message\":%s}";
    

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
        try
        {
            AccountService accountService = new AccountService();
            
            String userId = request.getParameter("userId"),
                   idType = request.getParameter("idType");
            
            RequestStatus status = RequestStatus.INVALID_USERNAME_PASSWORD;
            
            if(idType.equals("email"))
            {
                status = accountService.checkUserID(userId);
            }
            else if(idType.equals("phone"))
            {
                status = accountService.checkUserIDByPhone(userId.replaceAll("[^\\d]", ""));
            }
            
            switch(status)
            {
                case SUCCESS:
                    request.setAttribute("output", String.format(OUTPUT_FORMAT, true, userId, NULL, NULL));
                    break;
                    
                case EMPTY_INPUT:
                    request.setAttribute("output", String.format(OUTPUT_FORMAT, false, userId, ALERT, "\"Please provide all required input\""));
                    break;
                    
                case NO_USER_FOUND:
                    request.setAttribute("output", String.format(OUTPUT_FORMAT, false, userId, WARNING, "\"User not found\""));
                    break;
                    
                case INACTIVE_USER:
                    request.setAttribute("output", String.format(OUTPUT_FORMAT, false, userId, WARNING, "\"This account is inactive\""));
                    break;
                    
                case INVALID_USERNAME_PASSWORD:
                    request.setAttribute("output", String.format(OUTPUT_FORMAT, false, userId, ALERT, "\"Invalid username\""));
                    break;
                    
                default:
                    request.setAttribute("output", String.format(OUTPUT_FORMAT, false, userId, ALERT, "\"An unknown error occoured\""));
                    break;
            }
            System.out.println(request.getAttribute("output"));
            getServletContext().getRequestDispatcher(AJAX_JSP_DIR).forward(request, response);
        }
        catch (Exception ex)
        {
            Logger.getLogger(AccountCheckerServlet.class.getName()).log(Level.SEVERE, null, ex);
            ex.printStackTrace();
        }
    }

//    /**
//     * Handles the HTTP <code>POST</code> method.
//     *
//     * @param request servlet request
//     * @param response servlet response
//     * @throws ServletException if a servlet-specific error occurs
//     * @throws IOException if an I/O error occurs
//     */
//    @Override
//    protected void doPost(HttpServletRequest request, HttpServletResponse response)
//            throws ServletException, IOException {
//        processRequest(request, response);
//    }
}
