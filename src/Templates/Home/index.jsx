import "./styles.css";

import { Posts } from "../../Components/Posts"
import { loadPosts } from "../../Utils/load-posts";
import { Button } from "../../Components/Button";
import { TextInput } from "../../Components/InputText";
import { useState } from "react";
import { useEffect } from "react";
import { useCallback } from "react";

export const Home = () => {

  const [posts, setPosts] = useState([]);
  const [allPosts, setAllPosts] = useState([]);
  const [page, setPage] = useState(0);
  const [postsPerPage] = useState(4);
  const [searchValue, setSearchValue] = useState('');

  const handleLoadPosts = useCallback(async (page, postsPerPage) => {
    const postsAndPhotos = await loadPosts();

    setPosts(postsAndPhotos.slice(page, postsPerPage));
    setAllPosts(postsAndPhotos);
  }, []);
  
  useEffect(() => {
    handleLoadPosts(0, postsPerPage);
  }, [handleLoadPosts, postsPerPage]);
  
  const loadMorePosts = () => {
    const nextPage = page + postsPerPage;
    const nextPosts = allPosts.slice(nextPage, nextPage + postsPerPage);
    posts.push(...nextPosts);
    
    setPosts(posts);
    setPage(nextPage)
  }
  
  const handleChange = (e) => {
    const { value } = e.target;    
    setSearchValue(value);
  }
    
  const noMorePosts = page + postsPerPage >= allPosts.length;
  
  const filterPosts = searchValue ?
    allPosts.filter(post => {
      return post.title.toLowerCase().includes(searchValue.toLowerCase());
    }) :
    posts;

  return (
    <section className="container">

      {!!searchValue && (
        <h1>Search value: {searchValue}</h1>
      )}

      <TextInput handlerChange={handleChange} searchValue={searchValue} />
      <br /><br /><br />

      {filterPosts.length > 0 && (
        <Posts posts={filterPosts} />
      )}

      {filterPosts.length === 0 && (
        <p className="textNotFound">Posts não encontrados</p>
      )}


      <div className="button-container">
        {!searchValue && (
          <Button
            text="Load more posts"
            onClick={loadMorePosts}
            disabled={noMorePosts}
          />
        )}
      </div>
    </section>
  );
}