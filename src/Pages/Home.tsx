import React, {useEffect, useState} from 'react';
import {gsap} from "gsap";
import {ScrollTrigger} from "gsap/ScrollTrigger";
import {ScrollSmoother} from "gsap-trial/ScrollSmoother";
import anime from 'animejs/lib/anime.es.js';
import "../styles/Home.scss"
import LightGrid from "../../Components/LightGrid.tsx";

function Home(props) {
    gsap.registerPlugin(ScrollTrigger, ScrollSmoother);
    const animationRef = React.useRef(null);
    const [imageUrl,setImageUrl] = useState<string>(undefined);

    const HandleFocusImage = (ID) =>{
        if(ID==1){
            setImageUrl("/jpg/next_bg.jpg")
        }
    }


    useEffect(() => {

        // ScrollTrigger.normalizeScroll(true);


        ScrollSmoother.create({
            smooth: 1,
            effects: true,
            smoothTouch: 0.1,
        });


        const setupSectionTimeline = (target, options) => {
            return gsap.timeline({
                repeat : options.repeat ?? 0,
                repeatDelay : options.repeatDelay?? 0,
                scrollTrigger: {
                    trigger: target,
                    start: options.start || "top top",
                    end: options.end || "+=300",
                    scrub: options.scrub || false,
                    markers: options.markers || false,
                    refreshPriority: -1,
                }
            });
        };

        let section_id = 1;

        const section1Timeline = setupSectionTimeline(`.section-${section_id}`, {
            end: "+=600",
            markers: false,
            scrub: true
        });
        section1Timeline.fromTo(".section-1 > span", {
            opacity: 1,
            zIndex: 20,
        }, {
            opacity: 0,
            zIndex: -1,
            ease: "linear",
        });

        section_id++;

        const section2Timeline = setupSectionTimeline(`.section-${section_id}`, {
            end: "+=200",
            markers: false,
            start: "top 50%"
        });
        section2Timeline.fromTo("#Sec_About_Heading", {
            opacity: 0,
            x: -20,
        }, {
            opacity: 1,
            ease: "linear",
            x:0,
            duration:0.5
        });



        const section2TimelineFade = setupSectionTimeline(`.section-${section_id}`, {
            end: "+=50%",
            markers: false,
            scrub: true,
            start :"80% 50%"
        });
        section2TimelineFade.fromTo("#AboutSec", {
            opacity: 1,
            zIndex: 20,
            y:"0%"
        }, {
            opacity: 0,
            zIndex: -1,
            y:"10%",
            ease: "linear",
        });




        section_id++;





        const section3Timeline = setupSectionTimeline(`.section-${section_id}`, {
            end: "+=30%",
            markers: false,
            start: "top 80%",
            scrub:true,
        });
        section3Timeline.fromTo("#SkillSec", {
            opacity:0,
            zIndex:0,
        },{
            opacity:1,
            zIndex:20,
            ease: "linear",
        })


        const section3Timeline2 = setupSectionTimeline(`.section-${section_id}`, {
            end: "+=100%",
            markers: false,
            start: "50% 50%",
            scrub:true,
        });
        section3Timeline2.fromTo("#SkillSec_square", {
            zIndex: 20,
            position: "fixed", // Set the position to fixed
            top: "100px", // Set the initial top position
            opacity: 1,
        }, {
            zIndex: 10,
            ease: "power1.inOut",
            top: "50%", // Adjust as needed
            opacity: 0,
            duration: 2,
        });


        // Cleanup function
        return () => {
            section1Timeline.scrollTrigger.kill();
            section2Timeline.scrollTrigger.kill();
            section2TimelineFade.scrollTrigger.kill();
            // Add cleanup for other sections if needed
        };
    }, []);




    const HandleMouseMoveProjects = (event: React.MouseEvent<HTMLDivElement>) =>{
        const div = event.currentTarget as HTMLDivElement;

        const span = div.getElementsByClassName("expand")[0] as HTMLSpanElement;
        const reveal = div.getElementsByClassName("cardReveal")[0] as HTMLDivElement;

        reveal.style.opacity = "1";

        const {clientX, clientY} = event;
        const divRect = event.currentTarget.getBoundingClientRect();

        const deltaX = Math.floor(clientX - divRect.left);
        const deltaY = Math.floor(clientY - divRect.top);

        const posX = Math.min(deltaX, divRect.width);
        const posY = Math.min(deltaY, divRect.height);
        const normalizedDeltaX =  posX >= 0 ? posX : 0 ;
        const normalizedDeltaY = posY >= 0 ? posY : 0;


        span.style.left = `${normalizedDeltaX}px`
        span.style.top = `${normalizedDeltaY}px`
        span.style.width = "200%"

        console.log(clientY,clientX)
        console.log(deltaY,deltaX)
        console.log(divRect.top,divRect.left)
        // console.log(normalizedDeltaY,normalizedDeltaX)
        console.log("......")
    }



    const HandleMouseOutProjects = (event: React.MouseEvent<HTMLDivElement>) =>{
        const div = event.currentTarget as HTMLDivElement;
        const span = div.getElementsByClassName("expand")[0] as HTMLSpanElement;
        const reveal = div.getElementsByClassName("cardReveal")[0] as HTMLDivElement;
        reveal.style.opacity = "0";
        span.style.width = "0"
    }

    return (
        <>
            <div id={'main_div'}>


                <div id="smooth-wrapper">
                    <div id="smooth-content">








                        <section className="relative section-1 z-10 flex justify-center items-center">
                        <span id="introSpan" data-speed={"0.5"}
                              className="text-[8vw] fadeOut">
                            Hello World
                        </span>

                            <span className={'flex gap-2 absolute bottom-10 left-1/2 -translate-x-1/2 bg-white text-black rounded-3xl px-5 py-1 fadeOut'}>
                                scroll down
                                <img className={'aspect-square w-6'} src={'/gif/arrrow_down.gif'} />
                            </span>
                        </section>











                        <section className={"section-2 relative"} id={"AboutSec"}>
                            <div className={'bg-white flex items-center box-border justify-between p-6 gap-4 z-20 min-h-[100vh]'} id={"AboutSec_Div"}>
                                <div className={'w-[40%] flex justify-center'} data-speed={'0.9'}>
                                    <img src={'/png/29784.png'} className={'rounded-xl shadow-2xl'}/>
                                </div>
                                <div className={'min-h-[300px] flex w-[60%] flex-col gap-4 box-border p-6'} id={'Sec_About_Heading'} data-speed={'0.9'}>
                                    <div className={'flex gap-2'}>
                                        <span className={'text-black text-5xl'}>About</span>
                                        <span className={'text-blue-500 text-5xl'}>Me</span>
                                    </div>
                                    <span className={'text-black'}>
                                    Greetings! I'm Satvik Shukla, a passionate full-stack developer based in the vibrant tech landscape of India. With over three years of hands-on experience, my journey has been a thrilling exploration of the digital realm, fueled by a love for creating seamless and innovative solutions.
                                </span>
                                    <span className={'text-black'}>
                                    On the frontend, I specialize in crafting captivating user experiences using technologies like React, Next.js, and React Native. From responsive web applications to cross-platform mobile solutions, I thrive on turning ideas into interactive and visually stunning realities.
                                </span>

                                    <span className={'text-black'}>
                                    The backend is my playground, where I wield the power of Node.js to build robust and scalable server-side applications. I'm well-versed in connecting the dots and ensuring a smooth flow of data, whether it's in the form of APIs or real-time communication.
                                </span>

                                    <span className={'text-black'}>
                                    In the database realm, I navigate through PostgreSQL, MongoDB, and SQL, orchestrating the perfect symphony of structured and unstructured data. My proficiency extends to cloud environments, with AWS and Cloudflare being integral parts of my toolkit.
                                </span>
                                </div>
                            </div>
                        </section>












                        <section className={"section-3 p-10"} id={"SkillSec"} style={{backgroundImage:`url('${imageUrl}')`}} data-speed={'1.1'}>


                            <div className={'wrapper'} data-speed={'1'} id={"SkillSec_square"}>


                                <img src={'/gif/dot_sphere.gif'} />



                                <span className={'absolute top-0 text-3xl hover:bg-gray-800 w-fit px-4 py-2 rounded transition-all duration-300 cursor-pointer'} >
                                    Frontend Development:
                                </span>

                                <span className={'absolute left-0 text-3xl hover:bg-gray-800 w-fit px-4 py-2 rounded transition-all duration-300 cursor-pointer'}>
                                    Backend Development:
                                </span>

                                <span className={'absolute right-0 text-3xl hover:bg-gray-800 w-fit px-4 py-2 rounded transition-all duration-300 cursor-pointer'}>
                                    Cloud Services:
                                </span>

                                <span className={'absolute bottom-0 text-3xl hover:bg-gray-800 w-fit px-4 py-2 rounded transition-all duration-300 cursor-pointer'}>
                                    Android
                                </span>


                            </div>


                            {/*<div className={'min-h-[300px] flex flex-col gap-4'} id={'Sec_About_Heading'} data-speed={'0.8'}>*/}
                            {/*</div>*/}



                        </section>








                        <section className={"section-4 p-10 bg-white project"} id={"Projects"} data-speed={'1.1'}>

                            <LightGrid />

                            <div className={'flex flex-col w-full h-full gap-20'}>
                                <div className={'flex'}>
                                    <h2 className={'text-black text-6xl z-20'}>Projects :</h2>
                                </div>

                                <div className={'cardwrapper'}>

                                    {
                                        Array.from({length: 6}).map((single)=>(
                                            <div className={'card'} onMouseMove={HandleMouseMoveProjects} onMouseOut={HandleMouseOutProjects} datatype={"parent"}>
                                                <div className={'cardInner'}>
                                                    <span className={'text-black text-3xl'}>Ignitia</span>
                                                    <span className={'text-black'}> served as a frontend developer at SenseOriginal, a startup specializing in NFC-based applications against counterfeits</span>
                                                </div>
                                                <div className={'cardReveal'}>
                                                    <span className={'text-3xl'}>Stack Used : </span>
                                                    <span className={''}>Used NextJs as the SSG for the website along with Postman for API management and Cloudinary for Image management</span>
                                                </div>
                                                <span className={'expand'}></span>
                                            </div>
                                        ))
                                    }

                                </div>
                            </div>

                        </section>
                    </div>
                </div>

            </div>
        </>
    );
}

export default Home;
