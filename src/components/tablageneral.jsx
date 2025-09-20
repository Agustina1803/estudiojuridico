import { Table } from "react-bootstrap";

const Tablageneral = ({ columnas }) => {
  return (
    <>
      <Table>
      <thead>
        <tr>
            {columnas.map((columna,indicecolumna)=>(
                <th key={indicecolumna}>{columna}</th>
            ))}
        </tr>
      </thead>
      <tbody>

      </tbody>
    </Table>
    </>
  
    
  );
};

export default Tablageneral;
