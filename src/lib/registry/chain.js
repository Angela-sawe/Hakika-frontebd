import { Contract, JsonRpcProvider } from "ethers";
import { CONFIG } from "../../config.js";
import { ABI } from "./abi.js";

export async function lookup(hash) {
  let lastError;
  for (const rpcUrl of CONFIG.rpcUrls) {
    const provider = new JsonRpcProvider(rpcUrl, CONFIG.chainId, { staticNetwork: true });
    try {
      const contract = new Contract(CONFIG.contractAddress, ABI, provider);
      const [exists, revoked, issuedAt, revokedAt, issuer] = await contract.verify(hash);
      return { exists: Boolean(exists), revoked: Boolean(revoked), issuedAt: Number(issuedAt), revokedAt: Number(revokedAt), issuer };
    } catch (error) {
      lastError = error;
    } finally {
      provider.destroy();
    }
  }
  throw lastError ?? new Error("No RPC endpoints configured");
}
