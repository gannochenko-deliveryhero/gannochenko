import React, { FunctionComponent } from 'react';

import { Props } from './type';
import animateScrollTo from 'animated-scroll-to';
import {
    Arrow,
    BackgroundImage,
    Container,
    Data,
    DataColumn,
    GreetingBlock,
    HelloBlock,
    HelloLeft,
    HelloRight,
    ImageOverlay,
    NameBlock,
    SocialBar,
} from './style';
import { Avatar } from '../../../Avatar';
import { Social } from '../../../Social';
import { Copyright } from '../../../Copyright';
import { links } from '../../../../lib/links';

export const HeaderMain: FunctionComponent<Props> = ({ backgroundImage }) => {
    const scrollWindow = () => {
        const data = document.querySelector('.intro-data');
        if (data) {
            const windowScrollTop = window.scrollY || window.pageYOffset;
            const dataRect = data.getBoundingClientRect();
            animateScrollTo(dataRect.top + dataRect.height + windowScrollTop, {
                speed: 1000,
            });
        }
    };

    const timeoutBase = 500;
    const timeoutRight = timeoutBase + 200;
    const timeoutArrow = timeoutRight + 1500;

    return (
        <>
            <Container>
                <BackgroundImage
                    sizes={backgroundImage.childImageSharp.fluid}
                />
                <ImageOverlay />
                <Data className="intro-data">
                    <DataColumn>
                        <HelloBlock>
                            <HelloLeft
                                effect="fade-slide-left"
                                effectTimeout={timeoutBase}
                            >
                                <Avatar />
                            </HelloLeft>
                            <HelloRight>
                                <NameBlock
                                    effect="fade-slide-bottom"
                                    effectTimeout={timeoutRight}
                                >
                                    Sergei Gannochenko
                                </NameBlock>
                                <GreetingBlock
                                    effect="fade-slide-bottom"
                                    effectTimeout={timeoutRight + 300}
                                >
                                    Full-stack software engineer in Berlin,
                                    Germany
                                </GreetingBlock>
                                <SocialBar
                                    effect="fade-slide-bottom"
                                    effectTimeout={timeoutRight + 600}
                                >
                                    <Social type="github" src={links.github} />
                                    <Social
                                        type="linkedin"
                                        src={links.linkedin}
                                    />
                                    <Social type="medium" src={links.medium} />
                                    <Social
                                        type="twitter"
                                        src={links.twitter}
                                    />
                                </SocialBar>
                            </HelloRight>
                        </HelloBlock>
                    </DataColumn>
                </Data>
                <Arrow
                    effectTimeout={timeoutArrow}
                    onClick={() => scrollWindow()}
                />
            </Container>
            <Copyright
                author="Caspar Camille Rubin"
                source="https://unsplash.com/photos/fPkvU7RDmCo"
                sourceText="Unsplash"
            />
        </>
    );
};
