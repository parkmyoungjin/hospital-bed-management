import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Home from './components/pages/Home';
import Login from './components/auth/Login';
import AdminDashboard from './components/admin/AdminDashboard';
import BedList from './components/bed/BedList';
import AddBedForm from './components/admin/AddBedForm';
import EditBedForm from './components/admin/EditBedForm';
import AdminRoute from './components/routing/AdminRoute';
import Alert from './components/layout/Alert';

// Context
import AuthState from './context/auth/AuthState';
import BedState from './context/bed/BedState';
import AlertState from './context/alert/AlertState';

const App = () => {
  return (
    <AuthState>
      <BedState>
        <AlertState>
          <Router>
            <div className="App">
              <Navbar />
              <div className="container">
                <Alert />
                <Routes>
                  <Route exact path="/" element={<Home />} />
                  <Route exact path="/login" element={<Login />} />
                  <Route exact path="/beds" element={<BedList />} />
                  <Route
                    exact
                    path="/admin"
                    element={
                      <AdminRoute>
                        <AdminDashboard />
                      </AdminRoute>
                    }
                  />
                  <Route
                    exact
                    path="/admin/beds/add"
                    element={
                      <AdminRoute>
                        <AddBedForm />
                      </AdminRoute>
                    }
                  />
                  <Route
                    exact
                    path="/admin/beds/edit/:id"
                    element={
                      <AdminRoute>
                        <EditBedForm />
                      </AdminRoute>
                    }
                  />
                </Routes>
              </div>
            </div>
          </Router>
        </AlertState>
      </BedState>
    </AuthState>
  );
};

export default App; 