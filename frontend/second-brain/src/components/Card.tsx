import { DeleteIcon } from "../icons/DeleteIcon";
import { DocIcon } from "../icons/DocIcon";
import { EditIcon } from "../icons/EditIcon";
import { TwitterIcon } from "../icons/TwiiterIcon";
import { YoutubeIcon } from "../icons/YoutubeIcon";

const add = "?ref_src=twsrc%5Etfw";
interface CardProps{
    id:string,
    title:String,
    link:String,
    type:"twitter"|"youtube"|"document",
    onDelete: (id: string) => void;
}

export default function Card(props:CardProps){
    return (
        <div>
        <div className="p-8 bg-white rounded-md shadow-md border-gray-300 max-w-72 border min-h-48 min-w-72 m-4">
            <div className="flex justify-between">
                <div className="flex items-center text-md" >
                    <div className="text-gray-500 pr-2">
                    {
                        props.type==="youtube" && <YoutubeIcon></YoutubeIcon>
                    }
                    {
                        props.type === "twitter" && <TwitterIcon></TwitterIcon>
                    }
                    {
                        props.type === "document" && <DocIcon></DocIcon>
                    }
                    </div>
                    {props.title}
                </div>
                <div className="flex items-center">
                    <div className="pr-2  text-gray-500">
                        <EditIcon></EditIcon>
                    </div >
                    <div className="pr-2 text-gray-500" onClick={() => props.onDelete(props.id)}>
                    <DeleteIcon></DeleteIcon>
                    </div>
                </div>
            </div>
            <div className="pt-4">
                {
                    props.type==="youtube" && <iframe className="w-full m-2" src={props.link.replace("watch","embed").replace("/v=","/")}
                title="YouTube video player" frameborder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
                }
                {props.type === "twitter" && <blockquote className="twitter-tweet w-full m-2">
                <a href= {props.link.replace("x.com","twitter.com")+{add}}   ></a> 
                </blockquote>}

            </div>
        </div>
        </div>
    )
}