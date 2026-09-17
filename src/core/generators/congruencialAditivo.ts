import type { ResultadoGenerador } from '../types'

export function generarCongruencialAditivo(semillas: number[], m: number, n: number): ResultadoGenerador {
  const k = semillas.length
  if (k < 2) {
    throw new Error('Se requieren al menos 2 semillas para el generador congruencial aditivo')
  }

  const valores = semillas.map((semilla) => Math.trunc(semilla))
  const secuencia = []

  for (let i = 1; i <= n; i += 1) {
    const j = valores.length
    const xi = ((valores[j - 1] + valores[j - k]) % m + m) % m
    valores.push(xi)
    secuencia.push({ i, xi, ri: xi / m })
  }

  return { secuencia, divisor: m }
}