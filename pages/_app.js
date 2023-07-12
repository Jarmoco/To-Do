//import global css
import "../css/globalStyle.css"

import { useEffect } from 'react'

function App({ Component, pageProps }) {
    // Disable the default right click menu
    useEffect(() => {
        const handleContextMenu = (event) => {
            event.preventDefault();
        };

        document.addEventListener('contextmenu', handleContextMenu);

        // Clean up the event listener when the component is unmounted
        return () => {
            document.removeEventListener('contextmenu', handleContextMenu);
        };
    }, []);
    
    return <Component {...pageProps} />
}

export default App