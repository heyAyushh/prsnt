import { motion, AnimatePresence } from 'framer-motion';
import { useState, ReactDOM, forwardRef, Ref, useImperativeHandle } from 'react';
import Lottie from 'react-lottie';
import emojis from '../components/emojis';
import { v4 as uuidv4 } from 'uuid';
import { useWindowSize } from 'rooks';

interface Size {
    innerWidth: number | null;
    innerHeight: number | null;
}

interface Props {
    classes?: string,
    isVisible?: Boolean
}

interface emo {
    name: string,
    animationData: any,
    initialSegment: any,
    loop: Boolean,
    autoplay: Boolean,
    rendererSettings: {
        preserveAspectRatio: "xMidYMid slice"
    },
    key: any
}

const fly = forwardRef(({ classes, isVisible = true }: Props, ref) => {

    const size: Size = useWindowSize();

    const random = () => Math.random();

    const [paused, setPaused] = useState(false);
    const [emo, setEmo] = useState<emo[] | []>([]);

    const addEmoji = (emEvent: any) => {

        console.log(emEvent)
        emEvent = emojis.filter(e => e.name === emEvent.name).map(emoji => ({
            name: emoji.name,
            animationData: emoji.data,
            initialSegment: emoji.initialSegment,
            loop: true,
            autoplay: true,
            rendererSettings: {
                preserveAspectRatio: "xMidYMid slice"
            },
            key: uuidv4()
        }));

        const newEmo = emo.concat(...emEvent)

        setEmo(newEmo)
    }

    useImperativeHandle(ref, () => {
        return {
            addEmoji: addEmoji
        };
    });

    return (
        <div className={`${classes ? classes : ''}`}>
            <AnimatePresence>
                {isVisible && emo.map((animdata, i) =>
                    <motion.div
                        className='h-16 w-16 mx-1 absolute bottom-0'
                        animate={{
                            scale: [1, 0.9, 0.8, 0.7, 0.9, 0.8, 1],
                            borderRadius: ["20%", "20%", "50%", "50%", "20%"],
                            y: 0,
                            x: 0,
                            opacity: 0.005,
                            translateX: [-90, 0, -90, 0, -90, 0, -90, 0, -90, 0, -90],
                            display: 'block'
                        }}

                        transition={{
                            delay: i * 0.3,
                            repeatDelay: 1,
                            type: "tween",
                            duration: 10,
                        }}

                        initial={{
                            y: size.innerHeight ? size.innerHeight : 400,
                            display: 'none',
                            x: size.innerWidth ? (size.innerWidth / 4) - (random() < 0.5 ? random() * -30 : random() * 30) : 400
                        }}

                        onAnimationComplete={definition => {
                            setEmo(emo.filter(em => animdata.key != em.key))
                        }}

                        key={animdata.key}

                        onHoverStart={() => paused ? setPaused(p => !p) : ''}
                    >
                        <Lottie
                            key={animdata.key}
                            isStopped={paused}
                            // @ts-ignore
                            options={animdata}
                            isClickToPauseDisabled={true}
                            eventListeners={[{
                                eventName: 'complete',
                                callback: () => setPaused(p => !p),
                            }]}
                        />
                    </motion.div >
                )}
            </AnimatePresence>
        </div>
    )
})

export default fly;