export interface IDmCqbh {
  id?: string;
  ma?: string;
  ten?: string;
  maCha?: string;
  tenCha?: string;
  diaChi?: string;
  path?: string;
  maTinh?: string;
  maHuyen?: string;
  maXa?: string;
}

export class DmCqbh implements IDmCqbh {
  constructor(
    public id?: string,
    public ma?: string,
    public ten?: string,
    public maCha?: string,
    public tenCha?: string,
    public diaChi?: string,
    public path?: string,
    public maTinh?: string,
    public maHuyen?: string,
    public maXa?: string
  ) {}
}
