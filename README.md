# w3s-livepeer-nodejs-example

## Install

```
npm install
```

## Set Environment Variables

The following environment variables must be set:

```
# The URL of the input video file to transcode (can be uploaded with the `w3 up <file>` command)
export INPUT_FILE_URL=

# The base64-encoded web3.storage UCAN Proof, please find instructions below
export DELEGATION_PROOF=

# The Livepeer Studio API key
export API_KEY=
```

## Creating UCAN Proof

1. Get Livepeer Studio DID

```
$ curl -s https://livepeer.studio/api/did | jq .did
"did:key:z6Mkn1f6JUmxJi8Ht53SzeK3LSWNn9DRPsSfFLoPJWHVTCaX"
```

2. Create UCAN delegation proof

```
$ w3 delegation create "did:key:z6Mkn1f6JUmxJi8Ht53SzeK3LSWNn9DRPsSfFLoPJWHVTCaX" | base64
EaJlcm9vdHOAZ3ZlcnNpb24BmgIBcRIgxMJNX7IGmnlZwfyp57XjEZ1dFg0tVRxDMe8jEczyopGnYXNYRO2hA0DSJOIvo7BknxGfX8EQGuWxms+2brIzCWWKGSecry6T+s3u7pThHAoyzhdpqs3tUVQAvZfJU/7Dz236OnuZT7EPYXZlMC45LjFjYXR0gaJjY2FuYSpkd2l0aHg4ZGlkOmtleTp6Nk1rdHl0VG9rOHZSTDVKc3pjSFVaNW9mOTh5Tm82M1FKZjZQMVFxdU0zb290VmNjYXVkWCLtAbsTE0BiZdd4avNZxJHar1IYXhAspYeFMyw7iAkiaC1EY2V4cPZjaXNzWCLtAdfcN/lj5UCn2ZjDwWrgWSqFpsqGSikgZzGl+e94BiD3Y3ByZoDrAgFxEiD0vJelfCcclK4GXqKQquWoXIfgGAV49HfEq8f2zR4k0ahhc1hE7aEDQK5HSREckWhm/5ZByT9ke/pNRCn8SgTq2DeWLZVQJZz1hDYuuCApdkQWn+8BgatCNfCXHnqIGOWuhplAT5TxZAthdmUwLjkuMWNhdHSBomNjYW5hKmR3aXRoeDhkaWQ6a2V5Ono2TWt0eXRUb2s4dlJMNUpzemNIVVo1b2Y5OHlObzYzUUpmNlAxUXF1TTNvb3RWY2NhdWRYIu0BcE50EngJNMh9rVaYkYJ5A/blNG2enHCRWypBy0mPjbRjZXhw9mNmY3SBoWVzcGFjZaJkbmFtZWdhbm90aGVybGlzUmVnaXN0ZXJlZPVjaXNzWCLtAasTE0BiZdd4avNZxJHar1IYXhAspYeFMyw7iAkiaC1EY3ByZoHYKlglAAFxEiDEwk1fsgaaeVnAnKnnteMRnV0WDS1VHEMx7yMRzPKikQ==
```

## Run

```
node main.js
```