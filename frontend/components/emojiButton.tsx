
import { motion } from "framer-motion"
import Lottie from 'react-lottie';

import heart from '../public/emojis/heart.json'
import omg from '../public/emojis/omg.json'
import accurate from '../public/emojis/accurate-100.json'
import claps from '../public/emojis/clap.json'
import cry from '../public/emojis/cry.json'


import React, { useState, useEffect } from "react";
import { useSocket } from "use-socketio";

type Props = {
    path: string
    classes?: string
}

export default function EmojiButtons({ path, classes }: Props) {
    const emojis = [{
        name: 'heart',
        data: heart,
        initialSegment: [60, 90]
    }, {
        name: 'omg',
        data: omg,
        initialSegment: [80, 200]
    }, {
        name: 'accurate',
        data: accurate,
        initialSegment: [60, 100]
    }, {
        name: 'claps',
        data: claps,
        initialSegment: [0, 29]
    }, {
        name: 'cry',
        data: cry,
        initialSegment: [30, 138]
    }];

    const { socket, subscribe, unsubscribe } = useSocket("emoji");

    const defaultOptions = () =>
        emojis.map(emoji => ({
            loop: false,
            autoplay: true,
            animationData: emoji.data,
            rendererSettings: {
                preserveAspectRatio: "xMidYMid slice"
            },
            initialSegment: emoji.initialSegment
        })).map((animData, i) => {

            const [paused, setPaused] = useState(false);

            return (
                <motion.button
                    className='w-10 sm:w-12 md:w-20 m-1 lg:w-30'
                    key={`motion-lottie-emoji-${i}`}
                    onClick={() => {
                        socket.emit("emoji", {
                            name: emojis[i].name,
                            path
                        });
                        return paused ? setPaused(p => !p) : ''
                    }}
                    onHoverStart={() => paused ? setPaused(p => !p) : ''}
                    whileTap={{ scale: 0.9 }}
                    whileHover={{
                        scale: 1.2,
                        transition: { duration: 0.1 },
                    }}
                >
                    <Lottie
                        key={`lottie-emoji-${i}`}
                        isStopped={paused}
                        // isPaused={paused}
                        options={animData}
                        isClickToPauseDisabled={true}

                        eventListeners={[{
                            eventName: 'complete',
                            callback: () => setPaused(p => !p),
                        }]}
                    />
                </motion.button >
            )
        })

    return (
        <div className={`flex flex-row flex-wrap rounded-t-3xl justify-around fixed sm:-m-20 bottom-10 lg:bottom-0 border-10 w-screen lg:w-2/3 xl:w-1/3 lg:m-2 bg-light-accent-2 dark:bg-dark-accent-1 lg:bg-transparent ${classes ? classes : ''}`}>
            {defaultOptions()}
        </div >
    );
}