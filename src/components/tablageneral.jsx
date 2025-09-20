import { Table } from "react-bootstrap";

const Tablageneral = ({ columnas,filas }) => {
  return (
    <>
      <Table striped bordered hover>
        <thead >
          <tr>
            {columnas.map((columna, indicecolumna) => (
              <th key={indicecolumna}>{columna}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          
            {filas.map((fila, indicefila) => (
              <tr key={indicefila}>
                {" "}
                {fila.map((celda, indicecelda) => (
                  <td key={indicecelda}>{celda}</td>
                ))}
              </tr>
            ))}
          </tbody>
        
      </Table>
    </>
  );
};

export default Tablageneral;
