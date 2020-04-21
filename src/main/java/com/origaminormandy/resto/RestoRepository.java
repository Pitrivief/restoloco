package com.origaminormandy.resto;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RestoRepository extends CrudRepository<Resto, Long> {

}
