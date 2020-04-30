package com.origaminormandy.resto;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.Query;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.domain.Specification;



public class RestoRepositoryImpl implements RestoRepositoryCustom{

	@Autowired
	private EntityManager em;
	
	


	public List<Resto> custom(Specification s) {
		
		
		Query q = em.createNativeQuery("select r.*, st_distance_sphere(POINT(lng, lat), POINT(-0.35,49.17)) as distance from resto r order by distance", "RestoWithDistanceFromUser");
		List<Object[]> objects = q.getResultList();
		objects.forEach(o -> {
			Resto r = (Resto) o[0];
			
			Long distance = (Long) o[1];
			System.out.print("R name " + r.getName() + " d " + distance);
		});
		
		return new ArrayList<Resto>();
	}

	
}
