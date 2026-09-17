import type { ResultadoGenerador } from '../types'

export function generarCongruencialMultiplicativo(x0: number, a: number, m: number, n: number): ResultadoGenerador {
  let actual = Math.trunc(x0)
  const secuencia = []
  for (let i = 1; i <= n; i += 1) {
    actual = (a * actual) % m
    secuencia.push({ i, xi: actual, ri: actual / m })
  }
  return { secuencia, divisor: m }
}
