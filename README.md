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

ReactDOM.createRoot(document.getElementById('root')).render(
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

### REPTE! Mostrant Clients

Repte! Reanomenem la variable `data` per `clients` perquè sigui més descriptiva:

```jsx
const clients = useLoaderData();
```

Ara, partint de la base que si la variable `clients` no està buida i fent 'us d'una taula `html`, mostra els clients que tenim a l'array que hem creat de manera similar a com mostrem en la següent imatge:

![Clients](/assets/taula_clients.png)

Segurament hagis optat per crear l'estrcutrua directament al component `Index` però aquest seria un bon moment per crear un nou component (reutilitzable!) anomenat `Client.jsx` a la carpeta `components` i utilitzar-lo al `Index`.

Molt bé, ho tens?

Anem a canviar algunes coses de la nostra taula sobretot a nivell d'estils. Et proposo que intentis també arribar a una proposta similar a la següent:

![Clients](/assets/client_nou.webp)

Els botons els he generat amb l'ajut de copilot donant-li un parell d'idees. Prova-ho!

Segurament el mateix botó seria candidat a ser un component reutilitzable. De moment no ho farem però pots imaginar que és una bona idea!

### Nou Client - useNavigate

Anem a començar el nostre formulari per enregistrar nous clients. Anem a la nostra pàgina `NouClient` i comencem afegint el següent codi.

D'entrada comencem imaginant, abans de centar-nos en el mateix formulari, que volem ja pensar en un botó que ens permeti tornar en qualssevol moment a la pàgina anterior perquè ja no desitjem crear un nou client.

Un codi per on començar podria ser el següent:

```jsx
import React from 'react';

const NouClient = () => {
  return (
    <>
      <h1 className="mb-2 text-center text-3xl font-black text-indigo-700">
        Nou Client
      </h1>
      <p className="text-bold mt-3 text-center text-2xl">
        Necessitem les teves dades! 🤓 Omple el formulari.
      </p>
      <div className="flex justify-end">
        <button className="mt-5 rounded bg-indigo-800 px-4 py-2 font-bold text-white hover:bg-indigo-900">
          {' '}
          Tornar
        </button>
      </div>
    </>
  );
};

export default NouClient;
```

Ens fem un botó que ens permeti tornar a la pàgina anterior. Aquí és interessant aturar-se i parlar d'un nou `hook`, `useNavigate`. Referència oficial [Aquí](https://reactrouter.com/en/main/hooks/use-navigate).

Aquest `hook` ens permetrà navegar entre pàgines de la nostra web. El seu ús és senzill prò necessitem importar-lo. Al nostre component `NouClient` afegim:

```jsx
import { useNavigate } from 'react-router-dom';
```

Dins de la funció del nostre component, creem una variable `navigate` que rebi el que retorna el `hook`:

```jsx
const navigate = useNavigate();
```

I ara ja podem fer servir aquesta variable per navegar entre pàgines. Per exemple, si volem que al fer click al botó de tornar, ens porti a la pàgina anterior, faríem servir el següent codi:

```jsx
// NouClient.jsx sense estils
<button onClick={() => navigate(-1)}>Tornar</button>
```

`navigate` també ens permet navegar a una pàgina concreta. Simplement li hem de passar la ruta com a paràmetre.

Per posar una mica el nostre codi al dia, et mostro tot el codi del component `NouClient` amb els estils que he afegit:

```jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

const NouClient = () => {
  const navigate = useNavigate();
  return (
    <>
      <h1 className="mb-2 text-center text-3xl font-black text-indigo-700">
        Nou Client
      </h1>
      <p className="text-bold mt-3 text-center text-2xl">
        Necessitem les teves dades! 🤓 Omple el formulari.
      </p>
      <div className="flex justify-end">
        <button
          className="my-5 rounded bg-indigo-800 px-3 py-1 font-bold text-white hover:bg-indigo-900"
          onClick={() => navigate(-1)}
        >
          Tornar
        </button>
      </div>

      <div className=" mx-auto rounded-md bg-white px-5 py-10 shadow md:w-3/4">
        <p>Formulari aqui</p>
      </div>
    </>
  );
};

export default NouClient;
```

En aquests moments al vista de `NouClient` hauria de ser quelcom com això:

![NouClient](/assets/nou_client.png)

De moment no entrarem en aquest tema però també hi ha un altre manera e redireccionar amb `Redirect`, però aquesta és fa servir més aviat en el cas del `loader`.

### Formulari Nou Client

Anem a fer un recordatori dels principals paràmetres d'un input inputs d'un formulari a **HTML**:

- `name`: el nom del camp
- `id`: l'identificador del camp
- `value`: el valor del camp
- `type`: el tipus de camp (text, email, password, etc...)
- `placeholder`: el text que es mostra quan el camp està buit
- `required`: si el camp és obligatori o no

El `label` és l'etiqueta que es mostra al costat del camp. Aquesta etiqueta està relacionada amb el camp mitjançant l'atribut `htmlFor` que rep el valor de l'`id` del camp.

Dit això, crea un nou component anomenat `Formulari.jsx` a la carpeta `components`. A continació se't facilita el codi necessari:

```jsx
import React from 'react';

const Formulari = ({ client }) => {
  return (
    <>
      <div className="mb-4">
        <label className="text-gray-800" htmlFor="nom">
          Nom:
        </label>
        <input
          id="nom"
          type="text"
          className="mt-2 block w-full bg-gray-50 p-3"
          placeholder="Nom del Client"
          name="nom"
        />
      </div>
      <div className="mb-4">
        <label className="text-gray-800" htmlFor="empresa">
          Empresa:
        </label>
        <input
          id="empresa"
          type="text"
          className="mt-2 block w-full bg-gray-50 p-3"
          placeholder="Empresa del Client"
          name="empresa"
        />
      </div>

      <div className="mb-4">
        <label className="text-gray-800" htmlFor="email">
          Correu electrònic:
        </label>
        <input
          id="email"
          type="email"
          className="mt-2 block w-full bg-gray-50 p-3"
          placeholder="Correu electrònic del Client"
          name="email"
        />
      </div>

      <div className="mb-4">
        <label className="text-gray-800" htmlFor="telefon">
          Telèfon:
        </label>
        <input
          id="telefon"
          type="tel"
          className="mt-2 block w-full bg-gray-50 p-3"
          placeholder="Telèfon del Client"
          name="telefon"
        />
      </div>

      <div className="mb-4">
        <label className="text-gray-800" htmlFor="notes">
          Notes:
        </label>
        <textarea
          as="textarea"
          id="notes"
          type="text"
          className="align-self mt-2 block h-40 w-full bg-gray-50 p-3"
          placeholder="Notes del Client"
          name="notes"
        />
      </div>
    </>
  );
};

export default Formulari;
```

Fes un cop d'ull. Potser està bé destacar el camp de les notes que és un `textarea`. Això indica que és un camp de text però que pot tenir varies línies.

Sí cal destacar que aquest formulari rep un paràmetre `client` que és un objecte amb les dades del client. Això ens permetrà reutilitzar el mateix formulari per crear i editar clients com ja hem vist amb algun altre cas. De moment no estem fent servir aquest paràmetre... be pacient!

Ara podem importar el nostre formulari al nostre component `NouClient` i afegir-lo a continuació del codi de la funció del nostre component. Recorda que hauràs d'importar el component!

```jsx
// NouClient.jsx
...
<div className=" mx-auto rounded-md bg-white px-5 py-10 shadow md:w-3/4">
  <form>
    <Formulari />
    <input
      type="submit"
      className="mt-2 w-full rounded-md bg-indigo-700 p-2 font-bold uppercase text-white hover:bg-indigo-900"
      value="Registrar nou client"
    />
  </form>
</div>
...
```

Modifica els estils al teu gust i intenta finalment que l'aparença global en aquests moments sigui similar a la següent:

![NouClient](/assets/formulari.png)

### HandleSubmit? No és necessari!

Amb les noves versions de React Router DOM han afegit una nova manera de generar allò que sempre havíem fet amb `handleSubmit`.

Anem per passo a veure com ho fem. Des d'allà on volem fer el submit del formulari, en el nostre cas al component `NouClient`, afegim el següent codi:

1. Importem el component `Form` de React Router DOM. Pots trobar la documentació [aquí](https://reactrouter.com/en/main/components/form).

```jsx
import { Form } from 'react-router-dom';
```

2. Modiquem el nostre html `form` per un `Form` de React Router DOM, ja que ara és un component qui ho gestiona.

```jsx
<Form method="POST">
  <Formulari />
  <input
    type="submit"
    className="mt-2 w-full rounded-md bg-indigo-700 p-2 font-bold uppercase text-white hover:bg-indigo-900"
    value="Registrar nou client"
  />
</Form>
```

Els formularis s'envien normalment mitjançant el mètode `POST`.

Fins fa no massa hauríem posat també l'acció a realitzar al mateix formulari. Això, com veurem, ara ja no és així i es gestiona a través del `router`.

De manera similar a com havíem fet amb `loader`, ens creem una funció auxiliar en aquest cas anomenada `action`

```jsx
// NouClient.jsx
...
export const action = (client) => {
  console.log("S'ha enviat el formulari");
  return null;
};
...
```

3. I tornem a importar aquesta funció al nostre `main.jsx`:

```jsx
// main.jsx
import NouClient, { action as nouClientAction } from './pages/NouClient';
```

I de la mateixa manera que havíem definit un `loader` per la nostra pàgina `Index` encarregat de retornar les dades dels clients, ara definim un `action` per la nostra pàgina `NouClient` encarregat de gestionar el formulari.

Repassem com ho tindríem al nostre `router`:

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
      {
        path: '/clients/nou',
        element: <NouClient />,
        action: nouClientAction,
      },
    ],
  },
]);
```

D'aquesta manera quan es faci submit del formulari, es dispararà la funció `action` a través del `router` i que de moment acabarà únicament mostrant un missatge per consola.

> **IMPORTANT** Hem vist **Actions** i **Loaders**. Aquests dos conceptes són nous a partir de la versió 6 de React Router DOM. En general:
>
> - `Actions` per processar l'entrada de dades d'un Form de React Router DOM (no per qualssevol etiqueta `form` de HTML!!!)
> - `Loaders` per obtenir les dades d'una API o d'un objecte (de manera similar a un state)

Ens falten alguns passos amb el Formulari abans de començar a veure com connectar-nos a una API.

- Hem de saber com llegir la informació que ens ingressen al Formulari (formData).
- Veurem com afegir algunes validacions al Formulari.
- Veurem alguns nous hooks relacionats amb això com useLoaderData i useActionData.

Mira que tot estigui funcionant correctament fins ara!

### Llegint la informació del Formulari amb `formData`

En un `action` associat a un formulari, com pots imaginar se li ha de poder fer arribar la informació que s'ha ingressat al formulari.

Al teu `NouClient.jsx` reformula el teu codi de la funció `action`:

```jsx
export const action = ({ request }) => {
  console.log(request);
  return null;
};
```

Revisa ara la consola i veuràs un objecte que conté molts paràmetres relatius al formulari que hem enviat. Sota el `prototype` veuràs que hi ha un objecte `formData` que conté la informació que hem enviat. Aquest objecte té el seu origen a les peticions `fetch` que s'han fet servir habitualment per enviar formularis ja des de l'ús habitual d'AJAX.

Aqui ens trobem davant del cas d'una funció que hauria de ser asíncrona en realitat. Pot trigar uns instants a poder recuperar la informació del formulari.

Així doncs anem a reformular la nostra funció `action` perquè sigui una funció asíncrona i pugui recuperar directament la informació del formulari que ens interessa:

```jsx
export const action = async ({ request }) => {
  const formData = await request.formData();
  return null;
};
```

Si t'has fixat bé abans, `formData()` és en realitat un mètode per tant hem de fer una crida a aquest, `request.forData()` i no accedir com si es tractpes d'un propietat.

Si fas un console.log de `formData` encara no veuràs però la informació que has introduït al formulari. Aquí és important fer alguns comentaris.

> **IMPORTANT:** La interfície `formData` és pròpia de JavaScript i ens permet simplificar la construcció i/o manipulació de parelles clau-valor (key/value) que s'envien a través d'un formulari, habitualment fent ús de `fetch()`. Pots fer un cop d'ull als detalls de cada mètode [aquí](https://developer.mozilla.org/en-US/docs/Web/API/FormData).

En aquest cas podrem recuperar la informació del formulari a través de `formData.get('nom_camp')`. Per exemple, si volem recuperar el nom del client, faríem servir `formData.get('nom')`.

```jsx
export const action = async ({ request }) => {
  const formData = await request.formData();
  console.log(formData.get('nom'));
  return null;
};
```

Hi ha alguns "trucs" per poder recuperar també la informació, per exemple a través de l'operador de propagació `...`:

```jsx
export const action = async ({ request }) => {
  const formData = await request.formData();
  console.log([...formData]);
  return null;
};
```

Pots veure que retorna un array amb els key/value del formulari en format array.

Però encara ho podem millorar això per obtenir-ho en format d'objecte:

```jsx
export const action = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData.entries());
  console.log(data);
  return null;
};
```

### Validacions - useActionData

Ara que ja sabem com recuperar la informació del formulari, anem a veure com fer algunes validacions. `formData` obtindrà tota la informació que hagi ingressat l'usuari al formulari.

Necessitem poder validar i fer saber a l'usuari si existeix algun error amb les dades introduïdes. Per això, React Router DOM ens proporciona un nou `hook` anomenat `useActionData`. Aquest `hook` ens permetrà accedir a la informació que retorna la funció `action` que hem creat. Funciona de manera similar a com ja havíem fet amb el `Loader` i el `useLoaderData` per la llista de Clients.

Anem a veure com funciona. D'entrada importem el `hook` al nostre component `NouClient`:

```jsx
import { useNavigate, Form, useActionData } from 'react-router-dom';
```

I a continuació, dins de la funció del nostre component, creem una variable `actionData` que rebi el que retorna el `hook`:

```jsx
export const NouClient = () => {
  const errors = useActionData();
  const navigate = useNavigate();

  return (
    ...
  );
};
```

Ara podem implementar la lògica necessària per detectar els errors i posar-los en aquesta variable `errors`que ja hem anticipat:

```jsx
export const action = async ({ request }) => {
  const formData = await request.formData();
  const dades = Object.fromEntries(formData.entries());
  console.log(dades);

  // Validacions
  const errors = [];
  if (Object.values(dades).includes('')) {
    errors.push({ text: 'Tots els camps són obligatoris' });
  }

  // Reteornar errors en cas que hi hagin
  if (Object.keys(errors).length) {
    console.log('Hi ha errors');
    return errors;
  }
  return null;
};
```

Aquí fem una única validació de moment. Si algun dels camps està buit: `Object.values(dades).includes('')` afegim un nou objecte a l'array `errors` amb el text que volem mostrar a l'usuari.

En segona instància comprovem si l'array `errors` té algun element. En cas afirmatiu, retornem l'array `errors` i en cas contrari retornem `null`.

Abans de continuar, anem a fer-nos un nou component anomenat `Error.jsx` a la carpeta `components` que ens permeti mostrar els errors que puguin haver-hi. Aquest component rebrà un paràmetre `children` que serà el text que volem mostrar a l'usuari.

```jsx
// Error.jsx
import React from 'react';

