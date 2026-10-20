// All settings come from .env (see .env.example). Restart `npm run dev` after changing it.
const env = import.meta.env;

export const CONFIG = {
  useMock: env.VITE_USE_MOCK !== "false",
  chainId: Number(env.VITE_CHAIN_ID || 43113),
  rpcUrl: env.VITE_RPC_URL || "https://api.avax-test.network/ext/bc/C/rpc",
  contractAddress: env.VITE_CONTRACT_ADDRESS || "",
  explorer: env.VITE_EXPLORER || "https://testnet.snowtrace.io"
};
