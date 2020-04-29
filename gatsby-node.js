/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it

const path = require('path');
const slash = require('slash');

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;

  try {
    const result = await graphql(
      `
      {
        allContentfulBlogPost {
          edges {
            node {
              id
              slug
            }
          }
        }
      }
    `
    )

    if (result.errors) {
      console.log("Error retrieving contentful data", result.errors);
    }

    const blogPostTemplate = path.resolve(__dirname, 'src/templates/blogpost.js');

    result.data.allContentfulBlogPost.edges.forEach((edge) => {
      createPage({
        path: `/blogpost/${edge.node.slug}/`,
        component: slash(blogPostTemplate),
        context: {
          slug: edge.node.slug,
          id: edge.node.id,
        }
      });
    });
  } catch (error) {
    console.log("Error retrieving contentful data", error);
  }
};