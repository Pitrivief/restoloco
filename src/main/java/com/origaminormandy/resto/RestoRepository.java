package com.origaminormandy.resto;


import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface RestoRepository extends JpaRepository<Resto, Long>, RestoRepositoryCustom {
	
	
	

    /*

    https://medium.com/maatwebsite/the-best-way-to-locate-in-mysql-8-e47a59892443
 ( 6371 * acos( cos( radians(some_latitude) ) * cos( radians( lat ) ) * cos( radians( lng ) - radians(some_longitude) ) + sin( radians(some_latitude) ) * sin(radians(lat)) ) ) AS distance 

    */
     @Query(value="SELECT "
             + "new com.origaminormandy.resto.RestoDTO(r, ( 6371 * acos( cos( radians(:lat)) * cos( r.lat * pi()/180 ) * cos( r.lng * pi()/180 ) - :lng * pi()/180 ) + sin( (:lat * pi()/180 ) * sin( r.lat * pi()/180) ) ) AS distance ) "
             + "FROM Resto r ORDER BY distance")
    public Page<RestoDTO> findAllOrderByDistanceFromGeocodePoint(@Param("lng") Double lng, @Param("lat") Double lat,Pageable p);

}
