                 /*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package dataaccess;

import java.util.List;
import jakarta.persistence.EntityManager;
import jakarta.persistence.EntityTransaction;
import model.Category;

/**
 *
 * @author Main
 */
public class CategoryDB
{
    public List<Category> getAll() throws Exception
    {
        EntityManager entityManager = DBUtil.getEMFactory().createEntityManager();
        try
        {
            return entityManager.createNamedQuery("Category.findAll").getResultList();
        }
        finally
        {
            entityManager.close();
        }
    }
    
    public Category get(int categoryID) throws Exception
    {
        EntityManager entityManager = DBUtil.getEMFactory().createEntityManager();
        try
        {
            return entityManager.find(Category.class, categoryID);
        }
        finally
        {
            entityManager.close();
        }
    }
    
    public Category getCategoryByName(String name) throws Exception
    {
        EntityManager entityManager = DBUtil.getEMFactory().createEntityManager();
        try
        {
            List<Category> temp = entityManager.createNamedQuery("Category.findByCategoryName").setParameter("categoryName", name).getResultList();
            if(temp.size() > 0)
            {
                return temp.get(0);
            }
            else
            {
                return null;
            }
        }
        finally
        {
            entityManager.close();
        }
    }
    
    public void insert(Category category)
    {
        EntityManager entityManager = DBUtil.getEMFactory().createEntityManager();
        EntityTransaction transaction = entityManager.getTransaction();
        
        try
        {
            transaction.begin();
            entityManager.persist(category);
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
    
    public void insert(String categoryName)
    {
        Category category = new Category();
        category.setCategoryName(categoryName);
        
        insert(category);
    }
    
    public void update(Category category)
    {
        EntityManager entityManager = DBUtil.getEMFactory().createEntityManager();
        EntityTransaction transaction = entityManager.getTransaction();
        
        try
        {
            transaction.begin();
            entityManager.merge(category);
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
    
    public void delete(Category category)
    {
        EntityManager entityManager = DBUtil.getEMFactory().createEntityManager();
        EntityTransaction transaction = entityManager.getTransaction();
        
        try
        {
            transaction.begin();
            entityManager.remove(entityManager.merge(category));
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