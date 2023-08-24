export default function Blob1({ posX, posY, size}) {
    return (
        <>
            <div>
                <svg width="374" height="389" viewBox="0 0 374 389" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M78.4603 365.278C-23.9397 332.878 -3.2064 186.778 19.9603 117.778C32.099 71.2782 19.9603 4.27816 95.9604 1.27816C171.961 -1.72184 241.46 18.7782 328.46 100.278C415.46 181.778 351.96 277.778 328.46 333.278C304.96 388.778 206.46 405.778 78.4603 365.278Z" fill="url(#paint0_linear_134_38)" fillOpacity="0.5" stroke="black" />
                    <defs>
                        <linearGradient id="paint0_linear_134_38" x1="287.96" y1="62.2782" x2="31.9605" y2="350.778" gradientUnits="userSpaceOnUse">
                            <stop stopColor="#D83BDB" />
                            <stop offset="1" stopColor="#DB9B3B" />
                        </linearGradient>
                    </defs>
                </svg>


            </div>
            <style jsx>{`
            svg {
                display: block;
                width: 20vw;
                height: 40vh;
                position: absolute;
                top: ${posY};
                left: 28%;
                filter: blur(50px)
            }
            
            div {
                display: block;
                width: ${size};
                height: ${size};
                position: absolute;
                top: ${posY};
                left: ${posX};
                animation: glowing;
                animation-duration: 3s;
                animation-iteration-count: infinite;
                animation-timing-function: ease-in-out;
                animation-direction: alternate;
            }

            @keyframes glowing {
                0% {
                    filter: blur(50px) brightness(0.8);
                }
            
                50% {
                    filter: blur(50px) brightness(1);
                }
            
                100% {
                    filter: blur(50px) brightness(1.1);
                }
            }
                `}
            </style>
        </>
    )
}