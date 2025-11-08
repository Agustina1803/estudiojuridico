import React from 'react'
import { Link } from 'react-router-dom';
import '../styles/footer.css'

const Footer = () => {
  return (
 <footer className="backgraundFooter w-100">
  <p className="mb-0">© Todos los derechos reservados</p>
  <Link to="../pages/Nosotros " className="">Sobre Nosotros</Link>
</footer> 

  )
}



export default Footer
