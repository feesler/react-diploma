import './App.css';
import { Routes, Route, Navigate } from 'react-router-dom';
import MainView from './views/MainView.jsx';
import CatalogView from './views/CatalogView.jsx';
import AboutView from './views/AboutView.jsx';
import ContactsView from './views/ContactsView.jsx';
import Page404 from './views/Page404.jsx';
import CartView from './views/CartView.jsx';
import ProductView from './views/ProductView.jsx';

function App() {
  return (
    <Routes>
      <Route path="/" Component={MainView} />
      <Route path="/catalog.html/*" Component={CatalogView} />
      <Route path="/products/:id.html" Component={ProductView} />
      <Route path="/cart.html" Component={CartView} />
      <Route path="/about.html" Component={AboutView} />
      <Route path="/contacts.html" Component={ContactsView} />
      <Route path="/404.html" Component={Page404} />
      <Route path="/*" element={<Navigate to="/404.html" />} />
    </Routes>
  );
}

export default App;
