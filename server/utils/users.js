class Users{
    constructor(){
        this.users = []
    }
    addUser(id ,name ,room){
        var user = {id, name, room}
        this.users.push(user);
        return user;
    }
    removeUser(id){
        var user = this.users.filter( (u) => u.id === id)[0];
        if(user){
            this.users = this.users.filter(c => c.id !== id);
        }
        return user;
    }
    getUser(id){
        //console.log(this.users, '*********************');
        //console.log(id, this.users.filter( (_user) => _user.id === id) ,'--------------------');
        return  this.users.filter( (u) => u.id === id)[0];
    }
    getUsreList(room){
        
        var users = this.users.filter( (_user) => _user.room === room);
        //console.log(this.users,room,users,"----------------------------------------------------------------");
        var nameArray = users.map((user)=>user.name)
        return nameArray;
    }

}


module.exports = {
    Users
}