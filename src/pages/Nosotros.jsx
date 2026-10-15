import { Container, Row, Col, Card } from "react-bootstrap";

function Nosotros() {
  return (
    <Container className="py-5">
      {/* Encabezado Principal */}
      <div className="text-center mb-5">
        <h1 className="display-5 fw-bold text-dark">Sobre Ferretería Los Maestros</h1>
        <p className="lead text-muted mx-auto" style={{ maxWidth: "700px" }}>
          Más de 20 años acompañando a los profesionales de la construcción, maestros independientes y familias de la Región de Coquimbo.
        </p>
      </div>

      {/* Misión y Visión */}
      <Row className="g-4 mb-5">
        <Col xs={12} md={6}>
          <Card className="h-100 shadow-sm border-0 border-start border-4 border-warning">
            <Card.Body className="p-4">
              <h3 className="h4 fw-bold text-dark mb-3">Nuestra Misión</h3>
              <Card.Text className="text-secondary">
                Proveer materiales de construcción, herramientas e insumos de la más alta calidad, entregando un asesoramiento técnico personalizado y soluciones eficientes que impulsen el desarrollo de cada proyecto en nuestra comunidad.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>

        <Col xs={12} md={6}>
          <Card className="h-100 shadow-sm border-0 border-start border-4 border-dark">
            <Card.Body className="p-4">
              <h3 className="h4 fw-bold text-dark mb-3">Nuestra Visión</h3>
              <Card.Text className="text-secondary">
                Consolidarnos como la ferretería líder y referente en transformación digital de la región, destacando por nuestra excelencia en servicio, innovación logarítmica y compromiso constante con la sostenibilidad.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Valores de la Empresa */}
      <div className="bg-white p-4 rounded shadow-sm">
        <h2 className="h3 fw-bold text-dark text-center mb-4">Nuestros Valores</h2>
        <Row className="g-4 text-center">
          <Col xs={12} sm={6} md={3}>
            <div className="p-3">
              <div className="fs-1 mb-2">🤝</div>
              <h5 className="fw-bold">Compromiso</h5>
              <p className="small text-muted mb-0">Respaldo total en la calidad de cada producto que vendemos.</p>
            </div>
          </Col>
          <Col xs={12} sm={6} md={3}>
            <div className="p-3">
              <div className="fs-1 mb-2">⚡</div>
              <h5 className="fw-bold">Rapidez</h5>
              <p className="small text-muted mb-0">Despachos oportunos y atención ágil tanto en tienda como web.</p>
            </div>
          </Col>
          <Col xs={12} sm={6} md={3}>
            <div className="p-3">
              <div className="fs-1 mb-2">🛡️</div>
              <h5 className="fw-bold">Confianza</h5>
              <p className="small text-muted mb-0">Precios transparentes y asesoría experta sin sorpresas.</p>
            </div>
          </Col>
          <Col xs={12} sm={6} md={3}>
            <div className="p-3">
              <div className="fs-1 mb-2">🌱</div>
              <h5 className="fw-bold">Sostenibilidad</h5>
              <p className="small text-muted mb-0">Promovemos el uso de materiales eficientes y amigables.</p>
            </div>
          </Col>
        </Row>
      </div>
    </Container>
  );
}

export default Nosotros;