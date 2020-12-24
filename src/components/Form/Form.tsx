import React, { FC, useState } from 'react';
import TextField from '@material-ui/core/TextField';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch } from 'react-redux';
import { createPost } from '../../redux/reducers/postsReducer/actions';
import { Button, makeStyles } from '@material-ui/core';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import IconButton from '@material-ui/core/IconButton';
import { postsStore } from '../../mobx/posts'
import './Form.scss';
import { observer } from 'mobx-react';

interface IData {
  post: string;
}

const schema = yup.object().shape({
  post: yup.string().required('This is a required field'),
});

const useStyles = makeStyles(() => ({
  root: {
    justifySelf: 'start',
    width: 300,
  },
}));

const FormComponent: FC = () => {
  const { register, handleSubmit, errors, reset } = useForm<IData>({
    resolver: yupResolver(schema),
  });
  const dispatch = useDispatch();
  const styles = useStyles();
  const [imageUrl, setImageUrl] = useState('');

  const submitHandler = handleSubmit(({ post }) => {
    // dispatch(createPost(post, imageUrl));
    postsStore.createPost(post, imageUrl)
    reset();
    setImageUrl('')
  });

  const updateImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileImage = e.target.files![0];

    const fileReader = new FileReader();

    fileReader.onloadend = e => {
      const reference = e.target?.result;
      setImageUrl(reference as string);
    };
    fileReader.readAsDataURL(fileImage);
  };

  return (
    <form action="#" noValidate onSubmit={submitHandler} className="form">
      <TextField
        color="primary"
        variant="outlined"
        label="New post"
        name="post"
        inputRef={register({ required: true })}
        error={!!errors.post}
        helperText={errors?.post?.message}
        autoComplete="off"
        className="form__input"
        multiline
        rows="10"
      />
      <div className="form__file file-form">
        <input
          type="file"
          className="file-form__input"
          accept=".jpg, .png"
          onChange={updateImage}
        />
        <IconButton color="primary">
          <AttachFileIcon />
        </IconButton>
      </div>
      {imageUrl && (
        <div className="form__image">
          <img src={imageUrl} alt="" />
        </div>
      )}
      <Button
        color="primary"
        variant="contained"
        type="submit"
        className={styles.root}>
        add
      </Button>
    </form>
  );
};

export const Form = observer(FormComponent)
