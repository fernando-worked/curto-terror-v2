'use client'

import React, { useEffect, useState } from 'react';
import { Texto, acervoTextos } from './textos';

export const Conteudo = () => {
  const [textoSelecionado, setTextoSelecionado] = useState<Texto | null>();
  const [textoFiltrado, setTextoFiltrado] = useState<Texto[] | null>();

  useEffect(() =>{

    if(!textoSelecionado){
      setTextoFiltrado(acervoTextos);
    }else{
      setTextoFiltrado(acervoTextos.filter(textoSelecionado => textoSelecionado.titulo === "schizophrenia"))
    }

  },[textoSelecionado])


  const handleSelect = (texto: Texto) => {
    setTextoSelecionado(texto);
  }

  return (
    textoFiltrado?.map(texto => {
      return <div onClick={() => {
        handleSelect(texto)
      }} className='titulo-tile' key={texto.titulo}>{texto.titulo}</div>
    })
  )
  
};
