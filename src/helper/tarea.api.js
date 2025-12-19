const urlEstudio = import.meta.env.VITE_URL_DESARROLLO;

export const listarTareas = async () =>{
    try{
        const respuesta = await fetch(`${urlEstudio}/tarea`);
        if(!respuesta.ok){
            throw new Error("Error al obtener tareas");
        } 
        return await respuesta.json();
    }catch(error){
        console.error(error);
        return null;
    }
}