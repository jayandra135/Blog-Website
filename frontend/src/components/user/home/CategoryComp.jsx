import React, { useEffect } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";

import { useDispatch, useSelector } from "react-redux";
import { getCategory } from "../../../store/category/Action";
//import { getBlogByCategory } from "../../../store/blog/Action";
import { Link } from "react-router-dom";
const CategoryComp = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCategory());
  }, []);

  const categoryData = useSelector((state) => state.category.category);
  console.log(categoryData);

  return (
    <>
      <section className="category-section">
        <Container>
          <h2>Category</h2>
          <Row>
            {categoryData.data &&
              categoryData.data.map((ele, index) => {
                return (
                  <Col lg={4} md={4} xs={12} sm={4} gap={2}>
                    <Link to={`/blog/${ele._id}`} className="category-link">
                      <Card className="bounce-top category-card" key={index}>
                        <Card.Body>
                          <img
                            src={`${categoryData.path}/${ele.image}`}
                            alt=""
                            className="categoryImg"
                          />
                        </Card.Body>
                        <Card.Footer>
                          <h3>{ele?.name}</h3>
                        </Card.Footer>
                      </Card>
                    </Link>
                  </Col>
                );
              })}
          </Row>
        </Container>
      </section>
    </>
  );
};

export default CategoryComp;