const Error = ({ children }) => {
  return (
    <div className="p3 mx-auto my-4 bg-red-600 text-center font-bold uppercase text-white">
      {children}
    </div>
  );
};

export default Error;
```

Ja ho tenim tot, la lògica de validació i el nostre component a mostrar. Podem fer servir la variable `errors` al nostre component `NouClient` per mostrar els errors que puguin haver-hi. Per exemple:

```jsx
// NouClient.jsx
{
  errors?.length &&
    errors.map((error, i) => <Error key={i}>{error.text}</Error>);
}
```

És important destacar aquí que el que passem com a paràmetre és un `children`. Això és un `prop` especial de React. Pots consultar la documentació [aquí](https://react.dev/reference/react/Children). Això fa que haguem de passar el text que volem mostrar a l'usuari amb **etiquetes d'obertura i tancament** del nostre component `Error` (<Error> ... </Error>).

També hi ha alguna notació que ens pot sobtar. Per exemple, el `?` que hi ha després de `errors`. Això és un `optional chaining` i ens permet comprovar si la variable `errors` existeix abans de fer la comprovació de la seva longitud.

És com comprovar si existeix i si té algun element. Amb `&&` simplement estem comprovant si la condició és certa (té una longitud major que 0) i en cas afirmatiu, executem el codi que hi ha a continuació. Per recòrrer l'array i mostrar els errors, fem servir el mètode `map`.

### Validacions

Anem a introduir algunes validacions.

D'entrada, si el camp del correu electrònic no és vàlid, afegirem un nou error a l'array `errors`. Ho farem mitjançant l'expressió regular que pots veure a continuació:

```jsx
let regex = new RegExp(
  "([!#-'*+/-9=?A-Z^-~-]+(.[!#-'*+/-9=?A-Z^-~-]+)*|\"([]!#-[^-~ \t]|(\\[\t -~]))+\")@([!#-'*+/-9=?A-Z^-~-]+(.[!#-'*+/-9=?A-Z^-~-]+)*|[[\t -Z^-~]*])",
);
```

Aquesta és una expressió típica per validar correus electrònics. Si vols saber més sobre aquest tema, pots consultar [aquesta pàgina](https://emailregex.com/).

Així doncs, afegim la següent validació al nostre `action` (la pots afegir a continuació de la validació anterior):

```jsx
if (!regex.test(dades.email)) {
  errors.push({ text: 'El correu electrònic no és vàlid' });
}
```

Si proves el teu formulari, veuràs que la validació del correu electrònic encara no funciona. Apareix la validació pròpia de HTML. Aquesta la podem desactivar afegint la propietat `noValidate` al nostre `Form`:

```jsx
<Form method="POST" noValidate>
```

Ara sí, hauries de poder veure el missatge d'error que hem afegit al nostre component `Error`:

![Validació](/assets/validacio.png)

A continuació et deixo el codi complet del component `NouClient` perquè puguis comprovar que tot està correcte:

```jsx
import React from 'react';
import { useNavigate, Form, useActionData } from 'react-router-dom';
import Formulari from '../components/Formulari';
import Error from '../components/Error';

