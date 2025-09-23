import Button from 'react-bootstrap/Button';


const Boton = ({ variant, children, onClick }) => {
  return (
    <Button variant={variant} onClick={onClick}>
      {children}
    </Button>
  );
};

export default Boton;