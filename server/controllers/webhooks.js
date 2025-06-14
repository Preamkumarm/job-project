import UserModel from "../models/User.js";
import { Webhook } from "svix";


// API Controller Function to Manage clerk User with database
export const clerkWebhooks = async (req,res) => {
    try {
        
        const whook = new Webhook (process.env.CLERK_WEBHOOK_SECRET);


        //verifying headers
        await whook.verify(JSON.stringify(req.body),{
            "svix-id" : req.headers["svix-id"],
            "svix-timestamp" : req.headers["svix-timestamp"],
            "svix-signature" : req.headers["svix-signature"]
        });

        //get the data from the req.body

        const { data, type } = req.body

        //type will store the different type of action when user update or create or delete the account clerk with the using help of svix

        switch (type) {
            case 'user.created': {
                //when user created then we will save the user data in our database
                const userData = {
                    _id:data.id,
                    email: data.email_addresses[0].email_address,
                    name: data.first_name + " " + data.last_name,
                    image: data.image_url,
                    resume: ''
                }
                console.log(userData)
                await UserModel.create(userData)
                res.json({})
                break;
            }

            case 'user.updated':{
                const userData = {
                    email: data.email_addresses[0].email_address,
                    name: data.first_name + " " + data.last_name,
                    image: data.image_url,
                }
                await UserModel.findByIdAndUpdate(data.id, userData)
                res.json({})
                break;
            }

            case 'user.deleted':{
                await UserModel.findByIdAndDelete(data.id)
                res.json({})
                break;
            }
            default:
            break; 
        }

    } catch (error) {
        console.log(error.message);
        res.json({success:false,message:"Webhooks Error"});   
    }
}
