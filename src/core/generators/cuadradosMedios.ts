import type { ResultadoGenerador } from '../types'

export function generarCuadradosMedios(x0: number, n: number): ResultadoGenerador {
  const ancho = String(Math.abs(Math.trunc(x0))).length
  let actual = Math.abs(Math.trunc(x0))
  const xis: number[] = []

  for (let i = 1; i <= n; i += 1) {
    const cuadrado = String(actual * actual).padStart(ancho * 2, '0')
    const inicio = Math.max(0, Math.floor((cuadrado.length - ancho) / 2))
    actual = Number(cuadrado.slice(inicio, inicio + ancho))
    xis.push(actual)
  }

  const divisor = Math.max(...xis) + 1
  const secuencia = xis.map((xi, idx) => ({ i: idx + 1, xi, ri: xi / divisor }))

  return { secuencia, divisor }
}