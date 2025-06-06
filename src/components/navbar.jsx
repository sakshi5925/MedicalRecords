import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { loadAccount } from '../store/interaction';
import blockies from 'ethereum-blockies';
import config from "../config.json"

const Navbar = () => {
    const dispatch = useDispatch();
    const provider = useSelector((state) => state.provider.connection);
    const account = useSelector((state) => state.provider.account);
    const balance = useSelector((state) => state.provider.balance);
    const chainId=useSelector((state)=>state.provider.chainId)

    const connectHandler = async () => {
        await loadAccount(provider, dispatch);
    }
    const networkHandler = async (e) => {
        await window.ethereum.request({
            method: "wallet_switchEthereumChain",
            params: [
                {
                    chainId: e.target.value,
                }
            ]
        })
    }

    const blockiesImgSrc = account
        ? blockies.create({ seed: account.toLowerCase() }).toDataURL()
        : null;

    return (
        <nav className="bg-white shadow-md px-6 py-4 flex items-center justify-between">
            {/* Left: Logo and Title */}
            <div className="flex items-center space-x-3">
                <img src="/image.png" alt="Logo" className="w-10 h-10" />
                <h2 className="text-xl font-semibold text-gray-800">Medical Record Storer</h2>
            </div>

            {/* Middle: Network Select */}
            <div>
                <select
                    name="network"
                    onChange={networkHandler}
                    className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    value={config[chainId]?`0x${chainId.toString(16)}`:`0`}
                >
                    <option value={0} disabled>Select Network</option>
                    <option value={31337}>Localhost</option>
                    <option value={11155111}>Sepolia</option>
                </select>
            </div>

            {/* Right: Account Info and Connect Button */}
            <div className="flex items-center space-x-4 text-gray-800">
                {balance ? (
                    <p className="text-sm font-medium">Balance: {Number(balance).toFixed(4)} ETH</p>
                ) : (
                    <p className="text-sm font-medium">Balance: 0 ETH</p>
                )}

                {account ? (
                    <>
                        {blockiesImgSrc && (
                            <img
                                src={blockiesImgSrc}
                                alt="account identicon"
                                className="rounded-full w-10 h-10 border border-gray-300"
                            />
                        )}
                        <a
                            href="#"
                            className="text-indigo-600 hover:underline font-mono text-sm"
                        >
                            {account.slice(0, 6) + "..." + account.slice(-4)}
                        </a>
                    </>
                ) : (
                    <button
                        onClick={connectHandler}
                        className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition"
                    >
                        Connect
                    </button>
                )}
            </div>
        </nav>
    )
}

export default Navbar
