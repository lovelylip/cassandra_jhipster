export interface IDmDonVi {
  id?: string;
  ma?: string;
  ten?: string;
  maTinh?: string;
  maHuyen?: string;
  maXa?: string;
}

export class DmDonVi implements IDmDonVi {
  constructor(
    public id?: string,
    public ma?: string,
    public ten?: string,
    public maTinh?: string,
    public maHuyen?: string,
    public maXa?: string
  ) {}
}
