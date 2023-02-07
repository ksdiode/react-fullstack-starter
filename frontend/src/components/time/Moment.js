import { Typography } from '@mui/material';
import moment from 'moment';

import React from 'react';

export default function Moment({ date, format = 'YYYY-MM-DD HH:mm' }) {
  const strDate = moment(date).format(format);
  return (
    <Typography variant="p" size="inherit">
      {strDate}
    </Typography>
  );
}
