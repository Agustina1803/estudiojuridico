import { Table } from "react-bootstrap";

const Tablageneral = ({ columnas, claves, filas, acciones }) => {
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
            <tr key={fila.id || indicefila}>
              <td>{indicefila + 1}</td>
              {claves.map((clave, indicecelda) => (
                <td key={indicecelda}>{fila[clave]}</td>
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
