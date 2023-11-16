'use client'

import { useEffect, useRef, useState } from "react";
import { Texto, acervoTextos } from "../components/textos";
import { useSearchParams } from 'next/navigation'


export default function Home() {

  const searchParams = useSearchParams();
 
  const texto = searchParams.get('texto');  

  const [textoSelecionado, setTextoSelecionado] = useState<Texto | null>();
  const [textoFiltrado, setTextoFiltrado] = useState<Texto[] | null>(acervoTextos);
  const [tituloPagina, setTituloPagina] = useState<String | undefined>("Camadas do Medo");

  const scrollContainerRef = useRef<HTMLDivElement>(null);

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

    setButtonProps({anterior, inicio, proximo});

    setTituloPagina(textoSelecionado ? textoSelecionado.titulo : "Camadas do Medo");

    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = 0;
    }


  },[textoSelecionado])

  useEffect(() => {
    if(texto){
      let indice = acervoTextos.findIndex(item => item.titulo === texto);
      let text = acervoTextos[indice];
      handleSelect(text);

    }

  },[texto]);


  const handleSelect = (texto: Texto) => {
    setTextoSelecionado(texto);

  }
  

  return (
    <>
      <div className='site'>
        <header className='header'>
          <h1 className='titulo'>{tituloPagina}</h1>
        </header>
        <section className='conteudo' ref={scrollContainerRef}>
          {textoSelecionado ? (
            <div>
              <div className='input-holder'>
                <button disabled={buttonProps.anterior.disabled} onClick={handleAnterior} className='btn'>{buttonProps.anterior.texto}</button>
                <button disabled={buttonProps.inicio.disabled} onClick={handleInicio} className='btn'>{buttonProps.inicio.texto}</button>
                <button disabled={buttonProps.proximo.disabled} onClick={handleProximo} className='btn'>{buttonProps.proximo.texto}</button>
              </div>
              <div className='content-holder'>
                <div className='texto'>
                  {textoSelecionado.texto.split('\n').map((linha, index) => (
                    <p key={index}>{linha}</p>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div>
              <div className='input-holder'>
                <input onChange={handleSearch} placeholder='Digite para buscar' className='search' type='text'></input>
              </div>
              <div className='content-holder'>
                {textoFiltrado && textoFiltrado.length > 0 ? textoFiltrado?.map(texto => {
                  return <div onClick={() => {
                    handleSelect(texto)
                  }} className='titulo-tile' key={texto.titulo}>{texto.titulo}</div>
                }) : <div className="texto-nao-encontrado">Infelizmente eu ainda não criei um texto com esse título...</div>}
              </div>
            </div>
          )}
        </section>
        <footer className="footer">By fernando.worked@gmail.com</footer>
      </div>
    </>
  );
  
}
