'use client'

import { useEffect, useState } from "react";
import { Conteudo } from "./components/conteudo";
import { Texto, acervoTextos } from "./components/textos";

export default function Home() {
  const [textoSelecionado, setTextoSelecionado] = useState<Texto | null>();
  const [textoFiltrado, setTextoFiltrado] = useState<Texto[] | null>(acervoTextos);

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

    setButtonProps(prevState => ({...prevState, anterior, inicio, proximo}));


  },[textoSelecionado])


  const handleSelect = (texto: Texto) => {
    setTextoSelecionado(texto);

  }

  return (
    <>
    <div className='site'>
      <header className='header'>
        <h1 className='titulo'>Camadas do Medo</h1>
      </header>
      <section className='conteudo'>
        <Conteudo/>
      </section>
      <footer className="footer">By fernando.worked@gmail.com</footer>
    </div>
    
    </>
  )
}
