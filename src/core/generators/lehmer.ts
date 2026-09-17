import type { ResultadoGenerador } from '../types'

export function generarLehmer(x: number, y: number, n: number): ResultadoGenerador {
  const divisor = 1
  let actualX = Math.trunc(x)
  let actualY = Math.trunc(y)
  const secuencia = []
  for (let i = 1; i <= n; i += 1) {
    const producto = String(Math.abs(actualX * actualY))
    const mitad = Math.ceil(producto.length / 2)
    const izquierda = Number(producto.slice(0, mitad)) || 0
    const derecha = Number(producto.slice(-mitad)) || 0
    actualX = Math.abs(izquierda - derecha)
    actualY = actualX || actualY
    secuencia.push({ i, xi: actualX, ri: actualX / (10 ** Math.max(1, producto.length)) })
  }
  return { secuencia, divisor }
}
