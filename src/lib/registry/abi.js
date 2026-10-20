/* ===================================================================
 * REPLACE with the real ABI from contracts/DocRegistry.sol
 * (after `npx hardhat compile`: artifacts/contracts/DocRegistry.sol/DocRegistry.json -> "abi").
 * The function below is a PLACEHOLDER so the adapter has something to call.
 * =================================================================== */
export const ABI = [
  "function getRecord(bytes32 docHash) view returns (bool exists, bool revoked, uint64 issuedAt)"
];
