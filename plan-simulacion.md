# plan-simulacion.md

Este archivo guía al agente al trabajar en este repositorio.

## Contexto del proyecto

TP N°2 de la materia Simulación (UNCAUS) — "Generación de Variables Aleatorias".
Es una app web que se irá construyendo **de a un ejercicio por vez**, vía prompts sucesivos.
**Este archivo cubre ÚNICAMENTE el alcance del Ejercicio 4.** No implementar nada de los
ejercicios 5 en adelante (pruebas estadísticas, distribuciones empíricas, simulaciones de
servidores/mesa de ayuda/pádel/logística) hasta que se pida explícitamente en un prompt futuro.
Cuando eso pase, se actualizará este mismo plan-simulacion.md — no lo anticipes ni lo dejes "preparado".

## Alcance del Ejercicio 4 (único objetivo actual)

Implementar, con interfaz gráfica, los 5 métodos de generación de números pseudoaleatorios
resueltos a mano en los Ejercicios 2 y 3 del TP:

1. Cuadrados Medios (semilla X0)
2. Método de Lehmer (semillas X e Y, método de separación y resta)
3. Congruencial Aditivo (semillas X-3, X-2, X-1, X0 + M — cantidad de semillas variable)
4. Congruencial Multiplicativo (X0, a, M)
5. Congruencial Mixto (X0, a, c, m)

La app debe permitir:
- Elegir el método desde un selector.
- Ingresar la(s) semilla(s)/parámetros correspondientes a cada método (el formulario
  cambia dinámicamente según el método elegido).
- Para el Congruencial Aditivo específicamente: permitir ingresar la **cantidad de
  semillas** y cargar tantos valores iniciales como corresponda (no está fijo en 4).
- Ingresar N (cantidad de números a generar).
- Generar y mostrar la secuencia: tabla con `i | Xi | ri` (ri normalizado, **máximo 5
  decimales**).

**Importante:** los algoritmos van implementados a mano (fórmulas de recurrencia), nunca
usando generadores nativos del lenguaje (nada de `Math.random()` ni similares) para producir
la secuencia — esa es la lógica que se evalúa en el TP.

## Stack

- Vite + React + TypeScript
- React Router (rutas, pensado para crecer con cada ejercicio nuevo)
- Sin backend: todo el cálculo corre en cliente
- Deploy target: Vercel (build estático)
- Sin librerías de generación aleatoria/estadística de terceros — la lógica matemática se
  escribe a mano en `core/`

## Estructura de carpetas (crear solo lo que use el Ejercicio 4 por ahora)

```
src/
├── core/
│   ├── generators/
│   │   ├── cuadradosMedios.ts
│   │   ├── lehmer.ts
│   │   ├── congruencialAditivo.ts
│   │   ├── congruencialMultiplicativo.ts
│   │   └── congruencialMixto.ts
│   └── types.ts
├── pages/
│   ├── Home/
│   └── Generador/          # Ejercicio 4
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx
│   │   └── PageLayout.tsx
│   ├── forms/
│   │   └── ParamsPanel.tsx # panel dinámico según método elegido
│   └── tables/
│       └── SequenceTable.tsx
├── store/
│   └── sequenceStore.ts    # guarda la última secuencia generada, para reutilizarla
│                            # cuando se agregue el Ejercicio 5 (pruebas estadísticas)
├── router.tsx
└── main.tsx
```

No crear carpetas de `tests/`, `distributions/` ni páginas de otros ejercicios todavía —
se agregan cuando se pida ese ejercicio puntual.

## Convenciones de código

- `core/` no importa nada de React. Son funciones puras, con firma clara tipo:
  `generarCuadradosMedios(x0: number, n: number): ResultadoGenerador`
  donde `ResultadoGenerador` incluye la secuencia de `Xi` y de `ri` (normalizados).
- `pages/` y `components/` solo arman UI y llaman a `core/`; no calculan nada por sí mismos.
- Los `ri` se calculan como `Xi / m` (o el divisor que corresponda al método) y se muestran
  redondeados a 5 decimales, sin perder precisión interna en el cálculo.
- Nombres de variables y funciones en español, consistentes con el enunciado del TP
  (semilla, secuencia, ri, Xi, etc.), para que el código sea legible junto al informe.
- Componentes funcionales, TypeScript estricto, sin `any`.

## Qué NO hacer todavía

- No implementar pruebas estadísticas (Promedios, Rachas, Póker, Corridas, Series).
- No implementar transformada inversa ni distribuciones empíricas/teóricas.
- No armar las páginas de simulación (servidores, mesa de ayuda, pádel, logística).
- No agregar backend, autenticación, ni persistencia en base de datos.
- No adelantar el `store/` con estructuras que todavía no se usan (mantenerlo simple,
  solo lo necesario para guardar/leer la secuencia generada en el Ejercicio 4).

## Definición de "hecho" para este alcance

- Se puede elegir cualquiera de los 5 métodos desde la UI.
- Cada método pide exactamente los parámetros que necesita (ni más ni menos).
- Se puede generar una secuencia de N números y verla en una tabla clara (i, Xi, ri).
- El Congruencial Aditivo permite cantidad variable de semillas iniciales.
- La app corre con `npm run dev` y buildea sin errores con `npm run build` (listo para
  desplegar en Vercel como sitio estático).
