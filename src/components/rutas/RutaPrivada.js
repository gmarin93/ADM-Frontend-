import React, { useContext, useEffect } from 'react';
import { Route, Redirect } from 'react-router-dom';
import AuthContext from '../../context/autentication/authContext';

const RutaPrivada = ({ component: Component, ...props }) => {

//TOma un componente dentro de el, asi para proteger el componente en caso de que no este logueado
//Higher order component

    const authContext = useContext(AuthContext);
    const { autenticado,usuarioAutenticado,cargando } = authContext;

    //para mantener la sesion si se refresca la pagina
    useEffect(()=>{
        usuarioAutenticado();
        //eslint-disable-next-line
    },[]);

    return (
        <Route
            {...props} render={props => !autenticado && !cargando ? (
            <Redirect to="/" />
            ) : (
            <Component {...props} />
            )}/>
    );
};

export default RutaPrivada;