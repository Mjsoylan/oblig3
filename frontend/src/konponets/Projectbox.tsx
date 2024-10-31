
import type { Project as ProjectProps} from "./Project";

export default function projectbox (Props:ProjectProps) {

    const {tittle,img,text,link}=Props;

    return(
        <article>
            <h2 id="projectname">{tittle}</h2>
            <figure>
              <img
                id="image"
                src={img}
                alt="projects photo"
              />
              <figcaption>
                project photo 
              </figcaption>
            </figure>
            <p id="projecttext">
             {text}
            </p>
            <p><a id="link" href={link}>Read more</a></p>
            
           
        </article>
    )
}