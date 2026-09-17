import type { ResultadoGenerador } from '../types'

export function generarCongruencialMultiplicativo(
  x0: number,
  a: number,
  m: number,
  n: number
): ResultadoGenerador {

  if (x0 <= 0) {
  throw new Error('La semilla X0 debe ser un entero positivo')
  }
  const aBig = BigInt(a)
  const mBig = BigInt(m)
  let actual = BigInt(Math.trunc(x0))

  const secuencia = []
  for (let i = 1; i <= n; i += 1) {
    actual = (aBig * actual) % mBig
    secuencia.push({
      i,
      xi: Number(actual),
      ri: Number(actual) / m,
    })
  }

  return { secuencia, divisor: m }
}