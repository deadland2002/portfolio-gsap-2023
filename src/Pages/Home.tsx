import React, {useEffect} from 'react';
import {gsap} from "gsap";
import {ScrollTrigger} from "gsap/ScrollTrigger";
import ScrollToPlugin from "gsap/ScrollToPlugin";
import "../styles/Home.scss"
import LightGrid from "../../Components/LightGrid.tsx";
import ProjectsData from "../../Data/Projects.json"

interface indexIDProp{
    [id:number]:string
}

const indexID:indexIDProp = {
    1:"#heroMain",
    2:"#AboutSec",
    3:"#SkillSec",
    4:"#Projects",
    5:"#contact"
}

function Home() {
    gsap.registerPlugin(ScrollTrigger,ScrollToPlugin);
    useEffect(() => {

        // ScrollTrigger.normalizeScroll(true);


        const setupSectionTimeline = (target:string, options:{repeat?:number,repeatDelay?:number,start?:string,end?:string,scrub?:boolean,markers?:boolean}) => {
            return gsap.timeline({
                repeat: options.repeat ?? 0,
                repeatDelay: options.repeatDelay ?? 0,
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

        // const section2Timeline = setupSectionTimeline(`#Sec_About_Heading`, {
        //     end: "+=200",
        //     markers: false,
        //     start: "top 50%"
        // });
        // section2Timeline.fromTo("#Sec_About_Heading", {
        //     opacity: 0,
        //     x: -20,
        // }, {
        //     opacity: 1,
        //     ease: "linear",
        //     x: 0,
        //     duration: 0.5
        // });

        const spansAbout = document.querySelectorAll('#Sec_About_Heading span');
        if(spansAbout){
            spansAbout.forEach((span) => {
                const spanTimeline = gsap.timeline({
                    scrollTrigger: {
                        trigger: span,
                        start: "top 90%",
                        end: "+=100",
                        markers: false,
                    },
                });

                spanTimeline.fromTo(
                    span,
                    {
                        opacity: 0,
                        x: -20,
                    },
                    {
                        opacity: 1,
                        ease: 'linear',
                        x: 0,
                        duration: 0.5,
                    }
                );
            });
        }








        const cardProjects = document.querySelectorAll('#Projects .card');
        if(cardProjects){
            cardProjects.forEach((span) => {
                const spanTimeline = gsap.timeline({
                    scrollTrigger: {
                        trigger: span,
                        start: "top 80%",
                        end: "+=200",
                        markers: false,
                    },
                });

                spanTimeline.fromTo(
                    span,
                    {
                        opacity: 0,
                        x: -20,
                    },
                    {
                        opacity: 1,
                        ease: 'linear',
                        x: 0,
                        duration: 0.5,
                    }
                );
            });
        }




        const section2TimelineFade = setupSectionTimeline(`.section-${section_id}`, {
            end: "+=300px",
            markers: false,
            scrub: true,
            start: "bottom 50%"
        });
        section2TimelineFade.fromTo("#AboutSec", {
            opacity: 1,
            zIndex: 20,
            y: "0%"
        }, {
            opacity: 0,
            zIndex: -1,
            y: "10%",
            ease: "linear",
        });


        section_id++;


        const section3Timeline = setupSectionTimeline(`.section-${section_id}`, {
            end: "+=30%",
            markers: false,
            start: "top 80%",
            scrub: true,
        });
        section3Timeline.fromTo("#SkillSec", {
            opacity: 0,
            zIndex: 0,
        }, {
            opacity: 1,
            zIndex: 20,
            ease: "linear",
        })


        const section3Timeline2 = setupSectionTimeline(`.section-${section_id}`, {
            end: "+=100%",
            markers: false,
            start: "50% 50%",
            scrub: true,
        });
        section3Timeline2.fromTo("#SkillSec_square", {
            zIndex: 20,
            opacity: 1,
        }, {
            zIndex: 10,
            ease: "power1.inOut",
            opacity: 0,
            duration: 1,
        });


        section_id++;


        const section4Timeline = setupSectionTimeline(`.section-${4}`, {
            end: "+=300px",
            markers: false,
            start: "bottom 50%",
            scrub: true,
        });
        section4Timeline.fromTo("#Projects", {
            opacity: 1,
            zIndex: 20,
        }, {
            opacity: 0,
            zIndex: 10,
            ease: "linear",
        })


        // Cleanup function
        return () => {
            section1Timeline?.scrollTrigger?.kill()
            // section2Timeline?.scrollTrigger?.kill()
            section2TimelineFade?.scrollTrigger?.kill()
            section3Timeline?.scrollTrigger?.kill()
            section3Timeline2?.scrollTrigger?.kill()
            section4Timeline?.scrollTrigger?.kill()
            // Add cleanup for other sections if needed
        };
    }, []);


    const HandleMouseMoveProjects = (event: React.MouseEvent<HTMLDivElement>) => {
        const div = event.currentTarget as HTMLDivElement;

        const span = div.getElementsByClassName("expand")[0] as HTMLSpanElement;
        const reveal = div.getElementsByClassName("cardReveal")[0] as HTMLDivElement;
        const cardInner = div.getElementsByClassName("cardInner")[0] as HTMLDivElement;
        cardInner.style.opacity = "0";

        reveal.style.opacity = "1";

        const {clientX, clientY} = event;
        const divRect = event.currentTarget.getBoundingClientRect();

        const deltaX = Math.floor(clientX - divRect.left);
        const deltaY = Math.floor(clientY - divRect.top);

        const posX = Math.min(deltaX, divRect.width);
        const posY = Math.min(deltaY, divRect.height);
        const normalizedDeltaX = posX >= 0 ? posX : 0;
        const normalizedDeltaY = posY >= 0 ? posY : 0;


        span.style.left = `${normalizedDeltaX}px`
        span.style.top = `${normalizedDeltaY}px`
        span.style.width = "300%"

        console.log(clientY, clientX)
        console.log(deltaY, deltaX)
        console.log(divRect.top, divRect.left)
        // console.log(normalizedDeltaY,normalizedDeltaX)
        console.log("......")
    }


    const HandleMouseOutProjects = (event: React.MouseEvent<HTMLDivElement>) => {
        const div = event.currentTarget as HTMLDivElement;
        const span = div.getElementsByClassName("expand")[0] as HTMLSpanElement;
        const reveal = div.getElementsByClassName("cardReveal")[0] as HTMLDivElement;
        const cardInner = div.getElementsByClassName("cardInner")[0] as HTMLDivElement;
        cardInner.style.opacity = "1";
        reveal.style.opacity = "0";
        span.style.width = "0"
    }


    const HandleScrollPage = (index: number) => {
        console.log(index,indexID[index])
        gsap.to(window, { duration: 1, scrollTo: indexID[index], ease: "power2.inOut" });
    }


    return (
        <>
            <div id={'main_div'}>


                {/*<div id="smooth-wrapper">*/}
                {/*    <div id="smooth-content">*/}


                        <section className="section-1" id={'heroMain'}>
                            <span id="introSpan"
                                  className="fadeOut">
                                Hello World
                            </span>

                            <span
                                className={'btnWhite fadeOut'} onClick={()=>{HandleScrollPage(2)}}>
                                scroll down
                                <img className={'aspect-square w-6'} src={'/gif/arrrow_down.gif'}/>
                            </span>
                        </section>


                        <section className={"section-2"} id={"AboutSec"}>
                            <div className={'wrapper'} id={"AboutSec_Div"}>
                                <div className={'imgWrapper'}>
                                    <img src={'/png/29784.png'} className={'rounded-xl shadow-2xl'}/>
                                </div>
                                <div className={'dataWrapper'} id={'Sec_About_Heading'} >
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


                        <section className={"section-3 p-10"} id={"SkillSec"}>


                            <div className={'wrapper'} id={"SkillSec_square"}>


                                <img src={'/gif/dot_sphere.gif'}/>


                                <span
                                    className={'spanTop'}>
                                    Frontend Development
                                </span>

                                <span
                                    className={'spanBottom'}>
                                    Backend Development
                                </span>

                                <span
                                    className={'spanRight'}>
                                    Deployment
                                </span>

                                <span
                                    className={'spanLeft'}>
                                    Android
                                </span>


                            </div>


                            {/*<div className={'min-h-[300px] flex flex-col gap-4'} id={'Sec_About_Heading'} data-speed={'0.8'}>*/}
                            {/*</div>*/}


                        </section>


                        <section className={"section-4 p-10 bg-white project"} id={"Projects"} >

                            <LightGrid IDElement={"Projects"}/>

                            <div className={'hint'}>
                                <span>hover to reveal</span>
                            </div>

                            <div className={'dataWrapper'}>
                                <div className={'headerWrapper'}>
                                    <h2 className={'text-black z-20'}>Project<span
                                        className={'text-blue-500'}>s</span> :</h2>
                                </div>

                                <div className={'cardwrapper'}>

                                    {
                                        ProjectsData.map((single) => (
                                            <div className={'card'} onMouseMove={HandleMouseMoveProjects}
                                                 onMouseOut={HandleMouseOutProjects} datatype={"parent"}>
                                                <div className={'cardInner'}>
                                                    <span className={'text-black heading'}>{single.Title}</span>
                                                    <div className={'flex flex-col gap-2 justify-between'}>
                                                        <span className={'text-black'}>{single.Desc}</span>
                                                        <span className={'text-black blue'}>{single.year}</span>
                                                    </div>
                                                </div>
                                                <div className={'cardReveal'}>
                                                    <span className={"heading"}>{single.Title}</span>
                                                    <div className={'flex flex-col gap-2 justify-between  flex-1'}>
                                                        <span>{single.TagLine}</span>
                                                        <span className={'blue'}>{single.stack}</span>
                                                    </div>
                                                </div>
                                                <span className={'expand'}></span>
                                            </div>
                                        ))
                                    }

                                </div>
                            </div>

                        </section>


                        <section className={"section-5 relative"} id={"contact"} >
                            <LightGrid IDElement={"contact"}/>


                            <div className={'hint'}>
                                <span>icon contain link</span>
                            </div>



                            <div className={'wrapper'}>
                                <div className={'headingWrapper'}>
                                    <span>Contact<span className={'text-blue-500'}>s</span></span>
                                </div>
                                <div className={'detailsWrapper'}>
                                    <div className={'left'}>
                                        <div className={'fields'}>
                                            <a href={"mailto:satvikshukla453@gmail.com"}>
                                                <i className="fi fi-rr-envelope"></i>
                                            </a>
                                            <span className={'blue'}>satvikshukla453@gmail.com</span>
                                        </div>

                                        <div className={'fields'}>
                                            <a href={"https://github.com/deadland2002"} target={"_blank"}>
                                                <i className="fi fi-brands-github"></i>
                                            </a>
                                            <span className={'blue'}>deadland2002</span>
                                        </div>

                                        <div className={'fields'}>
                                            <a href={"https://www.linkedin.com/in/satvik-shukla-a758791b1/"} target={"_blank"}>
                                                <i className="fi fi-brands-linkedin"></i>
                                            </a>
                                            <span className={'blue'}>satvik-shukla-a758791b1</span>
                                        </div>

                                        <div className={'fields'}>
                                            <a href={"https://twitter.com/satvikshukla453"} target={"_blank"}>
                                                <i className="fi fi-brands-twitter"></i>
                                            </a>
                                            <span className={'blue'}>@satvikshukla453</span>
                                        </div>

                                        <div className={'fields'}>
                                            <a className={'flex gap-[20px] items-center'} href={"/pdf/resume.pdf"} download={true}>
                                                <i className="fi fi-rr-document"></i>
                                                <span className={'blue'}>Résumé</span>
                                            </a>
                                        </div>
                                    </div>

                                    <form className={'right'} action="https://formspree.io/f/xjvqpqeb" method="POST">
                                        <div className={'rightHeadingWrapper'}>
                                            <span>Get In Touch</span>
                                        </div>

                                        <div className={'row'}>
                                                <div className={'field'}>
                                                    {/*<span>Name : </span>*/}
                                                    <input type={'text'} name={'Name'} placeholder={'Name'} required={true}/>
                                                </div>

                                                <div className={'field'}>
                                                    {/*<span>Subject : </span>*/}
                                                    <input type={'text'} name={'Subject'} placeholder={'Subject'} required={true}/>
                                                </div>
                                        </div>


                                        <div className={'row flex-1'}>
                                            <div className={'field flex-1'}>
                                                {/*<span>Name : </span>*/}
                                                <textarea name={'Message'} placeholder={'Message'} required={true}/>
                                            </div>
                                        </div>

                                        <div className={'row justify-center'}>
                                            <button>Send</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </section>
                    </div>
            {/*    </div>*/}

            {/*</div>*/}
        </>
    );
}

export default Home;
