package com.origaminormandy.resto;


import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface RestoRepository extends JpaRepository<Resto, Long>, RestoRepositoryCustom {
	

	@Query(value="select r.*, st_distance_sphere(POINT(lng, lat), POINT(-0.35,49.17)) as distance from resto r ", nativeQuery=true)
	List<RestoDTO> listRestos();
	
    /*
    (((acos(sin(((-0.35)*pi()/180)) * sin((r.lat)*pi()/180))+cos(((-0.35)*pi()/180)) * cos((r.lat)*pi()/180)) * cos((((49.17)- r.lng)*pi()/180))))*180/pi())*60*1.1515)
    */
     @Query(value="SELECT "
             + "new com.origaminormandy.resto.RestoDTO( r ,  (((((acos(sin(((-0.35)*pi()/180)) * sin((r.lat)*pi()/180))+cos(((-0.35)*pi()/180)) * cos((r.lat)*pi()/180)) * cos((((49.17)- r.lng)*pi()/180))))*180/pi())*60*1.1515) as distance) "
             + "FROM Resto r ORDER BY distance")
    public Iterable<RestoDTO> findAllByLatLng();

}
