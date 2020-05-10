import React from 'react';
import PropTypes from 'prop-types';

import { Router } from '@reach/router';
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
import SiteNavbar from './SiteNavbar/SiteNavbar';

const Page = props => {
  const { location, config } = props;
  const [active, setActive] = React.useState(false);

  const changePage = (_e, data) => {
    localStorage.getItem('page', data.to);
    setActive(false);
  };
  const navLinks = [
    { key: 1, href: '/home', text: 'News', iconClasses: '' },
    { key: 2, href: '/install', text: 'Install', iconClasses: '' },
    { key: 3, href: '/tools', text: 'Tools', iconClasses: '' },
    { key: 4, href: '/links', text: 'Links', iconClasses: '' },
    { key: 5, href: '/rules', text: 'Rules', iconClasses: '' },
    { key: 6, href: '/about', text: 'About', iconClasses: '' },
    { key: 7, href: '/contact', text: 'Contact', iconClasses: '' },
  ];
  return (
    <div className="gm_main h-100">
      <Router>
        <SiteNavbar navLinks={navLinks} path="/*" />
        {config && Object.keys(config).length === 0 && (
          <div className="alert alert-warning m-0 text-center" path="/*">
            <span>
              Website tools are currently down. Please check again later.
            </span>
          </div>
        )}
      </Router>
      <Router primary={false} className="h-100">
        <Install path="/install" info={config.install} />
        <Tools path="/tools" />
        <Links path="/links" links={config.links} />
        <Rules path="/rules" list={config.rules} />
        <About path="/about" />
        <Home path="/home" posts={config.posts} />
        <Contact path="/contact" />
      </Router>
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

export default Page;
