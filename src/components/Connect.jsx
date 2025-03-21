import React from "react";
import { useState ,useEffect } from "react";

function Connect({onConnect}){
    const [account,setAccount] = useState("");
    const [isConnected,setIsConnected] = useState(false);

    const checkIfAccountExists = async() =>{
        try {
            if(window.ethereum){
                const accounts = await window.ethereum.request({
                    method:"eth_accounts",
                });
                if(accounts.length>0){
                    setAccount(accounts[0]);
                    setIsConnected(true);
                    onConnect(accounts[0]);
                }
            }
        } catch (error) {
            console.error(error);
            alert("there is an error in check if account exists function");
            throw error;
        }
    }

    const connectWallet = async() =>{
        try{
            if(window.ethereum){
                const accounts = await window.ethereum.request({
                    method:"eth_requestAccounts"
                });
                setAccount(accounts[0]);
                setIsConnected(true);
                onConnect(accounts[0]);
            }
        }catch(error){
            console.error(error);
            alert("there is an error in check wallet function");
            throw error;
        }
    }

    useEffect(()=>{
        checkIfAccountExists();
        if(window.ethereum){
            const accountsChangeListener = (accounts)=>{
                if(accounts.length >0){
                    setAccount(accounts[0]);
                    setIsConnected(true);
                    onConnect(accounts[0]);
                }else{
                    setAccount("");
                    setIsConnected(false);
                }
                window.ethereum.on("accountsChanged",accountsChangeListener());

                return()=>{
                        window.ethereum.removeListener("accountsChanged",accountsChangeListener());
                };
            }           
        }
    },[onConnect]);

    return(
        <nav className="fixed top-0 w-full bg-[rgba(10,10,10,0.8)] backdrop-blur-lg border-b border-cyan-400/10 shadow-xs shadow-cyan-400 z-50">

            <div className="max-w-7xl mx-auto px-4">

                <div className="flex justify-between items-center h-16">
                    <a className="text-2xl font-bold" href="">Portfolio<span className="text-cyan-400">Ui</span></a>
                    <div>
                        {
                            isConnected ? (
                                <p className="text-xs font-light text-cyan-400 text-center capitalize">connected:{account}</p>
                            ):(
                                <button className="py-1 px-3 font-md text-cyan-400 border border-cyan-400 bg-black capitalize mx-auto rounded-2xl flex items-center justify-center" onClick={connectWallet}>
                                    connect wallet
                                </button>
                            )
                        }
                    </div>

                    <div className="text-md flex items-center space-x-8">
                        <a href="#profile" className="text-white hover:text-cyan-400 transition-colors hover:scale-95 text-sm">Profile</a>

                        <a href="#projects" className="text-white hover:text-cyan-400 transition-colors hover:scale-95 text-sm">Projects</a>

                        <a href="#education" className="text-white hover:text-cyan-400 transition-colors hover:scale-95 text-sm">Education</a>

                        <a href="#experience" className="text-white hover:text-cyan-400 transition-colors hover:scale-95 text-sm">Experience</a>
                    </div>
                </div>
            </div>
        </nav>
        
    )
}
export default Connect;