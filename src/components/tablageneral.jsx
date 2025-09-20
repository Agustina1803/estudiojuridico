import { Table } from "react-bootstrap";

const Tablageneral = ({ columnas }) => {
  return (
    <Table>
      <thead>
        <tr>
            {columnas.map((columnas,indicecolumnas)=>(
                <th key={indicecolumnas}>{columnas}</th>
            ))}
        </tr>
      </thead>
    </Table>
  );
};

export default Tablageneral;
