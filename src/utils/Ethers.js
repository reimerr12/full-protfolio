import { ethers } from "ethers";
import {contractAddress,contractAbi} from './contract';

export const getContract = async(needSigner = false) =>{
    if(!window.ethereum){
        throw new Error("Wallet not found");
    }

    const provider = new ethers.providers.Web3Provider(window.ethereum);

    let providerOrSigner;
    if(needSigner){
        providerOrSigner = provider.getSigner();
    }else{
        providerOrSigner = provider;
    }
    return new ethers.Contract(contractAddress,contractAbi,providerOrSigner);
}

//helper function to interact with the contract
export const checkOwner = async()=>{
    try{
        const contract = await getContract();
        const owner = await contract.getOwner();

        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const userAddress = await signer.getAddress();

        return userAddress.toLowerCase() === owner.toLowerCase();
    }catch(error){
        console.error(error,"there is an error in getting the owner");
        throw false;
    }
}

export const getProfile = async() =>{
    try{
        const contract = await getContract();
        const[profileImage,bio,cvLink] = await Promise.all([
            contract.profileImage(),
            contract.bio(),
            contract.cvLink(),
        ]);

        return{profileImage,bio,cvLink};
    }catch(error){
        console.error(error);
        alert("there is an error in the getProfile",error);
        throw error; 
    }
}

export const getProjects = async() =>{
    try{
        const contract = await getContract();
        const projects = await contract.getProjects();
        return projects;
    }catch(error){
        console.error(error);
        alert("there is an error in the getProject");
        throw error; 
    }
}

export const getEducation = async()=>{
    try{
        const contract = await getContract();
        const education = await contract.getEdu();
        return education
    }catch(error){
        console.error(error);
        alert("getEducation has an error");
        throw error; 
    }
}

export const getExperience = async()=>{
    try{
        const contract = await getContract();
        const experience = await contract.getWork();
        return experience;
    }catch(error){
        console.log(error);
        alert("there is an error is getExperience function");
        throw error; 
    }
}

//admin functions
export const addProject = async (title,details,imageUrl,repoLink) =>{
    try{
        const isOwner = await checkOwner();
        if (!isOwner) {
            alert("You are not authorized to perform this action!");
            return;
        }

        const contract = await getContract(true);
        const tx = await contract.addProject(title,details,imageUrl,repoLink);
        await tx.wait();     
        alert("Project added successfully!");  
    }catch(error){
        console.error(error);
        alert("there is an issue in the addProject function");
        throw error; 
    }
}

export const updateProject = async(projectIndex,title,details,imageUrl,repoLink) =>{
    try {
        const isOwner = await checkOwner();
        if (!isOwner) {
            alert("You are not authorized to perform this action!");
            return;
        }


        const contract = await getContract(true);
        const tx = await contract.updateProject(title,details,imageUrl,repoLink,Number(projectIndex));
        return await tx.wait();
    } catch (error) {
        console.error(error);
        alert("there is an issue in the updateProject function");
        throw error;
    }
}

export const addEducation= async(period,qualification,skillsLearned,institution)=>{
    try {
        const isOwner = await checkOwner();
        if (!isOwner) {
            alert("You are not authorized to perform this action!");
            return;
        }


        const contract = await getContract(true);
        const tx = await contract.addEdus(period,qualification,skillsLearned,institution);
        await tx.wait();
        alert("education added successfully!");

    } catch (error) {
        console.error(error);
        alert("there is an error in the addEducation function");
        throw error;
    }
}

export const updateEducation = async (eduIndex,period,qualification,skillsLearned,institution)=>{
        try {
            const isOwner = await checkOwner();
            if (!isOwner) {
                alert("You are not authorized to perform this action!");
                return;
            }
            const contract = await getContract(true);
            const tx = await contract.updateEdu(eduIndex, period,qualification,skillsLearned,institution);
            return await tx.wait();

        } catch (error) {
            console.error(error);
            alert("there is an error in the updateEducation function");
            throw error;
        }
    }

export const addExperience = async(duration,position,skillsGained,organization)=>{
    try {
        const isOwner = await checkOwner();
        if (!isOwner) {
            alert("You are not authorized to perform this action!");
            return;
        }
        const contract = await getContract(true);
        const tx = await contract.addWork(duration,position,skillsGained,organization);
        await tx.wait();
        alert("experience added successfully!");
    } catch (error) {
        console.log(error);
        alert("there is an error in the addExperience function");
        throw error;
    }
}

export const updateExperience = async(workIndex,duration,position,skillsGained,organization)=>{
    try {
        const isOwner = await checkOwner();
        if (!isOwner) {
            alert("You are not authorized to perform this action!");
            return;
        }
        const contract = await getContract(true);
        const tx = await contract.updateWork(workIndex,duration,position,skillsGained,organization);
        return await tx.wait();
    } catch (error) {
        console.log(error);
        alert("there is an error in the updateExperience function");
        throw error;
    }
}

export const supportOwner = async (amount) => {
    try {
        if (!amount || isNaN(amount) || Number(amount) <= 0) {
            console.error("Invalid amount:", amount);
            return;
        }
        if (!window.ethereum) {
            console.error("MetaMask not detected!");
            alert("Please install MetaMask to proceed.");
            return;
        }

        const provider = new ethers.providers.Web3Provider(window.ethereum);
        await provider.send("eth_requestAccounts", []);
        const signer = provider.getSigner();

        if (!signer) {
            console.error("No signer found. Make sure your wallet is connected.");
            return;
        }

        const amountInWei = ethers.utils.parseEther(amount.toString());

        console.log(`Sending ${amount} ETH to the owner address in Wei:`, amountInWei.toString());

        const contract = await getContract(true);

        if (!contract.supportMe) {
            console.error("supportMe function not found in contract.");
            return;
        }

        const tx = await contract.supportMe({ value: amountInWei });
        console.log("Transaction hash:", tx.hash);

        await tx.wait();
        console.log(`Transaction completed: ${amount} ETH`);

        alert("Thank you for the support!");
    } catch (error) {
        console.error("Error in supportOwner function:", error);
    }
};



