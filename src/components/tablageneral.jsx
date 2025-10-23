import { Table } from "react-bootstrap";


const Tablageneral = ({ columnas,filas,acciones }) => {
  return (
    <>
      <Table striped bordered hover responsive>
        <thead className="text-center">
          <tr>
            {columnas.map((columna, indicecolumna) => (
              <th key={indicecolumna}>{columna}</th>
            ))}
            {acciones && <th>Acciones</th>}
          </tr>
        </thead>
        <tbody className="text-center">
          
            {filas.map((fila, indicefila) => (
              <tr key={indicefila}>
                {fila.map((celda, indicecelda) => (
                  <td key={indicecelda}>{celda}</td>
                ))}
                {acciones && <td>{acciones(fila)}</td>} 
              </tr>
            ))}
          </tbody>
        
      </Table>
    </>
  );
};

export default Tablageneral;
