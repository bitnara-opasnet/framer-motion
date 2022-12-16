import styled from "styled-components";
import { motion, useMotionValue, useTransform, useScroll, AnimatePresence  } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { registerables } from "chart.js";




const Wrapper = styled(motion.div)`
    height: 100vh;
    width: 100vw;
    display: flex;
    /* justify-content: center; */
    justify-content: space-around;
    align-items: center;
    /* background: linear-gradient(135deg, rgb(238, 0, 153), rgb(221, 0, 238)); */
    flex-direction: column;

`;

const Box = styled(motion.div)`
    width: 200px;
    height: 200px;
    /* display: grid;
    grid-template-columns: repeat(2, 1fr); */
    /* background-color: rgba(255, 255, 255, 0.2); */
    background-color: rgb(255, 255, 255);
    border-radius: 15px;
    box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
    /* position: absolute; */
    /* top: 100px; */
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 20px;
`;


const Circle = styled(motion.div)`
    /* background-color: white; */
    background-color: #00a5ff;
    width: 70px;
    height: 70px;
    border-radius: 50%;
    /* place-self: center; */
    box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
`;

const BiggerBox = styled.div`
    width: 400px;
    height: 400px;
    background-color: rgba(255, 255, 255, 0.4);
    border-radius: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    /* overflow: hidden; */
`;


const Svg = styled.svg`
    width: 300px;
    height: 300px;
    /* color: wheat; */
    path {
        stroke: white;
        stroke-width: 2;
    }
`;


const Grid = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    width: 50vw;
    gap: 10px;
    div:first-child,
    div:last-child {
        grid-column: span 2;
    }
`;

const GridBox = styled(motion.div)`
    background-color: rgba(255, 255, 255, 1);
    border-radius: 40px;
    height: 200px;
    box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
