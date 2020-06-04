import bcrypt from "bcrypt";
import User from "./../models/users";
import Post from './../models/posts';
import ContactUs from './../models/contactus';
import jwt from "jsonwebtoken";
require("@babel/polyfill");

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
        },

        addPost: async (root, args, ctx, info) =>{
            console.log(ctx);
            const Authorization = ctx.req.get("Authorization");
            console.log(Authorization);
            const token = Authorization? Authorization.replace("Bearer ", "") :  new AuthenticationError("Auth Token Missing");

            const verifiedPlayLoad = await jwt.verify(token, 'secretkey');
            if(!verifiedPlayLoad) throw new AuthenticationError("Unauthenticated");

            const payload = await jwt.decode(token);
            console.log(payload);

            const post = new Post({
                title: args.title,
                description: args.description,
                creator: payload.id,
            });

            const result = await post.save();
            const creator = await User.findById(req.userId);

            if (!creator) {
                throw new Error('User not found.');
            }
            await creator.save();

            return post;
        },

        addContact: async (root, args, ctx, info) =>{
            const contact = new ContactUs({
                name: args.name,
                mobile: args.mobile,
                email: args.email,
                description: args.description
            })
            const result = contact.save();

            return result;
        }
    }
};

