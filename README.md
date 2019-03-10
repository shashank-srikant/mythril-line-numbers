## What?
A driver file to repoduce https://github.com/ConsenSys/truffle-security/issues/102

## Folder structure
- `call_mythxapi.js`: Script to call the function `byteOffset2lineColumn()` from `truffle-security/lib/issues2eslint.js`
- `data/`: contains relevant data to pass to `byteOffset2lineColumn()`


## Run file
```
npm install
node call_mythxapi.js
```

## Input srcMap being supplied via `call_mythxapi.js`
`[ '2456:1:0', '2432:1:0', '2419:1:0' ]`

## Output for the supplied input
```
[ { line: 77, column: 103 }, { line: 77, column: 104 } ]
--
[ { line: 77, column: 79 }, { line: 77, column: 80 } ]
--
[ { line: -1, column: 0 }, {} ]
--
```

## How to generate files present in `data/`
- Solidity source

Source picked from https://etherscan.io/address/0xf6da07a8ffb5683314715d8c7a1a5c952b4e74ca#code

`{filename}: sol_0xf6da07a8ffb5683314715d8c7a1a5c952b4e74ca`

- Contract being analyzed

`{contractname}: StandardToken`

- AST (`data/{filename}.sol.ast`)

`solc --ast-compact-json data/{filename}.sol > data/{filename}.sol.ast`

- Byte code (`data/{filename}.sol.byte`)

`solc --combined-json bin data/{filename}.sol > data/{filename}.sol.byte`

- Mythril error report (`data/{filename}.sol:{contractname}.json`)

`myth -xo jsonv2 data/{filename}.sol:{contractname} > data/{filename}.sol:{contractname}.json`

## JSON formatting
I use http://jsonviewer.stack.hu/ to view formatted JSON files.
