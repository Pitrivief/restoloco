package com.origaminormandy.resto.domain;

import java.sql.Time;
import java.time.DayOfWeek;
import java.time.LocalDateTime;
import java.time.OffsetTime;
import java.util.Calendar;
import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

@Entity
public class Schedule {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;

	

	@Enumerated(EnumType.STRING)
	private DayOfWeek day;
        
        
	private OffsetTime lunchStart;
	private OffsetTime lunchEnd;

	private OffsetTime dinnerStart;
	private OffsetTime dinnerEnd;

	private boolean closed = false;

	public DayOfWeek getDay() {
		return day;
	}

	public void setDay(DayOfWeek day) {
		this.day = day;
	}

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}



	public OffsetTime getLunchStart() {
		return lunchStart;
	}

	public void setLunchStart(OffsetTime lunchStart) {
		this.lunchStart = lunchStart;
	}

	public OffsetTime getLunchEnd() {
		return lunchEnd;
	}

	public void setLunchEnd(OffsetTime lunchEnd) {
		this.lunchEnd = lunchEnd;
	}

	public OffsetTime getDinnerStart() {
		return dinnerStart;
	}

	public void setDinnerStart(OffsetTime dinnerStart) {
		this.dinnerStart = dinnerStart;
	}

	public OffsetTime getDinnerEnd() {
		return dinnerEnd;
	}

	public void setDinnerEnd(OffsetTime dinnerEnd) {
		this.dinnerEnd = dinnerEnd;
	}

	public boolean isClosed() {
		return closed;
	}

	public void setClosed(boolean closed) {
		this.closed = closed;
	}
        
        public boolean isToday(){
            return this.getDay().equals(LocalDateTime.now().getDayOfWeek());
        }

}
