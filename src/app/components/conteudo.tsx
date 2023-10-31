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

  type TButtonProps = {
    texto: string,
    disabled: boolean,
  }

  type ButtonControler = {
    anterior: TButtonProps,
    inicio: TButtonProps,
    proximo: TButtonProps,
  }

  const [buttonProps, setButtonProps] = useState<ButtonControler>({anterior: {texto: "Anterior", disabled: false}, inicio: {texto: "Início", disabled: false}, proximo: {texto: "Próximo", disabled: false}});

  useEffect(() =>{

    if(!textoSelecionado){
      setTextoFiltrado(acervoTextos);
    }

  },[textoSelecionado])


  const handleSelect = (texto: Texto) => {
    setTextoSelecionado(texto);
    setButtonProps(prevState => ({...prevState, inicio: {texto: "Início", disabled: false}}));
  }

  if(textoSelecionado){
    return (
      <div>
        <div className='input-holder'>
          <button className='btn'>{buttonProps.anterior.texto}</button>
          <button onClick={handleInicio} className='btn'>{buttonProps.inicio.texto}</button>
          <button className='btn'>{buttonProps.proximo.texto}</button>
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
