import React, { useReducer } from 'react';
import proyectoContext from './proyectoContext';
import proyectoReducer from './proyectoReducer';
// import uuid from 'uuid/v4';
import clienteAxios from '../../config/axios';

import {
    FORMULARIO_PROYECTO,
    OBTENER_PROYECTOS,
    AGREGAR_PROYECTO,
    VALIDAR_FORMULARIO,
    PROYECTO_ACTUAL,
    PROYECTO_ERROR,
    ELIMINAR_PROYECTO
} from '../../types';

// El archivo dentro de types al llamarse index.js no necesita llamarse types/index.js, así como está funciona

const ProyectoState = props => {

    // const proyectos = [
    //     { id: 1, nombre: 'Tienda Virtual' },
    //     { id: 2, nombre: 'Intranet' },
    //     { id: 3, nombre: 'Diseño de sitio' },
    //     { id: 4, nombre: 'MERN' }
    // ]

    const initialState = {
        formulario: false,
        proyectos: [],
        errorformulario: false,
        proyecto: null,
        mensaje:null
    }

    const [state, dispatch] = useReducer(proyectoReducer, initialState);

    const mostrarFormulario = () => {
        dispatch({
            type: FORMULARIO_PROYECTO
        })
    }

    const obtenerProyectos = async () => {

        try {
            
            const resultado = await clienteAxios.get(`api/proyectos`);

            dispatch({
                type: OBTENER_PROYECTOS,
                payload: resultado.data.proyectos
            });


        } catch (error) {
           
            const alerta = {
                msg: `Hubo un error`,
                categoria: `alerta-error`
            };
            
            dispatch({
                type:PROYECTO_ERROR,
                payload:alerta
            });
        }
    }

    const agregarProyecto = async proyecto => {
        // proyecto.id=uuid();

        try {

            const resultado = await clienteAxios.post('api/proyectos', proyecto);

            dispatch({
                type: AGREGAR_PROYECTO,
                payload: resultado.data
            })

        } catch (error) {

            const alerta = {
                msg: `Hubo un error`,
                categoria: `alerta-error`
            };
            
            dispatch({
                type:PROYECTO_ERROR,
                payload:alerta
            })
        }

    }

    const mostrarError = () => {
        dispatch({
            type: VALIDAR_FORMULARIO
        })
    }

    const proyectoActual = id => {
        dispatch({
            type: PROYECTO_ACTUAL,
            payload: id
        })
    }

    const eliminarProyecto = async id => {

        try {

            await clienteAxios.delete(`/api/proyectos/${id}`);
            
            dispatch({
                type: ELIMINAR_PROYECTO,
                payload: id
            });

        } catch (error) {

            const alerta = {
                msg: `Hubo un error`,
                categoria: `alerta-error`
            };
            
            dispatch({
                type:PROYECTO_ERROR,
                payload:alerta
            })
        }

    }

    // Es recomendable manejar los datos del state y luego las funciones en el value del context
    return (
        <proyectoContext.Provider
            value={{
                proyectos: state.proyectos,
                formulario: state.formulario,
                errorformulario: state.errorformulario,
                proyecto: state.proyecto,
                mensaje: state.mensaje,
                mostrarFormulario,
                obtenerProyectos,
                agregarProyecto,
                mostrarError,
                proyectoActual,
                eliminarProyecto
            }}
        >
            {props.children}
        </proyectoContext.Provider>
    );
};


export default ProyectoState;