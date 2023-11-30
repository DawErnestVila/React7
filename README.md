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

Com veus, si després injectem el `RouterProvider` a la nostra aplicació i especifiquem el router que volem injectar, aquest ja tindrà les rutes que hem especificat. En aquest cas, com que només existeix la ruta `/`, només es mostrara el component `<h1>Inici</h1>`. Prova a canviar el path per `/hola` per exemple i veuràs que es mostra el següent:

![/hola](/assets/error_route.webp)

Això és un missatge definit per React Router DOM per avisar-nos que la ruta que estem visitant no existeix.

Prova a afegir alguna ruta més i veuràs que pots mostrar els contingut que desitgis.

### Creant pàgines i components. Outlet.

Normalment les pàgines tenen sempre continguts comuns que es repeteixen. Per exemple, un header, un footer, un menú de navegació, etc... Anem a crear-nos una carpeta `components` i dins d'aquesta crearem el nostre primer component: `Layout.jsx`. Intenta no copiar el codi i fes servir la dracera per generar-lo ràpidament. Ho pots fer amb `rafce`. Hauria finalment de quedar-te quelcom així:

```jsx
import React from 'react';

const Layout = () => {
  return (
    <div>
      <h1 className="text-6xl font-bold">CRM - React</h1>
    </div>
  );
};

export default Layout;
```

Si ara canvies al `main.jsx` el contingut de la ruta `/` per `<Layout />` veuràs que es mostra el contingut del nostre component:

```jsx
const router = createBrowserRouter([{ path: '/', element: <Layout /> }]);
```

