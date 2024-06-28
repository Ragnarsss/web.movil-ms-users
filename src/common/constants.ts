export const timezone = 'America/Santiago';

export enum roles {
  WORKER = 'trabajador',
  ADMIN = 'administrador',
}

export enum timeCardStatus {
  PENDING = 'pendiente',
  APPROVED = 'aprobado',
  REJECTED = 'rechazado',
}

export enum entryType {
  IN = 'in',
  OUT = 'out',
}

export enum entryStatus {
  PENDING = 'pendiente',
  APPROVED = 'aprobado',
  REJECTED = 'rechazado',
}

export enum tokenType {
  ACCESS = 'access',
  REFRESH = 'refresh',
}
