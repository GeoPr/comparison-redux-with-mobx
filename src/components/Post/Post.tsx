import React, { FC } from 'react';
import IconButton from '@material-ui/core/IconButton';
import FavoriteIcon from '@material-ui/icons/Favorite';
import { IPost } from '../../redux/reducers/postsReducer/postsReducer';
import { useDispatch, useSelector } from 'react-redux';
import {
  createComment,
  updateLikes,
} from '../../redux/reducers/postsReducer/actions';
import { Button, TextField } from '@material-ui/core';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { TApp } from '../../redux/store';
import { postsStore } from '../../mobx/posts';
import { userStore } from '../../mobx/user';
import { observer } from 'mobx-react';
import './Post.scss';

interface IProps {
  post: IPost;
}

interface IData {
  comment: string;
}

const schema = yup.object().shape({
  comment: yup.string().required('This field cannot be empty'),
});

const PostComponent: FC<IProps> = ({
  post: { body, imageUrl, likes, id, comments },
}) => {
  const dispatch = useDispatch();
  const { register, handleSubmit, errors, reset } = useForm<IData>({
    resolver: yupResolver(schema),
  });
  const { username } = useSelector((state: TApp) => state.user);

  const updateCountOfLikes = (id: string | number) => {
    // dispatch(updateLikes(id));
    postsStore.updateLikes(id);
  };

  const submitHandler = handleSubmit(({ comment }) => {
    // dispatch(createComment(id, comment));
    postsStore.createComment(id, comment);
    reset();
  });

  return (
    <div className="posts__post post">
      <div className="post__username">{userStore.state.username}</div>
      <div className="post__item">
        {imageUrl && (
          <div className="post__image">
            <img src={imageUrl} alt="" />
          </div>
        )}
        <div className="post__body">{body}</div>
        <div className="post__like">
          <div className="post__count">{likes}</div>
          <IconButton
            color="secondary"
            size="medium"
            onClick={() => updateCountOfLikes(id)}>
            <FavoriteIcon />
          </IconButton>
        </div>
        <form
          className="post__comment comment-post"
          onSubmit={submitHandler}
          noValidate
          action="#">
          <TextField
            color="secondary"
            variant="filled"
            label="Comment"
            autoComplete="off"
            name="comment"
            inputRef={register({ required: true })}
            error={!!errors.comment}
            helperText={errors?.comment?.message}
          />
          <Button color="primary" variant="contained" type="submit">
            Add
          </Button>
        </form>
        <ul className="post__comments">
          {comments.map(({ body, id }) => (
            <li key={id}>{body}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export const Post = observer(PostComponent)