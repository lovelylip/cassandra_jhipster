package com.silk.cas.web.rest;

import com.silk.cas.service.DmDonViService;
import com.silk.cas.web.rest.errors.BadRequestAlertException;
import com.silk.cas.service.dto.DmDonViDTO;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

/**
 * REST controller for managing {@link com.silk.cas.domain.DmDonVi}.
 */
@RestController
@RequestMapping("/api")
public class DmDonViResource {

    private final Logger log = LoggerFactory.getLogger(DmDonViResource.class);

    private static final String ENTITY_NAME = "dmDonVi";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final DmDonViService dmDonViService;

    public DmDonViResource(DmDonViService dmDonViService) {
        this.dmDonViService = dmDonViService;
    }

    /**
     * {@code POST  /dm-don-vis} : Create a new dmDonVi.
     *
     * @param dmDonViDTO the dmDonViDTO to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new dmDonViDTO, or with status {@code 400 (Bad Request)} if the dmDonVi has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/dm-don-vis")
    public ResponseEntity<DmDonViDTO> createDmDonVi(@Valid @RequestBody DmDonViDTO dmDonViDTO) throws URISyntaxException {
        log.debug("REST request to save DmDonVi : {}", dmDonViDTO);
        if (dmDonViDTO.getId() != null) {
            throw new BadRequestAlertException("A new dmDonVi cannot already have an ID", ENTITY_NAME, "idexists");
        }
        dmDonViDTO.setId(UUID.randomUUID());
        DmDonViDTO result = dmDonViService.save(dmDonViDTO);
        return ResponseEntity.created(new URI("/api/dm-don-vis/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /dm-don-vis} : Updates an existing dmDonVi.
     *
     * @param dmDonViDTO the dmDonViDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated dmDonViDTO,
     * or with status {@code 400 (Bad Request)} if the dmDonViDTO is not valid,
     * or with status {@code 500 (Internal Server Error)} if the dmDonViDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/dm-don-vis")
    public ResponseEntity<DmDonViDTO> updateDmDonVi(@Valid @RequestBody DmDonViDTO dmDonViDTO) throws URISyntaxException {
        log.debug("REST request to update DmDonVi : {}", dmDonViDTO);
        if (dmDonViDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        DmDonViDTO result = dmDonViService.save(dmDonViDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, dmDonViDTO.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /dm-don-vis} : get all the dmDonVis.
     *

     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of dmDonVis in body.
     */
    @GetMapping("/dm-don-vis")
    public List<DmDonViDTO> getAllDmDonVis() {
        log.debug("REST request to get all DmDonVis");
        return dmDonViService.findAll();
    }

    /**
     * {@code GET  /dm-don-vis/:id} : get the "id" dmDonVi.
     *
     * @param id the id of the dmDonViDTO to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the dmDonViDTO, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/dm-don-vis/{id}")
    public ResponseEntity<DmDonViDTO> getDmDonVi(@PathVariable UUID id) {
        log.debug("REST request to get DmDonVi : {}", id);
        Optional<DmDonViDTO> dmDonViDTO = dmDonViService.findOne(id);
        return ResponseUtil.wrapOrNotFound(dmDonViDTO);
    }

    /**
     * {@code DELETE  /dm-don-vis/:id} : delete the "id" dmDonVi.
     *
     * @param id the id of the dmDonViDTO to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/dm-don-vis/{id}")
    public ResponseEntity<Void> deleteDmDonVi(@PathVariable UUID id) {
        log.debug("REST request to delete DmDonVi : {}", id);
        dmDonViService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
