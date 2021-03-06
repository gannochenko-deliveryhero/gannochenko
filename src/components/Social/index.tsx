import React, { FunctionComponent } from 'react';
const facebookLogo = require('./assets/facebook.svg') as string;
const twitterLogo = require('./assets/twitter.svg') as string;
const mediumLogo = require('./assets/medium.svg') as string;
const linkedinLogo = require('./assets/linkedin.svg') as string;
const githubLogo = require('./assets/github.svg') as string;

import { Image } from './style';
import { Props } from './props';

export const Social: FunctionComponent<Props> = ({ type, src }) => {
    let logo = null;
    if (type === 'facebook') {
        logo = facebookLogo;
    } else if (type === 'twitter') {
        logo = twitterLogo;
    } else if (type === 'medium') {
        logo = mediumLogo;
    } else if (type === 'linkedin') {
        logo = linkedinLogo;
    } else if (type === 'github') {
        logo = githubLogo;
    }

    if (!logo) {
        return null;
    }

    if (src) {
        return (
            <a href={src} target="_blank" rel="noreferrer noopener">
                <Image src={logo} />
            </a>
        );
    }

    return <Image src={logo} />;
};
