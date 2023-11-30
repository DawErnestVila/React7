import React from 'react';

function Client(props) {
  return (
    <tr className="text-center" key={props.client.id}>
      <td className="border px-5 py-5">{props.client.nom}</td>
      <td className="border px-4 py-2">{props.client.empresa}</td>
      <td className="border px-4 py-2">{props.client.email}</td>
      <td className="border px-4 py-2">{props.client.telèfon}</td>
    </tr>
  );
}

export default Client;
