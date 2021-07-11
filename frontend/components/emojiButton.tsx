import * as React from 'react';
import { motion } from "framer-motion"
import Lottie from 'react-lottie';

import heart from '../public/emojis/heart.json'
import omg from '../public/emojis/omg.json'
import accurate from '../public/emojis/accurate-100.json'
import claps from '../public/emojis/clap.json'
import cry from '../public/emojis/cry.json'

export default function EmojiButtons() {
    const emojis = [heart, omg, accurate, claps, cry];

    const defaultOptions = () =>
        emojis.map(emoji => ({
            loop: false,
            autoplay: true,
            animationData: emoji,
            rendererSettings: {
                preserveAspectRatio: "xMidYMid slice"
            }
        })).map((animData, i) =>
            <motion.button
                className='w-10 md:w-20 m-4 lg:w-48'
                key={`motion-lottie-emoji-${i}`}
                whileTap={{ scale: 0.9 }}
                whileHover={{
                    scale: 1.2,
                    transition: { duration: 0.1 },
                }}
            >
                <Lottie
                    key={`lottie-emoji-${i}`}
                    isPaused={false}
                    options={animData}
                    isClickToPauseDisabled={true}
                />
            </motion.button>
        )


    return (
        <div className="flex flex-row flex-wrap rounded-full justify-between bg-gradient-to-r m-8 from-green-400 to-blue-500">
            {defaultOptions()}
        </div>
    );
}

