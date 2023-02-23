'use client';
import style from './Collage.module.css';
import { useEffect, useState } from 'react';
import { Picture } from '../Picture/Picture';

const PICTURES_FOLDER_SRC = '../../../pictures/';
// const getRandomInt = (max) => {
//     return Math.floor(Math.random() * max);
// }

const random = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

const dividingCanvas = (arrayPictures, numberOfPictures) => {
    if (arrayPictures.length !== numberOfPictures) {
        let numberOfParts = 10
        let partSize;
        let divider = random(3, numberOfParts - 3);
        let indexDivisible;
        let newPicture;
        let tempPicture = {
            height: 0,
            width: 0,
            x: 0,
            y: 0,
        };

        if (arrayPictures.length !== 1) {
            arrayPictures.forEach((picture, index) => {
                if (picture.width * picture.height > tempPicture.width * tempPicture.height) {
                    tempPicture = picture;
                    indexDivisible = index;
                }
            });
        }
        else {
            indexDivisible = 0;
        }

        if (arrayPictures[indexDivisible].width >= arrayPictures[indexDivisible].height) {
            partSize = arrayPictures[indexDivisible].width / numberOfParts;
            newPicture = {
                height: arrayPictures[indexDivisible].height,
                width: arrayPictures[indexDivisible].width - (partSize * divider),
                x: arrayPictures[indexDivisible].x,
                y: arrayPictures[indexDivisible].y + partSize * divider,
            }
            arrayPictures[indexDivisible].width = partSize * divider;

            arrayPictures.push(newPicture);
        }
        else {
            partSize = arrayPictures[indexDivisible].height / numberOfParts;
            newPicture = {
                height: arrayPictures[indexDivisible].height - (partSize * divider),
                width: arrayPictures[indexDivisible].width,
                x: arrayPictures[indexDivisible].x + partSize * divider,
                y: arrayPictures[indexDivisible].y,
            }
            arrayPictures[indexDivisible].height = partSize * divider;

            arrayPictures.push(newPicture);
        }

        if (arrayPictures.length !== numberOfPictures) {
            dividingCanvas(arrayPictures, numberOfPictures);
        }
    }
    return arrayPictures;
}

function importAllImages() {
    console.log('test')
}


export const Collage = ({ height, width }) => {
    const [pictures, setPictures] = useState(<div></div>);
    const numberOfPictures = 29;


    useEffect(() => {
        console.log(height);
        console.log(width);
        if (height > 0 && width > 0) {
            let arrayPictures = dividingCanvas([{ height: height, width: width, x: 0, y: 0 }], numberOfPictures);
            let arrayImages = importAllImages();
            console.log(arrayImages)
            setPictures(arrayPictures.map((picture, index) => {
                return (
                    <Picture
                        width={picture.width}
                        height={picture.height}
                        positionX={picture.x}
                        positionY={picture.y}
                        index={index}
                        // pictureSrc = 
                        key={index}
                    />
                )
            }))
        }
    }, [height, width]);

    return (
        <div className={style.collage}>
            {pictures}
        </div>
    );
}