Ara bé i si volem que un contingut o altre aparegui a sota de la nostra pàgina tipus o **layout+**? Per això existeix el component `Outlet` que ens permetrà mostrar el contingut de la nostra pàgina a sota dels components que vulguem. Pots revisar la documentació [aquí](https://reactrouter.com/en/main/components/outlet).

```jsx
//Layout.jsx
import React from 'react';
import { Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <div>
      <h1 className="text-6xl font-bold">CRM - React</h1>
      <Outlet />
    </div>
  );
};

export default Layout;
```

Aqui estem dient que el contingut específic de la pàgina, els "fills" del nostre Layout, es mostraran al component `Outlet`.

Anem a veure com hem de modificar el nostre `main.jsx` perquè funcioni:

```jsx
//main.jsx
...
const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '/nosaltres',
        element: <h1>Soc el child de la ruta "/nosaltres"!</h1>,
      },
    ],
  },
]);
...
```

Al nostre `router` hem afegit una propietat `children` que és un array d'objectes també amb les propietats `path` i `element`. És a dir, al mateixa idea que abans però ara especifiquem que el component que volem mostrar quan es visiti la ruta `/` és el nostre `Layout` i que a sota d'aquest, si es visita la ruta `/nosaltres`, es mostrarà el component `<h1>Soc el child de la ruta "/nosaltres"!</h1>`. Si volem aquest mateix `Layout` per tota la nostra web, tots els nostres components hauran de ser fills d'aquest.

Prova a accedir a la ruta `/nosaltres` i veuràs que es mostra el contingut que hem especificat.

Molt bé, anem a fer algunes modificacions d'acord amb algunes convencions que ens seran útils per treballar.

D'entrada crearem una nova carpeta `pages` (sota el `src` també) on anirem creant els nostres components que representin les pàgines de la nostra web. A `components` continuarem posant els components reutilitzables qeu no representin pàgines com a tal.

Et toca:

- Crea un nou comopnent `NouClient.jsx` a la carpeta `pages` i fes que es mostri quan es visiti la ruta `/clients/nou`. Mostra un text simple per veure que funciona. No t'oblidis d'importar el component `NouClient` al `main.jsx` i de crear la ruta corresponent (pots "matxacar" el children que havíem creat d'exemple)

Abans d'acabar, com ho faríem per tenir algun contingut a la pàgina principal `/`? Existeix la propietat `index` per especificar que aquell és el fill que es mostrarà si es visita la ruta per defecte definida al `router`, en el nostre cas `/`. Afegeix el següent objecte a l'array de `children` que tenim al `router`:

```jsx
  {
        index: true,
        element: <Index />,
  }
```

Si et crees el component `Index.jsx` a la carpeta `pages` i hi poses un text, veuràs que es mostra quan visites la ruta `/`. Recorda importar el component al `main.jsx`!

D'acord, lògica entesa? Ho anirem veient al llarg del projecte.

### Editant Layout

Ara que ja tenim el nostre `Layout` i el nostre `Outlet` funcionant, anem a editar el nostre `Layout` perquè tingui una mica més de contingut. D'entrada anem a aplicar alguns estils generals de TailwindCSS que ens permetin mostrar quelcom similar a això:

![Layout](/assets/layout_design.gif)

Per això, afegeix el següent codi al teu `Layout.jsx`:

```jsx
const Layout = () => {
  return (
    <div className="md:flex md:min-h-screen">
      <div className="bg-amber-800 px-5 py-10 md:w-1/4"></div>
      <main className="overflow-scroll p-10 md:h-screen md:w-3/4"></main>
    </div>
  );
};
```

Finalment i per posar una mica d'ordre, el `Layout`quedaria així:

```jsx
import React from 'react';
import { Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <div className="md:flex md:min-h-screen">
      <aside className="bg-amber-800 px-5 py-10 md:w-1/4">
        <h2 className="text-center text-4xl font-black text-white">
          CRM - Clients
        </h2>
      </aside>
      <main className="overflow-scroll p-10 md:h-screen md:w-3/4">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
```

Comprova que funciona.

### Navegació entre Components amb Enllaços.

Actualment teniem dues pàgines però el nostre projecte anirà creixent. Anem a veure com hauríem de fer per navegar entre pàgines.

D'entrada podries pensar que posant que podem utilitzar un enllaç normal d'HTML:

```html
<a href="/clients/nou">Nou Client</a>
```

Això funcionaria però no ho fa de manera òptima. El que faria seria recarregar tota la pàgina i això no és el que volem.

Tenim un component anomenat `Link` que ens permet fer enllaços entre pàgines de la nostra web. [aquí](https://reactrouter.com/en/main/components/link).

Anem a veure com funciona.

D'entrada haurem d'importar el component `Link` al nostre component `Layout` que és on volem generar els enllaços del nostre `navbar` (comú a totes les nostres pàgines);

```jsx
import { Outlet, Link } from 'react-router-dom';
```

I ara, afegim una etiqueta de navegació sota el nostre `h2`:

```jsx
<nav className="mt-10">
  <ul>
    <li>
      <Link to="/"></Link>
    </li>
  </ul>
</nav>
```

Afegeix també un enllaç a `/clients/nou` i comprova que funciona. Exemple:

![Layout](/assets/links.gif)

### On som? useLocation

Anem a mirar de destacar quina és la pàgina que estem visitant en tot moment. Per això incorporem un nou `hook` anomenat `useLocation` de la mateixa llibreria `React Router DOM`. [Aquí](https://reactrouter.com/en/main/hooks/use-location).

Afegeix la dependència al teu `Layout`:

```jsx
import { Outlet, Link, useLocation } from 'react-router-dom';
```

I ara, dins de la funció del teu `Layout` crea una variable `location` que rebi el que retorna el `hook`:

```jsx
const location = useLocation();
console.log(location);
```

Mira quina informació en retorna. De moment veus que a través de la propietat `path` podem identificar la ruta que estem visitant? Amb això i els ternaris podrem aplicar els estils desitjats en funció de la ruta que estem visitant.

La sintaxi seria com això:

```jsx
<link
    to="/clients/nou"
    className={`${
        location.pathname === '/clients/nou' ? 'bg-amber-500' : ''
    }`}
>
```

Juga una mica amb aquests i intenta aplicar els esils perquè et quedi quelcom com això (he canviat alguns colors)

![Layout](/assets/links_active.gif)

Hi ha una manera també de fer-ho amb un component anomenat `NavLink` però que no utilitzarem de moment. Pots consultar la documentació [aquí](https://reactrouter.com/en/main/components/nav-link).

### Creant un "Loader"

Anem a suposar que aquesta pàgina `Index` serà l'encarregada de mostrar un llistat de clients. Aquests segurament vindrien d'una API, triguin una mica en obtenirse i finalment els tindriem en una variable d'estat del component. En el cas de React Router DOM, això ja no és fa amb un `useState` o `useEffect` sino que han incorporat una funció anomenada `loader` i que és una funció que hem d'exportar per tal d'utilitzar com a part del `Route`. És similar a un `useEffect` i que es dispararà quan el component es carregui. Aquest SEMPRE HA DE RETORNAR QUELCOM!

Necessitem fer dues passes:

- Importar el `hook` anomenat `useLoaderData` que ens permetrà accedir a les dades que ens retorna el `loader`.

- Implementar la funció `loader` que retornarà les dades que necessitem.

D'entrada importem el `hook`. Com que estem a `index.jsx` i encara no hem importat res:

```jsx
// Index.jsx
import React from 'react';
import { useLoaderData } from 'react-router-dom';
```

crearíem la funció en el nostre component `Index` però fora de la funció del component:

```jsx
// Index.jsx
export const loader = () => {
  return 'Hola';
};
```

I a continuació l'importaríem al nostre `main.jsx`:

```jsx
// main.jsx
import Index, { loader as clientsLoader } from './pages/Index';
```

Com que és possible que no sigui l'únic `loader` que tinguem al nostre projecte, és habitual que el renombrem per evitar conflictes. En aquest cas, l'hem renombrat a `clientsLoader`. A més, com que no exporem la funció com a default, hem de fer servir les claus per importar-la.

I finalment, al nostre `router` afegiríem la propietat `loader` amb el valor de la funció que hem creat:

```jsx
// main.jsx
const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Index />,
        loader: clientsLoader,
      },
    ],
  },
]);
```

Si afegeixes el següent codi al codi del component de `Index.jsx`:

```jsx
const Index = () => {
  const data = useLoaderData();
  console.log(data);
  return (
    <>
      <h1 className="mb-2 text-center text-3xl font-black text-indigo-700">
        Clients
      </h1>
      <p className="mt-3 text-center">Administra els teus clients</p>
    </>
  );
};
```

Podràs veure per consola que es mostra el que retorna la funció `loader` que hem creat. En aquest cas, un simple text "Hola!".

Anem a mirar de treballar amb algunes dades. Agafa la següent informació i el posem a dins del `loader` i retornes l'array.

```jsx
const clients = [
  {
    nom: 'Juan (Actualitzat)',
    empresa: 'Codi Amb Juan',
    email: 'juan@juan.com',
    telèfon: '102013313',
    id: 1,
  },
  {
    nom: 'Karen',
    empresa: 'Codi Amb Juan',
    email: 'karen_nou@juan.com',
    telèfon: '138198313',
    id: 2,
  },
  {
    id: 4,
    nom: 'Miguel',
    telèfon: 319381983,
    email: 'miguel@juan.com',
    empresa: 'Codi Amb Juan',
  },
  {
    id: 5,
    nom: 'Pedro',
    telèfon: 1398198938,
    email: 'pedro@juan.com',
    empresa: 'Codi Amb Juan',
  },
  {
    nom: 'Juan Des de React',
    empresa: 'Codi amb Juan',
    email: 'correu@correu.com',
    telèfon: '10901',
    id: 6,
  },
];
```

Si no has borrat el `console.log` del `useLoaderData` veuràs que ara es mostra l'array que hem creat. Com pots imaginar, ara ja estem en disposició de mostrar aquestes dades al nostre component `Index`.

### Mostrant Clients

Repte! Reanomenem la variable `data` per `clients` perquè sigui més descriptiva:

```jsx
const clients = useLoaderData();
```

Ara, partint de la base que si la variable `clients` no està buida `clients.lengt` i fent ús taula `html`, mostra els clients que tenim a l'array que hem creat de manera similar a com mostrem en la següent imatge:

![Clients](/assets/taula_clients.png)
