'use client'

import React, { useEffect, useState } from 'react';
import { Texto, acervoTextos } from './textos';

export const Conteudo = () => {

  const handleInicio = () => {
    setTextoSelecionado(null);
  }

  const handleSearch = (e: any) => {
    console.log(e.target.value);
    if(e){
      setTextoFiltrado(acervoTextos.filter(texto => texto.titulo.startsWith(e.target.value)));
    }else{
      setTextoFiltrado(acervoTextos);
    }
    
  }

  const [textoSelecionado, setTextoSelecionado] = useState<Texto | null>();
  const [textoFiltrado, setTextoFiltrado] = useState<Texto[] | null>();

  useEffect(() =>{

    if(!textoSelecionado){
      setTextoFiltrado(acervoTextos);
    }

  },[textoSelecionado])


  const handleSelect = (texto: Texto) => {
    setTextoSelecionado(texto);
  }

  if(textoSelecionado){
    return (
      <div>
        <div className='input-holder'>
          <button className='btn'>Anterior</button>
          <button onClick={handleInicio} className='btn'>Início</button>
          <button className='btn'>Próximo</button>
        </div>
        <div className='texto'>
          {textoSelecionado.texto.split('\n').map((linha, index) => (
            <p key={index}>{linha}</p>
           ))}
        </div>
        
      </div>)
  }else{
    return (
      <div>
        <div className='input-holder'>
          <input onChange={handleSearch} placeholder='Digite para buscar' className='search' type='text'></input>
        </div>
          {textoFiltrado?.map(texto => {
          return <div onClick={() => {
            handleSelect(texto)
          }} className='titulo-tile' key={texto.titulo}>{texto.titulo}</div>
        })}
      </div>
      
    )
  }
  
  
};
