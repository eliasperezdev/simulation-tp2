import type { ResultadoGenerador } from '../types'

export function generarCongruencialMixto(x0: number, a: number, c: number, m: number, n: number): ResultadoGenerador {
  
  if (m <= 0 || a <= 0 || c <= 0) {
    throw new Error('a, c y m deben ser mayores a 0')
  }
  if (m <= x0 || m <= a || m <= c) {
    throw new Error('m debe ser mayor que x0, a y c')
  }

  const aBig = BigInt(Math.trunc(a))
  const cBig = BigInt(Math.trunc(c))
  const mBig = BigInt(Math.trunc(m))
  let actual = BigInt(Math.trunc(x0))

  const secuencia = []
  for (let i = 1; i <= n; i += 1) {
    actual = (aBig * actual + cBig) % mBig
    secuencia.push({ i, xi: Number(actual), ri: Number(actual) / m })
  }
  return { secuencia, divisor: m }
}