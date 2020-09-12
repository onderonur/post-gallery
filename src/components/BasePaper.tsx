import { Paper, PaperProps } from '@material-ui/core';
import { Omit } from '@src/types';
import React from 'react';

type BasePaperProps = Omit<PaperProps, 'elevation'>;

function BasePaper(props: BasePaperProps) {
  return <Paper {...props} elevation={0} />;
}

export default BasePaper;
