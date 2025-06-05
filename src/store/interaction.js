import { BrowserProvider } from "ethers";

export const loadProvider = (dispatch) => {
    if (typeof window.ethereum !== "undefined") {
        const provider = new BrowserProvider(window.ethereum);  
        dispatch({type: "PROVIDER_LOADER", provider});
        return provider;
    } else {
        throw new Error("No Ethereum provider found (e.g., MetaMask)");
    }
};
export const loadNetwork=async(provider,dispatch)=>{
    const {chainId}=await provider.getNetwork();
    dispatch({type:"NETWORK_LOADED",chainId});
    return chainId;
}