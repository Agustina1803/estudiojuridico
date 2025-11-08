import React from 'react'
import { Link } from 'react-router-dom';
import '../styles/footer.css'

const Footer = () => {
  return (
 <footer className="backgraundFooter w-100">
  <p className="mb-0">© Todos los derechos reservados</p>
  <Link to="nosotros " className="">Sobre Nosotros</Link>
  <Link to="contacto" className="">Contacto</Link>
</footer> 

  )
}



export default Footer
