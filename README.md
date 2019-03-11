## What?
A driver file to repoduce https://github.com/ConsenSys/truffle-security/issues/102

Truffle project to reproduce https://github.com/ConsenSys/mythx-developer-support/issues/16

## Folder structure
- `call_mythxapi.js`: Script to call the function `sourceMappingDecoder().converOffsetToLineColumn()`
- `call_mythxapi.js`: Script to call the function `byteOffset2lineColumn()` from `truffle-security/lib/issues2eslint.js`
- `data/`: contains relevant data to pass to `byteOffset2lineColumn()`


## Run file
```
npm install
node call_remixlib.js
```

## Input srcMap being supplied via `call_remixlib.js`
`[ '2456:1:0', '2432:1:0', '2419:1:0' ]`

##  `call_remixlib.js` output for the supplied input
```
[ { line: 77, column: 103 }, { line: 77, column: 104 } ]
--
[ { line: 77, column: 79 }, { line: 77, column: 80 } ]
--
[ { line: 77, column: 66 }, { line: 77, column: 67 } ]
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
