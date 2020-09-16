import React,{useContext} from 'react';
import proyectoContext from '../../context/proyectos/proyectoContext';
import tareaContext from '../../context/tareas/tareaContext';

const Proyecto = ({ proyecto }) => {

    const proyectosContext = useContext(proyectoContext);
    const { proyectoActual } = proyectosContext;

    const {obtenerTareas}=useContext(tareaContext);

    const seleccionarProyecto=id=>{
        // Fijar un  proyecto
        proyectoActual(id);
        //Filtra las tareas al dar click
        obtenerTareas(id);
    }

    return (
        <li>
            <button
                type="button"
                className="btn btn-blank"
                onClick={()=>seleccionarProyecto(proyecto._id)}
            >{proyecto.nombre}</button>
        </li>
    );
};


export default Proyecto;