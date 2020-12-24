import React, { FC } from 'react';
import { Form } from '../../components/Form/Form';
import { Posts } from '../../components/Posts/Posts';
import './Home.scss';

export const Home: FC = () => {
  return (
    <div className="facebook__home home">
      <div className="home__body">
        <Form />
				<Posts />
      </div>
    </div>
  );
};
