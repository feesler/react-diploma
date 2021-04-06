import React from 'react';
import Header from '../components/Header.jsx';
import Footer from '../components/Footer.jsx';
import Banner from '../components/Banner.jsx';

function View(props) {
  return (
    <>
      <Header />
      <main className="container">
        <div className="row">
          <div className="col">
            <Banner />

            {props.children}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

export default View;
