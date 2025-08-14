export type Sheep = {
  id: number;
  nombre: string;
  fecha_nacimiento: string;
  observaciones?: string;
  especie: string;
  breed:string;
  padre_id?: number | null;
  madre_id?: number | null;
  estado?: string;
};

export type Goat = {
  id: number;
  nombre: string;
  madre_id?: number | null;
  padre_id?: number | null;
   fecha_nacimiento: string;
  observaciones?: string;
  especie: string;
  estado?: string;
};