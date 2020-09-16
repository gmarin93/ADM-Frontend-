import React, { Fragment, useContext } from 'react';
import Tarea from './Tarea';
import proyectoContext from '../../context/proyectos/proyectoContext';
import tareaContext from '../../context/tareas/tareaContext';
import { CSSTransition, TransitionGroup } from 'react-transition-group'


const ListadoTareas = () => {

    // Tipos de destructuring

    // 1(De una función en parámetros {})
    // 2(De un arreglo [])

    const { proyecto, eliminarProyecto } = useContext(proyectoContext);
    const { tareasproyecto } = useContext(tareaContext);

    if (!proyecto) return <h2>Selecciona un proyecto</h2>

    const [proyectoActual] = proyecto; //Array destructuring

    const onClickEliminar = () => {
        eliminarProyecto(proyectoActual._id);
    }

    return (
        <Fragment>
            <h2>Proyecto: {proyectoActual.nombre}</h2>
            <ul className="listado-tareas">
                {tareasproyecto.length === 0 ? (<li className="tarea"><p> No hay tareas </p></li>)
                    :
                    <TransitionGroup>
                        {
                            tareasproyecto.map(tarea => {

                                // if (tarea) {
                                    return (
                                        <CSSTransition
                                            key={`${tarea._id}`}
                                            timeout={200}
                                            classNames="tarea">
                                            <Tarea
                                                key={tarea._id}
                                                tarea={tarea} />
                                        </CSSTransition>
                                    )
                                // }

                            })
                        }
                    </TransitionGroup>
                }
            </ul>
            <button className="btn btn-eliminar" type="button" onClick={onClickEliminar}>Eliminar Proyecto &times;</button>
        </Fragment>
    );
};

export default ListadoTareas;