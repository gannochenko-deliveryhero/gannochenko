import React, { FunctionComponent, useEffect, useState, useMemo } from 'react';
import { throttle } from 'throttle-debounce';
import { Skill } from '../Skill';
import { theme } from '../../style';
import { skills } from './skills';

import { Props, SkillItem } from './type';
import { SkillsContainer, SkillsOffset } from './style';
import { Row } from './components/Row';

const detectRange = () => {
    const windowWidth = window.innerWidth;
    const {
        grid: {
            breakpoints: { xs, sm, md, lg },
        },
    } = theme;

    if (windowWidth < xs[1]!) {
        return 'xs';
    }
    if (windowWidth > sm[0] && windowWidth < sm[1]) {
        return 'sm';
    }
    if (windowWidth > md[0] && windowWidth < md[1]) {
        return 'md';
    }
    if (windowWidth > lg[0]!) {
        return 'lg';
    }

    return 'xs';
};

const getDimensions = (range: string) => {
    console.log(range);

    // lg || md
    let result = {
        even: 4,
        odd: 3,
    };

    if (range === 'sm') {
        result = {
            even: 3,
            odd: 2,
        };
    }

    if (range === 'xs') {
        result = {
            even: 2,
            odd: 1,
        };
    }

    return result;
};

const getGrid = (data: SkillItem[], range: string) => {
    const dimensions = getDimensions(range);

    const result: SkillItem[][] = [];

    let lineNumber = 0;
    let line: SkillItem[] = [];
    for (let i = 0; i < data.length; i += 1) {
        const isEven = !(lineNumber % 2);
        const dimension = isEven ? dimensions.even : dimensions.odd;

        line.push(data[i]);
        if (line.length >= dimension) {
            lineNumber += 1;
            result.push(line);
            line = [];
        }
    }

    if (line.length) {
        result.push(line);
    }

    return result;
};

export const Skills: FunctionComponent<Props> = () => {
    const [range, setRange] = useState(detectRange());

    useEffect(() => {
        const onResize = throttle(200, () => {
            const currentRange = detectRange();
            if (range !== currentRange) {
                setRange(currentRange);
            }
        });
        window.addEventListener('resize', onResize);
        return () => {
            window.removeEventListener('resize', onResize);
        };
    });

    const grid = useMemo(() => {
        return getGrid(skills, range);
    }, [skills, range]);

    return (
        <SkillsContainer>
            <SkillsOffset>
                {grid.map((row, i) => (
                    <Row effectTimeoutBase={0} odd={i % 2 > 0} key={i}>
                        {row.map(item => (
                            <Skill key={item.key} {...item} />
                        ))}
                    </Row>
                ))}
            </SkillsOffset>
        </SkillsContainer>
    );
};
