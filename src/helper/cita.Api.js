const urlEstudio = import.meta.env.VITE_API_DESARROLLO;

export const listarCitas = async ()=>{
    try{
        const respuesta = await fetch(`${urlEstudio}/citas`);
        if(!respuesta.ok){
            throw new Error("Error al listar las citas");
            return await respuesta.json();
        }
    }catch(error){
        console.log(error);
        return null;
    }
}