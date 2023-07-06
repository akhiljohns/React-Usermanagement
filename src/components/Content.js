import React from "react"


const Content = () => {

    return (
        <>
            <div className="flex  items-center justify-center h-screen bg-black ">
                <div className="flex flex-col items-center justify-center w-1/2">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/2/22/Earth_Western_Hemisphere_transparent_background.png" alt="" className="h-[40rem] "  />
                </div>
                <div className="w-1/2">
                    <p className="text-center font-medium text-white p-5">
                        There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.
                    </p>
                </div>
            </div>
            <div className="flex  items-center justify-center h-screen bg-black ">
                <div className="w-1/2">
                    <p className="text-center font-medium text-white p-5">
                        There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.
                    </p>
                </div>
                <div className="flex flex-col items-center justify-center w-1/2">
                    <img src={require('../eagle-15153.png')} alt="" className="h-[30rem] "  />
                </div>
            </div>
            <div className="flex  items-center justify-center h-screen bg-black ">
                <div className="flex flex-col items-center justify-center w-1/2">
                    <img src= {require('../toppng.com-spiderman-transparent-png-spiderman-transparent-png-spider-man-no-background-1267x646.png')} alt="" className="h-[25rem] "  />
                </div>
                <div className="w-1/2">
                    <p className="text-center font-medium text-white p-5">
                        There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.
                    </p>
                </div>
            </div>
        </>
    )
}

export default Content