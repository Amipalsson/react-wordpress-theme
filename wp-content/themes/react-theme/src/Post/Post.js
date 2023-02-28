import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Post extends Component {
  parseLink(link) {
    if (typeof link === 'undefined') {
      return '/';
    }

    if (!link.match(/https?:\/\//)) {
      return link;
    }
    const pos = link.indexOf('/', 8);
    return link.substr(pos);
  }

  render() {
    const { post } = this.props;
    return (
      <article className="max-w-md p-6 mb-3 bg-blue-200 rounded-md shadow-md post">
        <header className="post__header">
          <h1 className="text-lg font-bold">{post.title.rendered}</h1>
        </header>
        <section
          className="text-base font-thin post__excerpt"
          dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }}
        />
        <Link to={this.parseLink(post.link)} className="underline btn">
          View Post
        </Link>
      </article>
    );
  }
}

export default Post;
