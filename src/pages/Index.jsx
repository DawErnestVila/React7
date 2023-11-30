import React from 'react';
import { useLoaderData } from 'react-router-dom';
import Client from '../components/Client';

export const loader = () => {
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
  return clients;
};

function Index() {
  const clients = useLoaderData();
  console.log(clients);
  return (
    <>
      <h1 className="mb-2 py-10 text-center text-3xl font-black text-indigo-800">
        Clients
      </h1>
      <p className="mt-3 text-center">Administra els teus clients</p>
      <table className="mt-10 w-full bg-indigo-800 text-white">
        <thead>
          <tr>
            <th className="px-4 py-4">Nom</th>
            <th className="px-4 py-4">Empresa</th>
            <th className="px-4 py-4">Email</th>
            <th className="px-4 py-4">Telèfon</th>
          </tr>
        </thead>
        <tbody className="bg-white text-black">
          {clients.map((client) => (
            <Client client={client} />
          ))}
        </tbody>
      </table>
    </>
  );
}

export default Index;