export const action = async ({ request }) => {
  const formData = await request.formData();
  const dades = Object.fromEntries(formData.entries());
  const email = formData.get('email');

  // Validacions
  const errors = [];
  if (Object.values(dades).includes('')) {
    errors.push({ text: 'Tots els camps són obligatoris' });
  }

  let regex = new RegExp(
    "([!#-'*+/-9=?A-Z^-~-]+(.[!#-'*+/-9=?A-Z^-~-]+)*|\"([]!#-[^-~ \t]|(\\[\t -~]))+\")@([!#-'*+/-9=?A-Z^-~-]+(.[!#-'*+/-9=?A-Z^-~-]+)*|[[\t -Z^-~]*])",
  );
  if (!regex.test(email)) {
    errors.push({ text: 'El correu electrònic no és vàlid' });
  }

  // Reteornar errors en cas que hi hagin
  if (Object.keys(errors).length) {
    console.log('Hi ha errors');
    return errors;
  }
  return null;
};

export const NouClient = () => {
  const errors = useActionData();
  const navigate = useNavigate();

  return (
    <>
      <h1 className="mb-2 text-center text-3xl font-black text-indigo-700">
        Nou Client
      </h1>
      <p className="text-bold mt-3 text-center text-2xl">
        Necessitem les teves dades! 🤓 Omple el formulari.
      </p>
      <div className="flex justify-end">
        <button
          className="my-5 rounded bg-indigo-700 px-3 py-1 font-bold text-white hover:bg-indigo-900"
          onClick={() => navigate(-1)}
        >
          Tornar
        </button>
      </div>

      <div className=" mx-auto rounded-md bg-white px-5 py-10 shadow md:w-3/4">
        {errors?.length &&
          errors.map((error, i) => <Error key={i}>{error.text}</Error>)}
        <Form method="post" noValidate>
          <Formulari />
          <input
            type="submit"
            className="mt-2 w-full rounded-md bg-indigo-700 p-2 font-bold uppercase text-white hover:bg-indigo-900"
            value="Registrar nou client"
          />
        </Form>
      </div>
    </>
  );
};

