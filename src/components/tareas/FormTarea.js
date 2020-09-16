import React,{useContext,useState, useEffect} from 'react';
import proyectoContext from '../../context/proyectos/proyectoContext';
import tareaContext from '../../context/tareas/tareaContext';

const FormTarea = props => {

    const { proyecto } = useContext(proyectoContext);//Se obtienen datos del context de proyectos
    const {tareaseleccionada,agregarTarea,validarTarea,errortarea,obtenerTareas,actualizarTarea,limpiarTarea}=useContext(tareaContext);// Se obtienen datos del context de tareas
  

    useEffect(()=>{

        if(tareaseleccionada!=null){
            guardarTarea(tareaseleccionada);
        }
        else{
            guardarTarea({
                nombre:''
            })
        }
    },[tareaseleccionada]);
    
    const [tarea,guardarTarea]=useState({
        nombre:''
    })

    if(!proyecto) return null
  
    // Array destructuring que extrae el proyecto actual
    const [proyectoActual]= proyecto;
  
    const handleChange=e=>{
        guardarTarea({
            ...tarea,
            [e.target.name]: e.target.value
        })
    }
    const {nombre}= tarea;

    const onSubmit=e=>{
        e.preventDefault();

        if(nombre.trim()===''){
            validarTarea();
            return;
        }

            if(tareaseleccionada==null){

                tarea.proyecto=proyectoActual._id;
                tarea.estado=false;
                agregarTarea(tarea);
            }
            else{
                actualizarTarea(tarea);
                limpiarTarea();
            }


        //Tareas del proyecto actual
        obtenerTareas(proyectoActual._id);

        guardarTarea({
            nombre:''
        })

    }

    return (
        <div className="formulario">
            <form onSubmit={
                onSubmit
            }>
                <div className="contener-input">
                    <input type="text" className="input-text" placeholder="Nombre Tarea.." name="nombre" onChange={handleChange} value={nombre}/>
                </div>
                <div className="contener-input">
                    <input type="submit" className="btn btn-primario btn-block" value={tareaseleccionada ? `Editar Tarea` : `Nueva Tarea`}/>
                </div>
            </form>

            {errortarea ? <p className="mensaje error">Espacios en blanco</p> : null}
        </div>
    );  
};

FormTarea.propTypes = {

};

export default FormTarea;