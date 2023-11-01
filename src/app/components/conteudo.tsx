'use client'

import React, { useEffect, useState } from 'react';
import { Texto, acervoTextos } from './textos';

export const Conteudo = () => {

  const handleInicio = () => {
    setTextoSelecionado(null);
    setTextoFiltrado(acervoTextos);
  }

  const handleSearch = (e: any) => {
    if(e){
      setTextoFiltrado(acervoTextos.filter(texto => texto.titulo.startsWith(e.target.value)));
    }else{
      setTextoFiltrado(acervoTextos);
    }
    
  }

  const handleAnterior = () => {
    const indiceAtual = acervoTextos.findIndex(texto => texto.titulo === textoSelecionado?.titulo);
    setTextoSelecionado(acervoTextos[indiceAtual-1]);

  }

  const handleProximo = () => {
    const indiceAtual = acervoTextos.findIndex(texto => texto.titulo === textoSelecionado?.titulo);
    setTextoSelecionado(acervoTextos[indiceAtual+1]);
  }

  const [textoSelecionado, setTextoSelecionado] = useState<Texto | null>();
  const [textoFiltrado, setTextoFiltrado] = useState<Texto[] | null>(acervoTextos);

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

    let indice = 0;
    let textoAnterior = "";
    let textoProximo = "";

    if(textoSelecionado){
      indice = acervoTextos.findIndex(item => item.titulo === textoSelecionado.titulo);
    }

    if(indice < acervoTextos.length-1)
    textoProximo = acervoTextos[indice+1].titulo;

    if(indice > 0)
    textoAnterior = acervoTextos[indice-1].titulo;
  
  
    const anterior: TButtonProps = indice == 0 ? {texto: " - ", disabled: true} : {texto: textoAnterior, disabled: false}; 
    const inicio: TButtonProps = {texto: "Início", disabled: false};
    const proximo: TButtonProps = indice+1 == acervoTextos.length ? {texto: " - ", disabled: true} : {texto: textoProximo, disabled: false};

    setButtonProps(prevState => ({...prevState, anterior, inicio, proximo}));


  },[textoSelecionado])


  const handleSelect = (texto: Texto) => {
    setTextoSelecionado(texto);

  }

  if(textoSelecionado){
    return (
      <div>
        <div className='input-holder'>
          <button disabled={buttonProps.anterior.disabled} onClick={handleAnterior} className='btn'>{buttonProps.anterior.texto}</button>
          <button disabled={buttonProps.inicio.disabled} onClick={handleInicio} className='btn'>{buttonProps.inicio.texto}</button>
          <button disabled={buttonProps.proximo.disabled} onClick={handleProximo} className='btn'>{buttonProps.proximo.texto}</button>
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
