import { appWindow } from '@tauri-apps/api/window';

function TitleBar() {
  function handleMinimize() { appWindow.minimize(); }
  function handleMaximize() { appWindow.maximize(); }
  function handleClose() { appWindow.close(); }
  return (
    <section
      className="titlebar"
      data-tauri-drag-region
    >
      <div>
        <button
          onClick={handleMinimize}
          className="titlebar-button"
        >
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect y="4.66663" width="10" height="0.666667" rx="0.333333" fill="#FFFBFE" />
          </svg>




        </button>
        <button
          onClick={handleMaximize}
          className="titlebar-button"
        >
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="0.5" y="0.5" width="9" height="9" rx="1.5" stroke="#FFFBFE" />
          </svg>



        </button>
        <button
          onClick={handleClose}
          className="titlebar-button"
        >
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0.110458 0.110504C0.257736 -0.0367736 0.49652 -0.0367736 0.643797 0.110504L9.88948 9.3562C10.0368 9.50348 10.0368 9.74226 9.88948 9.88954C9.74221 10.0368 9.50342 10.0368 9.35615 9.88954L0.110458 0.643843C-0.0368195 0.496565 -0.0368192 0.257782 0.110458 0.110504Z" fill="#FFFBFE" />
            <path d="M0.110515 9.8895C-0.0367622 9.74222 -0.0367622 9.50343 0.110515 9.35616L9.3562 0.110458C9.50348 -0.0368194 9.74226 -0.0368194 9.88954 0.110458C10.0368 0.257736 10.0368 0.49652 9.88954 0.643798L0.643854 9.8895C0.496576 10.0368 0.257793 10.0368 0.110515 9.8895Z" fill="#FFFBFE" />
          </svg>


        </button>
      </div>
    </section>
  );
};

export default TitleBar;