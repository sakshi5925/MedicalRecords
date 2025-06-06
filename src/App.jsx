import { useEffect } from 'react'
import './App.css'
import { useEffect } from 'react'
import {  loadProvider } from './store/interaction';
import { useDispatch } from 'react-redux';
import { loadNetwork } from './store/interaction';
import  config  from "./config.json";
import Navbar from './components/navbar';
import Form from './components/form';
const App = () => {
    const dispatch=useDispatch()
    const loadBlockchainData=async()=>{
        const provider=loadProvider(dispatch);
        const chainId= await loadNetwork(provider,dispatch);
        console.log("chainid",chainId);
        if (!config[chainId.toString()]) {
  console.error("No config found for chainId:", chainId);
  return;
}
        const medical_config=config[chainId.toString()].MedicalRecord;
        const medical=await loadMedical(
            provider,
            medical_config,
            dispatch
        )
   
    };
    useEffect(()=>{
        
        loadBlockchainData();
    },[])
    return (
        <div>
           <Navbar/>
           <Form/>
        </div>
    )
}

export default App