'use client'

import React, { ReactElement } from 'react';

type BotaoProps ={
  children: string,
  onClick: React.MouseEventHandler<HTMLButtonElement>,
}

const Botao = ({ children, onClick } : BotaoProps) => {
  return (
    <button onClick={onClick}>
      {children}
    </button>
  );
};

export default Botao;
