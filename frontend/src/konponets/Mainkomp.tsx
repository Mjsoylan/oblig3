
import { useEffect, useState } from "react"
import Projectbox from "./Projectbox"
import ProjectList from "./Projectlist"
import type { Project as ProjectType} from "./Project";
import Showbox from "./Showbox";
import Formkomp from "./Formkomp";
import { ofetch } from "ofetch";

export default function Mainkomp() {
  const [pressed,setPressed]=useState(true);
  
  const [Projectlist, setprojectlist]= useState<ProjectType[]>([]);

   const [project, setproject] = useState<ProjectType>(Projectlist[0]);
 

   const initializeData = () => {
    console.log("data fetching");
    ofetch("http://localhost:3000/projects").then(
      (projects: {data: ProjectType[] })=> {
        console.log("data fetched");
      setprojectlist(projects.data)
      console.log("projects data:");
      console.log(projects.data);
      console.log("projectlist:");
      console.log(Projectlist);
      console.log("data initialized");
    }
  
  );
   

  }
  useEffect(() => {
    let ignore = false;

  if (!ignore) {
    initializeData();
    console.log('useEffect kjørt');
  }

  return () => {
    ignore = true;
  };
   }, []);
  


  function press() {
    if (pressed == true) setPressed(false);
     else setPressed(true)
  }

 



  const addingproject = (newprojcet : ProjectType) =>{
    setprojectlist((Projectlist)=> [...Projectlist,newprojcet,]);
  };

  const onAddproject = (value: { value: number }) => {
		setproject((Projectlist[value.value]));
  };

  const showboxcomponent = pressed ? <Projectbox {...project}></Projectbox> : <Formkomp Addproject={addingproject} projects={project}/>;

    
    return (
    <main className="gridmain">
    <>
    <section className="griditem">
        
            <h2>projects</h2>
            <ul id="projectList">
            {Projectlist?.map((projcet) => (
                  <li key={projcet.id} onClick={() => setproject((Projectlist[projcet.id])) }>{projcet.tittle} {projcet.date}</li>
				))}
            </ul>
        </section>
    
    <Showbox children={showboxcomponent}></Showbox>
    <button onClick={press}></button>
    </>
    </main>  
    )
  }



