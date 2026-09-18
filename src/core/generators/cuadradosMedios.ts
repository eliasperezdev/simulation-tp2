import type { ResultadoGenerador } from '../types'

export function generarCuadradosMedios(x0: number, n: number): ResultadoGenerador {
  const ancho = String(Math.abs(Math.trunc(x0))).length
  const divisor = 10 ** ancho + 1
  let actual = Math.abs(Math.trunc(x0))
  const secuencia = []
  for (let i = 1; i <= n; i += 1) {
    const cuadrado = String(actual * actual).padStart(ancho * 2, '0')
    const inicio = Math.max(0, Math.floor((cuadrado.length - ancho) / 2))
    actual = Number(cuadrado.slice(inicio, inicio + ancho))
    secuencia.push({ i, xi: actual, ri: actual / divisor })
  }
  return { secuencia, divisor }
}