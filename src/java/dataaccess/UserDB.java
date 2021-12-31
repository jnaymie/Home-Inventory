/*
 * AS1
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package dataaccess;

import model.User;
import java.util.List;
import jakarta.persistence.EntityManager;
import jakarta.persistence.EntityTransaction;

/**
 *
 * @author Main
 */
public class UserDB
{
    public List<User> getAll() throws Exception
    {
        EntityManager entityManager = DBUtil.getEMFactory().createEntityManager();
        try
        {
            return entityManager.createNamedQuery("User.findAll").getResultList();
        }
        finally
        {
            entityManager.close();
        }
    }
    
    //------------------------------
    
    public User get(String email) throws Exception
    {
        EntityManager entityManager = DBUtil.getEMFactory().createEntityManager();
        try
        {
            return entityManager.find(User.class, email);
        }
        finally
        {
            entityManager.close();
        }
    }
    
    public User getByPhone(String phone)
    {
        EntityManager entityManager = DBUtil.getEMFactory().createEntityManager();
        try
        {
            return (User) entityManager.createNamedQuery("User.findByPhone").setParameter("phone", phone).getResultList().get(0);
        }
        finally
        {
            entityManager.close();
        }
    }
    
    //------------------------------
    
    public void insert(User user) throws Exception
    {
        EntityManager entityManager = DBUtil.getEMFactory().createEntityManager();
        EntityTransaction transaction = entityManager.getTransaction();
        
        try
        {
            transaction.begin();
            entityManager.persist(user);
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
    
    //------------------------------
    
    public void insert(String email, String phone, String password,  String firstName, String lastName, boolean active, boolean isAdmin) throws Exception
    {
        insert(new User(email, phone, password, firstName, lastName, active, isAdmin));
    }
    
    //------------------------------
    
    public void update(User user) throws Exception
    {
        EntityManager entityManager = DBUtil.getEMFactory().createEntityManager();
        EntityTransaction transaction = entityManager.getTransaction();
        
        try
        {
            transaction.begin();
            entityManager.merge(user);
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

    //------------------------------
    
    public void update(String email, String phone, String password, String firstName, String lastName, boolean active, boolean isAdmin) throws Exception
    {
        update(new User(email, phone, password, firstName, lastName, active, isAdmin));
    }
    
    //------------------------------
    
    public void delete(User user) throws Exception
    {
        EntityManager entityManager = DBUtil.getEMFactory().createEntityManager();
        EntityTransaction transaction = entityManager.getTransaction();
        
        try
        {
            transaction.begin();
            entityManager.remove(entityManager.merge(user));
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