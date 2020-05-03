package com.silk.cas.domain;
import org.springframework.data.annotation.Id;
import org.springframework.data.cassandra.core.mapping.Table;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.UUID;

/**
 * A DmDonVi.
 */
@Table("dmDonVi")
public class DmDonVi implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    private UUID id;

    @NotNull
    private String ma;

    @NotNull
    private String ten;

    private String maTinh;

    private String maHuyen;

    private String maXa;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public String getMa() {
        return ma;
    }

    public DmDonVi ma(String ma) {
        this.ma = ma;
        return this;
    }

    public void setMa(String ma) {
        this.ma = ma;
    }

    public String getTen() {
        return ten;
    }

    public DmDonVi ten(String ten) {
        this.ten = ten;
        return this;
    }

    public void setTen(String ten) {
        this.ten = ten;
    }

    public String getMaTinh() {
        return maTinh;
    }

    public DmDonVi maTinh(String maTinh) {
        this.maTinh = maTinh;
        return this;
    }

    public void setMaTinh(String maTinh) {
        this.maTinh = maTinh;
    }

    public String getMaHuyen() {
        return maHuyen;
    }

    public DmDonVi maHuyen(String maHuyen) {
        this.maHuyen = maHuyen;
        return this;
    }

    public void setMaHuyen(String maHuyen) {
        this.maHuyen = maHuyen;
    }

    public String getMaXa() {
        return maXa;
    }

    public DmDonVi maXa(String maXa) {
        this.maXa = maXa;
        return this;
    }

    public void setMaXa(String maXa) {
        this.maXa = maXa;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof DmDonVi)) {
            return false;
        }
        return id != null && id.equals(((DmDonVi) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "DmDonVi{" +
            "id=" + getId() +
            ", ma='" + getMa() + "'" +
            ", ten='" + getTen() + "'" +
            ", maTinh='" + getMaTinh() + "'" +
            ", maHuyen='" + getMaHuyen() + "'" +
            ", maXa='" + getMaXa() + "'" +
            "}";
    }
}
