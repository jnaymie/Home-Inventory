/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package dataaccess;

import java.util.List;
import jakarta.persistence.EntityManager;
import jakarta.persistence.EntityTransaction;
import model.Item;
import service.AccountService;
import service.InventoryService;

/**
 *
 * @author Main
 */
public class ItemDB
{
    public List<Item> getAll() throws Exception
    {
        EntityManager entityManager = DBUtil.getEMFactory().createEntityManager();
        try
        {
            return entityManager.createNamedQuery("Item.findAll").getResultList();
        }
        finally
        {
            entityManager.close();
        }
    }
    
    public Item get(int itemID) throws Exception
    {
        EntityManager entityManager = DBUtil.getEMFactory().createEntityManager();
        try
        {
            return entityManager.find(Item.class, itemID);
        }
        finally
        {
            entityManager.close();
        }
    }
    
    public void insert(Item item) throws Exception
    {
        EntityManager entityManager = DBUtil.getEMFactory().createEntityManager();
        EntityTransaction transaction = entityManager.getTransaction();
        
        try
        {
            item.getOwner().getItemList().add(item);
            entityManager.getTransaction().begin();
            entityManager.persist(item);
            entityManager.merge(item.getOwner());
            entityManager.getTransaction().commit();
        }
        catch(Exception exception)
        {
            transaction.rollback();
            throw exception;
        }
        finally
        {
            entityManager.close();
        }
    }
    
    public void insert(Integer itemID, String itemName, double price) throws Exception
    {
        insert(new Item(itemID, itemName, price));
    }
    
    public void update(Item item)
    {
        EntityManager entityManager = DBUtil.getEMFactory().createEntityManager();
        EntityTransaction transaction = entityManager.getTransaction();
        
        try
        {
            transaction.begin();
            entityManager.merge(item);
            transaction.commit();
        }
        catch(Exception exception)
        {
            transaction.rollback();
            throw exception;
        }
        finally
        {
            entityManager.close();
        }
    }
    
    public void update(Integer itemID, String itemName, double price, int categoryID, String email)
    {
        InventoryService inventoryService = new InventoryService();
        AccountService accountService = new AccountService();
        try
        {
            Item item = new Item(itemID, itemName, price);
            item.setCategory(inventoryService.getCategory(categoryID));
            item.setOwner(accountService.get(email));
            
            update(item);
        }
        catch(Exception e)
        {
            e.printStackTrace();
        }
    }
    
    public void delete(Item item)
    {
        EntityManager entityManager = DBUtil.getEMFactory().createEntityManager();
        EntityTransaction transaction = entityManager.getTransaction();
        
        try
        {
            item.getOwner().getItemList().remove(item);
            transaction.begin();
            entityManager.remove(entityManager.merge(item));
            entityManager.merge(item.getOwner());
            transaction.commit();
        }
        catch(Exception exception)
        {
            transaction.rollback();
            throw exception;
        }
        finally
        {
            entityManager.close();
        }
    }
}