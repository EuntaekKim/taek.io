import React from "react";

import Categories from "./Categories";
import Tags from "./Tags";

function CategoryContainer({ category, tags, selectCategory, checkTag }) {
  return (
    <div id="category" style={{ marginTop: "2.5rem" }}>
      <Categories selectedCategory={category} selectCategory={selectCategory} />
      <Tags selectedCategory={category} checkedTags={tags} checkTag={checkTag} />
    </div>
  );
}

export default CategoryContainer;
