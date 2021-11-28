import { ThirdwebProvider } from "@3rdweb/react";

import "tailwindcss/tailwind.css";

const supportedChainIds = [137];
const connectors = {
  injected: {},
};

const MyApp = ({ Component, pageProps }) => {
  return (
     <ThirdwebProvider
      connectors={connectors}
      supportedChainIds={supportedChainIds}
    >
      <Component {...pageProps} />
    </ThirdwebProvider>
  );
};

export default MyApp;
