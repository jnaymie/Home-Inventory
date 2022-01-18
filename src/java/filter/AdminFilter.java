/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package filter;

import java.io.IOException;
import jakarta.servlet.*;
import jakarta.servlet.http.*;
import model.Global;
import service.AccountService;

/**
 *
 * @author Main
 */
public class AdminFilter implements Filter
{

    @Override
    public void init(FilterConfig fc) throws ServletException {;}

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException, ServletException
    {
        HttpSession session = ((HttpServletRequest)request).getSession();
        AccountService accountService = new AccountService();
        
        try
        {
            if(!accountService.get((String)session.getAttribute(Global.USER_ID)).isAdmin())
            {
                ((HttpServletResponse)response).sendRedirect("inventory");
                return;
            }

            chain.doFilter(request, response);
        }
        catch(Exception exception)
        {
            exception.printStackTrace();
        }
        
    }

    @Override
    public void destroy() {;}
    
}
