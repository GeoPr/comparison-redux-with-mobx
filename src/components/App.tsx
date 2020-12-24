import React from 'react';
import { Switch, Route } from 'react-router-dom'
import { Home } from '../pages/Home/Home';
import { Profile } from '../pages/Profile/Profile';
import { Header } from './Header/Header';
import './App.scss';

const App: React.FC = () => {
  return (
    <div className="wrapper">
      <Header />
      <main className="page">
        <section className="page__facebook facebook">
          <div className="facebook__container _container">
            <div className="facebook__body">
              <Switch>
                <Route exact path="/" component={Home} />
                <Route path="/profile" component={Profile} />
              </Switch>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

export default App
