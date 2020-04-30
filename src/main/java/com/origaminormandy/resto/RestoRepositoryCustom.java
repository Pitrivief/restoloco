package com.origaminormandy.resto;


import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;

@Repository
public interface RestoRepositoryCustom  {
	

	public Page<RestoDTO> findAllOrderByDistanceFromGeocodePointNative(double lng, double lat, Pageable p);

	
}
