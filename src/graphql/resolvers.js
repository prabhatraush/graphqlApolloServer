import bcrypt from "bcrypt";
import User from "./../models/users";
import jwt from "jsonwebtoken";


export const resolvers = {
    Query:{
        user: async () =>{
            const users = await User.find({});
            console.log(users.name);
            return users;
        }
    },
    Mutation:{
        signup: async (root, args, ctx, info) =>{
            const existUser = await User.findOne({ email: args.email });
            if (existUser)  throw new Error('User exists already.');
            
            const hashPassword = await bcrypt.hash(args.password, 12);
            const user = new User({
                name: args.name,
                email: args.email,
                password: hashPassword
              });
              const result = await user.save();
            return result;
        },

        login: async (root, args, ctx, info) =>{
            const user = await User.findOne({ email: args.email });
            if (!user)  throw new Error('User does not exist!');
            
            const pwdMatch = await bcrypt.compare(args.password, user.password);
            console.log(pwdMatch,args.password);
            if(!pwdMatch) throw new Error('Incorrect Credentials');

            const token = jwt.sign(
                { userId: user._id, email: user.email },
                'secretkey',
                {
                  expiresIn: '1h'
                }
              );

              return {token: token, tokenExpire: 1 };
        }
    }
};

