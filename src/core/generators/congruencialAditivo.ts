import type { ResultadoGenerador } from '../types'

export function generarCongruencialAditivo(semillas: number[], m: number, n: number): ResultadoGenerador {
  const valores = semillas.map((semilla) => Math.trunc(semilla))
  const secuencia = []
  for (let i = 0; i < n; i += 1) {
    const xi = (valores[i] + valores[i + 1]) % m
    valores.push(xi)
    secuencia.push({ i: i + 1, xi, ri: xi / m })
  }
  return { secuencia, divisor: m }
}
