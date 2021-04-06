import './App.css';
import { Switch, Route, Redirect } from 'react-router-dom';
import MainView from './views/MainView.jsx';
import CatalogView from './views/CatalogView.jsx';
import AboutView from './views/AboutView.jsx';
import ContactsView from './views/ContactsView.jsx';
import Page404 from './views/Page404.jsx';
import CartView from './views/CartView.jsx';
import ProductView from './views/ProductView.jsx';

function App() {
  return (
    <Switch>
      <Route path="/" exact component={MainView} />
      <Route path="/catalog.html" exact component={CatalogView} />
      <Route path="/products/:id.html" component={ProductView} />
      <Route path="/cart.html" exact component={CartView} />
      <Route path="/about.html" exact component={AboutView} />
      <Route path="/contacts.html" exact component={ContactsView} />
      <Route path="/404.html" exact component={Page404} />
      <Route>
        <Redirect to="/404.html" />
      </Route>
    </Switch>
  );
}

export default App;
