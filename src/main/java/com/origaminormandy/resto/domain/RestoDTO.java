
/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.origaminormandy.resto.domain;

import com.origaminormandy.resto.domain.Resto;
import org.springframework.lang.Nullable;

/**
 *
 * @author t_ripoll
 */
public class RestoDTO {
    
    
    private Resto resto;
        
    private Double distance;
    
    public RestoDTO(Resto resto, @Nullable Long distanceInMeter) {
        this.resto = resto;
        if(distanceInMeter != null)
        	this.distance = distanceInMeter / 1000.0;
    }

    public RestoDTO(Resto resto, @Nullable Double distance) {
        this.resto = resto;
        this.distance = distance;
    }
    

    /**
     * Get the value of distance
     *
     * @return the value of distance
     */
    public Double getDistance() {
        return distance;
    }

    /**
     * Set the value of distance
     *
     * @param distance new value of distance
     */
    public void setDistance(Double distance) {
        this.distance = distance;
    }


    /**
     * Get the value of resto
     *
     * @return the value of resto
     */
    public Resto getResto() {
        return resto;
    }

    /**
     * Set the value of resto
     *
     * @param resto new value of resto
     */
    public void setResto(Resto resto) {
        this.resto = resto;
    }

    

}
