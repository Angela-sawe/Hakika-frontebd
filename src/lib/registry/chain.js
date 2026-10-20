// Real adapter: read-only calls to the DocRegistry contract on Avalanche. No wallet, no gas.
import { CONFIG } from "../../config.js";
import { ABI } from "./abi.js";

let contractPromise;
function getContract() {
  contractPromise ??= import("ethers").then(({ JsonRpcProvider, Contract }) =>
    new Contract(CONFIG.contractAddress, ABI, new JsonRpcProvider(CONFIG.rpcUrl, CONFIG.chainId))
  );
  return contractPromise;
}

/** Returns { revoked, issuedAt } or null when the fingerprint is not on-chain.
 *  Adapt the three lines marked (*) to the real contract's return shape. */
export async function lookup(hash) {
  const r = await (await getContract()).getRecord(hash);   // (*) function name
  if (!r.exists) return null;                              // (*) "exists" flag
  return { revoked: Boolean(r.revoked), issuedAt: Number(r.issuedAt) }; // (*) field names
}
