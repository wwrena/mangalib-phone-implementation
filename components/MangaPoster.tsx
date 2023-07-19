import React from 'react';
import { Image, ImageBackground } from 'react-native';
import { PosterTheme } from '../styles/MangaPoster';

type Props = {
    posterLink: string;
};

const MangaPoster: React.FC<Props> = ({ posterLink }) => {
    return (
        <ImageBackground blurRadius={6} source={{ uri: posterLink }} style={{ ...PosterTheme.background }}>
            <Image style={PosterTheme.poster} source={{ uri: posterLink }} />
        </ImageBackground>
    );
};

export default MangaPoster;
