import { useState,useEffect } from "react"
import { getProjects, addProject ,updateProject } from "../utils/Ethers";

export const Projects=()=>{
    const[project,setProject] = useState([]);
    const[formData,setFormData] = useState({title:"",
    details:"",
    imageUrl:"",
    repoLink:""});
    const[editIndex,setEditIndex] = useState(null);

    useEffect(()=>{
        const fetchProjects = async()=>{
            try {
                const data = await getProjects();
                setProject(data);
            } catch (error) {
                console.error("there is an error in the fetchProjects function",error);
            }
        }
        fetchProjects();
    },[]);

    const handleChange =(e)=>{
        setFormData({...formData,[e.target.name]:e.target.value});
    };

    const handleSubmit = async (e)=>{
        e.preventDefault();
        try{
            if(editIndex !== null){
                await updateProject(
                    editIndex,
                    formData.title,
                    formData.details,
                    formData.imageUrl,
                    formData.repoLink);
                alert("project updated successfully");

                const updatedProjects = [...project];
                updatedProjects[editIndex] = {...formData , projectId:editIndex}
                setEditIndex(updatedProjects);
            }else{
                await addProject(
                    formData.title,
                    formData.details, 
                    formData.imageUrl, 
                    formData.repoLink);
                alert("Project added successfully!");

                setProject([...project, formData]);
            }
            setFormData({ title: "", 
                details: "", 
                imageUrl: "", 
                repoLink: "" });
            setEditIndex(null);
        }catch(error){
            console.error("there is an error in the handlesubmit of the Project function",error);
        }
    };

    const handleEdit = (index)=>{
        const projectToEdit = project[index];
        setFormData(
           { title: projectToEdit.title,
            details: projectToEdit.details,
            imageUrl: projectToEdit.imageUrl,
            repoLink: projectToEdit.repoLink,}
        );
        setEditIndex(index);
    }

    const handleCancelEdit = () => {
        setFormData({ title: "", details: "", imageUrl: "", repoLink: "" });
        setEditIndex(null);
    };

    return(
        <section id="projects" className="min-h-screen flex flex-col items-center justify-center">
            <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-500 to-cyan-400 leading-right bg-clip-text text-transparent">
                Projects
            </h2>


            <div className="flex flex-col md:flex-row w-full max-w-6xl mt-6">
                
                <div className="w-full md:w-2/3 h-[600px] overflow-y-auto pr-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {project.map((project, index) => (

                            <div key={index} className="border border-cyan-400 p-4 rounded-lg shadow-md text-white bg-gray-900">

                                <img src={project.imageUrl} alt={project.title} className="w-full h-48 object-cover rounded-lg mb-4" />

                                <strong className="text-lg">{project.title}</strong>

                                <p className="text-sm text-gray-400">{project.details}</p>

                                <a href={project.repoLink} className="text-cyan-400 underline block mt-2">Repo Link</a>

                                <button className="mt-2 px-3 py-1 rounded-full bg-cyan-500 text-white" onClick={()=>handleEdit(index)}>Edit</button>
                            </div>
                        ))}
                    </div>
                </div>


                <div className="w-full md:w-1/3 p-4 bg-gray-800 rounded-lg shadow-md flex flex-col justify-start">
                    <h3 className="text-lg font-bold bg-gradient-to-r from-blue-500 to-cyan-400 leading-right bg-clip-text text-transparent">
                        {editIndex !== null ? "Edit Project" : "Add Project"}
                    </h3>

                    <form onSubmit={handleSubmit} className="flex flex-col gap-2 space-y-2 max-h-max">

                        <input 
                        type="text"
                        name="title"
                        value={formData.title} 
                        onChange={handleChange} 
                        placeholder="Title" 
                        required 
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white transition focus:outline-none focus:border-cyan-400 focus:bg-blue-500/5" />

                        <input 
                        type="text" 
                        name="details" 
                        value={formData.details} 
                        onChange={handleChange} 
                        placeholder="Details" 
                        required 
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white transition focus:outline-none focus:border-cyan-400 focus:bg-blue-500/5" />

                        <input 
                        type="text" 
                        name="imageUrl" 
                        value={formData.imageUrl} 
                        onChange={handleChange} 
                        placeholder="Image URL" 
                        required 
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white transition focus:outline-none focus:border-cyan-400 focus:bg-blue-500/5" />

                        <input 
                        type="text" 
                        name="repoLink" 
                        value={formData.repoLink} 
                        onChange={handleChange} 
                        placeholder="Repo Link" 
                        required 
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white transition focus:outline-none focus:border-cyan-400 focus:bg-blue-500/5" />

                        <div className="flex gap-2">
                            <button type="submit" className="px-3 py-1 rounded-full border border-cyan-400 transition-all hover:scale-95 text-cyan-500">
                                {editIndex !== null?'Update Project':'Add project'}
                            </button>
                            {
                                editIndex !==null && (
                                    <button onClick={handleCancelEdit} className="px-3 py-1 rounded-full border border-cyan-400 transition-all hover:scale-95 text-cyan-500">
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