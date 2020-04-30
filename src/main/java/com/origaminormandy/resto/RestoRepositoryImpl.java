package com.origaminormandy.resto;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.Query;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.support.PageableExecutionUtils;



public class RestoRepositoryImpl implements RestoRepositoryCustom{

	@Autowired
	private EntityManager em;

	public Page<RestoDTO> findAllOrderByDistanceFromGeocodePointNative(double lng, double lat, Pageable p) {
		
		
		Query q = em.createNativeQuery("select r.*, st_distance_sphere(POINT(lng, lat), POINT(:lng,:lat)) as distance from resto r order by distance", "RestoWithDistanceFromUser");
		q.setParameter("lng", lng );
		q.setParameter("lat", lat );
		List<Object[]> objects = q.getResultList();
		List<RestoDTO> restos = new ArrayList<>();
		
		q.setMaxResults(p.getPageSize());
		q.setFirstResult((int) p.getOffset());

		objects.forEach(o -> {
			Resto r = (Resto) o[0];
			Long distanceInMeter = (Long) o[1];
			Double distanceInKm = null;
			if(distanceInMeter != null) {
				distanceInKm = distanceInMeter / 1000.0;
			}
			System.out.println("Link size " + r.getExternalLinks().size());
			System.out.println("Link size " + r.getCookTypes().size());
			System.out.println("Link size " + r.getAddresses().size());
			System.out.println("Link size " + r.getOpenings().size());
			restos.add(new RestoDTO(r, distanceInKm)); 
		});
	
	
		return PageableExecutionUtils.getPage(restos, p,
				() -> executeCountQuery(lng, lat));
	
	}
	
	public long executeCountQuery(double lng, double lat) {
		
		Query q =  em.createNativeQuery("select count(*) from resto r", "RestoWithDistanceFromUser");
		q.setParameter("lng", lng );
		q.setParameter("lat", lat );
		return (long) q.getSingleResult();
	}

	
}