export default NouClient;
```

### Introducció a JSON Server

Anem a veure com crear una REST API "fake" per poder fer les nostres proves. Per això farem servir una llibreria anomenada `JSON Server`. Pots consultar la documentació [aquí](https://www.npmjs.com/package/json-server).

Per instal·lar-la, des del terminal del teu projecte, executa la següent comanda:

```bash
npm install -g json-server
```

Què és una **REST-API**? Una API és una interfície de programació d'aplicacions. Una API REST és una API que segueix l'arquitectura REST. REST és un acrònim que significa Representational State Transfer. En termes senzills, una API REST és una interfície que permet que els sistemes es comuniquin entre si. Les API REST utilitzen el protocol HTTP per obtenir dades o realitzar accions en un altre sistema. Ha de poder respondre a peticions HTTP com GET, POST, PUT, PATCH i DELETE:

- GET: **obtenir** dades
- POST: **crear** dades. Enviar dades al servidor
- PUT/PATCH: **actualitzar** dades
- DELETE: **eliminar** dades

Una REST-API fa servir **Endpoints** o **URLs** per accedir a les dades i fer operacions **CRUD**. Per exemple:

- GET /clients: obtenir tots els clients
- GET /clients/1: obtenir el client amb id 1
- POST /clients: crear un nou client
- PUT /clients/1: actualitzar el client amb id 1
- DELETE /clients/1: eliminar el client amb id 1

Obre el terminal del teu projecte i crea un nou fitxer anomenat `db.json` al root del teu projecte. Aquest fitxer serà el que utilitzarem per crear la nostra REST API.

A continuació ves al fitxer `index.jsx` i recupera el codi on teníem la llista de clients. Aquesta llista la copiarem al nostre fitxer `db.json` i la modificarem una mica perquè quedi en format JSON:

```json
{
  "clients": [
    {
      "nom": "Juan (Actualitzat)",
      "empresa": "Empresa Exemple 1",
      "email": "juan@juan.com",
      "telefon": "102013313",
      "id": 1
    },
    ...
  ]
}
```

Ja has vist que implica el formar JSON. Hem fet els següents canvis:

- Hem envoltat tot el contingut amb `{}` perquè sigui un objecte.
- Hem envoltat cada propietat amb `""` perquè sigui un string.

Jo he aprofitat per fer alguns canvis en els paràmetres. Les eines d'IA t'ajudaran a crear aquest tipus d'exemple de manera molt ràpida.

Si ara tornes al terminal i des del directori del teu projecte executa la següent comanda:

```bash
json-server --watch db.json
```

Si no reconexi la comanda com a global prova amb:

```bash
npx json-server --watch db.json
```

Això farà que la nostra nova aplicació estigui atenta als canvis d'aquest fitxer i que crei una REST API a la ruta `http://localhost:3000/clients`.

