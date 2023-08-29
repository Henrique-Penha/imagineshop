'use client';

import { styled } from "styled-components";

const Success = () => {
    return <StyledSuccess>Compra realizada com sucesso!!!</StyledSuccess>
}

const StyledSuccess = styled.div`
    min-height: 60vh;
    padding-top: 100px;
    text-align: center;
`;

export default Success;