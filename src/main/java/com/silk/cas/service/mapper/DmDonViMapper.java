package com.silk.cas.service.mapper;

import com.silk.cas.domain.*;
import com.silk.cas.service.dto.DmDonViDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity {@link DmDonVi} and its DTO {@link DmDonViDTO}.
 */
@Mapper(componentModel = "spring", uses = {})
public interface DmDonViMapper extends EntityMapper<DmDonViDTO, DmDonVi> {


}
