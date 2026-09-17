export type Metodo = 'cuadrados' | 'lehmer' | 'aditivo' | 'multiplicativo' | 'mixto'

export interface FilaSecuencia { i: number; xi: number; ri: number }
export interface ResultadoGenerador { secuencia: FilaSecuencia[]; divisor: number }
