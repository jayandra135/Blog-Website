import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getSingleBlog } from "../../../store/blog/Action";
const SingleBlog = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getSingleBlog(id));
  }, []);

  const blogData = useSelector((state) => state.blog.blog);
  console.log(blogData);
  return (
    <>
      <section className="single-blog-section">
        <Container>
          <Row className="row-cols-1 row-cols-md-12 row-cols-lg-12">
            <Col>
              <div className="singleBlog">
                <h4>{blogData?.data?.title}</h4>
                <p>
                  <img
                    src={`${blogData.path}/${blogData.data.image}`}
                    alt=""
                    className="singleImage"
                  />
                  <span>{blogData?.data.description}</span>
                </p>
                <h5>Author : {blogData.data.authorName}</h5>
                <h6>Date : {blogData.data.createdAt}</h6>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default SingleBlog;
