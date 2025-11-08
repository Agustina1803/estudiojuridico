import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Nosotros.css';

const teamMembers = [
  {
    name: 'Daiana Varela',
    role: 'Fullstack Developer',
    description: 'Estudiante de programacion apasionada por crear interfaces accesibles, responsivas y elegantes.',
  },
  {
    name: 'Adrian Coronel',
    role: 'Fullstack Developer',
    description: 'Estudiante de ingenieria en sistemas y programacion, especialista en lógica de servidor, APIs y bases de datos.',
  },
  {
    name: 'Agustina Bulacio',
    role: 'Fullstack Developer',
    description: 'Estudiante de ingenieria en sistemas y programacion, apasionada por crear interfaces accesibles, responsivas y elegantes.',
  },
];

const AboutUs = () => {
  return (
    <div className="about-container">
      <h1>Sobre Nosotros</h1>
      <p className="intro">
        Somos un equipo apasionado por el desarrollo web, combinando diseño, funcionalidad y experiencia de usuario.
      </p>

      <div className="team-grid">
        {teamMembers.map((member, index) => (
          <div className="card" key={index}>
            <div className="avatar">{member.name.charAt(0)}</div>
            <h3>{member.name}</h3>
            <p className="role">{member.role}</p>
            <p>{member.description}</p>
          </div>
        ))}
      </div>

      <div style={{ marginTop: '2rem' }}>
        <Link to="/" className="back-link">Volver al inicio</Link>
      </div>
    </div>
  );
};

export default AboutUs;
