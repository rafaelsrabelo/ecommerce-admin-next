// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { Product } from "@/models/Product";
import { mongooseConnect } from "@/lib/mongoose";

export default async function handle(req, res) {
    const {method} = req;
    await mongooseConnect();
    if(method === 'GET') {
      if(req.query?.id) {
        res.json(await Product.findOne({_id: req.query.id}));
      } else {
        res.json(await Product.find());
      }
    }
    
    if(method === 'POST') {
      const {title, description, price,amount} = req.body;
      const productDoc = await Product.create({
        title, 
        description, 
        price,
        created_at: new Date(),
        amount
      })
      console.log(productDoc);
        res.json(productDoc);
    }

    if(method === 'PUT') {
      const {_id, title, description, price, amount} = req.body;
      await Product.updateOne({_id}, {title, description, price, amount});
      res.json(true);
    }

    if(method === 'DELETE') {
      if(req.query?.id) {
        await Product.deleteOne({_id:req.query?.id});
        res.json(true);
      }
    }
  }
  