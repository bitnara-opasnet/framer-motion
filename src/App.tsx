import styled from "styled-components";
import { motion } from "framer-motion";
import { useRef } from "react";




const Wrapper = styled.div`
    height: 100vh;
    width: 100vw;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const Box = styled(motion.div)`
    width: 200px;
    height: 200px;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    background-color: rgba(255, 255, 255, 0.2);
    border-radius: 15px;
    box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
`;


const Circle = styled(motion.div)`
    background-color: white;
    width: 70px;
    height: 70px;
    border-radius: 50%;
    place-self: center;
    box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);

`;

const BiggerBox = styled.div`
    width: 600px;
    height: 600px;
    background-color: rgba(255, 255, 255, 0.4);
    border-radius: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    /* overflow: hidden; */
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
}


function App() {
    const biggerBoxRef = useRef<HTMLDivElement>(null);
    return (
        <Wrapper>
            {/* motion 사용방법 */}
            {/* <motion.div></motion.div>  */}
            {/* <Box
                transition={{ type: "spring", bounce: 0.5, delay: 0.5 }}
                initial={{ scale: 0 }} //시작지점
                animate={{ scale: 1, rotateZ: 360 }} //끝지점
            /> */}

            {/* variants */}
            <Box variants={myVars} initial="start" animate="end" />

            <Box variants={boxVars} initial="start" animate="end">
                <Circle variants={circleVars}/>
                <Circle variants={circleVars}/>
                <Circle variants={circleVars}/>
                <Circle variants={circleVars}/>
            </Box>

            {/* Gestures, Drag */}
            <BiggerBox ref={biggerBoxRef}>
                <Box 
                    variants={gesturesVars}
                    whileHover="hover"
                    whileTap="click"
                    drag
                    whileDrag="drag"
                    dragSnapToOrigin //원래자리로 돌아감
                    dragElastic={0.5}
                    dragConstraints={biggerBoxRef}
                />
            </BiggerBox> 
        </Wrapper>
    );
}

export default App;
