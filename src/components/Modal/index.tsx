import React, { useState } from 'react';
import { Modal as ModalComponent, Box, Button, Typography } from '@material-ui/core';
import { useStyles } from './styles';

import { Close, Save } from '@material-ui/icons';
import { FormProvider, useForm } from 'react-hook-form';
import { Post } from '../../@types/Post';
import Input from '../Input';
import Loading from '../Loading';

interface ModalProps {
  open: boolean;
  handleClose: () => void;
  handleOpen: () => void;
  buttonTitle?: string;
  buttonIcon?: React.ReactElement;
  buttonClass?: string;
}

const Modal: React.FC<ModalProps> = ({
  open,
  handleClose,
  handleOpen,
  buttonTitle,
  buttonIcon,
  buttonClass,
}: ModalProps) => {
  const classes = useStyles();

  const formMethods = useForm<Post>();
  const { handleSubmit } = formMethods;
  const [loading, setLoading] = useState<boolean>(false);

  const onSubmit = () => {
    setLoading(prev => !prev);
  };

  return (
    <>
      <Button className={buttonClass} onClick={handleOpen} endIcon={buttonIcon}>
        {buttonTitle || 'Abrir'}
      </Button>
      <ModalComponent
        open={open}
        onClose={handleClose}
        className={classes.container}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <Box className={classes.content}>
          <div className={classes.header}>
            <Typography variant='h5' color='secondary'>
              Adicionar Post
            </Typography>
            <Button className={classes.closeButton} endIcon={<Close fontSize='large' />}>
              Fechar
            </Button>
          </div>
          <form className={classes.body} onSubmit={handleSubmit(onSubmit)}>
            {/* to do form */}
            <FormProvider {...formMethods}>
              <Input variant='outlined' name='title' label='Título' required givenError='Insira o título' />
              <Input variant='outlined' name='imageUrl' label='Imagem' />
              <Input
                variant='outlined'
                name='body'
                label='Texto'
                required
                givenError='Insira um texto'
                multiline
                minRows={4}
                maxRows={6}
                customClass={classes.textarea}
              />
            </FormProvider>
            <Button className={classes.button} type='submit' endIcon={<Save />}>
              {loading ? <Loading loadingSize={16} /> : 'Salvar'}
            </Button>
          </form>
        </Box>
      </ModalComponent>
    </>
  );
};

export default Modal;
