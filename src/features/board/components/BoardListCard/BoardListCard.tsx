import { Box, Card, CardActionArea, CardContent, CardMedia, Typography } from '@mui/material';
import { ReactElement } from 'react';

type BoardListCardProps = {
  title: string;
  image?: string;
  icon?: ReactElement;
  onClick?: () => void;
};

export const BoardListCard = ({
  title,
  image,
  icon,
  onClick,
}: BoardListCardProps): ReactElement => {
  return (
    <Card sx={{ width: 320 }} raised>
      <CardActionArea onClick={onClick}>
        {icon && (
          <Box
            height={140}
            display='flex'
            justifyContent='center'
            alignItems='center'
            bgcolor='primary.main'
            color='white'
          >
            {icon}
          </Box>
        )}
        {image && <CardMedia sx={{ height: 140 }} image={image} title={title} />}
        <CardContent>
          <Typography variant='h6'>{title}</Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};
