import React, {useEffect, useState} from 'react';

function LightGrid({ IDElement }: { IDElement:string }) {
    const [rows, setRows] = useState<number>(0);
    const [cols, setCols] = useState<number>(0);
    const [sizeOfDot] = useState<number>(50);
    const [mousePositions, setMousePositions] = useState<{ [key: string]: { x: number; y: number } }>({});


    const resizeFunction = (window: Window)=>{
        if(IDElement){
            const {innerWidth} = window;
            const innerHeight = document.getElementById(IDElement)?.clientHeight
            if(innerHeight){
                setCols(Math.floor(innerWidth / sizeOfDot));
                setRows(Math.floor(innerHeight / sizeOfDot));
            }
        }
    }


    useEffect(() => {
        window.addEventListener('resize', (e) => {
            resizeFunction(e.target as Window);
        });

        resizeFunction(window);

        return () => {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            window.removeEventListener('resize', resizeFunction);
        };
    }, []);

    const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>, index: string , RowIndex:number,ColIndex:number) => {
        const {clientX, clientY} = event;
        const divRect = event.currentTarget.getBoundingClientRect();
        const centerX = divRect.left + divRect.width / 2;
        const centerY = divRect.top + divRect.height / 2;

        const deltaX = clientX - centerX;
        const deltaY = clientY - centerY;

        const distance = Math.sqrt(deltaX ** 2 + deltaY ** 2);
        const maxDistance = Math.min(divRect.width / 2, divRect.height / 2);

        const normalizedDistance = Math.min(distance, maxDistance);
        const normalizedDeltaX = (deltaX / distance) * normalizedDistance;
        const normalizedDeltaY = (deltaY / distance) * normalizedDistance;

        const Obj = {
            [index]: {
                x: normalizedDeltaX,
                y: normalizedDeltaY,
            }
        }


        if(!RowIndex && !ColIndex){
            console.log("entered")
            console.log(index,normalizedDeltaX,normalizedDeltaY)
            return {normalizedDeltaX , normalizedDeltaY};
        }else{
            console.log("called")
            const index1 = `${RowIndex+1}-${ColIndex+1}`;
            const index2 = `${RowIndex+1}-${ColIndex}`;
            const index3 = `${RowIndex}-${ColIndex+1}`;
            const index4 = `${RowIndex-1}-${ColIndex-1}`;
            const index5 = `${RowIndex-1}-${ColIndex+1}`;
            const index6 = `${RowIndex-1}-${ColIndex}`;
            const index7 = `${RowIndex}-${ColIndex-1}`;
            const index8 = `${RowIndex+1}-${ColIndex-1}`;
            const stretchDist = 20;
            Obj[index1]={
                x:-stretchDist,
                y:-stretchDist
            }
            Obj[index2]={
                x:0,
                y:-stretchDist
            }
            Obj[index3]={
                x:-stretchDist,
                y:0
            }
            Obj[index4]={
                x:stretchDist,
                y:stretchDist
            }
            Obj[index5]={
                x:-stretchDist,
                y:stretchDist
            }
            Obj[index6]={
                x:0,
                y:stretchDist
            }
            Obj[index7]={
                x:stretchDist,
                y:0
            }
            Obj[index8]={
                x:stretchDist,
                y:-stretchDist
            }
        }


        setMousePositions((prevPositions) => ({
            ...prevPositions, ...Obj
        }));
    };

    const handleMouseLeave = (index: string, RowIndex:number,ColIndex:number) => {
        const Obj = {
            [index]: {
                x: 0,
                y: 0,
            }
        }

        const index1 = `${RowIndex+1}-${ColIndex+1}`;
        const index2 = `${RowIndex+1}-${ColIndex}`;
        const index3 = `${RowIndex}-${ColIndex+1}`;
        const index4 = `${RowIndex-1}-${ColIndex-1}`;
        const index5 = `${RowIndex-1}-${ColIndex+1}`;
        const index6 = `${RowIndex-1}-${ColIndex}`;
        const index7 = `${RowIndex}-${ColIndex-1}`;
        const index8 = `${RowIndex+1}-${ColIndex-1}`;

        Obj[index1]={
            x:0,
            y:0
        }
        Obj[index2]={
            x:0,
            y:0
        }
        Obj[index3]={
            x:0,
            y:0
        }
        Obj[index4]={
            x:0,
            y:0
        }
        Obj[index5]={
            x:0,
            y:0
        }
        Obj[index6]={
            x:0,
            y:0
        }
        Obj[index7]={
            x:0,
            y:0
        }
        Obj[index8]={
            x:0,
            y:0
        }

        setMousePositions((prevPositions) => ({
            ...prevPositions,
            ...Obj,
        }));
    };

    return (
        <div className={'flex flex-col absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2'}>
            {Array.from({length: rows}).map((_, rowIndex) => {
                return (
                    <div key={rowIndex} className={'flex'}>
                        {Array.from({length: cols}).map((_, colIndex) => {
                            const index = `${rowIndex}-${colIndex}`;
                            return (
                                <div
                                    key={colIndex}
                                    className={'text-black flex justify-center items-center'}
                                    style={{aspectRatio: 1, width: sizeOfDot}}
                                    onMouseMove={(e) => handleMouseMove(e, index,rowIndex,colIndex)}
                                    onMouseLeave={() => handleMouseLeave(index,rowIndex,colIndex)}
                                >
                                  <span
                                      className={'block w-2 aspect-square rounded-full bgInteractiveDots'}
                                      style={{
                                          transform: `translate(${mousePositions[index]?.x}px, ${mousePositions[index]?.y}px)`,
                                          transition: "all .3s",
                                          backgroundColor : "#D1D5DB"
                                      }}
                                  ></span>
                                </div>
                            );
                        })}
                    </div>
                );
            })}
        </div>
    );
}

export default LightGrid;
