import React, { Component } from 'react';
import Axios from 'axios';
import Post from '../Post/Post';

class Archive extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      loaded: false,
      error: ''
    };

    this.getPosts = this.getPosts.bind(this);
  }

  getPosts() {
    this.setState({ loaded: false });

    return Axios.get(
      window.wp_config.rest_url + 'wp/v2/posts'
    ).then(
      response => {
        const { posts} = this.state;
        this.setState({
          posts: posts.concat(response.data),
          loaded: true
        });
      },
      error => {
        this.setState({
          error: error.toJSON().message,
          loaded: true
        });
      }
    );
  }

  componentDidMount() {
    this.getPosts();
  }

  render() {
    const { posts, loaded, error} = this.state;
    return (
      <div className="container mx-auto archive">
        <div className="archive__header">
          <h1 className="py-10 text-3xl text-center archive__heading">Recent Posts</h1>
        </div>
        {error && (
          <div className="notice notice--error">
            <p>Unable to load posts due to the error: {error}</p>
          </div>
        )}
        {posts && (
          <div
            className="archive__body"
          >
            {posts.map(post => (
              <Post key={post.id} post={post} />
            ))}
          </div>
        )}
        {!loaded && (
          <div className="notice notice--loading">
            <p>Loading.</p>
          </div>
        )}
      </div>
    );
  }
}

export default Archive;
