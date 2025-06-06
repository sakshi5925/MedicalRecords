import { ethers } from "ethers";


export  const loadProvider=(dispatch)=>{
 const connection= new ethers.BrowserProvider(window.ethereum);
 dispatch({type:"PROVIDER_LOADED",connection});
 return connection;
}
export  const loadNetwork= async (provider,dispatch)=>{
 const {chainId}=await provider.getNetwork();
 console.log("chainid",chainId)
 dispatch({type:"NETWORK_LOADED",chainId});
 return chainId;
}
export const loadAccount=async(provider,dispatch)=>{
    const account=await window.ethereum.request({
        method:"eth_requestAccounts",
    });
     dispatch({type:"ACCOUNT_LOADED",account:account[0]});
      console.log("account",account)
     let balance=await provider.getBalance(account[0]);
     console.log("balance",balance);
     balance=ethers.formatEther(balance);   
    dispatch({type:"ETHER_BALANCE_LOADED",balance});
    return account[0];

};

const loadMedical=(provider,address,dispatch)=>{
  const medical=new ethers.Contract(address,Medical_ABI,provider);
  dispatch({type:"MEDICAL_LOADED",medical});
  return medical;
}



export  const submitRecord=async (
    name,
    age,
    gender,
    bloodType,
    allergies,
    diagnosis,
    treatment,
    provider,
    medical,
    dispatch
)=>{

}