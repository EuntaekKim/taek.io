import React, { useState, useEffect, useCallback } from "react";
import scrollTo from "gatsby-plugin-smoothscroll";

import Layout from "../components/Layout";
import SEO from "../components/SEO";
import Bio from "../components/Bio";
import CategoryContainer from "../components/Category";
import ContentsContainer from "../components/Contents";

import usePosts from "../hooks/usePosts";
import * as storage from "../utils/storage";

const index = ({ location }) => {
  const InitialCategory = storage.getCategory() || "all";
  const InitialTags = storage.getTags() || [];

  // selected category, checked tags
  const [category, setCategory] = useState(InitialCategory);
  const [tags, setTags] = useState(InitialTags);
  const { title, posts } = usePosts();

  useEffect(() => {
    storage.setCategory(category);
    storage.setTags(tags);
  }, [category, tags]);

  const onSelectCategory = useCallback(
    selectedCategory => {
      if (selectedCategory === category) return;
      setCategory(selectedCategory);
      setTags([]);
    },
    [category],
  );

  const onCheckTag = useCallback(tag => {
    setTags(prevTags => {
      return prevTags.includes(tag)
        ? prevTags.filter(prevTag => prevTag !== tag)
        : prevTags.concat(tag);
    });
  }, []);

  const onCheckTagInPost = useCallback(tag => {
    scrollTo("#category");
    setTags([tag]);
  }, []);

  return (
    <Layout location={location}>
      <SEO title={title} />
      <Bio />
      <main>
        <CategoryContainer
          selectedCategory={category}
          checkedTags={tags}
          onSelectCategory={onSelectCategory}
          onCheckTag={onCheckTag}
        />
        <ContentsContainer
          posts={posts}
          selectedCategory={category}
          checkedTags={tags}
          onCheckTagInPost={onCheckTagInPost}
        />
      </main>
    </Layout>
  );
};

export default index;
