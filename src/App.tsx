import { useState } from 'react'
import { generarCuadradosMedios } from './core/generators/cuadradosMedios'
import { generarLehmer } from './core/generators/lehmer'
import { generarCongruencialAditivo } from './core/generators/congruencialAditivo'
import { generarCongruencialMultiplicativo } from './core/generators/congruencialMultiplicativo'
import { generarCongruencialMixto } from './core/generators/congruencialMixto'
import type { FilaSecuencia, Metodo } from './core/types'
import './App.css'

const nombres: Record<Metodo, string> = { cuadrados: 'Cuadrados Medios', lehmer: 'Método de Lehmer', aditivo: 'Congruencial Aditivo', multiplicativo: 'Congruencial Multiplicativo', mixto: 'Congruencial Mixto' }
const iniciales: Record<Metodo, Record<string, number>> = {
  cuadrados: { x0: 5731 }, lehmer: { x: 37, y: 19 }, aditivo: { semillas: 4, m: 1000 },
  multiplicativo: { x0: 37, a: 19, m: 1032 }, mixto: { x0: 37, a: 19, c: 33, m: 1032 },
}

function App() {
  const [metodo, setMetodo] = useState<Metodo>('mixto')
  const [valores, setValores] = useState<Record<string, number>>({ ...iniciales.mixto, n: 10 })
  const [semillas, setSemillas] = useState([12, 34, 56, 78])
  const [secuencia, setSecuencia] = useState<FilaSecuencia[]>([])

  const cambiarMetodo = (nuevo: Metodo) => { setMetodo(nuevo); setValores({ ...iniciales[nuevo], n: valores.n || 10 }); setSecuencia([]) }
  const cambiar = (clave: string, valor: number) => {
    setValores((actual) => ({ ...actual, [clave]: valor }))
    if (metodo === 'aditivo' && clave === 'semillas') setSemillas((actual) => Array.from({ length: Math.max(2, Math.min(20, valor || 2)) }, (_, i) => actual[i] ?? 0))
  }
  const generar = () => {
    const n = Math.max(1, Math.min(10000, valores.n || 1))
    const resultado = metodo === 'cuadrados' ? generarCuadradosMedios(valores.x0 || 0, n) : metodo === 'lehmer' ? generarLehmer(valores.x || 0, valores.y || 0, n) : metodo === 'aditivo' ? generarCongruencialAditivo(semillas, valores.m || 1, n) : metodo === 'multiplicativo' ? generarCongruencialMultiplicativo(valores.x0 || 0, valores.a || 0, valores.m || 1, n) : generarCongruencialMixto(valores.x0 || 0, valores.a || 0, valores.c || 0, valores.m || 1, n)
    setSecuencia(resultado.secuencia)
  }
  const copiar = async () => { await navigator.clipboard?.writeText(secuencia.map((fila) => `${fila.i}\t${fila.xi}\t${fila.ri.toFixed(5)}`).join('\n')) }
  const campo = (clave: string, etiqueta: string) => <label><span>{etiqueta}</span><input type="number" value={valores[clave] ?? 0} onChange={(e) => cambiar(clave, Number(e.target.value))} /></label>
  const parametros = metodo === 'cuadrados' ? <div className="fields">{campo('x0', 'Semilla (X₀)')}</div> : metodo === 'lehmer' ? <div className="fields">{campo('x', 'Semilla X')}{campo('y', 'Semilla Y')}</div> : metodo === 'aditivo' ? <><div className="fields">{campo('semillas', 'Cantidad de semillas')}{campo('m', 'Módulo (m)')}</div><div className="seed-list">{semillas.map((semilla, i) => <label key={i}><span>X{i - semillas.length + 1}</span><input type="number" value={semilla} onChange={(e) => setSemillas(semillas.map((actual, j) => j === i ? Number(e.target.value) : actual))} /></label>)}</div></> : <div className="fields">{campo('x0', 'Semilla (X₀)')}{campo('a', 'Multiplicador (a)')}{metodo === 'mixto' && campo('c', 'Constante (c)')}{campo('m', 'Módulo (m)')}</div>
  return <><header><div className="brand"><div className="brand-icon">◇</div><strong>Simulación <i>·</i> Generador de Variables</strong></div><nav><button className="active">Generador</button><button disabled>Pruebas Estadísticas <small>Pronto</small></button></nav></header><main><section className="config card"><div className="section-heading"><h2>Configuración</h2><p>Parámetros del modelo matemático y tamaño muestral.</p></div><form onSubmit={(e) => { e.preventDefault(); generar() }}><label><span>Método de generación</span><select value={metodo} onChange={(e) => cambiarMetodo(e.target.value as Metodo)}>{Object.entries(nombres).map(([key, nombre]) => <option key={key} value={key}>{nombre}</option>)}</select></label><div className="params"><div className="param-title"><b>Parámetros del método</b><code>{metodo === 'mixto' ? 'Xi+1 = (a·Xi + c) mod m' : metodo === 'multiplicativo' ? 'Xi+1 = (a·Xi) mod m' : 'Definidos por el método'}</code></div>{parametros}</div><label><span>N (Cantidad a generar)</span><input type="number" min="1" max="10000" value={valores.n} onChange={(e) => cambiar('n', Number(e.target.value))} /></label><button className="primary" type="submit">▶ <span>Generar secuencia</span></button></form></section><section className="results card"><div className="result-head"><div><div className="badges"><b>{nombres[metodo]}</b><b>N = {valores.n}</b>{valores.m && <b>m = {valores.m}</b>}</div><p>Resultados normalizados generados en el intervalo uniforme [0, 1).</p></div><button className="copy" onClick={copiar}>▣ Copiar secuencia</button></div><div className="table-wrap"><table><thead><tr><th>i</th><th>Xi (Valor Entero)</th><th>ri (0, 1)</th></tr></thead><tbody>{secuencia.map((fila) => <tr key={fila.i}><td>{fila.i}</td><td>{fila.xi}</td><td>{fila.ri.toFixed(5)}</td></tr>)}</tbody></table>{secuencia.length === 0 && <div className="empty">Configura los parámetros y genera una secuencia.</div>}</div><footer><span>Mostrando {secuencia.length} iteraciones calculadas</span><span className="valid">● {secuencia.length ? 'Secuencia válida' : 'Sin resultados'}</span></footer></section></main><div className="site-footer">UNCAUS · Simulación · TP N°2</div></>
}
export default App
