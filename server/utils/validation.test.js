
const expect = require('expect')
var {isRealString} = require('./validations')
describe("isReakString",()=>{
    it('should expect real string',()=>{
        var str = "hello";
        var res = isRealString(str);
        expect(res).toBe(true);
    })
    it('should expect white spaces as false',()=>{
        var str = "  ";
        var res = isRealString(str);
        expect(res).toBe(false);
    })
    it('should expect empty as false',()=>{
        var str = "";
        var res = isRealString(str);
        expect(res).toBe(false);
    })
})
