import React from 'react';
import NuevoProyecto from '../proyectos/NuevoProyecto'
import ListadoProyectos from '../proyectos/ListadoProyectos';


const Sidebar = () => {
    return (
        <aside>
            <h1>La Lydia <span>Tareas</span></h1>
            <NuevoProyecto />
            <div className="proyectos">
                <h2>Tus proyectos</h2>
                <ListadoProyectos/> 
            </div>
        </aside>
    );
};

Sidebar.propTypes = {

};

export default Sidebar;