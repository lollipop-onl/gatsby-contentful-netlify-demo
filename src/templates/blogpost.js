import React from 'react';
import { Link, graphql } from 'gatsby';
import Layout from '../components/layout';
import SEO from '../components/seo';

const BlogPost = ({ data }) => {
  const { title, body } = data.contentfulBlogPost;

  return (
    <Layout>
      <SEO title={title} />
      <div className="blogpost">
        <h1>{title}</h1>
        <p className="body-text">{body.body}</p>
        <Link to="/">Back to Home</Link>
      </div>
    </Layout>
  );
}

export default BlogPost;
export const pageQuery = graphql`
  query($slug: String!) {
    contentfulBlogPost(slug: { eq: $slug }) {
      title
      slug
      body {
        body
      }
    }
  }
`;