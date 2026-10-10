import { Container, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

function NoEncontrada() {
  return (    
  <Container className="py-5 text-center">      
    <h1 className="display-1 fw-bold text-warning">404</h1>      
    <h2>Página no encontrada</h2>      
    <p>La vista solicitada no existe o fue movida.</p>      
    <Button as={Link} to="/" variant="dark">Volver al Inicio</Button>    
  </Container>  );
}

export default NoEncontrada;