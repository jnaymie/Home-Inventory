/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package service;

import dataaccess.*;
import model.*;
import java.util.List;

/**
 *
 * @author Main
 */
public class InventoryService
{
    public List<Item> getAllItems() throws Exception
    {
        ItemDB itemDB = new ItemDB();
        return itemDB.getAll();
    }
    
    public boolean canAccessItem(int itemID, User owner) throws Exception
    {
        ItemDB itemDB = new ItemDB();
        Item item = itemDB.get(itemID);
        
        if(item.getOwner().equals(owner))
        {
            return true;
        }
        
        return false;
    }
    
    public Item getItem(int itemID) throws Exception
    {
        ItemDB itemDB = new ItemDB();
        return itemDB.get(itemID);
    }
    
    public RequestStatus insertItem(String itemName, String itemPrice,
                                    String categoryID, String username)
    throws Exception
    {
        if(MiscUtil.hasEmptyValues(new String[] { itemName, itemPrice, categoryID }))
        {
            return RequestStatus.EMPTY_INPUT;
        }
        if(!MiscUtil.stringIsNumber(itemPrice))
        {
            return RequestStatus.INVALID_PRICE;
        }
        if(!MiscUtil.stringIsNumber(categoryID))
        {
            return RequestStatus.INVALID_CATEGORYID;
        }
        
        return insertItem(itemName, Double.parseDouble(itemPrice), Integer.parseInt(categoryID), username);
    }
    
    public RequestStatus insertItem(String itemName, double itemPrice,
                                    int categoryID, String email)
    throws Exception
    {
        AccountService accountService = new AccountService();
        
        if(MiscUtil.hasEmptyValues(new String[] { itemName }))
        {
            return RequestStatus.EMPTY_INPUT;
        }
        if(getCategory(categoryID) == null)
        {
            return RequestStatus.NO_CATEGORY_FOUND;
        }
        if(accountService.get(email) == null)
        {
            return RequestStatus.NO_USER_FOUND;
        }
        
        Item item = new Item();
        
        item.setItemName(itemName);
        item.setItemPrice(itemPrice);
        item.setCategory(getCategory(categoryID));
        item.setOwner(accountService.get(email));
        
        ItemDB itemDB = new ItemDB();
        itemDB.insert(item);
        
        return RequestStatus.SUCCESS;
    }
    
    public RequestStatus updateItemByCategoryName(String itemID, String itemName, String itemPrice,
                                    String categoryName, String email)
    {
        AccountService accountService = new AccountService();
        try
        {
            if(MiscUtil.hasEmptyValues(new String[] { itemID, itemName, itemPrice, categoryName, email}))
            {
                return RequestStatus.EMPTY_INPUT;
            }
            
            RequestStatus userIDStatus = accountService.checkUserID(email);
            if(userIDStatus != RequestStatus.SUCCESS)
            {
                return userIDStatus;
            }
            
            Category category = getCategoryByName(categoryName);
            
            if(category == null)
            {
                insertNewCategory(categoryName);
                category = getCategoryByName(categoryName);
            }
            
            return updateItem(Integer.parseInt(itemID), itemName, Double.parseDouble(itemPrice),
                       category.getCategoryID(), email);
            
        }
        catch(Exception e)
        {
            e.printStackTrace();
        }
        
        return RequestStatus.NO_ITEM_FOUND;
    }
    
    public RequestStatus updateItem(String itemID, String itemName, String itemPrice,
                                    String categoryID, String email)
    {
        AccountService accountService = new AccountService();
        try
        {
            if(MiscUtil.hasEmptyValues(new String[] { itemID, itemName, itemPrice, categoryID, email}))
            {
                return RequestStatus.EMPTY_INPUT;
            }
            
            RequestStatus userIDStatus = accountService.checkUserID(email);
            if(userIDStatus != RequestStatus.SUCCESS)
            {
                return userIDStatus;
            }
            
            
            
            return updateItem(Integer.parseInt(itemID), itemName, Double.parseDouble(itemPrice),
                       Integer.parseInt(categoryID), email);
            
        }
        catch(Exception e)
        {
            e.printStackTrace();
        }
        
        return RequestStatus.NO_ITEM_FOUND;
    }
    
    public RequestStatus updateItem(int itemID, String itemName, double itemPrice,
                                    int categoryID, String ownerID)
    {
        ItemDB itemDB = new ItemDB();
        
        itemDB.update(itemID, itemName, itemPrice, categoryID, ownerID);
        
        return RequestStatus.SUCCESS;
    }
    
    public RequestStatus deleteItem(int itemID, String username) throws Exception
    {
        AccountService accountService = new AccountService();
        
        if(getItem(itemID) == null)
        {
            return RequestStatus.NO_ITEM_FOUND;
        }
        if(accountService.get(username) == null)
        {
            return RequestStatus.NO_USER_FOUND;
        }
        if(!getItem(itemID).getOwner().equals(accountService.get(username)))
        {
            return RequestStatus.INVALID_PERMISSION;
        }
        
        ItemDB itemDB = new ItemDB();
        itemDB.delete(getItem(itemID));
        
        return RequestStatus.SUCCESS;
    }
    
    public RequestStatus insertNewCategory(String categoryName)  throws Exception
    {
        CategoryDB categoryDB = new CategoryDB();
        
        categoryDB.insert(categoryName);
        
        return RequestStatus.SUCCESS;
    }
    
    public RequestStatus updateCategory(int categoryID, String categoryName)  throws Exception
    {
        if(categoryName == null
        || categoryName.equals(""))
        {
            return RequestStatus.EMPTY_INPUT;
        }
        
        CategoryDB categoryDB = new CategoryDB();
        categoryDB.update(new Category(categoryID, categoryName));
        
        return RequestStatus.SUCCESS;
    }
    
    public RequestStatus deleteCategory(int categoryID)  throws Exception
    {
        CategoryDB categoryDB = new CategoryDB();
        
        categoryDB.delete(categoryDB.get(categoryID));
        
        return RequestStatus.SUCCESS;
    }
    
    public List<Category> getAllCategories() throws Exception
    {
        CategoryDB categoryDB = new CategoryDB();
        return categoryDB.getAll();
    }
    
    public Category getCategory(int categoryID) throws Exception
    {
        CategoryDB categoryDB = new CategoryDB();
        
        return categoryDB.get(categoryID);
    }
    
    public Category getCategoryByName(String name) throws Exception
    {
        CategoryDB categoryDB = new CategoryDB();
        
        return categoryDB.getCategoryByName(name.toLowerCase());
    }
}