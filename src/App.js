import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Login from './components/auth/Login';
import NuevaCuenta from './components/auth/NuevaCuenta';
import Proyectos from './components/proyectos/Proyectos';
import ProyectoState from './context/proyectos/proyectoState';
import TareaState from './context/tareas/tareaState';
import AlertasState from './context/alertas/alertaState';
import AuthState from './context/autentication/authState';
import tokenAuth from './config/token';
import RutaPrivada from './components/rutas/RutaPrivada';

//Revisar si hay token
const token = localStorage.getItem('token');

if(token){
  tokenAuth(token);
}

//Se cambia el high order component por el Route de React
 /* <Route exact path="/" component={Login} />
                <Route exact path="/nueva-cuenta" component={NuevaCuenta} />
                <Route exact path="/proyectos" component={Proyectos} />*/

function App() {

  return (
    <ProyectoState>
        <TareaState>
          <AlertasState>
      <AuthState>
            <Router>
              <Switch>
                <Route exact path="/" component={Login} />
                <Route exact path="/nueva-cuenta" component={NuevaCuenta} />
                <RutaPrivada exact path="/proyectos" component={Proyectos} />
              </Switch>
            </Router>
      </AuthState>
          </AlertasState>
        </TareaState>
    </ProyectoState>
  );
}

export default App;
