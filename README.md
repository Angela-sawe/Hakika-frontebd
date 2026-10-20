# HAKIKI frontend (React + Vite + Tailwind v4)

Public site for checking MUT documents: scan a QR code, see Genuine / Revoked / Not verified.
It only READS the blockchain. It never issues documents and holds no secrets.

## Run
    npm install
    cp .env.example .env      # Windows: copy .env.example .env
    npm run dev               # open the Local URL; use the Network URL on your phone

Start in demo mode (`VITE_USE_MOCK=true`): everything works with built-in fake records. Open **/demo** for scannable samples.

## Structure
    src/
      main.jsx, App.jsx        entry + routes (add pages here)
      config.js                reads .env
      index.css                Tailwind v4 + theme colours (@theme block)
      pages/                   Home, Verify, Batch, Demo, NotFound
      components/              Layout, ResultCard, Seal, QrScanner
      lib/
        fingerprint.js         ★ how the fingerprint is computed
        payload.js             ★ the QR link format
        registry/abi.js        ★ the contract ABI
        registry/chain.js      real read-only calls to Avalanche
        registry/mock.js       demo records
        registry/index.js      picks mock or chain
        verify.js              link -> result (the only function pages call)

## The three ★ files you MUST align with the backend
The verify page rebuilds the fingerprint in the browser, so it must match anchor-service byte for byte.
1. `fingerprint.js`: field order, separator, hash function (SHA-256 vs keccak256).
2. `payload.js`: what the QR link looks like and how the details are encoded.
3. `registry/abi.js` + `chain.js`: the real ABI and function names from `DocRegistry.sol`.
Each file has the current assumptions written at the top. Test with a real certificate from `scripts/e2e-local.sh` before trusting any of it.

## Go live on Fuji
1. Deploy the contract; put its address in `.env` as `VITE_CONTRACT_ADDRESS`.
2. Set `VITE_USE_MOCK=false`, restart `npm run dev`.
3. Verify a real certificate issued by the anchor service. It should show Genuine.

## Deploy
`npm run build` makes `dist/`. Host it on Vercel or Netlify (the rewrite files are included so /verify#… works on refresh). Use HTTPS, or the phone camera scanner will not open.

## Design notes
- Details live after the `#` in the link, so they are never sent to a server. Referrer is disabled in `index.html`.
- "Genuine" proves the record is real and unchanged, not who is holding it (the result card says so).
- Colours/fonts: `@theme` in `src/index.css`.
