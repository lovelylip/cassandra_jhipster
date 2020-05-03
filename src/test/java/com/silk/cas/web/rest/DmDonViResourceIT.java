package com.silk.cas.web.rest;

import com.silk.cas.AbstractCassandraTest;
import com.silk.cas.CassilkApp;
import com.silk.cas.domain.DmDonVi;
import com.silk.cas.repository.DmDonViRepository;
import com.silk.cas.service.DmDonViService;
import com.silk.cas.service.dto.DmDonViDTO;
import com.silk.cas.service.mapper.DmDonViMapper;
import com.silk.cas.web.rest.errors.ExceptionTranslator;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.validation.Validator;


import java.util.List;
import java.util.UUID;

import static com.silk.cas.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link DmDonViResource} REST controller.
 */
@SpringBootTest(classes = CassilkApp.class)
public class DmDonViResourceIT extends AbstractCassandraTest {

    private static final String DEFAULT_MA = "AAAAAAAAAA";
    private static final String UPDATED_MA = "BBBBBBBBBB";

    private static final String DEFAULT_TEN = "AAAAAAAAAA";
    private static final String UPDATED_TEN = "BBBBBBBBBB";

    private static final String DEFAULT_MA_TINH = "AAAAAAAAAA";
    private static final String UPDATED_MA_TINH = "BBBBBBBBBB";

    private static final String DEFAULT_MA_HUYEN = "AAAAAAAAAA";
    private static final String UPDATED_MA_HUYEN = "BBBBBBBBBB";

    private static final String DEFAULT_MA_XA = "AAAAAAAAAA";
    private static final String UPDATED_MA_XA = "BBBBBBBBBB";

    @Autowired
    private DmDonViRepository dmDonViRepository;

    @Autowired
    private DmDonViMapper dmDonViMapper;

    @Autowired
    private DmDonViService dmDonViService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private Validator validator;

    private MockMvc restDmDonViMockMvc;

    private DmDonVi dmDonVi;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final DmDonViResource dmDonViResource = new DmDonViResource(dmDonViService);
        this.restDmDonViMockMvc = MockMvcBuilders.standaloneSetup(dmDonViResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter)
            .setValidator(validator).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static DmDonVi createEntity() {
        DmDonVi dmDonVi = new DmDonVi()
            .ma(DEFAULT_MA)
            .ten(DEFAULT_TEN)
            .maTinh(DEFAULT_MA_TINH)
            .maHuyen(DEFAULT_MA_HUYEN)
            .maXa(DEFAULT_MA_XA);
        return dmDonVi;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static DmDonVi createUpdatedEntity() {
        DmDonVi dmDonVi = new DmDonVi()
            .ma(UPDATED_MA)
            .ten(UPDATED_TEN)
            .maTinh(UPDATED_MA_TINH)
            .maHuyen(UPDATED_MA_HUYEN)
            .maXa(UPDATED_MA_XA);
        return dmDonVi;
    }

    @BeforeEach
    public void initTest() {
        dmDonViRepository.deleteAll();
        dmDonVi = createEntity();
    }

    @Test
    public void createDmDonVi() throws Exception {
        int databaseSizeBeforeCreate = dmDonViRepository.findAll().size();

        // Create the DmDonVi
        DmDonViDTO dmDonViDTO = dmDonViMapper.toDto(dmDonVi);
        restDmDonViMockMvc.perform(post("/api/dm-don-vis")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(dmDonViDTO)))
            .andExpect(status().isCreated());

        // Validate the DmDonVi in the database
        List<DmDonVi> dmDonViList = dmDonViRepository.findAll();
        assertThat(dmDonViList).hasSize(databaseSizeBeforeCreate + 1);
        DmDonVi testDmDonVi = dmDonViList.get(dmDonViList.size() - 1);
        assertThat(testDmDonVi.getMa()).isEqualTo(DEFAULT_MA);
        assertThat(testDmDonVi.getTen()).isEqualTo(DEFAULT_TEN);
        assertThat(testDmDonVi.getMaTinh()).isEqualTo(DEFAULT_MA_TINH);
        assertThat(testDmDonVi.getMaHuyen()).isEqualTo(DEFAULT_MA_HUYEN);
        assertThat(testDmDonVi.getMaXa()).isEqualTo(DEFAULT_MA_XA);
    }

