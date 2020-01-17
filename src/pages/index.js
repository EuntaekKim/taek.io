import React, { useState, useEffect, useCallback } from "react";
import { graphql } from "gatsby";

import Layout from "../components/Layout";
import SEO from "../components/SEO";
import Bio from "../components/Bio";
import CategoryContainer from "../components/Category";
import ContentsContainer from "../components/Contents";

const index = ({ data, location }) => {
  const InitialTitle = "TAEK LOG";
  const InitialCategory = "all";
  const InitialTags = [];

  // selected category, checked tags
  const [category, setCategory] = useState(InitialCategory);
  const [tags, setTags] = useState(InitialTags);

  const posts = data.allMarkdownRemark.edges;

  const selectCategory = useCallback(
    selectedCategory => {
      if (selectedCategory === category) return;
      setCategory(selectedCategory);
      setTags(InitialTags);
    },
    [category],
  );
  const checkTag = useCallback(tag => {
    setTags(prevTags => {
      return prevTags.find(prevTag => prevTag === tag)
        ? prevTags.filter(prevTag => prevTag !== tag)
        : prevTags.concat(tag);
    });
  }, []);
  const checkTagInsidePost = useCallback(tag => {
    setTags([tag]);
  }, []);

  return (
    <Layout location={location}>
      <SEO title={InitialTitle} />
      <Bio />
      <main>
        <CategoryContainer
          category={category}
          tags={tags}
          selectCategory={selectCategory}
          checkTag={checkTag}
        />
        <ContentsContainer
          posts={posts}
          category={category}
          tags={tags}
          checkTagInsidePost={checkTagInsidePost}
        />
      </main>
    </Layout>
  );
};

export const pageQuery = graphql`
  query {
    allMarkdownRemark(
      sort: { fields: frontmatter___date, order: DESC }
      filter: { frontmatter: { category: { ne: "" }, tags: { ne: "" } } }
    ) {
      edges {
        node {
          frontmatter {
            category
            tags
            description
            date(formatString: "YYYY-MM-DD")
            title
          }
          id
          fields {
            slug
          }
          excerpt(format: PLAIN, pruneLength: 105, truncate: true)
        }
      }
    }
  }
`;

export default index;
