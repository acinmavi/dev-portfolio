import React, { useEffect, useState } from 'react';
import {
  Card,
  Col,
  Container,
  Row,
} from 'react-bootstrap';
import Fade from 'react-reveal';
import endpoints from '../constants/endpoints';
import FallbackSpinner from './FallbackSpinner';

function ArchitectureHighlights() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch(endpoints.architectureHighlights, {
      method: 'GET',
    })
      .then((res) => res.json())
      .then((res) => setData(res))
      .catch((err) => err);
  }, []);

  if (!data) {
    return <FallbackSpinner />;
  }

  return (
    <section className="architecture-highlights">
      <Container>
        <Fade>
          <div className="architecture-highlights__header">
            <p className="architecture-highlights__eyebrow">Engineering Depth</p>
            <h2 className="architecture-highlights__title">{data.title}</h2>
            <p className="architecture-highlights__intro">{data.intro}</p>
          </div>
        </Fade>
        <Row xs={1} lg={3} className="g-4">
          {data.items.map((item) => (
            <Col key={item.title}>
              <Fade>
                <Card className="architecture-highlight-card h-100">
                  <Card.Body>
                    <Card.Title className="architecture-highlight-card__title">
                      {item.title}
                    </Card.Title>
                    <div className="architecture-highlight-card__block">
                      <span className="architecture-highlight-card__label">Context</span>
                      <p>{item.context}</p>
                    </div>
                    <div className="architecture-highlight-card__block">
                      <span className="architecture-highlight-card__label">Constraint</span>
                      <p>{item.constraint}</p>
                    </div>
                    <div className="architecture-highlight-card__block">
                      <span className="architecture-highlight-card__label">Architecture Decision</span>
                      <p>{item.decision}</p>
                    </div>
                    <div className="architecture-highlight-card__block">
                      <span className="architecture-highlight-card__label">Why It Matters</span>
                      <p>{item.impact}</p>
                    </div>
                  </Card.Body>
                </Card>
              </Fade>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
}

export default ArchitectureHighlights;
