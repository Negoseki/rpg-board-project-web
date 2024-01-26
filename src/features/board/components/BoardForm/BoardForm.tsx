import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from '@mui/material';
import { ReactElement, useState } from 'react';
import { useCreateBoardMutation } from '../../api/board.api';

type BoardFormProps = {
  open: boolean;
  onClose: (confirm: boolean) => void;
};
const BoardForm = ({ open, onClose }: BoardFormProps): ReactElement => {
  const [createBoard] = useCreateBoardMutation();
  const [name, setName] = useState('');

  const handleOnSubmit = () => {
    if (name) {
      createBoard({ name });
      onClose(true);
    }
  };

  return (
    <Dialog open={open} onClose={onClose.bind(null, false)}>
      <DialogTitle>Criar um novo Board</DialogTitle>
      <DialogContent>
        <TextField
          id='name'
          value={name}
          onChange={(ev) => setName(ev.target.value)}
          autoFocus
          margin='dense'
          label='Nome do Board'
          fullWidth
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose.bind(null, false)}>Cancelar</Button>
        <Button onClick={handleOnSubmit}>Criar</Button>
      </DialogActions>
    </Dialog>
  );
};

export default BoardForm;
