/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package servlet;

import java.io.*;
import jakarta.servlet.http.*;
import service.AccountService;
import model.*;

import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.*;



@WebServlet("/UploadServlet")
@MultipartConfig(fileSizeThreshold=1024*1024*2, // 2MB
                 maxFileSize=1024*1024*10,      // 10MB
                 maxRequestSize=1024*1024*50)   // 50MB
/**
 *
 * @author Main
 */
public class ProfileServlet extends HttpServlet
{
    private static final
    String PROFILE_JSP_DIR = "/WEB-INF/profile.jsp",
           USER_ID = "userID";
    
    private static final
    int maxFileSize = 50 * 1024,
        maxMemSize = 4 * 1024;
    
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
        
        try
        {
            session.getAttribute(USER_ID);
            request.setAttribute("user",accountService.get((String)session.getAttribute(USER_ID)));
            request.setAttribute("userImage", "content/images/default_profile.png");
            
        }
        catch(Exception exception)
        {
            exception.printStackTrace();
        }
        getServletContext().getRequestDispatcher(PROFILE_JSP_DIR).forward(request, response);
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
        HttpSession session = request.getSession(false);
        AccountService accountService = new AccountService();
        
        switch(request.getParameter("action"))
        {
            case "update":
                updateProfile(request, response);
                return;
            
            case "image":
                changeProfileImage(request, response);
                return;
                
            case "deactivate":
                accountService.deactivateUser((String) session.getAttribute(USER_ID));
                response.sendRedirect("login");
                return;
        }
        
        
    }
    
    private void changeProfileImage(HttpServletRequest request, HttpServletResponse response)
    {
        HttpSession session = request.getSession(false);
        AccountService accountService = new AccountService();
        
        try
        {
            String userID = (String) session.getAttribute(USER_ID);
            request.setAttribute("user",accountService.get((String)session.getAttribute(USER_ID)));
            
            String appPath = request.getServletContext().getRealPath("");
            
            // constructs path of the directory to save uploaded file
            String savePath = appPath + File.separator + "content/images/user";
            
            File fileSaveDir = new File(savePath);
            if(!fileSaveDir.exists())
            {
                fileSaveDir.mkdir();
            }
            
            
            for(Part part : request.getParts())
            {
                String fileName = extractFileName(part);
                // refines the fileName in case it is an absolute path
                fileName = new File(fileName).getName();
                if(!fileName.equals(""))
                {
                    String fileType = fileName.substring(fileName.length() - 4);
                    part.write(savePath + File.separator + userID  + fileType);
                }
            }
            
            getServletContext().getRequestDispatcher(PROFILE_JSP_DIR).forward(request, response);
        }
        catch(Exception exception)
        {
            exception.printStackTrace();
        }
        
    }
    
    private String extractFileName(Part part)
    {
        String contentDisp = part.getHeader("content-disposition");
        String[] items = contentDisp.split(";");
        for (String s : items)
        {
            if (s.trim().startsWith("filename"))
            {
                return s.substring(s.indexOf("=") + 2, s.length()-1);
            }
        }
        return "";
    }

    private void updateProfile(HttpServletRequest request, HttpServletResponse response)
    {
        AccountService accountService = new AccountService();
        
        try
        {
            User user = accountService.get((String) request.getSession().getAttribute(USER_ID));
            
            String[] names = request.getParameter("user-name__input").split(" ");
            String firstName = names[0],
                   lastName = "";
            
            for(int i=1; i<names.length; i++)
            {
                lastName += names[i] + " ";
            }
            
            user.setPhone(request.getParameter("user-phone__input"));
            user.setFirstName(firstName);
            user.setLastName(lastName);
            
            accountService.update(user);
            
            response.sendRedirect("profile");
        }
        catch(Exception e)
        {
            e.printStackTrace();
        }
    }
}