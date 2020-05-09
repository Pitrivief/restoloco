/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.origaminormandy.resto.thymeleaf;

import com.origaminormandy.resto.domain.Schedule;
import java.text.SimpleDateFormat;
import java.time.OffsetTime;
import java.time.ZoneId;
import java.time.ZoneOffset;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import org.springframework.stereotype.Service;


@Service
public class RestoHoursFormater {
    
    Map<String, String> translateFr;
      

    public RestoHoursFormater() {
        this.translateFr = new HashMap();
        this.translateFr.put("MONDAY", "Lundi");
        this.translateFr.put("TUESDAY", "Mardi");
        this.translateFr.put("WEDNESDAY", "Mercredi");
        this.translateFr.put("THURSDAY", "Jeudi");
        this.translateFr.put("FRIDAY", "Vendredi");
        this.translateFr.put("SATURDAY", "Samedi");
        this.translateFr.put("SUNDAY", "Dimanche");
    }
     
    
    private String translateDay(String day){
        return this.translateFr.get(day);
    }
    
    public String hoursTemplate(List<Schedule> hours){
        
        List<String> eachLine = hours.stream().map(e -> {
            
            String day =e.getDay().toString();
            String tDay = this.translateDay(day);
            DateTimeFormatter formater = DateTimeFormatter.ofPattern("HH:mm");
            List<String> dayContent = new ArrayList<>();
            
            if(e.getLunchStart() != null && e.getLunchEnd() != null){
                dayContent.add(e.getLunchStart().format(formater)+"-"+e.getLunchEnd().format(formater));
            }
            if(e.getDinnerStart()!= null && e.getDinnerEnd()!= null){
                dayContent.add(e.getDinnerStart().format(formater)+"-"+e.getDinnerEnd().format(formater));
            }
            if(dayContent.isEmpty()){
                dayContent.add("fermé");
            }
            
            
           return    "<div>"
                        + "<span>"
                            + "<span class='dayName'>"
                                + tDay.substring(0,1)
                                + "<span class='dayPlain'>"+tDay.substring(1)+"</span>"
                            + " :</span>"
                            + String.join(",&nbsp;", dayContent)
                        + "</span>"
                    + "</div>";
           
        }).collect(Collectors.toList());
        
        return String.join("",eachLine);
    }
    
    public String actualState(Schedule schedule){
        
        OffsetTime now = OffsetTime.now(ZoneId.of("Europe/Paris"));
        
        String closingTime = null;
        String returnMessage = "";
        if(schedule.getLunchStart()!= null && schedule.getLunchEnd() != null && now.compareTo(schedule.getLunchStart()) >= 0 &&  now.compareTo(schedule.getLunchEnd()) <= 0){
            closingTime = schedule.getLunchEnd().format(DateTimeFormatter.ofPattern("HH:mm"));
        }
        else if(schedule.getDinnerStart() != null && schedule.getDinnerEnd() != null && now.compareTo(schedule.getDinnerStart()) >= 0 &&  (now.compareTo(schedule.getDinnerEnd()) <= 0 || schedule.getDinnerEnd().compareTo(OffsetTime.of(0, 0, 0, 0, ZoneOffset.UTC)) >= 0 )){
            closingTime = schedule.getDinnerEnd().format(DateTimeFormatter.ofPattern("HH:mm"));
        }
        
        if(closingTime == null){
            
            returnMessage = "<span class='today-closed'>Fermé";
            if(schedule.getLunchStart() != null && now.compareTo(schedule.getLunchStart()) < 0){
                returnMessage +=  "</span> | <span>ouvre à "+schedule.getLunchStart().format(DateTimeFormatter.ofPattern("HH:mm"))+"</span>";
            }
            else if(schedule.getDinnerStart() != null && now.compareTo(schedule.getDinnerStart()) < 0){
                returnMessage +=  "</span> | <span>ouvre à "+schedule.getDinnerStart().format(DateTimeFormatter.ofPattern("HH:mm"))+"</span>";
            }
            else{
                returnMessage +=  " pour aujourd'hui</span>";
            }
            
        }
        else{
            returnMessage = "<span class='today-open'>Ouvert</span> | <span class='when-is-closing'>ferme à "+closingTime+"</span>";
        }
        
        
        
        return returnMessage;
                
    }
}
