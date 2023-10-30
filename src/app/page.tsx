import { Conteudo } from "./components/conteudo";

export default function Home() {
  return (
    <>
    <div className='site'>
      <header className='header'>
        <h1 className='titulo'>Camadas do Medo</h1>
      </header>
      <section className='conteudo'>
        <Conteudo/>
      </section>
    </div>
    
    </>
  )
}
