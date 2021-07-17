import heart from '../public/emojis/heart.json'
import omg from '../public/emojis/omg.json'
import accurate from '../public/emojis/accurate-100.json'
import claps from '../public/emojis/clap.json'
import cry from '../public/emojis/cry.json'

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

export default emojis;