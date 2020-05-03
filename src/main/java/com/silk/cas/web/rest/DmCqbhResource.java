package com.silk.cas.web.rest;

import com.silk.cas.service.DmCqbhService;
import com.silk.cas.web.rest.errors.BadRequestAlertException;
import com.silk.cas.service.dto.DmCqbhDTO;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

/**
 * REST controller for managing {@link com.silk.cas.domain.DmCqbh}.
 */
@RestController
@RequestMapping("/api")
public class DmCqbhResource {

    private final Logger log = LoggerFactory.getLogger(DmCqbhResource.class);

    private static final String ENTITY_NAME = "dmCqbh";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final DmCqbhService dmCqbhService;

    private final SimpMessageSendingOperations messagingTemplate;

    public DmCqbhResource(DmCqbhService dmCqbhService, SimpMessageSendingOperations messagingTemplate) {
        this.dmCqbhService = dmCqbhService;
        this.messagingTemplate = messagingTemplate;
    }

    /**
     * {@code POST  /dm-cqbhs} : Create a new dmCqbh.
     *
     * @param dmCqbhDTO the dmCqbhDTO to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new dmCqbhDTO, or with status {@code 400 (Bad Request)} if the dmCqbh has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/dm-cqbhs")
    public ResponseEntity<DmCqbhDTO> createDmCqbh(@Valid @RequestBody DmCqbhDTO dmCqbhDTO) throws URISyntaxException {
        log.debug("REST request to save DmCqbh : {}", dmCqbhDTO);
        if (dmCqbhDTO.getId() != null) {
            throw new BadRequestAlertException("A new dmCqbh cannot already have an ID", ENTITY_NAME, "idexists");
        }
        dmCqbhDTO.setId(UUID.randomUUID());
        DmCqbhDTO result = dmCqbhService.save(dmCqbhDTO);
        messagingTemplate.convertAndSend("/topic/trackerDmCqbh", result);
        return ResponseEntity.created(new URI("/api/dm-cqbhs/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /dm-cqbhs} : Updates an existing dmCqbh.
     *
     * @param dmCqbhDTO the dmCqbhDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated dmCqbhDTO,
     * or with status {@code 400 (Bad Request)} if the dmCqbhDTO is not valid,
     * or with status {@code 500 (Internal Server Error)} if the dmCqbhDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/dm-cqbhs")
    public ResponseEntity<DmCqbhDTO> updateDmCqbh(@Valid @RequestBody DmCqbhDTO dmCqbhDTO) throws URISyntaxException {
        log.debug("REST request to update DmCqbh : {}", dmCqbhDTO);
        if (dmCqbhDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        DmCqbhDTO result = dmCqbhService.save(dmCqbhDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, dmCqbhDTO.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /dm-cqbhs} : get all the dmCqbhs.
     *

     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of dmCqbhs in body.
     */
    @GetMapping("/dm-cqbhs")
    public List<DmCqbhDTO> getAllDmCqbhs() {
        log.debug("REST request to get all DmCqbhs");
        return dmCqbhService.findAll();
    }

    /**
     * {@code GET  /dm-cqbhs/:id} : get the "id" dmCqbh.
     *
     * @param id the id of the dmCqbhDTO to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the dmCqbhDTO, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/dm-cqbhs/{id}")
    public ResponseEntity<DmCqbhDTO> getDmCqbh(@PathVariable UUID id) {
        log.debug("REST request to get DmCqbh : {}", id);
        Optional<DmCqbhDTO> dmCqbhDTO = dmCqbhService.findOne(id);
        return ResponseUtil.wrapOrNotFound(dmCqbhDTO);
    }

    /**
     * {@code DELETE  /dm-cqbhs/:id} : delete the "id" dmCqbh.
     *
     * @param id the id of the dmCqbhDTO to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/dm-cqbhs/{id}")
    public ResponseEntity<Void> deleteDmCqbh(@PathVariable UUID id) {
        log.debug("REST request to delete DmCqbh : {}", id);
        dmCqbhService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
