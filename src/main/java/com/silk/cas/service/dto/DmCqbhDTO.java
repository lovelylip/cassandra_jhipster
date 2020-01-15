package com.silk.cas.service.dto;
import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.Objects;
import java.util.UUID;

/**
 * A DTO for the {@link com.silk.cas.domain.DmCqbh} entity.
 */
public class DmCqbhDTO implements Serializable {

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


    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public String getMa() {
        return ma;
    }

    public void setMa(String ma) {
        this.ma = ma;
    }

    public String getTen() {
        return ten;
    }

    public void setTen(String ten) {
        this.ten = ten;
    }

    public String getMaCha() {
        return maCha;
    }

    public void setMaCha(String maCha) {
        this.maCha = maCha;
    }

    public String getTenCha() {
        return tenCha;
    }

    public void setTenCha(String tenCha) {
        this.tenCha = tenCha;
    }

    public String getDiaChi() {
        return diaChi;
    }

    public void setDiaChi(String diaChi) {
        this.diaChi = diaChi;
    }

    public String getPath() {
        return path;
    }

    public void setPath(String path) {
        this.path = path;
    }

    public String getMaTinh() {
        return maTinh;
    }

    public void setMaTinh(String maTinh) {
        this.maTinh = maTinh;
    }

    public String getMaHuyen() {
        return maHuyen;
    }

    public void setMaHuyen(String maHuyen) {
        this.maHuyen = maHuyen;
    }

    public String getMaXa() {
        return maXa;
    }

    public void setMaXa(String maXa) {
        this.maXa = maXa;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        DmCqbhDTO dmCqbhDTO = (DmCqbhDTO) o;
        if (dmCqbhDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), dmCqbhDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "DmCqbhDTO{" +
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
