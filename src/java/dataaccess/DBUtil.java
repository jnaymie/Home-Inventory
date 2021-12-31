package dataaccess;

import jakarta.persistence.*;

public class DBUtil
{
    private static final
    EntityManagerFactory emFactory = Persistence.createEntityManagerFactory("Home_InventoryPU");
    
    public static EntityManagerFactory getEMFactory()
    {
        return emFactory;
    }
}