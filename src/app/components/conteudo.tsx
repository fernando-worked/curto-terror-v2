'use client'

import { Texto, acervoTextos } from './textos';
import React, { useEffect, useState } from 'react';


export const Conteudo = () => {
    const [textoSelecionado, setTextoSelecionado] = useState({});

    const handleSelect = (texto: Texto) => {
        setTextoSelecionado(texto);
    }

    useEffect(() => {
       
      }, [textoSelecionado]);

      if(textoSelecionado){
        return <>
            <h2>{textoSelecionado.titulo}</h2>
            <article>{textoSelecionado.texto}</article>
        </>

      }else{
        return  <>
        {acervoTextos.map(texto => {
            return <div onClick={() => {
                handleSelect(texto);
            }} className='titulo-texto' key={texto.titulo}><h2>{texto.titulo}</h2></div>
        })}
      </>

      }

};

