import User from '../models/UserModel.js'
import jwt from 'jsonwebtoken'
const createToken = (_id)=>{
   return jwt.sign({_id},process.env.TOKEN)
}

export const signup = async (req,res)=>{
    const {email,password} = req.body

    try{
        const user = await User.signup(email,password)
        const token = createToken(user._id)

        res.status(200).json({email,token})

    }catch(err){
        res.status(401).json({error:err.message})
    }
}

export const login = async (req,res)=>{
    const {email,password} = req.body

    try{
        const user = await User.login(email,password)
        const token = createToken(user._id)

        res.status(200).json({email,token})

    }catch(err){
        res.status(401).json({error:err.message})
    }
}

export const updateFav = async (req,res)=>{
    const {email,data,command} = req.body

    try {
        const user = await User.findOne({email})
        if (!user) {
          res.status(401).json({error:'user tidak ditemukan'})  
        }
        const fav = await User.updateFav(data,command,user._id)

        res.status(200).json({fav : fav.fav})
        
    } catch (error) {
        res.status(401).json({error:error.message})
    }
}