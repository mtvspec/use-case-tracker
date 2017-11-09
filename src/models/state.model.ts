export class State {
  id: number;
  dictID: number;
  nameEn: string;
  descEn?: string | null;
  nameRu: string;
  descRu?: string | null;
  createdAt: string;
  isDeleted: boolean;
  constructor(data: {
    id: number;
    dictID: number;
    nameEn: string;
    descEn?: string | null;
    nameRu: string;
    descRu?: string | null;
    createdAt: string;
    isDeleted: boolean;
  }) {
    this.id = Number(data.id);
    this.dictID = Number(data.dictID);
    this.nameEn = String(data.nameEn);
    this.descEn = data.descEn ? String(data.descEn) : null;
    this.nameRu = String(data.nameRu);
    this.descRu = data.descRu ? String(data.descRu) : null;
    this.createdAt = data.createdAt;
    this.isDeleted = Boolean(data.isDeleted);
  }
}
