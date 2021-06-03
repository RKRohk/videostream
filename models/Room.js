export class Room {

    constructor(name,video){
        this.name = name
        this.num_members = 0
        this.video = video
    }

    addMember(){
        this.num_members+=1
    }

    removeMember(){
        this.num_members-=1
    }
}