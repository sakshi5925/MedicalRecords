import { useEffect } from 'react'
import './App.css'
import { loadNetwork, loadProvider } from './store/interaction.js'
import { useDispatch } from 'react-redux';

const App = () => {
  const dispatch = useDispatch();
  const loadBlockChainData = async () => {
    const provider = loadProvider(dispatch);
    const chainId = loadNetwork(provider, dispatch);
    console.log("provider", provider);
  };
  useEffect(() => {
    loadBlockChainData();
  })
  return (
    <div>
      <h1>Welcome to My React App</h1>
    </div>
  )
}

export default App