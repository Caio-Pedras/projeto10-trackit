import styled from "styled-components";

const Header = styled.header`
    padding: 15px;
    background-color: #126BA5;
    box-shadow: 0px 4px 4px 0px #00000026;
    color: #FFFFFF;
    width: 100%;
    display:flex;
    font-size: 40px;
    justify-content:space-between;
    align-items:center;
    position:fixed;
    z-index:1;
    left: 0;
    top: 0;

    img {
        height: 51px;
        width: 51px;
        border-radius: 50%;
    }
`;

export default Header;