    @Test
    public void createDmDonViWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = dmDonViRepository.findAll().size();

        // Create the DmDonVi with an existing ID
        dmDonVi.setId(UUID.randomUUID());
        DmDonViDTO dmDonViDTO = dmDonViMapper.toDto(dmDonVi);

        // An entity with an existing ID cannot be created, so this API call must fail
        restDmDonViMockMvc.perform(post("/api/dm-don-vis")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(dmDonViDTO)))
            .andExpect(status().isBadRequest());

        // Validate the DmDonVi in the database
        List<DmDonVi> dmDonViList = dmDonViRepository.findAll();
        assertThat(dmDonViList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    public void checkMaIsRequired() throws Exception {
        int databaseSizeBeforeTest = dmDonViRepository.findAll().size();
        // set the field null
        dmDonVi.setMa(null);

        // Create the DmDonVi, which fails.
        DmDonViDTO dmDonViDTO = dmDonViMapper.toDto(dmDonVi);

        restDmDonViMockMvc.perform(post("/api/dm-don-vis")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(dmDonViDTO)))
            .andExpect(status().isBadRequest());

        List<DmDonVi> dmDonViList = dmDonViRepository.findAll();
        assertThat(dmDonViList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    public void checkTenIsRequired() throws Exception {
        int databaseSizeBeforeTest = dmDonViRepository.findAll().size();
        // set the field null
        dmDonVi.setTen(null);

        // Create the DmDonVi, which fails.
        DmDonViDTO dmDonViDTO = dmDonViMapper.toDto(dmDonVi);

        restDmDonViMockMvc.perform(post("/api/dm-don-vis")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(dmDonViDTO)))
            .andExpect(status().isBadRequest());

        List<DmDonVi> dmDonViList = dmDonViRepository.findAll();
        assertThat(dmDonViList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    public void getAllDmDonVis() throws Exception {
        // Initialize the database
        dmDonVi.setId(UUID.randomUUID());
        dmDonViRepository.save(dmDonVi);

        // Get all the dmDonViList
        restDmDonViMockMvc.perform(get("/api/dm-don-vis"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(dmDonVi.getId().toString())))
            .andExpect(jsonPath("$.[*].ma").value(hasItem(DEFAULT_MA)))
            .andExpect(jsonPath("$.[*].ten").value(hasItem(DEFAULT_TEN)))
            .andExpect(jsonPath("$.[*].maTinh").value(hasItem(DEFAULT_MA_TINH)))
            .andExpect(jsonPath("$.[*].maHuyen").value(hasItem(DEFAULT_MA_HUYEN)))
            .andExpect(jsonPath("$.[*].maXa").value(hasItem(DEFAULT_MA_XA)));
    }
    
    @Test
    public void getDmDonVi() throws Exception {
        // Initialize the database
        dmDonVi.setId(UUID.randomUUID());
        dmDonViRepository.save(dmDonVi);

        // Get the dmDonVi
        restDmDonViMockMvc.perform(get("/api/dm-don-vis/{id}", dmDonVi.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(dmDonVi.getId().toString()))
            .andExpect(jsonPath("$.ma").value(DEFAULT_MA))
            .andExpect(jsonPath("$.ten").value(DEFAULT_TEN))
            .andExpect(jsonPath("$.maTinh").value(DEFAULT_MA_TINH))
            .andExpect(jsonPath("$.maHuyen").value(DEFAULT_MA_HUYEN))
            .andExpect(jsonPath("$.maXa").value(DEFAULT_MA_XA));
    }

    @Test
    public void getNonExistingDmDonVi() throws Exception {
        // Get the dmDonVi
        restDmDonViMockMvc.perform(get("/api/dm-don-vis/{id}", UUID.randomUUID().toString()))
            .andExpect(status().isNotFound());
    }

    @Test
    public void updateDmDonVi() throws Exception {
        // Initialize the database
        dmDonVi.setId(UUID.randomUUID());
        dmDonViRepository.save(dmDonVi);

        int databaseSizeBeforeUpdate = dmDonViRepository.findAll().size();

        // Update the dmDonVi
        DmDonVi updatedDmDonVi = dmDonViRepository.findById(dmDonVi.getId()).get();
        updatedDmDonVi
            .ma(UPDATED_MA)
            .ten(UPDATED_TEN)
            .maTinh(UPDATED_MA_TINH)
            .maHuyen(UPDATED_MA_HUYEN)
            .maXa(UPDATED_MA_XA);
        DmDonViDTO dmDonViDTO = dmDonViMapper.toDto(updatedDmDonVi);

        restDmDonViMockMvc.perform(put("/api/dm-don-vis")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(dmDonViDTO)))
            .andExpect(status().isOk());

        // Validate the DmDonVi in the database
        List<DmDonVi> dmDonViList = dmDonViRepository.findAll();
        assertThat(dmDonViList).hasSize(databaseSizeBeforeUpdate);
        DmDonVi testDmDonVi = dmDonViList.get(dmDonViList.size() - 1);
        assertThat(testDmDonVi.getMa()).isEqualTo(UPDATED_MA);
        assertThat(testDmDonVi.getTen()).isEqualTo(UPDATED_TEN);
        assertThat(testDmDonVi.getMaTinh()).isEqualTo(UPDATED_MA_TINH);
        assertThat(testDmDonVi.getMaHuyen()).isEqualTo(UPDATED_MA_HUYEN);
        assertThat(testDmDonVi.getMaXa()).isEqualTo(UPDATED_MA_XA);
    }

    @Test
    public void updateNonExistingDmDonVi() throws Exception {
        int databaseSizeBeforeUpdate = dmDonViRepository.findAll().size();

        // Create the DmDonVi
        DmDonViDTO dmDonViDTO = dmDonViMapper.toDto(dmDonVi);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restDmDonViMockMvc.perform(put("/api/dm-don-vis")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(dmDonViDTO)))
            .andExpect(status().isBadRequest());

        // Validate the DmDonVi in the database
        List<DmDonVi> dmDonViList = dmDonViRepository.findAll();
        assertThat(dmDonViList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    public void deleteDmDonVi() throws Exception {
        // Initialize the database
        dmDonVi.setId(UUID.randomUUID());
        dmDonViRepository.save(dmDonVi);

        int databaseSizeBeforeDelete = dmDonViRepository.findAll().size();

        // Delete the dmDonVi
        restDmDonViMockMvc.perform(delete("/api/dm-don-vis/{id}", dmDonVi.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<DmDonVi> dmDonViList = dmDonViRepository.findAll();
        assertThat(dmDonViList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(DmDonVi.class);
        DmDonVi dmDonVi1 = new DmDonVi();
        dmDonVi1.setId(UUID.randomUUID());
        DmDonVi dmDonVi2 = new DmDonVi();
        dmDonVi2.setId(dmDonVi1.getId());
        assertThat(dmDonVi1).isEqualTo(dmDonVi2);
        dmDonVi2.setId(UUID.randomUUID());
        assertThat(dmDonVi1).isNotEqualTo(dmDonVi2);
        dmDonVi1.setId(null);
        assertThat(dmDonVi1).isNotEqualTo(dmDonVi2);
    }

    @Test
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(DmDonViDTO.class);
        DmDonViDTO dmDonViDTO1 = new DmDonViDTO();
        dmDonViDTO1.setId(UUID.randomUUID());
        DmDonViDTO dmDonViDTO2 = new DmDonViDTO();
        assertThat(dmDonViDTO1).isNotEqualTo(dmDonViDTO2);
        dmDonViDTO2.setId(dmDonViDTO1.getId());
        assertThat(dmDonViDTO1).isEqualTo(dmDonViDTO2);
        dmDonViDTO2.setId(UUID.randomUUID());
        assertThat(dmDonViDTO1).isNotEqualTo(dmDonViDTO2);
        dmDonViDTO1.setId(null);
        assertThat(dmDonViDTO1).isNotEqualTo(dmDonViDTO2);
    }
}
