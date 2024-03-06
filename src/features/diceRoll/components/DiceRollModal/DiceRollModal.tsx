import { generateUUID } from '@/utils/helpers';
import { Close } from '@mui/icons-material';
import {
  Box,
  Button,
  Collapse,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
} from '@mui/material';
import { ReactElement, useCallback, useState } from 'react';
import { mapDiceTypeValue } from '../../helpers/dice-value.mapper';
import { DiceType } from '../../types';
import { DiceRollType } from '../../types/dice-roll-type.enum';
import { DiceButton } from '../DiceButton';
import { DiceRollTotal } from '../DiceRollTotal';
import { DiceRollValue } from '../DiceRollValue';

type DiceRollModalProps = {
  open: boolean;
  onClose?: () => void;
};

export const DiceRollModal = ({ open, onClose }: DiceRollModalProps): ReactElement => {
  const [rollDices, setRollDices] = useState<DiceRollType[]>([]);
  const [isRolled, setIsRolled] = useState(false);

  const handleDiceClick = useCallback(
    (type: DiceType) => {
      setRollDices((prev) => [...prev, { type, id: generateUUID() }]);
    },
    [setRollDices],
  );

  const handleRollClick = () => {
    setIsRolled(true);

    setRollDices((prev) => {
      const newValue = prev.map((v) => ({
        ...v,
        value: Math.floor(Math.random() * mapDiceTypeValue[v.type]) + 1,
      }));
      return newValue;
    });
  };

  const handleClearClick = () => {
    setIsRolled(false);
    setRollDices([]);
  };

  return (
    <Dialog open={open} fullWidth onClose={onClose}>
      <DialogTitle>
        <Box display={'flex'} flexDirection={'row'} justifyContent={'space-between'}>
          Rolar dados
          <IconButton onClick={onClose}>
            <Close />
          </IconButton>
        </Box>
      </DialogTitle>

      <DialogContent>
        <Box>
          <Collapse in={!isRolled}>
            <Box display='flex' flexDirection='row' gap={2} justifyContent='center'>
              {Object.values(DiceType).map((type) => (
                <DiceButton key={type} type={type} onClick={handleDiceClick} />
              ))}
            </Box>
          </Collapse>

          <Collapse in={isRolled}>
            <DiceRollTotal list={rollDices} />
          </Collapse>

          <Box
            width='100%'
            minHeight={100}
            border={1}
            borderRadius={1}
            borderColor='primary.main'
            display={'flex'}
            justifyContent={'center'}
            flexWrap={'wrap'}
            columnGap={'24px'}
            mt={2}
          >
            {rollDices &&
              rollDices.map((dice, i) => (
                <DiceRollValue key={dice.id} type={dice.type} index={i} value={dice.value} />
              ))}
          </Box>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClearClick}>Limpar</Button>
        {!isRolled && (
          <Button onClick={handleRollClick} variant='contained'>
            Rolar Dados
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
};
