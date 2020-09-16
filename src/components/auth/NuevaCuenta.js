import React, { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AlertaContext from '../../context/alertas/alertaContext';
import AuthContext from '../../context/autentication/authContext';


const NuevaCuenta = props => {

    const authContext = useContext(AuthContext);
    const {registrarUsuario, mensaje, autenticado} = authContext;

    const alertaContext = useContext(AlertaContext);
    const { alerta, mostrarAlerta } = alertaContext;

    useEffect(()=>{

        if(autenticado){
            props.history.push('/proyectos');
        }

        if(mensaje){
            mostrarAlerta(mensaje.msg, mensaje.categoria);
        }

        //eslint-disable-next-line

    },[mensaje, autenticado, props.history])

    const [usuario, guardarUsuario] = useState({
        nombre: '',
        email: '',
        password: '',
        confirmar: ''
    });

    const { nombre, email, password, confirmar } = usuario;

    const onChange = (e) => {
        guardarUsuario({
            ...usuario,
            [e.target.name]: e.target.value
        })
    }

    const onSubmit = e => {
    
        e.preventDefault();

        if (nombre.trim() === "" ||
            email.trim() === "" ||
            password.trim() === "" ||
            confirmar.trim() === "") {

            mostrarAlerta('Todos los campos son obligatorios','alerta-error');
            return;
        }

        if(password.length<6){
            mostrarAlerta('El password debe ser de al menos 6 caracteres','alerta-error');
            return;
        }

        if(password != confirmar){
            mostrarAlerta('Las contrañas no son iguales','alerta-error');
            return;
        }

        registrarUsuario({
            nombre,
            email,
            password
        });

    }

    return (
        <div className="form-usuario">
            {alerta ? (<div className={`alerta ${alerta.categoria}`}>{alerta.msg}</div>) : null}
            <div className="contenedor-form sombra-dark">
                <h1>Crear una cuenta</h1>

                <form onSubmit={onSubmit}>
                    <div className="campo-form">
                        <label htmlFor="nombre">Nombre</label>
                        <input type="text" id="nombre" value={nombre} name="nombre" placeholder="Tu Nombre" onChange={onChange} />
                    </div>
                    <div className="campo-form">
                        <label htmlFor="email">Email</label>
                        <input type="email" id="email" name="email" value={email} placeholder="Tu Email" onChange={onChange} />
                    </div>
                    <div className="campo-form">
                        <label htmlFor="password">Password</label>
                        <input type="password" id="password" value={password} name="password" placeholder="Tu Pasword" onChange={onChange} />
                    </div>
                    <div className="campo-form">
                        <label htmlFor="confirmar">Confirmar Password</label>
                        <input type="password" id="confirmar" value={confirmar} name="confirmar" placeholder="Repite tu Password" onChange={onChange} />
                    </div>
                    <div className="campo-form">
                        <input type="submit" className="btn btn-primario btn-block" value="Registrar" />
                    </div>
                </form>
                <Link to={'/'} className="enlace-cuenta">
                    Volver a Iniciar Sesión
                </Link>
            </div>
        </div>
    );
};

NuevaCuenta.propTypes = {

};

export default NuevaCuenta;