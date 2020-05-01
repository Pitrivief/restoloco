package com.origaminormandy.resto;

import java.math.BigInteger;
import java.util.ArrayList;
import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.Query;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Expression;
import javax.persistence.criteria.JoinType;
import javax.persistence.criteria.ParameterExpression;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;

import org.attoparser.ParsingProcessingInstructionUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.repository.support.PageableExecutionUtils;

public class RestoRepositoryImpl implements RestoRepositoryCustom {

	@Autowired
	private EntityManager em;
	
	
	@Override
	public Page<RestoDTO> findAllOrderByDistanceFromGeocodePointNative(double lng, double lat, Pageable p) {
	
		return findAllOrderByDistanceFromGeocodePointNative(lng, lat, null, p);
	}

	public Page<RestoDTO> findAllOrderByDistanceFromGeocodePointNative(double lng, double lat,Specification spec, Pageable p) {

		CriteriaBuilder cb = em.getCriteriaBuilder();
		CriteriaQuery<Object> cq = cb.createQuery();
		Root<Resto> resto1 = cq.from(Resto.class);
		// resto1.joinList("externalLinks", JoinType.LEFT);
		ParameterExpression<Double> lngParam = cb.parameter(Double.class);
		ParameterExpression<Double> latParam = cb.parameter(Double.class);
		Expression distanceFunction = cb.function(

				"st_distance_sphere", Long.class,
				cb.function("POINT", String.class, resto1.get("lng"), resto1.get("lat")),
				cb.function("POINT", String.class, lngParam, latParam)

		);

		/*
		 * CompoundSelection<RestoDTO> c = cb.construct( RestoDTO.class, resto1, f);
		 * cq.select(c);
		 */

		cq.multiselect(resto1, distanceFunction);
		cq.orderBy(cb.asc(distanceFunction));
		
		if(spec != null) {
			System.out.println("apply spec " + spec);
			Predicate filtersPredicate = spec.toPredicate(resto1, cq, cb);
			cq.where(filtersPredicate);
		}
			

		Query q1 = em.createQuery(cq);
		
		// EntityGraph eg = em.getEntityGraph("Resto.all");
		// q1.setHint("javax.persistence.fetchgraph", eg);
		q1.setMaxResults(p.getPageSize());
		q1.setFirstResult((int) p.getOffset());
		q1.setParameter(lngParam, lng);
		q1.setParameter(latParam, lat);
		
		List<Object[]> objects = q1.getResultList();

		List<Long> ids = new ArrayList<>();
		List<RestoDTO> restos = new ArrayList<>();

		objects.forEach(objectArray -> {
			Resto r = (Resto) objectArray[0];
			ids.add(r.getId());
			Long distanceInMeter = (Long) objectArray[1];
			restos.add(new RestoDTO(r, distanceInMeter));

		});
		
		if(ids.size() == 0) {
			return PageableExecutionUtils.getPage(restos, p, () -> executeCountQuery(lng, lat));
		}
		
		cq = cb.createQuery();
		resto1 = cq.from(Resto.class);
		resto1.fetch("openings", JoinType.LEFT);
		cq.select(resto1);
		javax.persistence.criteria.Predicate inIds = resto1.get("id").in(ids);
		cq.where(inIds);
		em.createQuery(cq).getResultList();

		cq = cb.createQuery();
		resto1 = cq.from(Resto.class);
		resto1.fetch("addresses", JoinType.LEFT);
		cq.select(resto1);
		cq.where(inIds);
		em.createQuery(cq).getResultList();
		
		cq = cb.createQuery();
		resto1 = cq.from(Resto.class);
		resto1.fetch("externalLinks", JoinType.LEFT);
		cq.select(resto1);
		cq.where(inIds);
		em.createQuery(cq).getResultList();
		
		cq = cb.createQuery();
		resto1 = cq.from(Resto.class);
		resto1.fetch("cookTypes", JoinType.LEFT);
		cq.select(resto1);
		cq.where(inIds);
		em.createQuery(cq).getResultList();

		/*
		 * Query q = em.
		 * createNativeQuery("select r.*, st_distance_sphere(POINT(lng, lat), POINT(:lng,:lat)) as distance from resto r order by distance"
		 * , "RestoWithDistanceFromUser"); q.setParameter("lng", lng );
		 * q.setParameter("lat", lat ); q.setMaxResults(p.getPageSize());
		 * q.setFirstResult((int) p.getOffset()); List<Object[]> objects =
		 * q.getResultList();
		 * 
		 */
	

		return PageableExecutionUtils.getPage(restos, p, () -> executeCountQuery(lng, lat));

	}

	public long executeCountQuery(double lng, double lat) {

		Query q = em.createNativeQuery("select count(*) from resto r");
		return ((BigInteger) q.getSingleResult()).longValue();
	}

	

}
