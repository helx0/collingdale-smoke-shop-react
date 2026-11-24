import { Outlet } from 'react-router-dom'
import { AgeGate } from './AgeGate'
import { Header } from './Header'
import { Footer } from './Footer'
import { WhatsAppButton } from './WhatsAppButton'
export function Layout(){ return <><AgeGate/><Header/><main><Outlet/></main><Footer/><WhatsAppButton/></> }
