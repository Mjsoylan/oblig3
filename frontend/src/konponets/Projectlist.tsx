import { useState } from "react";
import type { Project as ProjectProps} from "./Project";


type projectListprops={
    projects: ProjectProps[]
    onAddproject: ({value}: { value:number}) => void;
}





export default function ProjectList(props:projectListprops) {
    const [projects, setprojects] = useState<ProjectProps[]>(props.projects ?? []);
    const {onAddproject}=props;



    const handleSubmit = ( value:number) => {
        onAddproject({value});
	};
   
    return (
        <section className="griditem">
        
            <h2>projects</h2>
            <ul id="projectList">
            {projects?.map((projcet) => (
                  <li  onClick={() => handleSubmit(projcet.id) }>{projcet.tittle} {projcet.date}</li>
				))}
            </ul>
        </section>
    )
  }
