import { styled } from 'styled-components';
import Image from 'next/image';
import Logo from '../../../public/logo.png';
import { Container } from '../styles/util';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faInstagram, faYoutube } from '@fortawesome/free-brands-svg-icons';

const Footer = () => {
    return (
        <StyledFooter>
            <StyledFooterContainer>
                <Image src={Logo} width={130} height={60} alt='imagineshop logo' />
                <StyledFooterContact>
                    Imagine Shop - +55 (48) 3771 - 1703 3771 - 1823 - imagine@imagineschool.com.br - Rua Miguel Daux, 129 - Coqueiros - Florianópolis/SC
                </StyledFooterContact>

                <StyledSocialMediaLinks>
                    <StyledSocialMediaIcon icon={faFacebook} />
                    <StyledSocialMediaIcon icon={faInstagram} />
                    <StyledSocialMediaIcon icon={faYoutube} />
                </StyledSocialMediaLinks>
            </StyledFooterContainer>
        </StyledFooter>
    );
};

const StyledFooter = styled.footer`
    height: 12.rem;
    background-color: #f4f4f4;
`;

const StyledFooterContainer = styled.div`
    ${Container};
    display: flex;
    grid-template-columns: 130px auto 130px;
    padding: 2.5rem 0;
    
`;

const StyledFooterContact = styled.p`
    font-size: 0.75rem;
    color: ${({ theme }) => theme.colors.secondary};
    margin: 0;
    text-align: center;
    margin-top: 8.125rem;
`;

const StyledSocialMediaLinks = styled.ul`
    list-style-type: none;
    padding: 0;
    margin: 0;
    display: flex;
    gap: 1.5rem;
`;

const StyledSocialMediaIcon = styled(FontAwesomeIcon)`
    color: ${({ theme }) => theme.colors.secondary};
    font-size: 1.875rem;

`;

export default Footer;