package com.silk.cas.service.impl;

import com.silk.cas.service.DmDonViService;
import com.silk.cas.domain.DmDonVi;
import com.silk.cas.repository.DmDonViRepository;
import com.silk.cas.service.dto.DmDonViDTO;
import com.silk.cas.service.mapper.DmDonViMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;

import java.util.LinkedList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

/**
 * Service Implementation for managing {@link DmDonVi}.
 */
@Service
public class DmDonViServiceImpl implements DmDonViService {

    private final Logger log = LoggerFactory.getLogger(DmDonViServiceImpl.class);

    private final DmDonViRepository dmDonViRepository;

    private final DmDonViMapper dmDonViMapper;

    public DmDonViServiceImpl(DmDonViRepository dmDonViRepository, DmDonViMapper dmDonViMapper) {
        this.dmDonViRepository = dmDonViRepository;
        this.dmDonViMapper = dmDonViMapper;
    }

    /**
     * Save a dmDonVi.
     *
     * @param dmDonViDTO the entity to save.
     * @return the persisted entity.
     */
    @Override
    public DmDonViDTO save(DmDonViDTO dmDonViDTO) {
        log.debug("Request to save DmDonVi : {}", dmDonViDTO);
        DmDonVi dmDonVi = dmDonViMapper.toEntity(dmDonViDTO);
        dmDonVi = dmDonViRepository.save(dmDonVi);
        return dmDonViMapper.toDto(dmDonVi);
    }

    /**
     * Get all the dmDonVis.
     *
     * @return the list of entities.
     */
    @Override
    public List<DmDonViDTO> findAll() {
        log.debug("Request to get all DmDonVis");
        return dmDonViRepository.findAll().stream()
            .map(dmDonViMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }


    /**
     * Get one dmDonVi by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Override
    public Optional<DmDonViDTO> findOne(UUID id) {
        log.debug("Request to get DmDonVi : {}", id);
        return dmDonViRepository.findById(id)
            .map(dmDonViMapper::toDto);
    }

    /**
     * Delete the dmDonVi by id.
     *
     * @param id the id of the entity.
     */
    @Override
    public void delete(UUID id) {
        log.debug("Request to delete DmDonVi : {}", id);
        dmDonViRepository.deleteById(id);
    }
}
