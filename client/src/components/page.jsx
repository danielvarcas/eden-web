import React from 'react';
import PropTypes from 'prop-types';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import Menu from './menu';
import Hamburger from './hamburger';
import Home from './home';
import Install from './install';
import Links from './links';
import Tools from './tools';
import Rules from './rules';
import About from './about';
import Contact from './contact';
import './style.css';

const Page = props => {
  const { location, config } = props;
  const [active, setActive] = React.useState(false);

  const changePage = (_e, data) => {
    localStorage.getItem('page', data.to);
    setActive(false);
  };

  return (
    <div className="gm_main h-100">
      <div className="gm_banner">
        <Hamburger active={active} toggle={() => setActive(!active)} />
        <h2 className="gm_banner_text">Eden</h2>
      </div>
      {config && Object.keys(config).length === 0 && (
        <div className="alert alert-warning m-0 text-center">
          <span>
            Website tools are currently down. Please check again later.
          </span>
        </div>
      )}
      <Menu
        active={active}
        selection={location.pathname}
        onClick={changePage}
      />
      <Switch>
        <Route
          exact
          path="/install"
          render={() => <Install info={config.install} />}
        />
        <Route exact path="/tools" render={() => <Tools />} />
        <Route
          exact
          path="/links"
          render={() => <Links links={config.links} />}
        />
        <Route
          exact
          path="/rules"
          render={() => <Rules list={config.rules} />}
        />
        <Route exact path="/about" render={About} />
        <Route
          exact
          path="/home"
          render={() => <Home posts={config.posts} />}
        />
        <Route exact path="/contact" render={() => <Contact />} />
        <Redirect from="/" to={localStorage.getItem('page') || '/home'} />
      </Switch>
    </div>
  );
};

Page.propTypes = {
  location: PropTypes.shape({
    hash: PropTypes.string,
    key: PropTypes.string,
    pathname: PropTypes.string,
    search: PropTypes.string,
    // state: ???
  }).isRequired,

  config: PropTypes.shape({
    install: PropTypes.shape({
      bootloader: PropTypes.string.isRequired,
      discord: PropTypes.string.isRequired,
      source1: PropTypes.string.isRequired,
      source2: PropTypes.string.isRequired,
    }),
    links: PropTypes.arrayOf(
      PropTypes.shape({
        description: PropTypes.string,
        header: PropTypes.string,
        image: PropTypes.string,
        url: PropTypes.string,
      })
    ),
    posts: PropTypes.arrayOf(
      PropTypes.shape({
        author: PropTypes.string,
        data: PropTypes.string,
        message: PropTypes.string,
        title: PropTypes.string,
      })
    ),
    rules: PropTypes.shape({
      allowed: PropTypes.arrayOf(PropTypes.string),
      disallowed: PropTypes.arrayOf(PropTypes.string),
      discord: PropTypes.arrayOf(PropTypes.string),
      rules: PropTypes.arrayOf(PropTypes.string),
      terms: PropTypes.arrayOf(PropTypes.string),
      yells: PropTypes.arrayOf(PropTypes.string),
    }),
  }).isRequired,
};

export default withRouter(Page);
