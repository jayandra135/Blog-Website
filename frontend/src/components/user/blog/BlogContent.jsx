import React, { useEffect } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getBlogByCategory, getSingleBlog } from "../../../store/blog/Action";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
const BlogContent = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  console.log(id);
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(getBlogByCategory(id));
  }, []);
  const blogData = useSelector((state) => state.blog.blogs);
  console.log(blogData);

  const singleBlogHandler = (id) => {
    dispatch(getSingleBlog(id)).then(() => {
      navigate("/singleblog/" + id);
    });
  };
  return (
    <section className="blog-content">
      <Container>
        <Row className="row-cols-1 row-cols-md-3 row-cols-lg-4">
          {blogData.data &&
            blogData.data.map((ele, index) => {
              return (
                <Col key={index}>
                  <Card key={index} className="blogCard">
                    <div>
                      <img
                        src={`${blogData.path}/${ele.image}`}
                        alt=""
                        className="blogimage"
                      />
                    </div>
                    <div className="blogdiv">
                      <h4>{ele.title}</h4>
                      <p>Author : {ele.authorName}</p>
                    </div>
                    <div className="buttondiv">
                      <Button onClick={() => singleBlogHandler(ele._id)}>
                        Read More...
                      </Button>
                    </div>
                  </Card>
                </Col>
              );
            })}
        </Row>
      </Container>
    </section>
  );
};

export default BlogContent;
