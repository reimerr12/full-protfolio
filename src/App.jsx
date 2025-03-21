import { useState } from 'react'
import  Connect  from './components/Connect'
import { Profile } from './components/Profile'
import { Support } from './components/Support'
import { Projects } from './components/Projects'
import { Education } from './components/Education'
import { Experience } from './components/Experience'
import './index.css'

export const App =()=> {
  const[account,setAccount] = useState('');

  const handleAccount = (connectedAccount)=>{
    setAccount(connectedAccount);
    console.log('connected account:',connectedAccount);
  }
  return (
      <>
          <Connect onConnect={handleAccount}/>
          <Profile/>
          <Projects/>
          <Education/>
          <Experience/>
          <Support/>
      </>
  )
}
