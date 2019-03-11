const remix_fn = require('remix-lib/src/sourceMappingDecoder');
const fs = require('fs') 

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
    const srcobj = new remix_fn();
    var line_brks = srcobj.getLinebreakPositions(source_code);
    var loc = {start: parseInt(sourcemaps_list[i].split(':')[0]), length: parseInt(sourcemaps_list[i].split(':')[1])};
    var res = srcobj.convertOffsetToLineColumn(loc, line_brks);
    console.log(res);
    console.log('--');
}
