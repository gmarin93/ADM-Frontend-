import React, { useContext, useEffect } from 'react';
import Proyecto from './Proyecto';
import proyectoContext from '../../context/proyectos/proyectoContext'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import AlertaContext from '../../context/alertas/alertaContext';



const ListadoProyectos = () => {

    const { proyectos, obtenerProyectos, mensaje } = useContext(proyectoContext);

    const alertaContext = useContext(AlertaContext);
    const {alerta, mostrarAlerta} = alertaContext;

    useEffect(() => {

        if(mensaje){
            mostrarAlerta(mensaje.msg, mensaje.categoria);
        }

        obtenerProyectos();
        //eslint-disable-next-line
    }, [mensaje])

    if (proyectos.length === 0) return <p>No hay proyectos, comienza creando uno</p>; //Nunca debe haber un return antes de useffect

    return (
        <ul className="listado-proyectos">
            {alerta ? (<div className={`alerta ${alerta.categoria}`}>{alerta.msg}</div>) : null}
            <TransitionGroup>
                {proyectos.map(e => (
                    <CSSTransition
                        key={e._id}
                        timeout={200}
                        classNames="proyecto">
                        <Proyecto
                            key={e.id}
                            proyecto={e}
                        />
                    </CSSTransition>
                ))}
            </TransitionGroup>
        </ul>
    );
};

export default ListadoProyectos;