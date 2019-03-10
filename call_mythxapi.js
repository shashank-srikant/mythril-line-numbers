const myth_fn = require('truffle-security/lib/issues2eslint').MythXIssues
const fs = require('fs') 

//FROM COMMAND LINE
/*
* Order of command line arguments
* 0: List of sourcemap -- contains map pertaining to assign+function call nodes, and those flagged by labels
* 1: Sol file name
* 2: Sol source path
* 3: AST path
* 4: Binary path
* 5: Class name being considered
*/

/*
args = [];
process.argv.forEach(function (val, index, array) {
  args.push(val)
});

//console.log('====');
//console.log(args);
//console.log('====');
//throw "asd";

var sourcemaps_list = JSON.parse(args[2]);
var src_name = args[3]
var src_path = args[4]
var ast_path = args[5]
var byte_path = args[6]
var class_name = args[7]

var source_code = fs.readFileSync(src_path).toString();
var ast_obj = fs.readFileSync(ast_path)
ast_obj = JSON.parse(ast_obj.toString());
var byte_code = JSON.parse(fs.readFileSync(byte_path).toString());
byte_code = byte_code['contracts'][src_path+':'+class_name]['bin'];
*/

// FROM FILE
src_name = 'sol_0xf6da07a8ffb5683314715d8c7a1a5c952b4e74ca.sol';
pth = 'data/';
contract_name = 'StandardToken';

var src_path = pth+src_name;
var source_code = fs.readFileSync(src_path).toString();
var ast_obj = fs.readFileSync(pth+src_name+'.ast');
ast_obj = JSON.parse(ast_obj.toString());
var byte_code = JSON.parse(fs.readFileSync(pth+src_name+'.byte').toString());
byte_code = byte_code['contracts'][src_name+':'+contract_name]['bin'];

// Populate sourcemaps from mythril response
var response = fs.readFileSync(pth+src_name+':'+contract_name+'.json');
response = JSON.parse(response.toString());
var sourcemaps_list = [];
var err_content = response[0]['issues'];

var i;
for(i=0; i < err_content.length; i++){
    sourcemaps_list.push(err_content[i]['locations'][0]['sourceMap']);
}
console.log(sourcemaps_list);

for(i=0; i < sourcemaps_list.length; i++){
    myth_data = {
        "contractName": 'dummy',
        "bytecode": 'asd',//byte_code,
        "sourceMap": 'asd',//sourcemaps_list[i],
        "compiler": {
            "version": 'asd',
        },
        "deployedBytecode": byte_code,
        "deployedSourceMap": sourcemaps_list[i],
        "source": source_code,
        "sourcePath": src_path,
        "remixPath": 'asd',
        "ast": ast_obj
    };

    const issuesObject = new myth_fn(myth_data);
    console.log(issuesObject.byteOffset2lineColumn(sourcemaps_list[i].split(":")[0],
                                                   issuesObject.lineBreakPositions[src_name])
                );
    console.log('--');
}
