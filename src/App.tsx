import styled from "styled-components";
import { motion, AnimatePresence  } from "framer-motion";
import { useState } from "react";


const Wrapper = styled(motion.div)`
    height: 100vh;
    width: 100vw;
    display: flex;
    justify-content: space-around;
    align-items: center;
    background: linear-gradient(135deg, rgb(238, 0, 153), rgb(221, 0, 238));
    flex-direction: column;
`;

const Grid = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    width: 50vw;
    gap: 10px;
`;

const GridBox = styled(motion.div)`
    background-color: rgba(255, 255, 255, 0.5);
    border-radius: 10px;
    height: 200px;
    /* width: 400px; */
    box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
    display: grid;
    place-items: center;
`;


const Circle = styled(motion.div)`
    background-color: white;
    width: 70px;
    height: 70px;
    border-radius: 50%;
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

const Btn = styled(motion.button)`
    width: 100px;
    height: 50px;
    border-radius: 5px;
    border: none;
    color: rgb(48, 48, 205);
    font-size: 24px;
    display: block;
    margin-left: 90%;
`;


const BtnVars = {
    click: {scale: 1.2, color: "rgb(255, 165, 0)"},
};

const HoverVars = {
    hover: (i: string) => ({
        originX: i === "4" ? 0 : ( i === "1" ? 1 : 0 ),
        originY: i === "4" ? 0 : ( i === "1" ? 1 : 0 ),
        scale: i === "4" ? 1.2 : ( i === "1" ? 1.2 : 1 ),
        
    }),
};

function App() {
    const [id, setId] = useState<null|string>(null);
    const [clicked, setClicked] = useState(false);
    const switchCircle = () => setClicked((prev) => !prev);

    return (
        <Wrapper>

            <AnimatePresence custom={id? id : null}>
                <Grid>
                    {["1", "2", "3", "4"].map((i) => (
                        <GridBox 
                            custom={i}
                            variants={HoverVars}
                            whileHover="hover"
                            onClick={() => setId(i)}
                            key={i}
                            layoutId={i}
                        >
                            {!clicked && i === "2"? <Circle layoutId="circle" /> : null}
                            {clicked && i === "3"? <Circle layoutId="circle" /> : null}
                        </GridBox>
                    ))}
                    <Btn
                        variants={BtnVars}
                        whileTap="click"
                        onClick={switchCircle}
                    >
                        switch
                    </Btn>
                </Grid>
                {id ? (
                <Overlay 
                    onClick={() => setId(null)}
                    initial={{backgroundColor: "rgba(0, 0, 0, 0)"}} 
                    animate={{backgroundColor: "rgba(0, 0, 0, 0.5)", transition: {duration: 0.5}}} 
                    exit={{backgroundColor: "rgba(0, 0, 0, 0)", transition: {duration: 0.5}}}
                >
                    <GridBox layoutId={id} style={{width: 400, height:200, backgroundColor: "white"}}/>
                </Overlay>
                ) : null}
        
            </AnimatePresence>
        </Wrapper>
    );
}

export default App;
