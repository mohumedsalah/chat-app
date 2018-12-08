const expect = require('expect')



var {Users} = require('./users')



describe('users',()=>{
    var users;
    beforeEach(()=>{
        users = new Users();
        users.users = [{
            id:'1',
            name:'salah',
            room:'node'
        },
        {
            id:'2',
            name:'galala',
            room:'node'
        },
        {
            id:'3',
            name:'akram',
            room:'react'
        }
    ]
    })
    it('sould add user', ()=>{
        var users= new Users();
        var user={
            id:'1230',
            name:'salah',
            room:'salah fans'
        }
        var res = users.addUser(user.id, user.name, user.room);
        console.log(res);
        expect(users.users).toEqual([user])
    })
    it('should return name of users in specific room',()=>{
        var userlistName  = users.getUsreList('node');
        expect(userlistName).toEqual(['salah', 'galala']);
    })
    it('should find user that is in db', ()=>{
        res = users.getUser('1');
        expect(res.name).toBe('salah')
    })
    it("shouldn't find user that is not in db",()=>{
        res = users.getUser(-1);
        expect(res).toEqual(undefined)
    })
    it('should remove user that is in db', ()=>{
        res = users.removeUser('1');
        expect(res.name).toBe('salah')
    })
    it("shouldn't remove user that is not in db",()=>{
        res = users.removeUser(-1);
        expect(res).toEqual(undefined)
    })



})