La grandesa de JSON és que és un format que es pot llegir des de qualsevol llenguatge de programació. Això fa que sigui molt fàcil crear una REST API amb JSON Server.

### Connectant-nos a la REST API

Anem a modificar el codi que teníem al component/page `Index.jsx` perquè en lloc de llegir les dades de l'array que teníem, les llegeixi de la REST API que acabem de crear.

Per tal de seguir amb les convencions, crearem un nou component anomenat `Clients.jsx` dins d'una nova carpeta anomenada `data` (a vegades trobaràs que s'anomena `api`).

Aquest component serà el que es connecti a la REST API i retorni les dades dels clients. Farem servir la sintaxi d'**async/await** que ja coneixeiu i que resulta més fàcil i intuitiva que l'ús de Promises directament.

Abans però ens crearem unes variable d'entorn per fer la nostra aplicació més versàtil.

Enlloc de fer directament:

```jsx
const url = 'http://localhost:3000/clients';
```

Crearem un arxiu al root del nostre projecte anomenat `.env` i hi afegirem la següent línia:

```jsx
VITE_API_URL=http://localhost:3000/clients
VITE_DB_USUARI = root
```

En el cas de `Vite` sempre hauràs de començar les variables d'entorn amb `VITE_` perquè les tingui en compte.

Com que he fet un canvi en un arxiu que no existia fins ara, he de reiniciar el servidor. Si no ho fas, no podràs accedir a les variables d'entorn. Executa de nou `npm run dev`!!!

Prova uns instant des del component `Client.jsx` a canviar contingut del `Loader` de la següent manera:

```jsx
// Client.jsx
export const loader = () => {
  console.log(import.meta.env);
};
```

Veuràs que el console.log retorna un objecte amb les variables d'entorn que hem definit. Ara podem fer servir la variable `VITE_API_URL`.

Tornem a `Clients.jsx` i modifiquem el nostre codi:

```jsx
// Clients.jsx
export const obtenirClients = async () => {
  const resposta = await fetch(import.meta.env.VITE_API_URL);
  const resultat = await resposta.json();
  console.log(resultat);
  return resultat;
};
```

