import jwt from 'jwt'

export const auth = (req, res, next)=>{
    try {
        //request the token from the headers
        const bearer= req.headers['authorization']
        console.log(bearer);
        if(!bearer){
            return res.status(400).send({
                message: 'Access denied'
            })
        }

        const token = bearer.split(' ')[1]
        console.log(token);
     //verifyin the token
     const {id, email}= jwt.verify(token, 'SECRET')
     req.body = {...req.body, id, email}
     next()   
    } catch (error) {
        console.log(error);
        res.status(401).send({
            message: 'Access denied'
        })
    }
}