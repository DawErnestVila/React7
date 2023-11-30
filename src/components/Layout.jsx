import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';

const Layout = () => {
  const location = useLocation();
  console.log(location);
  return (
    <div className="md:flex md:min-h-screen">
      <aside className="bg-indigo-800 px-5 py-10 md:w-1/4">
        <h2 className="text-center text-4xl font-black text-white">
          CRM - Clients
        </h2>
        <nav className="mt-10">
          <ul>
            <li className="flex flex-col text-white">
              <Link
                to="/"
                className={`${
                  location.pathname === '/'
                    ? 'p-2 text-2xl font-black text-yellow-200 hover:rounded-xl hover:bg-yellow-300 hover:text-indigo-800'
                    : 'p-2 text-2xl font-black text-white hover:rounded-xl hover:bg-yellow-300 hover:text-indigo-800'
                }`}
              >
                Clients
              </Link>
              <Link
                to="/clients/nou"
                className={`${
                  location.pathname === '/clients/nou'
                    ? 'p-2 text-2xl font-black text-yellow-200 hover:rounded-xl hover:bg-yellow-300 hover:text-indigo-800'
                    : 'p-2 text-2xl font-black text-white hover:rounded-xl hover:bg-yellow-300 hover:text-indigo-800'
                }`}
              >
                Nou Client
              </Link>
            </li>
          </ul>
        </nav>
      </aside>
      <main className="overflow-scroll p-10 md:h-screen md:w-3/4">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
