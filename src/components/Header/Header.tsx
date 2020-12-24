import { Button } from '@material-ui/core';
import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import './Header.scss';

const links = [
  { title: 'Главная', isButton: false, to: '/' },
  { title: 'Profile', isButton: true, to: '/profile' },
];

export const Header: FC = () => {
  return (
    <header className="header">
      <div className="header__body">
        <nav className="header__nav">
          <ul className="header__menu">
            {links.map((link, idx) => {
              return (
                <li key={idx}>
                  <Link to={link.to}>
                    {link.isButton ? (
                      <Button color="secondary" variant="contained">
                        {link.title}
                      </Button>
                    ) : (
                      link.title
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </header>
  );
};
