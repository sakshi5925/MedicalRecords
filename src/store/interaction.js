
import { ethers } from "ethers";

import Medical_ABI from "../abis/MedicalRecord.json"
export const loadProvider = (dispatch) => {
    const connection = new ethers.BrowserProvider(window.ethereum);
    dispatch({ type: "PROVIDER_LOADED", connection });
    return connection;
}
export const loadNetwork = async (provider, dispatch) => {
    const { chainId } = await provider.getNetwork();
    console.log("chainid", chainId)
    dispatch({ type: "NETWORK_LOADED", chainId });
    return chainId;
}
export const loadAccount = async (provider, dispatch) => {
    const account = await window.ethereum.request({
        method: "eth_requestAccounts",
    });
    dispatch({ type: "ACCOUNT_LOADED", account: account[0] });
    console.log("account", account)
    let balance = await provider.getBalance(account[0]);
    console.log("balance", balance);
    balance = ethers.formatEther(balance);
    dispatch({ type: "ETHER_BALANCE_LOADED", balance });
    return account[0];

};

export const loadMedical = (provider, address, dispatch) => {
    const medical = new ethers.Contract(address, Medical_ABI, provider);
    dispatch({ type: "MEDICAL_LOADED", medical });
    return medical;
}

export const loadAllData = async (provider, medical, dispatch) => {
    const block = await provider.getBlockNumber();
    console.log("block", block);
    const medicalStream = await medical.queryFilter(
        "MedicalRecords__AddRecord",
        0,
        block
    );
    console.log("medical strem", medicalStream);
    const MedicalRecords = medicalStream.map((event) => event.args);
    console.log("all the data", MedicalRecords);
    dispatch({ type: "ALL_MEDICAL_RECORDS", MedicalRecords });

}
export const submitRecord = async (
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
) => {
    let transaction;
    dispatch({ type: "NEW_RECORD_LOADED" });
    try {
        const signer = await provider.getSigner();
        console.log("medical.address", medical.target);
        const medicalWithSigner = new ethers.Contract(medical.target, Medical_ABI, signer);
        transaction = await
            medicalWithSigner
                .addRecord(name,
                    age,
                    gender,
                    bloodType,
                    allergies,
                    diagnosis,
                    treatment
                );
        await transaction.wait();
    } catch (error) {
        console.error("Transaction Error:", error);
        dispatch({ type: "NEW_RECORD_FAIL" });
    }

};
export const subscribeToEvents = async (medical, dispatch) => {

    console.log("address", medical.target);
    medical.on(
        "MedicalRecords__AddRecord", (
            recordId,
            timestamp,
            name,
            age,
            gender,
            bloodType,
            allergies,
            diagnosis,
            treatment,
            event
        ) => {
        const medicalOrder = {
            recordId,
            timestamp,
            name,
            age,
            gender,
            bloodType,
            allergies,
            diagnosis,
            treatment
        };
        console.log("medicalOrder", medicalOrder);
        console.log("event details:", event);
        dispatch({ type: "NEW_RECORD_SUCCESS", medicalOrder, event });
    }
    )
}



