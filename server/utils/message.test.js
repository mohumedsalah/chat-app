var expect = require('expect')
var {generateMessage} = require('./message')
describe("generateMessage",()=>{
    it('should generate the correct message',()=>{
        var text = "hello"
        var usersend = "salah"
        var res = generateMessage(usersend, text);
        expect(res.text).toBe(text);
        expect(res.from).toBe(usersend);
        
    })
})