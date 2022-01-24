import React from 'react';
import FileUpload from './components/FileUpload';
import Product from './components/Product'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import './App.css';

const App = () => (
  <Router>
    <div className='container mt-4'>


      <Route path='/' component={FileUpload} exact></Route>
      <Route path='/fetchedproducts' component={Product} exact></Route>
    </div>
  </Router>

);

export default App;
