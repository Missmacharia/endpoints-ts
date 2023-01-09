import mssql, { VarChar } from 'mssql'
import sqlConfig from '../config'
import bcrypt from 'bcrypt'
import {v4} from 'uuid'
import { signUpSchema } from '../schema/signupSchema'
import { loginSchema } from '../schema/loginSchema'
import jwt from 'jsonwebtoken'


export const signUpController = async(req: { body: { username: any; email: any; password: any  } }, res: { status: (arg0: number) => { (): any; new(): any; json: { (arg0: { message: string }): void; new(): any } } })=>{
    try {
        const {error}= signUpSchema.validate(req.body)

        if(error){
            return res.status(400).json({
                message: 'wrong credentials'
            })
        }

        const {username, email}= req.body

        const pool= await mssql.connect(sqlConfig)
        const id = v4()
        //generating a salt
        const salt= await bcrypt.genSalt(10)
        const password= await bcrypt.hash(req.body.password, salt)

        let signUpResult = await (
            await pool
            .request()
            .input('id', mssql.VarChar, id)
            .input('username', mssql.VarChar, username)
            .input('email', mssql.VarChar, email)
            .input('password', mssql.VarChar, password)
            .execute('signUp')
        ).rowsAffected
        console.log(signUpResult);

        res.status(200).json({
            message: 'sign up successful'
        })
    } catch (error) {
        res.status(500).json({
            message: 'sign up failed please try again'
        })
    }
}

export const loginController = async (req: {
    params(): { id: any } body: { email: any; password: any; params: any } 
}, res: { status: (arg0: number) => { (): any; new(): any; json: { (arg0: { message: string }): void; new(): any } } })=>{
    try {
        const {error}= loginSchema.validate(req.body)
        if(error){
            return res.status(400).json({
                message: 'wrong credentials'
            })
        }


        const {email, password}=req.body;
        const pool = await mssql.connect(sqlConfig)
        let loginResult = await(
            await pool
            .request()
            .input('email', mssql.VarChar, email)
            .execute('login')
        ).rowsAffected
        console.log(loginResult);

        //compare passwords
         const validatePasswords = await bcrypt.compare(password, loginResult.password)

         if(!validatePasswords){
             return res.status(400).json({
                 message: 'wrong credentials'
             })
            }

            const {id}=  req.params()

            //creating tokens
            const token = await jwt.sign({id, email}, 'SECRET',{
                expiresIn: '1d'
            })

            res.status(200).json({
                 email, 
                token
            })

    } catch (error) {
        res.status(500).json({
            message: 'login failed'
        })
    }
}

export const userById = async(req, res)=>{
    try {
        let {id}= req.testUser
        const pool = await mssql.connect(sqlConfig) 
        let userIdResult= await (
            await pool.request()
            .input('id', mssql.VarChar, id)
            .execute('getUserById')
            ).recordset[0]
            if(testUser.length<= 0){
                return res.status(400).json({message: 'user not found'})
            }
            res.status(200).json({
                testUser:{
                    email: testUser.email
                } 
            })
            console.log(userIdResult);
            
    } catch (error) {
        res.status(500).json({
            message: 'failed to process request'
        })
    }
}