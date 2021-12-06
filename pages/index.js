import { useWeb3 } from "@3rdweb/hooks";
import { ConnectWallet } from "@3rdweb/react";
import Profile from "../components/Profile";

export default function Home() {
  const { address } = useWeb3();

  return (
    <div>
      <ConnectWallet></ConnectWallet>
      {address ? <Profile></Profile> : <h1>Please connect your wallet</h1>}
    </div>
  );
}
