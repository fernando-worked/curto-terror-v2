'use client'

import React, { useEffect, useState } from 'react';
import { Texto, acervoTextos } from './textos';

export const Conteudo = () => {
  console.log("renderizou!");
  const [textoSelecionado, setTextoSelecionado] = useState<Texto | null>(null);
  const [textoFiltrado, setTextoFiltrado] = useState<Texto[] | null>();

  const handleSelect = (selecionado: Texto) => {
    setTextoSelecionado(selecionado);
    setTextoFiltrado(acervoTextos.filter(texto => texto.titulo === selecionado.titulo));
    console.log("chamou!");
  };

  useEffect(() => {
    setTextoFiltrado(acervoTextos);
    console.log("useEffect []");
  },[])




  if(textoFiltrado)
  if(textoFiltrado.length > 1){
    return (
      <div>
        {textoFiltrado.map((texto, index) => (
          <div
            onClick={() => {
              handleSelect(texto);
            }}
            className='titulo-texto'
            key={index}
          >
            <h2>{texto.titulo}</h2>
          </div>
        ))}
      </div>
    );
  }else{
    return (
      <div>{textoSelecionado?.texto}</div>
    )
  }

  
};
