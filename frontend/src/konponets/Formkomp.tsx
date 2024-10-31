import { FormEvent } from "react";
import type { Project as ProjectProps} from "./Project";




type projectListprops={
  projects: ProjectProps
  Addproject: (projects: ProjectProps) => void;

}



export default function Formkomp(props:projectListprops) {

  const {Addproject} = props;
  const handleSubmit = (Event : FormEvent<HTMLFormElement>) => {
    Event.preventDefault();
    const form = Event.target as HTMLFormElement | null;
    

    if (!form) return;
    const formData = new FormData(form);
    const projectid =Math.random();
    console.log(projectid)
    const projectname =formData.get("projectName")
    if (!projectname || typeof projectname !== "string") return;
    const projectInfo =formData.get("projectInfo")
    if (!projectInfo || typeof projectInfo !== "string") return;
    const projectlink =formData.get("link")
    if (!projectlink || typeof projectlink !== "string") return;
    const projectdate =formData.get("date")
    if (!projectdate || typeof projectdate !== "string") return;

    const value: ProjectProps = {id:projectid,text:projectInfo,tittle:projectname,link:projectlink,date:projectdate,img:""}
    //addproject.id=crypto.randomUUID();
    Addproject(value)
    console.log(value)
    form.reset
  }


    return (
      <section>
       <form onSubmit={handleSubmit}>
    
          <label htmlFor="projectName">
          projectName:
            <input type="text" id="projectName" name="projectName"/>
          </label>
          <label htmlFor="projectInfo">
          projectInfo
            <input type="text" id="projectInfo" name="projectInfo"/>
          </label>
          <label htmlFor="link">
            liink:
            <input type="text" id="link" name="link"/>
          </label>
           <label htmlFor="date">
            date:
              <input type="date" id="date" name="date"/>
           </label>
                       
          <button type="submit">Legg til</button>
        </form>
      </section>
    );
}