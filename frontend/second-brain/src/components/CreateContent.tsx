export function CreateContent({open}){
    <div>
            {
               open && <div className="w=screen h-screen bg-slate-500 fixed top-0 left-0 opacity-60 flex justify-center">
                    <div className="flex flex-col justify-center">
                    </div>
                </div>

            }
        </div>
}