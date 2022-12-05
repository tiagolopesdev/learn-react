import { Component } from "react";

import "./styles.css";

import { Posts } from "../../Components/Posts"
import { loadPosts } from "../../Utils/load-posts";
import { Button } from "../../Components/Button";

export class Home extends Component {

  state = {
    posts: [],
    allPosts: [],
    page: 0,
    postsPerPage: 2
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

  render () {
    const { posts } = this.state;

    return (
      <section className="container">
        <Posts posts={ posts } />
        <Button 
          text="Load more posts"
          onClick={this.loadMorePosts}
        />
      </section>
    );
  } 
}