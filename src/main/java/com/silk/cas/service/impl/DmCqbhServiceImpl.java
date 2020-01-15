package com.silk.cas.service.impl;

import com.silk.cas.service.DmCqbhService;
import com.silk.cas.domain.DmCqbh;
import com.silk.cas.repository.DmCqbhRepository;
import com.silk.cas.service.dto.DmCqbhDTO;
import com.silk.cas.service.mapper.DmCqbhMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;

import java.util.LinkedList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

/**
 * Service Implementation for managing {@link DmCqbh}.
 */
@Service
public class DmCqbhServiceImpl implements DmCqbhService {

    private final Logger log = LoggerFactory.getLogger(DmCqbhServiceImpl.class);

    private final DmCqbhRepository dmCqbhRepository;

    private final DmCqbhMapper dmCqbhMapper;

    public DmCqbhServiceImpl(DmCqbhRepository dmCqbhRepository, DmCqbhMapper dmCqbhMapper) {
        this.dmCqbhRepository = dmCqbhRepository;
        this.dmCqbhMapper = dmCqbhMapper;
    }

    /**
     * Save a dmCqbh.
     *
     * @param dmCqbhDTO the entity to save.
     * @return the persisted entity.
     */
    @Override
    public DmCqbhDTO save(DmCqbhDTO dmCqbhDTO) {
        log.debug("Request to save DmCqbh : {}", dmCqbhDTO);
        DmCqbh dmCqbh = dmCqbhMapper.toEntity(dmCqbhDTO);
        dmCqbh = dmCqbhRepository.save(dmCqbh);
        return dmCqbhMapper.toDto(dmCqbh);
    }

    /**
     * Get all the dmCqbhs.
     *
     * @return the list of entities.
     */
    @Override
    public List<DmCqbhDTO> findAll() {
        log.debug("Request to get all DmCqbhs");
        return dmCqbhRepository.findAll().stream()
            .map(dmCqbhMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }


    /**
     * Get one dmCqbh by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Override
    public Optional<DmCqbhDTO> findOne(UUID id) {
        log.debug("Request to get DmCqbh : {}", id);
        return dmCqbhRepository.findById(id)
            .map(dmCqbhMapper::toDto);
    }

    /**
     * Delete the dmCqbh by id.
     *
     * @param id the id of the entity.
     */
    @Override
    public void delete(UUID id) {
        log.debug("Request to delete DmCqbh : {}", id);
        dmCqbhRepository.deleteById(id);
    }
}