Si ara tornes a modificar a `Index.jsx` (recorda que el loader sempre ha de retornar quelcom, si no et fallarà, per això retornem l'objecte buit):

```jsx
// Index.jsx
export const loader = () => {
  obtenirClients();
  return {};
};
```

Podràs veure els resultats a la teva consola. Ja et pots imaginar que finalment haurem de retornar aquest resultat perquè el `loader` pugui retornar les dades i poblar la teva taula amb els clients que hi hagi a la teva REST API.

```jsx
// Index.jsx
export const loader = () => {
  const clients = obtenirClients();
  return clients;
};
```

### Pantalla d'Error

Podem crear una pantalla d'error per mostrar un millor que l'habitual que rebem:

![Error](/assets/error_capture.png)

Com ho fem això?

Aquest missatge d'error es produeix per quelcom propi de React anomenat `Error Boundary`. Aquests son components de React que obtenen errors de components fills i els mostren en lloc de que la nostra aplicació es trenqui. Pots consultar la documentació [aquí](https://react.dev/reference/react/Component#catching-rendering-errors-with-an-error-boundary).

Per crear un `Error Boundary` crearem un nou component anomenat `ErrorPage.jsx` a la carpeta `components`:

```jsx
import React from "react";
import { useRouteError } from `react-router-dom`;

export const ErrorPage = () => {
  const error = useRouteError();
  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <h1 className="text-2xl font-bold text-red-600">Error</h1>
      <p className="text-xl text-red-600">{error.message}</p>
    </div>
  );
};

export default ErrorPage;
```

Com veus fem ús d'un nou `hook` anomenat `useRouteError` que ens permetrà accedir a l'error que s'ha produït. Tens més informació sobre aquest `hook` [aquí](https://reactrouter.com/en/main/hooks/use-route-error).

Si ara importes aquest component al teu `main.jsx` (recorda importar-lo!) i el fas servir com a `element` a la teva ruta `Index`, podràs veure el missatge d'error que hem creat.

```jsx
...
children: [
{
index: true,
element: <Index />,
loader: clientsLoader,
errorElement: <ErrorPage />,
},
...
```

Prova per exemple a canviar la ruta de la teva REST API a `http://localhost:3000/clients2` i veuràs que el missatge d'error que hem creat apareix.

### Creant un nou Client (CREATE)

Anem a veure com crear un nou client a la nostra REST API.

Ja tenim un component `Client.jsx` que conté la funció `obtenirClients` que ens permet obtenir els clients. Anem a afegir noves funcions a aquest component per poder crear, editar i eliminar clients. Com que el codi que conté és únicament JavaScript, podem reanomenar de fet el component a `Clients.js` i eliminar l'extensió `jsx`.

Anem a veure com ha de fer-se aquesta funció per crear un nou client. Des de `Clients.js` creem una nova funció anomenada `afegirClient`:

```js
export const afegirClient = async (client) => {
  console.log(client);
  try {
    const resposta = await fetch(import.meta.env.VITE_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(client),
    });
    await resposta.json();
  } catch (error) {
    console.log(error);
  }
};
```

Vegem de quina manera fem servir `fetch` per enviar les dades a la nostra REST API. Aquesta funció rep dos paràmetres:

- La ruta on volem enviar les dades
- Un objecte amb les dades que volem enviar

En aquest cas, el segon paràmetre és un objecte amb les dades del client que volem enviar. Aquestes dades les hem de convertir a JSON mitjançant `JSON.stringify(client)`.
A més, hem d'indicar que el mètode que farem servir és `POST` i que el tipus de contingut és `application/json`.

Finalment, com que `fetch` retorna una Promise, fem servir `await` per esperar la resposta de la nostra REST API.

Ara anem a afegir el codi necessari al nostre component `NouClient.jsx` perquè quan es faci submit del formulari, es cridi a la funció `afegirClient` que acabem de crear. Després de les nostres validacions, allà on abans retornàvem `null` ara cridarem a la funció `afegirClient`:

```jsx
// Si hem arribat fins aquí, és que hem superat la validació: Afegim el client
// Aquesta pot demorar-se ja que estem fen una crida a la API (en aquest cas un POST)
await afegirClient(dades);
return redirect('/');
```

Atenció al `await` que hem afegit. Això és perquè la funció `afegirClient` és una funció asíncrona i per tant hem d'esperar que s'acabi d'executar abans de continuar.

D'altra banda hem afegit una nou `hook` de `react router dom` anomenat `redirect` i que has d'importar al teu component:

```jsx
import { useNavigate, Form, useActionData, redirect } from 'react-router-dom';
```

Segons la documentació, aquest `hook` hauria de ser el que utilitzem per redireccionar a una altra pàgina en el cas de tenir una funció `action` a diferència dels `Link` i el `navigate` que havíem fet servir en els altres casos.

Un cop ho tinguis, hauries de poder introduir un nou client i veure que a la teva REST API s'ha creat un nou client així com que se't redirecciona a la pàgina de clients i que el nou client apareix a la llista.

Això és molt interessant perquè podrem fer servir el mateix formulari per qualssevol REST API que tingui el mateix format.

### Editant un Client (UPDATE)

Ja ho tenim quasi això! Anem a veure com editar un client. Per fer-ho veure'm un tema anomenat **Dynamic Routing** o **Rutes Dinàmiques**.

Fins ara hem vist com crear rutes estàtiques. Per exemple:

```jsx
{
  path: '/clients/nou',
  element: <NouClient />,
  action: nouClientAction,
},
```

Aquesta ruta és estàtica perquè sempre apunta a `/clients/nou`. Però què passa si volem editar un client? En aquest cas, una manera pràctica de fer-ho és que la ruta hsigui dinàmica i apunti per exemple a: `/clients/client1` o `/clients/client2` o `/clients/client3` depenent del client que volem editar.

D'entrada hauríem de modificar el nostre `router` i afegir una nova ruta dinàmica:

```jsx
// main.jsx
...
 {
        path: '/clients/:clientId/editar',
        element: <EditarClient />,
      },
...
```

Ara ens crearem aquest nou component anomenat `EditarClient.jsx` a la carpeta `pages` i el farem servir com a `element` a la nostra ruta dinàmica. De moment anem a crear-nos un component molt senzill per tal de que l'anterior ruta funcioni (recorda importar!):

```jsx
import React from 'react';

const EditarClient = () => {
  return <div>EditarClient</div>;
};

export default EditarClient;
```

D'acord. Tenim aquesta nova ruta dinàmica. Ara què? Des d'on obtenim el `clientId`? La crida es fa des del component `Client.jsx`a través del botó d'editar associat a cada usuari. Com que necessitem navegar a una nova ruta, però aquí no es tracta d'un `action` podrem fer servir el `navigate` que ja havíem fet servir anteriorment. Recupera les passes que havíem fet per navegar amb el botó `tornar` i aconsegueix que el botó d'editar et porti a la ruta dinàmica que acabem de crear.

Pista: haurem de passar el `clientID` de manera dinàmica de manera que la nova ruta sigui del tipus `/clients/1/editar`, `/clients/2/editar`... depenent del client que vulguem editar.

Ho tens? De moment s'hauria de mostrar el contingut estàtic del nostre component `EditarClient` a la ruta `/clients/1/editar`, `/clients/2/editar`... depenent del client que vulguem editar.

Ens queda resoldre que aquesta ruta dinàmica mostri el formulari amb les dades del client que volem editar. Al component `EditarClient` recuperarem de quin client es tracta a través del `clientId` que hem passat a la ruta.

Per això es podria fer servir també el `hook` anomenat `useParams`. Pots consultar la documentació [aquí](https://reactrouter.com/en/main/hooks/use-params). De moment però en prescindirem. Nosaltres ho farem a través del `loader`.

Afegim la funció de `loader` al nostre component `EditarClient`:

```jsx
// EditarClient.jsx
export const loader = ({ params }) => {
  console.log(params);
  return null;
};
```

I al `main.jsx` afegim aquest nou `loader` a la nostra ruta dinàmica:

```jsx
// main.jsx
...
import EditarClient, { loader as editarClientLoader } from './pages/EditarClient';
...
{
        path: '/clients/:clientId/editar',
        element: <EditarClient />,
        loader: editarClientLoader,
      },
...
```

Ara si fas click a un dels botons d'editar, veuràs que a la consola es mostra un objecte amb el `clientId` que hem passat a la ruta dinàmica. És important el nom de la ruta que farem servir perquè aquesta serà la propietat que utilitzarem per accedir-hi. Els `:` especifiquen que `clientID` es tracta d'una propietat dinàmica de la ruta i aquest serà el valor que passi al nostre `loader`.

### Obtenir el client de la REST API (READ)

Sabem quin client volem editar però hem de saber recuperar la informació per mostrar-la. Al nostre arxiu de funcions CRUD `Clients.js` crearem una nova funció anomenada `obtenirClient`:

```js
// Clients.js
...
export const obtenirClient = async (clientId) => {
  const resposta = await fetch(`${import.meta.env.VITE_API_URL}/${clientId}`);
  const resultat = await resposta.json();
  console.log(resultat);
  return resultat;
};
...
```

Aquesta és molt similar a la funció `obtenirClients` que ja teníem. La diferència és que en aquest cas, la ruta que farem servir per obtenir el client serà dinàmica i per tant haurem de passar el `clientId` com a paràmetre. Editem el nostre loader perquè faci servir aquesta nova funció:

```jsx
// EditarClient.jsx
export const loader = async ({ params }) => {
  const client = await obtenirClient(params.clientID);
  console.log(client);
  return null;
};
```

Un cop la tinguis, pots comprovar si funciona el component i estàs recuperant el client correcte amb totes les seves dades.

#### Verifiquem que el client existeix (404)

Ara que ja tenim la funció `obtenirClient` podem afegir alguna verificació al nostre `loader` per verificar que el client existeix. Si no existeix, retornarem un error 404.

Imagina que consultes la ruta d'un client que no existeix. En aquest cas, la nostra REST API ens retornarà un error 404, que és l'error que es fa servir per indicar que no s'ha trobat el recurs que s'estava buscant:

```jsx
export const loader = async ({ params }) => {
  const client = await obtenirClient(params.clientID);
  if (Object.values(client).length === 0) {
    throw new Response('', { status: 404, statusText: 'No hi ha resultats' });
  }
  return client;
};
```

Què passa si ara provem d'accedir a un client que no existeix? Veuràs que es mostra el missatge d'error que hem creat a la nostra pàgina d'error. Ja veus que en aquest cas no tenim el nostre errorElement definit i es veu de la manera tan "desagradable" que hem vist abans.

Revisa com ho hem fet abans per tal d'afegir al `main.jsx` el nostre `errorElement` i modifica l'`ErrorPage.jsx` perquè mostri el missatge d'error que hem creat (cal afegir el `statusText`):

```jsx
// ErrorPage.jsx
...
      <p className="text-xl text-red-600">{error.statusText || error.message}</p>
...
```

Hauries de poder veure-ho de la següent manera:

![Error 404](/assets/no_resultats.png)

Això ens permet personalitzar el missatge d'error en cada cas així com les comprovacions que vulguem fer.

#### Omplim automàticament el formulari

Necessitem novament el codi relatiu al formulari que teníem al nostre component `NouClient.jsx`. Aquesta vegada però, enlloc de crear un nou client, volem omplir el formulari amb les dades del client que volem editar.

- Agafa tot el codi del **return** del formulari que teníem al `NouClient.jsx` i copia'l al nostre component `EditarClient.jsx`.
- Importa el component `Formulari.jsx` al nostre component `EditarClient.jsx` així com el `Form` de `react-router-dom`.
- Comenta la línia relativa a a la mostra d'errors perquè de moment no et salint errors:

  ```jsx
  // EditarClient.jsx
  ...
  {
    /* {errors?.length && errors.map((error, i) => <Error key={i}>{error.text}</Error>)} */
  }
  ...
  ```

Més tasques:

- Canvia els textos perquè tinguin sentit
- Afegeix el `hook` `useNavigate` i afegeix la variable `navigate` al nostre component.

D'acord, recordes ara com podem fer servir les dades que ens retorna el `loader`? Ho hem fet abans amb el `useLoaderData`. Revisa-ho. Necessitarem:

- Importar el `hook` `useLoaderData` al nostre component `EditarClient.jsx`.
- Crear-nos una variable, per ex `client`, que faci servir el `hook` `useLoaderData` per rebre les dades que ens retorna el `loader`.
- Fer servir aquesta variable `client` per omplir el formulari.
- Passar al formulari el `client` com a props.

```jsx
...
    <Form method="post" noValidate>
          <Formulari client={client} />
          <input
            type="submit"
            className="mt-2 w-full rounded-md bg-indigo-700 p-2 font-bold uppercase text-white hover:bg-indigo-900"
            value="Registrar nou client"
          />
        </Form>
...
```

Aquí vull aturar-me i destacar una fet prou important:

> **IMPORTANT:** En altres exemples havíem vist com la gestió de les dades, d'un formulari per exemple, la feiem a través del `state` del nostre component i per tant necessitàvem de `useState`i el paràmetre `value`així com `onChange` per poder modificar i emmagatzemar el valor dels nostres `inputs` en tot moment. En aquest cas, com que estem fent servir el `loader` per obtenir les dades, no necessitem fer servir el `state` del nostre component. A través del `loader`som capaços d'accedir a les dades i modificar-les segons ens convingui i seria una manera més moderna d'aproximar la gestió de dades a React. Pots trobar força documentació en aquest sentit a la xarxa.

Recordaràs que al nostre formulari no havíem posat un `value` als nostres `inputs`. Això seria un problema si no féssim servir el `loader` per omplir el formulari. En aquest cas, no estem fent les validacions en temps real (com ho seria si fem servir l`state`). Per solucionar fàcilment aquest problema, afegim el camp `defaultValue` als nostres `inputs`:

```jsx
// Formulari.jsx
...
<input
        type="text"
        name="nom"
        id="nom"
        placeholder="Nom"
        className="w-full rounded-md border-gray-300 p-2"
        defaultValue={client.nom}
      />
...
```

Ara bé, què passa si tornem a trobar-nos que el client no existeix per algun motiu en el moment de mostar-ho? El nostre programa tornaria a queixar-se perquè no troba aquell client. Això ho podem solucionar fàcilment amb l'operador `?` que ja havíem vist abans (**optional chaining**).

```jsx
// Formulari.jsx
defaultValue={client?.nom}
```

Modifica la resta de camps del formulari perquè facin servir `defaultValue` i l'operador `?` i prova a editar un client. Hauries de poder veure el formulari omplert amb les dades del client que volem editar.

### Creant l'acció per editar el client (UPDATE)

Quan premem el botó per modificar el client encara no farà efectiva la modificació ja que no hem implementat la lògica.

Ho farem mitjançant un `action` que ja saps que és una funció que rep un objecte amb la petició que s'ha fet.

Anem a afegir l'acció. Podem agafar el codi que teníem al `NouClient.jsx` i modificar-lo perquè faci el que necessitem. Revisa per un moment si creus que haurem de canviar alguna cosa...

- Les validacions continuaran sent vàlides
- Els camps que necessitem són els mateixos
- Ara però ja no hem d'agefir un nou client sinó que hem d'actualitzar el client que ja tenim

Recorda que per disparar l'acció necessitem fer servir el `hook` `useAction` que ja havíem vist abans i que hem de definir al `router` del nostre `main.jsx`:

```jsx
// main.jsx
...
import EditarClient, { loader as editarClientLoader, action as editarClientAction } from './pages/EditarClient';
...
{
        path: '/clients/:clientId/editar',
        element: <EditarClient />,
        loader: editarClientLoader,
        action: editarClientAction,
        errorElement: <ErrorPage />,
      },
...
```

Pensa que això té molt sentit perquè necessitem el `loader` per obtenir les dades del client que volem editar i l'`action` per actualitzar-les.

Anem a crear-nos la funció que faci la modificació de clients a la nostra REST API. Aquesta funció la crearem al nostre arxiu `Clients.js` i la cridarem `actualitzarClient`:

```js
// Clients.js
...
export const actualitzarClient = async (id, dades) => {
  const resposta = await fetch(`${import.meta.env.VITE_API_URL}/${client.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(client),
  });
  await resposta.json();
};
...
```

A destacar:

- El mètode que farem servir és `PUT` perquè estem actualitzant un client.

Imoprtem i actualitzem el nostre `action` perquè faci servir aquesta nova funció:

```jsx
// EditarClient.jsx
// Actualitzar el client
await actualitzarClient(params.clientID, dades);
return redirect('/');
```

Recorda que el `params.clientID` el rebem gràcies al `path` dinàmic que hem creat a la nostra ruta i que les `dades` les hem obtingut a través de la lògica del `fromData`.

Ens queda un últim detall. Anteriorment hem comentat els errors, recordes? Si els descomentes rebràs un error, conforme no està definit.

En primer lloc hauràs d'importar el `hook` `useActionData` al teu component. Després hauràs de fer servir aquest `hook` per obtenir els errors que retorna el `action`:

```jsx
// EditarClient.jsx
...
const errors = useActionData();
...
```

Recorda que per poder accedir a alguna de les variables d'action, hem de fer servir aquest `hook`. Recorda que l'hauràs d'importar al teu component també!

I com que fem ús del component `Error` per mostrar els errors, hauràs d'importar-lo també!

Tampoc hem importat el `redirect` que ja havíem vist abans. Recorda que aquest `hook` ens permet redireccionar a una altra pàgina. En aquest cas, quan s'actualitzi el client, volem que es redireccioni a la pàgina de clients.

### Eliminant un Client (DELETE)

Ja quasi ho tenim això! Anem a veure com eliminar un client. Treballarem amb el nostre botó d'eliminar que ja tenim des de l'inici.

L'aproximació que farem servir serà la de fer servir el botó com a `submit` del nostre formulari. Això ens permetrà fer servir el `action` per eliminar el client. Al component `Client.jsx` afegirem el següent. Fes que el teu botó d'eliminar quedi embolcallat dins del component `Form` de `react-router-dom`. Importa tant `Form` com `redirect`.

Anem per part, el nostre botó hauria de quedar de la següent manera:

```jsx
// Client.jsx
...
<Form method="post" action={'/clients/${id}/eliminar'}>
  <button
  type="submit"
  >
    Eliminar
  </button>
  ...
```

Dit això...

#### Repte!

Sabries implementar el `action` per eliminar el client? Pensa que necessitaràs:

- Importar el `hook` `useAction` al teu component.
- Crear una nova funció anomenada `eliminarClient` al teu arxiu `Clients.js`.
- Fer servir aquesta funció al teu `action`.
- Importar el `hook` `useActionData` al teu component.
- Fer servir aquest `hook` per obtenir els errors que retorna el `action`.
- Preguntar a l'usuari si està segur que vol eliminar el client.
- Redireccionar a la pàgina de clients.

Us deixo una petita demo!

![Demo](/assets/demo.gif)

Endavant!!! Amb això ja tindríem la nostra aplicació completada ;)
