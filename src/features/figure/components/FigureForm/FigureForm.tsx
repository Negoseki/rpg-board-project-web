import { useAppDispatch } from '@/store';
import { uiActions } from '@/store/ui';
import { Image } from '@mui/icons-material';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from '@mui/material';
import { QueryStatus } from '@reduxjs/toolkit/dist/query';
import { ReactElement, useEffect, useMemo, useState } from 'react';
import { useCreateFigureMutation } from '../../api/figure.service';

type FigureFormProps = {
  open: boolean;
  onClose: (result: boolean) => void;
};
export const FigureForm = ({ open, onClose }: FigureFormProps): ReactElement => {
  const dispatch = useAppDispatch();
  const [createFigure, { status }] = useCreateFigureMutation();
  const [name, setName] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [size, setSize] = useState<number>(0);

  const imgUrl = useMemo(() => (image ? URL.createObjectURL(image) : null), [image]);

  const isFormValid = !!name && !!size && size > 0 && image;

  useEffect(() => {
    if (status === QueryStatus.fulfilled) {
      clearForm();
      onClose(true);
    }
    if (status === QueryStatus.rejected) {
      dispatch(
        uiActions.showError({ title: 'Erro ao criar miniatura', description: 'Tente novamente' }),
      );
    }
  }, [status]);

  const handleOnSubmit = () => {
    if (isFormValid) {
      const sendImg = image as unknown as File;
      createFigure({ name, size, image: sendImg });
    }
  };

  const handleOnClose = () => {
    clearForm();
    onClose(false);
  };

  const clearForm = () => {
    setName('');
    setImage(null);
    setSize(0);
  };

  return (
    <>
      <Dialog open={open} onClose={onClose.bind(null, false)}>
        <DialogTitle>Criar uma nova Miniatura</DialogTitle>
        <DialogContent>
          <Box display='flex' flexDirection='column' gap={2} minWidth={500}>
            <TextField
              id='name'
              value={name}
              onChange={(ev) => setName(ev.target.value)}
              autoFocus
              label='Nome da miniatura'
              margin='dense'
            />

            <TextField
              id='size'
              type='number'
              value={size}
              label='Tamanho da miniatura'
              onChange={(ev) => setSize(Number(ev.target.value))}
            />

            <label htmlFor='raised-button-file'>
              <Button variant='outlined' component='span'>
                Selecionar Imagem
              </Button>
            </label>
            <input
              id='raised-button-file'
              type='file'
              style={{ display: 'none' }}
              accept='image/*'
              onChange={(ev) => setImage(ev.target.files ? ev.target.files[0] : null)}
            />

            <Box
              border='1px dashed'
              borderRadius={1}
              borderColor='primary.main'
              width='100%'
              display='flex'
              justifyContent='center'
            >
              {!imgUrl && <Image fontSize='large' />}
              {imgUrl && <img src={imgUrl} alt='Miniatura' width={180} height={180} />}
            </Box>
          </Box>
        </DialogContent>

        <DialogActions>
          <Button onClick={handleOnClose}>Cancelar</Button>
          <Button variant='contained' onClick={handleOnSubmit} disabled={!isFormValid}>
            Criar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
