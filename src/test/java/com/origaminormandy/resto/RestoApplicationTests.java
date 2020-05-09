package com.origaminormandy.resto;

import com.origaminormandy.resto.service.HoursFormater;
import java.time.OffsetTime;
import java.time.ZoneOffset;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
class RestoApplicationTests {

        @Autowired HoursFormater hoursFormater;
        
	@Test
	void contextLoads() {
	}
        
        @Test
        public void hoursTests(){
            
            OffsetTime time = OffsetTime.of(20, 0, 0, 0, ZoneOffset.UTC);
            OffsetTime start = OffsetTime.of(18, 0, 0, 0, ZoneOffset.UTC);
            OffsetTime end = OffsetTime.of(02, 0, 0, 0, ZoneOffset.UTC);
            
            Assertions.assertTrue(hoursFormater.timeIsTimeBetween(time, start, end)); 
            
            
            OffsetTime time2 = OffsetTime.of(20, 0, 0, 0, ZoneOffset.UTC);
            OffsetTime start2 = OffsetTime.of(18, 0, 0, 0, ZoneOffset.UTC);
            OffsetTime end2 = OffsetTime.of(23, 0, 0, 0, ZoneOffset.UTC);
            
            Assertions.assertTrue(hoursFormater.timeIsTimeBetween(time2, start2, end2)); 
            
            OffsetTime time3 = OffsetTime.of(17, 0, 0, 0, ZoneOffset.UTC);
            OffsetTime start3 = OffsetTime.of(18, 0, 0, 0, ZoneOffset.UTC);
            OffsetTime end3 = OffsetTime.of(23, 0, 0, 0, ZoneOffset.UTC);
            
            Assertions.assertFalse(hoursFormater.timeIsTimeBetween(time3, start3, end3));
            
            OffsetTime time4 = OffsetTime.of(23, 0, 0, 0, ZoneOffset.UTC);
            OffsetTime start4 = OffsetTime.of(18, 0, 0, 0, ZoneOffset.UTC);
            OffsetTime end4 = OffsetTime.of(22, 0, 0, 0, ZoneOffset.UTC);
            
            Assertions.assertFalse(hoursFormater.timeIsTimeBetween(time4, start4, end4));
            
            OffsetTime time5 = OffsetTime.of(03, 0, 0, 0, ZoneOffset.UTC);
            OffsetTime start5 = OffsetTime.of(18, 0, 0, 0, ZoneOffset.UTC);
            OffsetTime end5 = OffsetTime.of(02, 0, 0, 0, ZoneOffset.UTC);
            
            Assertions.assertFalse(hoursFormater.timeIsTimeBetween(time5, start5, end5));
            
            OffsetTime time6 = OffsetTime.of(01, 0, 0, 0, ZoneOffset.UTC);
            OffsetTime start6 = OffsetTime.of(18, 0, 0, 0, ZoneOffset.UTC);
            OffsetTime end6 = OffsetTime.of(02, 0, 0, 0, ZoneOffset.UTC);
            
            Assertions.assertTrue(hoursFormater.timeIsTimeBetween(time6, start6, end6));
        }

}
