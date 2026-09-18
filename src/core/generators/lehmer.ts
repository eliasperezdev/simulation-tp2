import type { ResultadoGenerador } from '../types'

export function generarLehmer(x: number, y: number, n: number): ResultadoGenerador {
  const semillaInicial = Math.trunc(Math.abs(x))
  const multiplicador = Math.trunc(Math.abs(y))

  const N = String(semillaInicial).length
  const K = String(multiplicador).length
  const totalCifras = N + K

  let actualX = semillaInicial
  const xis: number[] = []

  for (let i = 1; i <= n; i += 1) {
    const producto = actualX * multiplicador
    const zi = String(producto).padStart(totalCifras, '0')

    const cifrasIzquierda = zi.slice(0, K)
    const ui = zi.slice(K)

    const xi = Math.abs(Number(ui) - Number(cifrasIzquierda))
    actualX = xi

    xis.push(xi)
  }

  const divisor = Math.max(...xis) + 1
  const secuencia = xis.map((xi, idx) => ({ i: idx + 1, xi, ri: xi / divisor }))

  return { secuencia, divisor }
}