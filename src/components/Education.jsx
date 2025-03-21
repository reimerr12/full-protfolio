import { useState ,useEffect } from "react";
import { getEducation,addEducation,updateEducation } from "../utils/Ethers"

export const Education = ()=>{
    const[education,setEducation] = useState([]);
    const[eduData,setEduData] = useState(
        {period: "",
        qualification: "",
        skillsLearned: "",
        institution: ""});
    const[EduId,setEduId] = useState(null);

    useEffect(()=>{
        const fetchEducation = async()=>{
            try{
                const data = await getEducation();
                setEducation(data);
            }catch(error){
                console.error("there is an error in the fetchEducation function",error);
            }
        }
        fetchEducation();
    },[]);

    const handleChange = (e)=>{
        setEduData({...eduData,[e.target.name]:e.target.value});
    }

    const handleSubmit = async(e)=>{
        e.preventDefault();
        try{
            if(EduId !== null){
                await updateEducation(
                    EduId,
                    eduData.period,
                    eduData.qualification,
                    eduData.skillsLearned,
                    eduData.institution,
                );

                alert("education has been updated successfully");

                const updatedEducation = [...education];
                updatedEducation[EduId] = {
                    ...eduData,
                }
                setEducation(updatedEducation);

            }else{
                await addEducation(
                    eduData.period,
                    eduData.qualification,eduData.skillsLearned,eduData.institution);

                alert("education has been added successfully");

                setEducation([...education,eduData]);
            }
            setEduData({period: "",
                qualification: "",
                skillsLearned: "",
                institution: "",});
            setEduId(null);
        }catch(error){
            console.error('there is an error in the handle submit of the education section',error);
        }
    }

    const handleEdit =(index)=>{
        const educationToEdit = education[index];
        setEduData({
        period: educationToEdit.period,
        qualification: educationToEdit.qualification,
        skillsLearned: educationToEdit.skillsLearned,
        institution: educationToEdit.institution,
        })
        setEduId(index);
    }

    const cancelEdit =()=>{
        setEduData({
            period: "",
            qualification: "",
            skillsLearned: "",
            institution: ""
        })
        setEduId(null);
    }

    return(
        <section id="education" className="min-h-screen flex flex-col items-center justify-center">
            <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-500 to-cyan-400 leading-right bg-clip-text text-transparent">
                Education Background
            </h2>

            <div className="flex flex-col md:flex-row w-full max-w-6xl mt-6 gap-6">

                <div className="w-full md:w-1/3 p-4 bg-gray-800 rounded-lg shadow-md flex flex-col justify-start">

                    <h3 className="text-lg font-bold bg-gradient-to-r from-blue-500 to-cyan-400 leading-right bg-clip-text text-transparent">{EduId !== null ?"edit education":"add education"}</h3>

                    <form onSubmit={handleSubmit} className="flex flex-col gap-2 space-y-2 max-h-max">
                        <input 
                        type="text"
                        name="period"
                        value={eduData.period}
                        onChange={handleChange}
                        placeholder="Period"
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white transition focus:outline-none focus:border-cyan-400 focus:bg-blue-500/5"
                        />

                        <input 
                        type="text"
                        name="qualification"
                        value={eduData.qualification}
                        onChange={handleChange}
                        placeholder="qualification"
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white transition focus:outline-none focus:border-cyan-400 focus:bg-blue-500/5"
                        />

                        <input 
                        type="text"
                        name="skillsLearned"
                        value={eduData.skillsLearned}
                        onChange={handleChange}
                        placeholder="skills Learned"
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white transition focus:outline-none focus:border-cyan-400 focus:bg-blue-500/5"
                        />

                        <input 
                        type="text"
                        name="institution"
                        value={eduData.institution}
                        onChange={handleChange}
                        placeholder="institution"
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white transition focus:outline-none focus:border-cyan-400 focus:bg-blue-500/5"
                        />

                        <div className="flex gap-2">
                            <button type="submit" className="px-3 py-1 rounded-full border border-cyan-400 transition-all hover:scale-95 text-cyan-500">
                                {EduId !== null?"update education" : "add education"}
                            </button>
                            {
                                EduId!==null&&(
                                    <button onClick={cancelEdit} className="px-3 py-1 rounded-full border border-cyan-400 transition-all hover:scale-95 text-cyan-500">cancel</button>
                                )
                            }
                        </div>
                    </form>
                </div>
                <div className="w-full md:w-2/3 h-[600px] overflow-y-auto pr-4">
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                   {
                        education.map((edu,index)=>(
                            <div className="border border-cyan-400 p-4 rounded-lg shadow-md text-white bg-gray-900 space-y-4" key={index}>
                                <h3 className="text-3xl font-bold text-cyan-400 capitalize">{edu.qualification}</h3>

                                <p className="text-xl font-semibold text-gray-400">{edu.period}</p>

                                <p className="text-lg capitalize font-semibold text-gray-200">{edu.skillsLearned}</p>

                                <p className="text-lg capitalize font-semibold text-gray-200">{edu.institution}</p>

                                <button className="px-3 py-1 rounded-full border border-cyan-400 transition-all hover:scale-95 text-cyan-500" onClick={()=>handleEdit(index)}>Edit</button>
                            </div>
                        ))
                    }
                   </div>
                </div>
            </div>

        </section>
    )
}