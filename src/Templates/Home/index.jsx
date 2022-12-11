import { Component } from "react";

import "./styles.css";

import { Posts } from "../../Components/Posts"
import { loadPosts } from "../../Utils/load-posts";
import { Button } from "../../Components/Button";
import { TextInput } from "../../Components/InputText";

export class Home extends Component {

  state = {
    posts: [],
    allPosts: [],
    page: 0,
    postsPerPage: 4,
    searchValue: ''
  };

  async componentDidMount() {
    await this.loadPosts();
  }

  loadPosts = async () => {
    const { page, postsPerPage } = this.state;

    const postsAndPhotos = await loadPosts();
    this.setState({
      posts: postsAndPhotos.slice(page, postsPerPage),
      allPosts: postsAndPhotos
    });
  }

  loadMorePosts = () => {
    const {
      page,
      postsPerPage,
      allPosts,
      posts
    } = this.state;
    const nextPage = page + postsPerPage;
    const nextPosts = allPosts.slice(nextPage, nextPage + postsPerPage);
    posts.push(...nextPosts);

    this.setState({ posts, page: nextPage });
  }

  handlerChange = (e) => {
    const { value } = e.target;
    this.setState({ searchValue: value });
  }

  render() {
    const { posts, page, postsPerPage, allPosts, searchValue } = this.state;
    const noMorePosts = page + postsPerPage >= allPosts.length;

    const filterPosts = !!searchValue ?
      allPosts.filter(post => {
        return post.title.toLowerCase().includes(
          searchValue.toLowerCase()
        );
      })  
      : posts;

    return (
      <section className="container">

        {!!searchValue && (          
            <h1>Search value: {searchValue}</h1>
        )}

        <TextInput 
          handlerChange={this.handlerChange}
          searchValue={searchValue}
        />
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
              onClick={this.loadMorePosts}
              disabled={noMorePosts}
            />
          )}
        </div>
      </section>
    );
  }
}
