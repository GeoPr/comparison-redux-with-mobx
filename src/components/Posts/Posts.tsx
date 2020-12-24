import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import { TApp } from '../../redux/store';
import { Post } from '../Post/Post';
import { postsStore } from '../../mobx/posts'
import { observer } from 'mobx-react';
import './Posts.scss';

const PostsComponent: FC = () => {
  // const posts = useSelector((state: TApp) => state.posts);

  return (
    <div className="posts">
      <div className="posts__body">
        <ul className="posts__list">
          {postsStore.posts.map(post => (
            <Post post={post} key={post.id} />
          ))}
        </ul>
      </div>
    </div>
  );
};

export const Posts = observer(PostsComponent)