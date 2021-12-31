/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package model;

import java.util.regex.Pattern;

/**
 *
 * @author Main
 */
public class MiscUtil
{
    private static final
    Pattern NUMBER_PATTERN = Pattern.compile("-?\\d+(\\.\\d+)?");
    
    public static boolean stringIsNumber(String input)
    {
        if (input == null)
        {
            return false; 
        }
        return NUMBER_PATTERN.matcher(input).matches();
    }
    
    public static boolean hasEmptyValues(String[] input)
    {
        for(String value : input)
        {
            if(isEmptyValue(value))
            {
                return true;
            }
        }
        return false;
    }
    
    public static boolean isEmptyValue(String value)
    {
        if(value == null || value.equals(""))
        {
            return true;
        }
        
        return false;
    }
}