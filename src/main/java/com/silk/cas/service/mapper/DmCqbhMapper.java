package com.silk.cas.service.mapper;

import com.silk.cas.domain.*;
import com.silk.cas.service.dto.DmCqbhDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity {@link DmCqbh} and its DTO {@link DmCqbhDTO}.
 */
@Mapper(componentModel = "spring", uses = {})
public interface DmCqbhMapper extends EntityMapper<DmCqbhDTO, DmCqbh> {


}
