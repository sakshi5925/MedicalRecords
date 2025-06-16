import './App.css'
import { useEffect } from 'react'
import {  loadProvider } from './store/interaction';
import { useDispatch } from 'react-redux';
import { loadNetwork } from './store/interaction';
import {loadMedical} from "./store/interaction";
import { loadAllData } from './store/interaction';
import { subscribeToEvents } from './store/interaction';
import Option from './components/option';
import  config  from "./config.json";
import Navbar from './components/navbar';
import Form from './components/form';
import { Route, Routes } from 'react-router-dom';
import Data from './components/data';
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
            medical_config.address,
            dispatch
        )
        console.log("medical",medical);
       loadAllData(provider,medical,dispatch);
      
       subscribeToEvents(medical,dispatch);
      
   
    };
    useEffect(()=>{
        loadBlockchainData();
    },[])
    return (
        <div>
           <Navbar/>
           <Option/>
           <Routes>
            <Route path="/" element={<Form/>}/>
            <Route path="/data" element={<Data/>}/>
           </Routes>
          
        </div>
    )
}

export default App