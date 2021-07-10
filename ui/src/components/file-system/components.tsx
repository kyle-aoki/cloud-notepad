import { FC } from "react";
import styled from "styled-components";
import { HeaderContainer, HeaderName, HeaderDateMod, HeaderExt, HeaderSize } from "./styled-components";
import { ReactComponent as XButtonSVG } from '../../assets/cancel.svg';
import { ReactComponent as RightArrow } from '../../assets/right-arrow.svg';
import { ReactComponent as LeftArrow } from '../../assets/left-arrow.svg';
import { ReactComponent as RightChevronIcon } from '../../assets/right-chevron.svg';

export const XButtonSVGContainer: FC = () => {
    const style = {
        width: '10px',
        height: '10px',
        fill: 'white',
    };
    return <XButtonSVG style={style} />;
};

export const CloudIconStyle = {
    fill: 'white',
    width: '15px',
    height: '15px',
    marginRight: '4px',
    marginTop: '4px',
};

export const Arrow: FC<any> = ({ right, onClick }) => {
    return (
        <ArrowButton className="ArrowContainer" onClick={onClick}>
            {right ? <RightArrow className="Arrow" /> : <LeftArrow className="Arrow" />}
        </ArrowButton>
    );
};

export const Header = () => {
    return (
        <HeaderContainer>
            <HeaderName>Name</HeaderName>
            <div></div>
            <HeaderDateMod>Last Modified</HeaderDateMod>
            <HeaderExt>Type</HeaderExt>
            <HeaderSize>Size</HeaderSize>
        </HeaderContainer>
    );
};

export const SubPathContainer = styled.div`
    display: flex;
    align-items: center;
  `;
export const SubPathTextContainer = styled.div``;

export const SubPath: FC<any> = ({ children, last }) => {
    const chevronStyle = {
        fill: '#808080',
        width: '8px',
        height: '8px',
        margin: '0 8px',
        marginTop: '3px',
    };
    return (
        <SubPathContainer>
            <SubPathTextContainer>{children}</SubPathTextContainer>
            {!last && <RightChevronIcon style={chevronStyle} />}
        </SubPathContainer>
    );
};

export const ArrowButton = styled.div`
    color: black;
    user-select: none;
    cursor: default;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 10px;
    margin-left: 10px;
  `;