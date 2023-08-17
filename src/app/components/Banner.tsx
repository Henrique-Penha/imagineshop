'use client'

import Image, { StaticImageData } from "next/image";
import { styled } from "styled-components";
import { Container } from "../styles/util";

interface BannerProps {
    image: StaticImageData;
    width: number;
    height: number;
}

const Banner = ({ image, width, height }: BannerProps) => {
    return (
        <StyledBanner>
            <Image src={image} width={width} height={height} alt="banner"/>
        </StyledBanner>
    );
};

const StyledBanner = styled.section`
    ${Container}
    border-top: 3px solid ${({ theme }) => theme.colors.primary};
    border-bottom: 3px solid ${({ theme }) => theme.colors.primary};
`;

export default Banner;