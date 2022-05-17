import "./App.css";
import { useMemo } from "react";

import Minter from "./Minter";

import * as anchor from "@project-serum/anchor";
import Typography from '@material-ui/core/Typography';
import { clusterApiUrl } from "@solana/web3.js";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import {
  getPhantomWallet,
  getSolflareWallet,
  getSolletWallet,
  getMathWallet,
} from "@solana/wallet-adapter-wallets";

import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";

import { WalletDialogProvider } from "@solana/wallet-adapter-material-ui";
import { ThemeProvider, createTheme } from "@material-ui/core";

const theme = createTheme({
  palette: {
    type: "dark",
  },
});

const candyMachineId = process.env.REACT_APP_CANDY_MACHINE_ID
  ? new anchor.web3.PublicKey(process.env.REACT_APP_CANDY_MACHINE_ID)
  : undefined;

const network = process.env.REACT_APP_SOLANA_NETWORK as WalletAdapterNetwork;

const rpcHost = process.env.REACT_APP_SOLANA_RPC_HOST!;
const connection = new anchor.web3.Connection(rpcHost);

const startDateSeed = parseInt(process.env.REACT_APP_CANDY_START_DATE!, 10);

const txTimeout = 30000; // milliseconds (confirm this works for your project)

const App = () => {
  const endpoint = useMemo(() => clusterApiUrl(network), []);

  const wallets = useMemo(
    () => [
      getPhantomWallet(),
      getSolflareWallet(),
      getSolletWallet(),
      getMathWallet(),
    ],
    []
  );

  function toggleMenu() {
    const menu = document.getElementById("mobileNavContainer")!;
    menu.classList.toggle("open-menu");
    console.log("pressed");
  }

  return (
    <div>
      <div id="mobileNavContainer" className="mobile-nav">
        <div className="mobile-nav-close-button">
          <img src="/icons/close.svg" alt="" onClick={toggleMenu} />
        </div>
        <ul>
          <li>
            <img className="mobile-nav-logo" src="/img/logo.png" alt="" />
          </li>
          <li>
            <a href="/launchpad" onClick={toggleMenu}>
              Launchpad
            </a>
          </li>
          <li>
            <div className="social-icons">
              <a href="https://thesupersol.net/" target="_blank" rel="noreferrer">
                <img className="nav-social" src="/icons/website.svg" alt="" />
              </a>
              <a href="https://twitter.com/SuperSol_X" target="_blank" rel="noreferrer">
                <img className="nav-social" src="/icons/twitter.svg" alt="" />
              </a>
              <a href="https://discord.com/invite/4hDDF8rQsA" target="_blank" rel="noreferrer">
                <img className="nav-social" src="/icons/discord.svg" alt="" />
              </a>
            </div>
          </li>
        </ul>
      </div>
      <div className="mobile-menu-button" onClick={toggleMenu}>
        <img src="/icons/menu.svg" alt="" />
      </div>
      <nav>
        <div className="nav-container">
          <img className="nav-logo" src="/img/logo.png" alt="" />

          <div className="social-icons hide-800">
            <a href="https://thesupersol.net/" target="_blank" rel="noreferrer">
              <img className="nav-social" src="/icons/website.svg" alt="" />
            </a>
            <a href="https://twitter.com/SuperSol_X" target="_blank" rel="noreferrer">
              <img className="nav-social" src="/icons/twitter.svg" alt="" />
            </a>
            <a href="https://discord.com/invite/4hDDF8rQsA" target="_blank" rel="noreferrer">
              <img className="nav-social" src="/icons/discord.svg" alt="" />
            </a>
          </div>
        </div>
      </nav>
      <div className="content-wrapper">
        <header className="card" id="launchpad">
          <div style={{ padding: "0 24px 0 24px 0" }}>
            <h3 className="text-secondary-color">Welcome To</h3>
            <h1 className="pb-3">TheSuperSOL</h1>
            <p className="text-secondary-color">
              SUPERSOL is the next step in launchpad development to allow future nft artists to grow and market NFT projects with ease. The NFT launchpad platform running in the world of solana incorporates a unique launchpad model. NFT holders can incubate, fund and launch the most promising projects across NFT artists.
            </p>
          </div>
          
          <div>
            <ThemeProvider theme={theme}>
              <ConnectionProvider endpoint={endpoint}>
                <WalletProvider wallets={wallets} autoConnect>
                  <WalletDialogProvider>
                    <Minter
                      candyMachineId={candyMachineId}
                      connection={connection}
                      startDate={startDateSeed}
                      txTimeout={txTimeout}
                      rpcHost={rpcHost}
                    />
                  </WalletDialogProvider>
                </WalletProvider>
              </ConnectionProvider>
            </ThemeProvider>
          </div>
        </header>
        <div id="link3" className="container card">
          <h1 className="pb-3">Vision</h1>
          <p className="text-secondary-color">
            As the Solana ecosystem grows, we see more and more nft projects that are expected to appear out of nowhere, but artists find it very difficult to market their nft or even to grow in the solana ecosystem. we are here to help nft artists grow and be able to develop their projects .Supersol offers a secure platform where the community is in complete control of their project's Launchpad process.
          </p>
        </div>
        <div id="link4" className="container faq">
          <h1 style={{ padding: "0 0 24px 0" }} className="text-secondary-color">FAQ</h1>
          <div>
            <h4 className="text-secondary-color">What is SuperSOL?</h4>
            <p className="text-secondary-color">
              SuperSOL OF 1200 ULTRA REALISTIC. Great art is only the beginning.
              Ultra-realistic 3D details, Utilities ,$SOS Token,SOS Incubator,Launchpad
            </p>
            <hr />
          </div>
          <div>
            <h4 className="text-secondary-color">Tokenomic NFT SuperSOL?</h4>
            <p className="text-secondary-color">NFT SuperSOL Auction</p>
            <p className="text-secondary-color">-60% will be allocated directly to our Treasury</p>
            <p className="text-secondary-color">-20% will be used for Giveaways and Events to the SuperArmy community</p>
            <p className="text-secondary-color">-20% will be received by Team</p>
            <hr />
          </div>
          <div>
            <h4 className="text-secondary-color">What are the prices for Presale and public sales SuperSol?</h4>
            <p className="text-secondary-color">0.35 SOL (Pre Sale) dan 0.7 SOL (Public Sale)</p>
            <hr />
          </div>
          <div>
            <h4 className="text-secondary-color">What's the utility? Is there anything other than art?</h4>
            <p className="text-secondary-color">
              YES! Very. Please see our full Roadmap. Here are some highlights:
              SOS tokens, earn and stake.
              Every SuperSOL holder will be entitled to participate in various kinds of Launchpad
              SuperSOL Incubator, helping smaller projects to get started in exchange for benefits for our SuperArmy members.
            </p>

            <hr />
          </div>
          <div> <Typography
            variant="caption"
            align="center"
            display="block"
            style={{ marginTop: 100, color: 'grey' }}
          >
            Powered by TheSuperSOL
          </Typography></div>
        </div>
      </div>
    </div>
  );
};

export default App;
