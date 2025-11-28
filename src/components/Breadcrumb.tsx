import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Breadcrumb: React.FC = () => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);

  return (
    <nav className="breadcrumb">
      <Link to="/">Inicio</Link>
      {pathnames.map((value, index) => {
        const to = `/${pathnames.slice(0, index + 1).join('/')}`;
        const isLast = index === pathnames.length - 1;

        return (
          <span key={to}>
            <span className="separator"> / </span>
            {isLast ? (
              <span className="current">{value}</span>
            ) : (
              <Link to={to}>{value}</Link>
            )}
          </span>
        );
      })}
    </nav>
  );
};

export default Breadcrumb;