`;

const Overlay = styled(motion.div)`
    width: 100%;
    height: 100%;
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
`;

// variants : 컴포넌트가 가질 수 있는 미리 정의된 state
const myVars = {
    start: {scale: 0},
    end: {scale: 1, rotateZ: 360, transition: {type: "spring", bounce: 0.5, delay: 0.5}}
};

const boxVars = {
    start: {
        opacity: 0,
        scale: 0.5,
    },
    end: {
        opacity: 1,
        scale: 1,
        transition: {
            type: "spring",
            bounce: 0.5,
            duration: 0.5,
            delayChildren: 0.5,
            staggerChildren: 0.2
        }
    }
};

const circleVars = {
    start: {
        opacity: 0,
        y: 10,
    },
    end: {
        opacity: 1,
        y: 0,
    }
};


const gesturesVars = {
    hover: {scale: 1.5, rotateZ: 90},
    click: {scale:1, borderRadius: "50%"},
    drag: {backgroundColor: "rgb(46, 204, 113)", transition: {duration: 3}}
};

const svg = {
    start: {
        pathLength: 0,
        fill: "rgb(255, 255, 255, 0)"
    },
    end: {
        pathLength: 1,
        fill: "rgb(255, 255, 255, 1)",
        // transition: {duration: 2}
    }
};

// const APVars = {
//     entry: {
//         x: 500,
//         opacity: 0,
//         scale: 0,
//     },
//     center: {
//         x: 0,
//         opacity: 1,
//         scale: 1,
//         transition: {duration: 1}
//     },
//     exit: {
//         x: -500,
//         opacity: 0,
//         scale: 0,
//         transition: {duration: 1}
//     },
// };


const APVars = {
    entry: (back: boolean) => ({
        x: back? -500 : 500,
        opacity: 0,
        scale: 0,
    }),
    center: {
        x: 0,
        opacity: 1,
        scale: 1,
        transition: {duration: 1}
    },
    exit: (back: boolean) => ({
        x: back? 500 : -500,
        opacity: 0,
        scale: 0,
        transition: {duration: 1}
    }),
};

function App() {
    // Gestures
    const biggerBoxRef = useRef<HTMLDivElement>(null);

    // MotionValues
    const x = useMotionValue(0);
    const rotateZ = useTransform(x, [-400, 400], [-360, 360]);
    const gradient = useTransform(
        x, 
        [-400, 0, 400], 
        [
            "linear-gradient(135deg, rgb(0, 210, 238), rgb(4, 0, 238))",
            "linear-gradient(135deg, rgb(238, 0, 153), rgb(221, 0, 238))",
            "linear-gradient(135deg, rgb(0, 238, 143), rgb(238, 194, 0))"
        ])
    // const scale = useTransform(x, [-400, 0, 400], [2, 1, 0.1]);
    const { scrollYProgress } = useScroll ();
    const scale = useTransform(scrollYProgress, [0, 1], [1, 5]);

    // AnimatePresence
    const [showing, setShowing] = useState(false);
    const toggleShowing = () => setShowing((prev) => !prev);

    const [visible, setVisible] = useState(1);
    const [isBack, setBack] = useState(false);
    const nextPlease = () => {
        setBack(false);
        setVisible((prev) => (prev === 10 ? 10 : prev+1));
    };
    const prevPlease = () => {
        setBack(true);
        setVisible((prev) => (prev === 1 ? 1 : prev-1));
    };

    //layout animation
    const [clicked, setClicked] = useState(false);
    const toggleClicked = () => setClicked((prev) => !prev)

    const [id, setId] = useState<null | string>(null);

    return (
        <Wrapper style={{background: gradient}}>
            {/* motion 사용방법 */}
            {/* <motion.div></motion.div>  */}
            {/* <Box
                transition={{ type: "spring", bounce: 0.5, delay: 0.5 }}
                initial={{ scale: 0 }} //시작지점
                animate={{ scale: 1, rotateZ: 360 }} //끝지점
            /> */}

            {/* variants */}
            {/* <Box variants={myVars} initial="start" animate="end" />

            <Box variants={boxVars} initial="start" animate="end">
                <Circle variants={circleVars}/>
                <Circle variants={circleVars}/>
                <Circle variants={circleVars}/>
                <Circle variants={circleVars}/>
            </Box> */}

            {/* Gestures, Drag */}
            {/* <BiggerBox ref={biggerBoxRef}>
                <Box 
                    variants={gesturesVars}
                    whileHover="hover"
                    whileTap="click"
                    drag
                    whileDrag="drag"
                    dragSnapToOrigin={true} //원래자리로 돌아감
                    dragElastic={0.5} //외부제약조건에서 허용되는 이동정도 0~1
                    dragConstraints={biggerBoxRef}
                />
            </BiggerBox>  */}

            {/* MotionValues */}
            {/* <Box style={{ x, rotateZ, scale }} drag="x" dragSnapToOrigin /> */}

            {/* SVG amination */}{/* https://fontawesome.com/icons/airbnb?s=solid&f=brands */}
            {/* <Svg focusable="false" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                <motion.path
                    // fill="currentColor" 
                    d="M224 373.12c-25.24-31.67-40.08-59.43-45-83.18-22.55-88 112.61-88 90.06 0-5.45 24.25-20.29 52-45 83.18zm138.15 73.23c-42.06 18.31-83.67-10.88-119.3-50.47 103.9-130.07 46.11-200-18.85-200-54.92 0-85.16 46.51-73.28 100.5 6.93 29.19 25.23 62.39 54.43 99.5-32.53 36.05-60.55 52.69-85.15 54.92-50 7.43-89.11-41.06-71.3-91.09 15.1-39.16 111.72-231.18 115.87-241.56 15.75-30.07 25.56-57.4 59.38-57.4 32.34 0 43.4 25.94 60.37 59.87 36 70.62 89.35 177.48 114.84 239.09 13.17 33.07-1.37 71.29-37.01 86.64zm47-136.12C280.27 35.93 273.13 32 224 32c-45.52 0-64.87 31.67-84.66 72.79C33.18 317.1 22.89 347.19 22 349.81-3.22 419.14 48.74 480 111.63 480c21.71 0 60.61-6.06 112.37-62.4 58.68 63.78 101.26 62.4 112.37 62.4 62.89.05 114.85-60.86 89.61-130.19.02-3.89-16.82-38.9-16.82-39.58z" 
                    variants={svg}
                    initial="start"
                    animate="end"
                    transition={{
                        defalt: {duration: 5},
                        fill: {duration: 2, delay: 3},
                    }}
                />
            </Svg > */}

            {/* AnimatePresence */}
            {/* <button onClick={toggleShowing}>Click</button> */}{/*exitBeforeEnter*/}
            {/* <AnimatePresence custom={isBack}> 
                {showing? (
                    <Box 
                        variants={APVars}
                        initial="initial"
                        animate="visible"
                        exit="leaving"
                    />
                ) : null}
                <Box 
                    custom={isBack}
                    variants={APVars}
                    initial="entry"
                    animate="center"
                    exit="exit"
                    key={visible}
                >
                    {visible}
                </Box>
                
            </AnimatePresence>
            <button onClick={prevPlease}>prev</button>
            <button onClick={nextPlease}>next</button> */}

            {/* layout animation */}
            {/* <button onClick={toggleClicked}>click</button> */}
            {/* <Box 
                style={{
                    justifyContent: clicked? "center" : "flex-start",
                    alignItems: clicked? "center" : "flex-start"
                }}
            >
                <Circle />
            </Box> */}

            {/* <Box>{!clicked? <Circle layoutId="circle" style={{borderRadius: 50}} /> : null}</Box>
            <Box>{clicked? <Circle layoutId="circle" style={{borderRadius: 0, scale: 2}} /> : null}</Box> */}

            <Grid>
                {["1", "2", "3", "4"].map((i) => (
                    <GridBox 
                        onClick={() => setId(i)}
                        key={i}
                        layoutId={i}
                    />
                ))}
            </Grid>
            <AnimatePresence>  
                {id ? (
                <Overlay 
                    onClick={() => setId(null)}
                    initial={{backgroundColor: "rgba(0, 0, 0, 0)"}} 
                    animate={{backgroundColor: "rgba(0, 0, 0, 0.5)", transition: {duration: 0.5}}} 
                    exit={{backgroundColor: "rgba(0, 0, 0, 0)", transition: {duration: 0.5}}}
                >
                    <GridBox layoutId={id} style={{width: 300, height:200}}/>
                </Overlay>
                ) : null}
            </AnimatePresence>
            <button>switch</button>

        </Wrapper>
    );
}

export default App;
