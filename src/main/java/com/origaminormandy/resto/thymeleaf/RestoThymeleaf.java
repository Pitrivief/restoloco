/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.origaminormandy.resto.thymeleaf;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

/**
 *
 * @author t_ripoll
 */
@Configuration
public class RestoThymeleaf {
    
    @Autowired RestoHoursFormater restoHoursFormateur; 
 
    @Bean(name = "formatOpenningHours")
    public RestoHoursFormater formatOpenningHours() {
        return restoHoursFormateur;
    }
}


   
