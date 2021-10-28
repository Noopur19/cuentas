import Styled from 'styled-components';

const Loader = Styled.div`  
    position: fixed;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    background: rgb(0 0 0 / 57%);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 9;
    img {
    width: 50px;
    border-radius: 50px;
    -webkit-transform-origin: 50%;
    transform-origin: 50%;
    -webkit-animation: rotating 2s infinite linear;
    animation: rotating 2s infinite linear;
    }
    
    @-webkit-keyframes rotating {
        from {
            -webkit-transform: rotate(0deg);
            transform: rotate(0deg);
        }
        
        to {
            -webkit-transform: rotate(360deg);
            transform: rotate(360deg);
        }
    }
    
    @keyframes rotating {
        from {
            -webkit-transform: rotate(0deg);
            transform: rotate(0deg);
        }
        
        to {
            -webkit-transform: rotate(360deg);
            transform: rotate(360deg);
        }
                
    }
`;
export default Loader;
