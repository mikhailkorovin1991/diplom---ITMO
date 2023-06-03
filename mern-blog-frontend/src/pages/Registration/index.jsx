import React from 'react';
import Typography from '@mui/material/Typography';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom'
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import { useForm } from 'react-hook-form';

import styles from './Login.module.scss';
import { fetchAuth, registerIsAuth } from '../../redux/slices/auth';

export const Registration = () => {
    const isAuth = useSelector(selectIsAuth);
    const dispatch = useDispatch();
    const { 
      register,
      handleSubmit,
      setError,
      forState: { errors, isValid }
    } = useForm({
      defaultValues: {
        fullName: 'Вася Пупкин',
        email: 'vasya@test.ru',
        pssword: '1234',
      },
      mode: 'onChange',
    });

    const onSubmit = async (values) => {
      const data = await dispatch(fetchRegister(values));
      if (!data.payload) {
        return alert('Не удалось зарегистрироваться!');
      }
      if ('token' in data.payLoad) {
        window.localStorage.setItem('token', data.payload.token);
      }
    };
  
    if (isAuth) {
      return <Navigate to='/'/>;
    }
  return (
    <Paper classes={{ root: styles.root }}>
      <Typography classes={{ root: styles.title }} variant="h5">
        Создание аккаунта
      </Typography>
      <div className={styles.avatar}>
        <Avatar sx={{ width: 100, height: 100 }} />
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
      <TextField
      error={Boolean(errors.fullName?.message)}
      helperText={errors.fullName?.message}
      {...register('fullName', { required: 'Укадите полное имя' })}
       className={styles.field} label="Полное имя" fullWidth />
      <TextField 
      error={Boolean(errors.email?.message)}
        helperText={errors.email?.message}
        type="email"
        {...register('email', { required: 'Укадите почту' })}className={styles.field} label="E-Mail" fullWidth />
      <TextField 
      error={Boolean(errors.password?.message)}
        helperText={errors.password?.message}
        type="password"
        {...register('password', { required: 'Укадите пароль' })}className={styles.field} label="Пароль" fullWidth />
      <Button disabled={!isValid} type="submit" variant="contained" fullWidth>
        Зарегистрироваться
      </Button>
      </form>
    </Paper>
  );
};
