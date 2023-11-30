# Project CRM

En aquest project anem a fer un porgrama de gestió de clients típic. CRM, per si no t'ho havies preguntat, vol dir Customer Relationship Management.

Amb aquest programa, més enllà de crear, modificar i eliminar clients, començarem a treballar amb un model ja més complex on intervendran les rutes amb React Router i les crides a una API.

Com veuràs, aquí només tens l'estructura bàsica del projecte amb un boilerplate perquè puguis començar a treballar ràpidament.

## Tecnologies del projecte

React + Vite + TailwindCSS

## Què és el Routing a React?

Fins ara hem fet aplicacions d'una sola pàgina. Fins ara, auan hem necessitat canviar aspectes de la nostra aplicació, havíem mostrat o amagat components (amb ternaris, per exemple). Ara bé, amb una llibreria de Routing, podem tenir diferents URLs i en funció d'això mostrar diferents components o restringsir l'accés a certes pàgines.

Quan un projecte creix, és molt habitual que necessitem tenir diferents pàgines. Per exemple, en una botiga online, tindrem una pàgina per veure els productes, una altra per veure el carret de la compra, una altra per veure el perfil d'usuari, etc...

Hi ha diferents llibreries de Routing per React. Alguns exemples són:

- [React Router](https://reactrouter.com/)
- [Reach Router](https://reach.tech/router)
- [Remix](https://remix.run/)

Altres frameworks de treball com Next.js o Gatsby tenen el routing integrat i si treballes amb aquestes eines, és normal que utilitzis el routing que ja tenen integrat.

### React Router DOM

Nosaltres farem servir [React Router](https://reactrouter.com/). Des de la versió 6.4, podríem dir que es tracta, més que una llibreria, d'un framework de routing permetent la gestió de rutes, peticions http, formularis, etc...

Aquesta llibreria és la que veus al teu `package.json` com a `react-router-dom` (v. 6.20)

### Router i primeres rutes

Abans de començar, fes un `npm install` per instal·lar les dependències del projecte I mira que tot estigui correcte executant `npm run dev`.

Anem a analitzar el nostre `main.js`:

```jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

const router = createBrowserRouter([{ path: '/', element: <h1>Inici</h1> }]);

ReactDOM.render(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);

export default main;
```

Vegem la següent línia de codi:

```jsx
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
```

- `createBrowserRouter` és la funció responsable de crear el nostre router.
- `RouterProvider` és un component que ens permetrà injectar el router a la nostra aplicació. Des d'aquí podrem accedir a les rutes i serà el responsable de mostrar el component corresponent a la ruta que estem visitant.

Si et fixes tenim la variable const `router` que rep els que retorna la funció `createBrowserRouter`. Aquesta funció rep un array d'objectes amb dues propietats:

- `path`: la ruta que volem que es mostri
- `element`: el component que volem que es mostri quan es visiti aquesta ruta
