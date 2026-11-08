# Arequipa Travel (Frontend)

React + TypeScript + Vite + Material UI + React Router + Axios + React Icons + Framer Motion + Chart.js.
Sin backend: todo usa datos mock (`src/data`). No depende de ningún servicio externo salvo imágenes de `picsum.photos` y la fuente Inter (Google Fonts).

## Requisitos
Node.js 18 o superior.

## Ejecutar (VS Code, Windows o Linux)
```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # genera /dist
npm run typecheck  # verificación de tipos
```

## Docker
```bash
docker build -t arequipa-travel .
docker run -p 8080:80 arequipa-travel
```

## Rutas
`/` Home · `/login` · `/dashboard` · `/clientes` · `/destinos` · `/paquetes` · `/reservas` · `/pagos` · `/reportes` · `/recomendaciones` · `/perfil` · `/configuracion`

El login es simulado: cualquier correo válido y contraseña de 4+ caracteres entra al dashboard.
Modo claro/oscuro: botón en navbar/topbar; se guarda en localStorage.
