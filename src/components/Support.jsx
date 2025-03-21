"use client"; 
import { useState } from "react"
import { supportOwner } from "../utils/Ethers"

export const Support=()=>{
    const[amount,setAmount] = useState("");

    const handleSupport = async () =>{
        if(!amount||isNaN(amount|| Number(amount)<=0)){
            alert("please enter a valid amount");
            return
        }

        try{
            await supportOwner(amount);
            setAmount("");
        } catch (error) {
            console.error("there is an error in the Support function",error);
        }
    };

    return(
        <section className="min-h-[30vh] flex items-center justify-center relative">
            <div className="flex flex-col items-center space-y-4">

                <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-500 to-cyan-400 leading-right bg-clip-text text-transparent">Support Me</h2>

                <input type="number" name="amount" value={amount} id="" onChange={(e)=>setAmount(e.target.value)} placeholder="Enter Eth please" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white transition focus:outline-none focus:border-cyan-400 focus:bg-blue-500/5" />

                <button onClick={handleSupport} className="px-3 py-1 rounded-full border border-cyan-400 transition-all hover:scale-95 text-cyan-500">Send Support</button>
                
            </div>

        </section>
    )
}