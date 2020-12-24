import { yupResolver } from '@hookform/resolvers/yup';
import { Button, TextField } from '@material-ui/core';
import React, { FC } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import * as yup from 'yup';
import { changeUserName } from '../../redux/reducers/userReducer/actions';
import { userStore } from '../../mobx/user'
import './Profile.scss';
import { observer } from 'mobx-react';

interface IData {
  username: string;
}

const schema = yup.object().shape({
  username: yup.string().required('This is a required field'),
});

const ProfileComponent: FC = () => {
  const { register, handleSubmit, errors, reset } = useForm<IData>({
    resolver: yupResolver(schema),
  });
  const dispatch = useDispatch();

  const submitHandler = handleSubmit(({ username }) => {
    // dispatch(changeUserName(username));
    userStore.updateUsername(username)
    reset();
  });

  return (
    <div className="profile">
      <div className="profile__body">
        <form
          className="profile__form"
          action="#"
          onSubmit={submitHandler}
          noValidate>
          <TextField
            color="primary"
            variant="outlined"
            name="username"
            label="Your nickname"
            autoComplete="off"
            inputRef={register({ required: true })}
            error={!!errors.username}
						helperText={errors?.username?.message}
						className="profile__input"
          />
          <Button color="primary" variant="contained" type="submit">
            Change
          </Button>
        </form>
      </div>
    </div>
  );
};

export const Profile = observer(ProfileComponent)