import { useState,useEffect } from "react"
import { getExperience,addExperience,updateExperience } from "../utils/Ethers";


export const Experience = ()=>{
    const[exp,getExp] = useState([]);
    const[formData,setFormData] = useState({
        duration:"",
        position:"",
        skillsGained:"",
        organization:""});
    const[editIndex,setEditIndex] = useState(null);

    useEffect(()=>{
        const fetchExperience =async () =>{
            try{
                const data = await getExperience();
                getExp(data);
            }catch(error){
                console.error("there is an error in the fetchExperience function",error);
            }
        }
        fetchExperience();
    },[]);

    const handleChange = (e)=>{
        setFormData({...formData,[e.target.name]: e.target.value});
    }

    const handleSubmit =async(e)=>{
        e.preventDefault();
        try {
            if(editIndex !== null){
                await updateExperience(
                editIndex,
                formData.duration,
                formData.position,
                formData.skillsGained,
                formData.organization)

                alert("experience has been updated");
                const updatedExperience = [...exp];
                updatedExperience[editIndex] = {
                    ...formData
                }
                getExp(updatedExperience);
            }else{
                await addExperience(
                    formData.duration,
                    formData.position,
                    formData.skillsGained,
                    formData.organization
                )

                alert("experience has been added successfully");
                getExp([...exp,formData]);
            }
            setFormData({
                duration:"",
                position:"",
                skillsGained:"",
                organization:""
            });
            setEditIndex(null);
        } catch (error) {
            console.error("there is an issue in handle submit",error);
        }
    }

    const handleEdit = (index)=>{
        const experienceToEdit = exp[index];
        setFormData({
            duration: experienceToEdit.duration,
            position: experienceToEdit.position,
            skillsGained: experienceToEdit.skillsGained,
            organization :experienceToEdit.organization
        })
        setEditIndex(index);
    }

    const cancelEdit = ()=>{
        setFormData({
            duration:"",
            position:"",
            skillsGained:"",
            organization:""
        });
        setEditIndex(null);
    }

    return(
            <section id="experience" className="min-h-screen flex flex-col items-center justify-center">
            <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-500 to-cyan-400 leading-right bg-clip-text text-transparent">
                Experience Background
            </h2>
        
            <div className="flex flex-col md:flex-row w-full max-w-6xl mt-6 gap-6">

            <div className="w-full md:w-2/3 h-[600px] overflow-y-auto pr-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {
                            exp.map((item, index) => (
                                <div className="border border-cyan-400 p-4 rounded-lg shadow-md text-white bg-gray-900 space-y-4" key={index}>
                                    <h3 className="text-3xl font-bold text-cyan-400 capitalize">{item.position}</h3>
        
                                    <p className="text-xl font-semibold text-gray-400">{item.duration}</p>
        
                                    <p className="text-lg capitalize font-semibold text-gray-200">{item.skillsGained}</p>
        
                                    <p className="text-lg capitalize font-semibold text-gray-200">{item.organization}</p>
        
                                    <button className="px-3 py-1 rounded-full border border-cyan-400 transition-all hover:scale-95 text-cyan-500" onClick={() => handleEdit(index)}>
                                        Edit
                                    </button>
                                </div>
                            ))
                        }
                    </div>
                </div>
                
                <div className="w-full md:w-1/3 p-4 bg-gray-800 rounded-lg shadow-md flex flex-col justify-start">
                    <h3 className="text-lg font-bold bg-gradient-to-r from-blue-500 to-cyan-400 leading-right bg-clip-text text-transparent">
                        {editIndex !== null ? "Edit Experience" : "Add Experience"}
                    </h3>
        
                    <form onSubmit={handleSubmit} className="flex flex-col gap-2 space-y-2 max-h-max">
                        <input 
                            type="text"
                            name="duration"
                            value={formData.duration}
                            onChange={handleChange}
                            placeholder="Duration"
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white transition focus:outline-none focus:border-cyan-400 focus:bg-blue-500/5"
                        />
        
                        <input 
                            type="text"
                            name="position"
                            value={formData.position}
                            onChange={handleChange}
                            placeholder="Position"
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white transition focus:outline-none focus:border-cyan-400 focus:bg-blue-500/5"
                        />
        
                        <input 
                            type="text"
                            name="skillsGained"
                            value={formData.skillsGained}
                            onChange={handleChange}
                            placeholder="Skills Gained"
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white transition focus:outline-none focus:border-cyan-400 focus:bg-blue-500/5"
                        />
        
                        <input 
                            type="text"
                            name="organization"
                            value={formData.organization}
                            onChange={handleChange}
                            placeholder="Organization"
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white transition focus:outline-none focus:border-cyan-400 focus:bg-blue-500/5"
                        />
        
                        <div className="flex gap-2">
                            <button type="submit" className="px-3 py-1 rounded-full border border-cyan-400 transition-all hover:scale-95 text-cyan-500">
                                {editIndex !== null ? "Update Experience" : "Add Experience"}
                            </button>
                            {
                                editIndex !== null && (
                                    <button onClick={cancelEdit} className="px-3 py-1 rounded-full border border-cyan-400 transition-all hover:scale-95 text-cyan-500">
                                        Cancel
                                    </button>
                                )
                            }
                        </div>
                    </form>
                </div>
            </div>
        </section>
    
    )
}