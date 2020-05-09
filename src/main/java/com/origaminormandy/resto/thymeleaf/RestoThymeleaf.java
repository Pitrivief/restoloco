/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.origaminormandy.resto.thymeleaf;

import com.origaminormandy.resto.service.HoursFormater;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

/**
 *
 * @author t_ripoll
 */
@Configuration
public class RestoThymeleaf {
    
    @Autowired HoursFormater restoHoursFormateur; 
 
    @Bean(name = "formatOpenningHours")
    public HoursFormater formatOpenningHours() {
        return restoHoursFormateur;
    }
}


   
