/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package service;

import dataaccess.UserDB;
import java.nio.file.*;
import model.RequestStatus;
import model.User;
import java.util.List;
import model.MiscUtil;

/**
 *
 * @author Main
 */
public class AccountService
{
    public User get(String username) throws Exception
    {
        UserDB userDB = new UserDB();
        return userDB.get(username);
    }
    
    public User getByPhone(String phone) throws Exception
    {
        UserDB userDB = new UserDB();
        return userDB.getByPhone(phone);
    }
    
    public List<User> getAll() throws Exception
    {
        UserDB userDB = new UserDB();
        return userDB.getAll();
    }
    
    public RequestStatus insertNewUser(String username, String email, String phone, String password, String confirmPassword, String serverPath)
    throws Exception
    {
        if(MiscUtil.hasEmptyValues(new String[] { username, password, confirmPassword, 
                                                  email, phone }))
        {
            return RequestStatus.EMPTY_INPUT;
        }
        
        if(checkUserID(email) != RequestStatus.NO_USER_FOUND)
        {
            return RequestStatus.ID_ALREADY_EXISTS;
        }
        
        if(!password.equals(confirmPassword))
        {
            return RequestStatus.NON_MATCHING_PASSWORDS;
        }
        
        String[] names = username.split(" ");
        String firstName = names[0],
               lastName = "";
        
        for(int i=1; i<names.length; i++)
        {
            lastName += names[i] + " ";
        }
        
        lastName = lastName.trim();
        
        phone = phone.replaceAll("[^\\d]", "");
        
        RequestStatus status = insert(email, phone, password, firstName, lastName, true, false);
        
        if(status == RequestStatus.SUCCESS)
        {
            Path copied = Paths.get(serverPath + email + ".jpg");
            Path originalPath = Paths.get(serverPath + "default_profile.jpg");
            Files.copy(originalPath, copied, StandardCopyOption.REPLACE_EXISTING);
            
            return RequestStatus.SUCCESS;
        }
        else
        {
            return status;
        }
    }
    
    public RequestStatus insert(String email, String phone, String password, String firstName,
                                String lastName, boolean active, boolean isAdmin)
    throws Exception
    {
        if(MiscUtil.hasEmptyValues(new String[] { email, phone, password, firstName }))
        {
            return RequestStatus.EMPTY_INPUT;
        }
        
        
        UserDB userDB = new UserDB();
        userDB.insert(email, phone, password, firstName, lastName, active, isAdmin);
        
        return RequestStatus.SUCCESS;
    }
    
    public void insert(User user) throws Exception
    {
        insert(user.getEmail(), user.getPassword(), user.getEmail(),
               user.getFirstName(), user.getLastName(),
               user.isActive(), user.isAdmin());
    }
    
     public RequestStatus delete(String username, String currentUsername) throws Exception
    {
        return delete(get(username), currentUsername);
    }
    
    //---------------
    
    /**
     * Deletes a User entry from the User data storage
     * @param user The User to delete
     * @throws Exception Thrown when entry cannot be deleted
     */
    public RequestStatus delete(User user, String username) throws Exception
    {
        if(user.getEmail().equals(username))
        {
            return RequestStatus.CANNOT_DELETE_SELF;
        }
        
        UserDB userDB = new UserDB();
        userDB.delete(user);
        
        return RequestStatus.SUCCESS;
    }
    
    public RequestStatus update(String email, String password, String phone, String firstName,
                                String lastName, boolean active, boolean isAdmin)
    throws Exception
    {
        if(MiscUtil.hasEmptyValues(new String[] { password, email, firstName }))
        {
            return RequestStatus.EMPTY_INPUT;
        }
        
        if(get(email) == null)
        {
            return RequestStatus.NO_USER_FOUND;
        }
        
        UserDB userDB = new UserDB();
        userDB.update(email, phone, password, firstName, lastName, active, isAdmin);
        
        return RequestStatus.SUCCESS;
    }
    
    //---------------
    
    /**
     * Updates a User in the User data storage
     * @param user The User to update
     * @throws Exception Thrown when entry cannot be updated
     */
    public RequestStatus update(User user) throws Exception
    {
        return update(user.getEmail(), user.getPassword(), user.getPhone(),
                      user.getFirstName(), user.getLastName(),
                      user.isActive(), user.isAdmin());
    }
    
    public RequestStatus checkLoginInfo(String username, String password) throws Exception
    {
        if(MiscUtil.hasEmptyValues(new String[] { username, password }))
        {
            return RequestStatus.EMPTY_INPUT;
        }
        
        User user = get(username);
        
        if(user == null || !user.getPassword().equals(password))
        {
            return RequestStatus.INVALID_USERNAME_PASSWORD;
        }
        if(!user.isActive())
        {
            return RequestStatus.INACTIVE_USER;
        }
        
        return RequestStatus.SUCCESS;
    }
    
    public RequestStatus checkUserID(String username) throws Exception
    {
        if(MiscUtil.isEmptyValue(username))
        {
            return RequestStatus.EMPTY_INPUT;
        }
        
        User user = get(username);
        
        if(user == null)
        {
            return RequestStatus.NO_USER_FOUND;
        }
        if(!user.isActive())
        {
            return RequestStatus.INACTIVE_USER;
        }
        
        return RequestStatus.SUCCESS;
    }
    
    public RequestStatus checkUserIDByPhone(String phone) throws Exception
    {
        if(MiscUtil.isEmptyValue(phone))
        {
            return RequestStatus.EMPTY_INPUT;
        }
        
        User user = getByPhone(phone);
        
        if(user == null)
        {
            return RequestStatus.NO_USER_FOUND;
        }
        if(!user.isActive())
        {
            return RequestStatus.INACTIVE_USER;
        }
        
        return RequestStatus.SUCCESS;
    }
    
    public RequestStatus deactivateUser(String username)
    {
        try
        {
            RequestStatus status = checkUserID(username);
            
            if(status == RequestStatus.SUCCESS)
            {
                User user = get(username);
                user.setActive(false);
                update(user);
                
                return RequestStatus.SUCCESS;
            }
            else
            {
                return status;
            }
        }
        catch(Exception e)
        {
            return RequestStatus.NO_USER_FOUND;
        }
    }
}