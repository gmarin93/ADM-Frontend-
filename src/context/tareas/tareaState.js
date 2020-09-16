import React, { useReducer } from 'react';
import TareaContext from './tareaContext';
import TareaReducer from './tareaReducer';
import clienteAxios from '../../config/axios';

// import uuid from 'uuid/v4';
import {
    TAREAS_PROYECTO, AGREGAR_TAREA, VALIDAR_TAREA, ELIMINAR_TAREA, TAREA_ACTUAL, ACTUALIZAR_TAREA, LIMPIAR_TAREA
} from '../../types';

const TareaState = props => {

    const initialState = {
        // tareas:[
        //     { nombre: "Elegir plataforma", id:1, estado: true,proyectoId:1 },
        //     { nombre: "Elegir Colores", id:2, estado: false,proyectoId:2 },
        //     { nombre: "Elegir plataforma de pago", id:3, estado: false,proyectoId:3 },
        //     { nombre: "Elegir hosting", id:4, estado: true,proyectoId:4 },
        //     { nombre: "Elegir plataforma", id:5, estado: true,proyectoId:1 },
        //     { nombre: "Elegir Colores", id:6, estado: false,proyectoId:2 },
        //     { nombre: "Elegir plataforma de pago", id:7, estado: false,proyectoId:3 },
        //     { nombre: "Elegir hosting", id:8, estado: true,proyectoId:4 },
        //     { nombre: "Elegir plataforma", id:9, estado: true,proyectoId:1 },
        //     { nombre: "Elegir Colores", id:10, estado: false,proyectoId:2 },
        //     { nombre: "Elegir plataforma de pago", id:11, estado: false,proyectoId:3 },
        //     { nombre: "Elegir hosting", id:12, estado: true,proyectoId:4 },
        //     { nombre: "Elegir Colores", id:13, estado: false,proyectoId:3 },
        // ],
        tareasproyecto: [],
        errortarea: false,
        tareaseleccionada: null
    }

    //Crear dispatch y state
    const [state, dispatch] = useReducer(TareaReducer, initialState);

    const obtenerTareas = async proyecto => {

        var array_tareas = [];

        try {

            const resultado = await clienteAxios.get(`/api/tareas`, { params: { proyecto } });

            if (resultado) {

                resultado.data.tareas.map(e => {

                    if (e != undefined) {
                        array_tareas.push(e);
                    }
                })
            }

            dispatch({
                type: TAREAS_PROYECTO,
                payload: array_tareas
            })
        } catch (error) {

        }

    }

    // Agregar tarea al proyecto seleccionado
    const agregarTarea = async tarea => {
        // tarea.id=uuid();

        try {

            const resultado = await clienteAxios.post(`api/tareas`, tarea);

            dispatch({
                type: AGREGAR_TAREA,
                payload: resultado.data.tarea
            });

        } catch (error) {
            console.log(error);
        }

    }

    const validarTarea = () => {
        dispatch({
            type: VALIDAR_TAREA
        })
    }

    const eliminarTarea = async (id, proyecto) => {

        try {

            await clienteAxios.delete(`api/tareas/${id}`, { params: { proyecto } });

            dispatch({
                type: ELIMINAR_TAREA,
                payload: id
            })

        } catch (error) {
            console.log(error);
        }

    }

    // ///CAMBIA ESTADO DE TAREAS
    // const cambiaEstadoTarea = tarea => {
    //     dispatch({
    //         type: ESTADO_TAREA,
    //         payload: tarea
    //     })
    // }

    const guardarTareaActual = tarea => {
        dispatch({
            type: TAREA_ACTUAL,
            payload: tarea
        })
    }

    const actualizarTarea = async (tarea) => {

        try {

            const resultado = await clienteAxios.put(`/api/tareas/${tarea._id}`, tarea);

            dispatch({
                type: ACTUALIZAR_TAREA,
                payload: resultado.data.tarea
            });

        } catch (error) {
            console.log(error);
        }
    }

    const limpiarTarea = () => {
        dispatch({
            type: LIMPIAR_TAREA
        })
    }

    return (
        <TareaContext.Provider
            value={{
                // tareas:state.tareas,
                tareasproyecto: state.tareasproyecto,
                errortarea: state.errortarea,
                tareaseleccionada: state.tareaseleccionada,
                obtenerTareas,
                agregarTarea,
                validarTarea,
                eliminarTarea,
                // cambiaEstadoTarea,
                guardarTareaActual,
                actualizarTarea,
                limpiarTarea
            }}>
            {props.children}
        </TareaContext.Provider>
    )

};


export default TareaState;