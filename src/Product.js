import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
const Product = () => {
  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState([]);
  const { productID } = useParams();

  const fetchData = async () => {
    try {
      const { data } = await axios.get(`/api/products?id=${productID}`);
      setProduct(data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  if (loading) {
    return (
      <section className="section section-center content">
        <h2>Loading...</h2>
      </section>
    );
  }
  const { fields } = product;
  const { id, name, desc, price, image } = fields;
  return (
    <section className="section section-center">
      <Link className="link" to="/">
        back home
      </Link>
      <div className="title">
        <h2>{name}</h2>
        <div className="title-underline"></div>
      </div>
      <article className="single-product">
        <img className="single-product-img" src={image[0].url} alt={name} />
        <div className="product-info">
          <h5 className="title">{name}</h5>
          <h5 className="price">${price}</h5>
          <p>{desc}</p>
        </div>
      </article>
    </section>
  );
};

export default Product;