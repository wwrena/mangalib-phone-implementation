import React from 'react';
import { Image, ImageBackground } from 'react-native';
import { PosterTheme } from '../../styles/MangaPoster';
import { ITitle } from '../../types/ITitle';

type Props = {
    posterLink: string;
    details: ITitle;
};

const MangaPoster: React.FC<Props> = ({ posterLink, details }) => {
    if (details.background) {
        return (
            <ImageBackground
                blurRadius={2}
                source={{ uri: `https://cover.imglib.info/uploads/cover/${details.slug}/background/${details.background}` }}
                style={{ ...PosterTheme.background }}
            >
                <Image style={PosterTheme.poster} source={{ uri: posterLink }} />
            </ImageBackground>
        );
    } else {
        return (
            <ImageBackground blurRadius={3} source={{ uri: details.coverImage }} style={{ width: '100%', height: 300 }}>
                <Image style={PosterTheme.poster} source={{ uri: posterLink }} />
            </ImageBackground>
        );
    }
};

export default MangaPoster;
