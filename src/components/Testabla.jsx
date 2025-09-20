import React from 'react'
import Tablageneral from './tablageneral';


const Testabla = () => {
    const columnas = ['columna1','columna2','columna3', 'columna4']

  return (
    <Tablageneral columnas={columnas}/>
  )
}

export default Testabla;