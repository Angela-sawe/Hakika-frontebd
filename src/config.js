const env = import.meta.env;
const csv = value => String(value ?? "").split(",").map(url => url.trim()).filter(Boolean);

export const CONFIG = {
  chainId: Number(env.VITE_HAKIKA_CHAIN_ID || 43113),
  rpcUrls: csv(env.VITE_HAKIKA_RPC_URLS || "https://api.avax-test.network/ext/bc/C/rpc"),
  contractAddress: env.VITE_HAKIKA_CONTRACT || "0x568358c9bC1ecda34742921547Ee9d3d0566370f",
  explorer: env.VITE_HAKIKA_EXPLORER || "https://testnet.snowtrace.io",
  institution: env.VITE_HAKIKA_INSTITUTION || "Murang'a University of Technology",
  networkLabel: env.VITE_HAKIKA_NETWORK_LABEL || "Avalanche Fuji (test network)"
};
