import { useState, useEffect } from "react"
import { getProfile } from "../utils/Ethers"
export const Profile = () =>{

    const[profile,setProfile] = useState({});

    useEffect(()=>{
            const fetchProfile = async()=>{
                try {
                    const data = await getProfile();
                    setProfile(data);
                } catch (error) {
                    console.error("there is an error in the fetchProfile function",error);
                }
            }
        fetchProfile();
    },[])

    return(
        <section id="profile" className="min-h-screen flex  items-center justify-center relative">
            <div className="flex flex-col mx-auto">

                <img src={profile.profileImage} alt="" />

                <h2 className="text-5xl font-bold mb-4 bg-gradient-to-r from-blue-500 to-cyan-400 leading-right p-4 bg-clip-text text-transparent">Ahbab Sameer's Profile</h2>

                <p className="text-gray-300 text-lg font-semibold mb-2 mx-auto capitalize">{profile.bio}</p>

                <p className="text-gray-300 text-md mb-8 max-w-lg mx-auto text-center">
                    Im a blockchain developer passionate about building decentralized applications (DApps) and working with Solidity smart contracts.
                </p>

                <div className="flex justify-center items-center">
                    <a href={profile.cvLink} className="px-3 py-2 rounded-full border border-cyan-400 text-cyan-500 capitalize hover:scale-95 transition-all">click here</a>
                </div>
            </div>
        </section>
    )
}