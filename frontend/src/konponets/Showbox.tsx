import { PropsWithChildren } from "react";



export default function Showbox (Props:PropsWithChildren) {
     const {children}=Props
   // const {tittle,img,text,link}=Props;
    return(
        <section className="griditem">
        {children}
    </section>
    )
}