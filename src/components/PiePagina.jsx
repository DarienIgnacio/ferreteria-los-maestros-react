import { Container, Row, Col } from "react-bootstrap";

function PiePagina() {
  return (    
    <footer className="bg-dark text-white pt-4 pb-3 mt-auto border-top border-warning">
      <Container>        
            <Row className="gy-3">          
                <Col xs={12} md={6}>
                    <h5 className="text-warning">Ferretería Los Maestros</h5>
                    <p className="small text-muted mb-0">
                    Materiales de construcción, herramientas y soluciones generales en La Serena y Coquimbo.
                    </p>
                </Col>
                <Col xs={12} md={6} className="text-md-end">
                    <p className="mb-1">Contacto: <a href="mailto:contacto@losmaestros.cl" className="text-warning text-decoration-none">contacto@losmaestros.cl</a></p>
                    <p className="small text-muted mb-0">Proyecto académico · DSY1104 Desarrollo FullStack II</p>
                </Col>
            </Row>      
        </Container>    
    </footer>  );
}

export default PiePagina;