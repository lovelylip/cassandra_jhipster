package com.silk.cas.repository;
import com.silk.cas.domain.DmCqbh;
import org.springframework.data.cassandra.repository.CassandraRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

/**
 * Spring Data Cassandra repository for the DmCqbh entity.
 */
@SuppressWarnings("unused")
@Repository
public interface DmCqbhRepository extends CassandraRepository<DmCqbh, UUID> {

}
