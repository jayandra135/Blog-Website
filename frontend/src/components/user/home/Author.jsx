import React, { useRef } from "react";
import { Container, Row, Col } from "react-bootstrap";
import person from "../../../images/person.jpg";

const Author = () => {
  function scrollEvent() {
    if (window.scrollY > 500) {
    }
    console.log(window.scrollY);
  }
  scrollEvent();

  return (
    <>
      <section className="author-section">
        <Container>
          <Row>
            <Col lg={6} md={6} xs={12} sm={12}>
              <div className="author-div2">
                <img src={person} alt="" className="personimg " />
              </div>
            </Col>
            <Col lg={6} md={6} xs={12} sm={12}>
              <div className="author-div2">
                <h2>Meet Mike Gallaway</h2>
                <p className="authorPara">
                  Fantom is a blog that provides various blogs on day to day
                  activities. The blog’s target audience is
                  traveler,sports,lifestyle and in various categories.
                </p>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default Author;
