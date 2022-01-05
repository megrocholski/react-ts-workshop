import React, { useState } from 'react';
import { Button, Typography } from '@material-ui/core';
import { NavLink, useNavigate } from 'react-router-dom';
import { useStyles } from './styles';
import { FormProvider, useForm } from 'react-hook-form';
import Input from '../../../components/Input';
import { useAuth } from '../../../hooks/Auth';
import { showAlert } from '../../../utils/showAlert';
import Loading from '../../../components/Loading';

interface SignUpProps {
  email: string;
  password: string;
  name: string;
  confirmPassword: string;
}

const Register = (): JSX.Element => {
  const classes = useStyles();

  const formMethods = useForm<SignUpProps>();
  const { handleSubmit } = formMethods;
  const { signUp } = useAuth();
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const onSubmit = async (data: SignUpProps): Promise<void> => {
    const { confirmPassword, ...userData } = data;

    if (confirmPassword !== userData.password) {
      showAlert({
        title: 'Atenção',
        icon: 'warning',
        text: 'As senhas precisam ser iguais!',
      });
      return;
    }
    setLoading(true);
    try {
      const res = await signUp(data);
      showAlert({
        title: 'Sucesso!',
        icon: 'success',
        text: res.message,
      }).then(result => {
        if (result.isConfirmed) {
          navigate('/auth/login', { state: { email: res.content?.email } });
        }
      });
    } catch (error: any) {
      showAlert({
        title: 'Ops ...',
        icon: 'error',
        text: error.response.data.message,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={classes.container}>
      <form className={classes.formContainer} onSubmit={handleSubmit(onSubmit)}>
        <div className={classes.header}>
          <Typography color='secondary' variant='h5'>
            Insira suas informações para o registro
          </Typography>
        </div>
        {/* to do form*/}
        <FormProvider {...formMethods}>
          <Input
            variant='outlined'
            name='email'
            label='E-mail'
            required
            givenError='Insira um endereço de email'
          />
          <Input variant='outlined' name='name' label='Nome' required givenError='Insira seu nome' />
          <Input
            variant='outlined'
            name='password'
            label='Senha'
            type='password'
            required
            givenError='Insira a senha'
          />
          <Input
            variant='outlined'
            name='confirmPassword'
            label='Confirmar a senha'
            type='password'
            required
            givenError='Insira a senha novamente'
          />
        </FormProvider>
        <div className={classes.bottomContainer}>
          <Button className={classes.button} type='submit'>
            {loading ? <Loading loadingSize={16} /> : 'Cadastrar'}
          </Button>
          <NavLink className={classes.signIn} to='/auth/login'>
            <Typography variant='h6'>Já possuo uma conta</Typography>
          </NavLink>
        </div>
      </form>
    </div>
  );
};

export default Register;
