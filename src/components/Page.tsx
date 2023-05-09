import React from 'react'
import { Header, Footer } from '../components'
// import { useLang } from '../stores'
export class Page extends React.Component {
  render(): React.ReactNode {
    // const [ lang, setLang ] = useLang();
    return (
      <main className='flex flex-col min-h-screen w-full overflow-x-hidden items-center justify-center mx-auto bg-white text-black'>
        <Header />
        <div className={'flex flex-col flex-1 h-full w-full py-20 items-center justify-center ' + this.props.className}>
          {this.props.children}
        </div>
        <Footer />
      </main>
    )  
  }
}
