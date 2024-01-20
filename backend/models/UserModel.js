import mongoose from "mongoose";
import validator from "validator";
import bcrypt from 'bcrypt'
const userSchema = mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    },
    fav:{
        type:[mongoose.Schema.Types.Mixed],
        unique:true
    }
})

userSchema.statics.signup = async function(email,password){

    if(!email||!password){
        throw Error('Please fill all fields')
    }

    const exist = await this.findOne({email})

    if(!validator.isEmail(email))throw Error('Email is not valid')

    if(exist)throw Error('Email already in use')

    const salt =   await bcrypt.genSalt(10)

    const hash = await bcrypt.hash(password,salt)

    const user = await this.create({email,password:hash,fav:[]})

    return user
}

userSchema.statics.login = async function(email,password){

    if(!email||!password){
        throw Error('Please fill all fields')
    }

    const exist = await this.findOne({email})

    if(!validator.isEmail(email))throw Error('Email is not valid')

    if(!exist)throw Error('Email not find')

    const match = await bcrypt.compare(password,exist.password)

    if(!match){
        throw Error('Password incorrect')
    }

    return exist
}

userSchema.statics.updateFav = async function(data,command,id){
    if(!data){
        throw Error('Mana data nya')
    }

    let user = null

    switch(command){
        case 'add':
             user = await this.findByIdAndUpdate(id, {$push:{fav:data}},{new:true});
        break 
        case 'delete' :
            user = await this.findByIdAndUpdate(id, {$pull:{fav:data}},{new:true});
        break
        case 'clear' :
            user = await this.findByIdAndUpdate(id, {fav:[]},{new:true});
        break
        case 'get' :
            user = await this.findById(id);
        break
        default :
        throw Error('mana command nya')
    }

    return user

}




export default mongoose.model('User',userSchema)