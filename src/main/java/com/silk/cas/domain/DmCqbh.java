package com.silk.cas.domain;
import org.springframework.data.annotation.Id;
import org.springframework.data.cassandra.core.mapping.Table;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.UUID;

/**
 * A DmCqbh.
 */
@Table("dmCqbh")
public class DmCqbh implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    private UUID id;

    @NotNull
    private String ma;

    @NotNull
    private String ten;

    private String maCha;

    private String tenCha;

    private String diaChi;

    private String path;

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

    public DmCqbh ma(String ma) {
        this.ma = ma;
        return this;
    }

    public void setMa(String ma) {
        this.ma = ma;
    }

    public String getTen() {
        return ten;
    }

    public DmCqbh ten(String ten) {
        this.ten = ten;
        return this;
    }

    public void setTen(String ten) {
        this.ten = ten;
    }

    public String getMaCha() {
        return maCha;
    }

    public DmCqbh maCha(String maCha) {
        this.maCha = maCha;
        return this;
    }

    public void setMaCha(String maCha) {
        this.maCha = maCha;
    }

    public String getTenCha() {
        return tenCha;
    }

    public DmCqbh tenCha(String tenCha) {
        this.tenCha = tenCha;
        return this;
    }

    public void setTenCha(String tenCha) {
        this.tenCha = tenCha;
    }

    public String getDiaChi() {
        return diaChi;
    }

    public DmCqbh diaChi(String diaChi) {
        this.diaChi = diaChi;
        return this;
    }

    public void setDiaChi(String diaChi) {
        this.diaChi = diaChi;
    }

    public String getPath() {
        return path;
    }

    public DmCqbh path(String path) {
        this.path = path;
        return this;
    }

    public void setPath(String path) {
        this.path = path;
    }

    public String getMaTinh() {
        return maTinh;
    }

    public DmCqbh maTinh(String maTinh) {
        this.maTinh = maTinh;
        return this;
    }

    public void setMaTinh(String maTinh) {
        this.maTinh = maTinh;
    }

    public String getMaHuyen() {
        return maHuyen;
    }

    public DmCqbh maHuyen(String maHuyen) {
        this.maHuyen = maHuyen;
        return this;
    }

    public void setMaHuyen(String maHuyen) {
        this.maHuyen = maHuyen;
    }

    public String getMaXa() {
        return maXa;
    }

    public DmCqbh maXa(String maXa) {
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
        if (!(o instanceof DmCqbh)) {
            return false;
        }
        return id != null && id.equals(((DmCqbh) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "DmCqbh{" +
            "id=" + getId() +
            ", ma='" + getMa() + "'" +
            ", ten='" + getTen() + "'" +
            ", maCha='" + getMaCha() + "'" +
            ", tenCha='" + getTenCha() + "'" +
            ", diaChi='" + getDiaChi() + "'" +
            ", path='" + getPath() + "'" +
            ", maTinh='" + getMaTinh() + "'" +
            ", maHuyen='" + getMaHuyen() + "'" +
            ", maXa='" + getMaXa() + "'" +
            "}";
    }
}
