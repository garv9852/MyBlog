import sanityClient from '@sanity/client'
import type { NextApiRequest, NextApiResponse } from 'next'
export const config={
    dataset:process.env.NEXT_PUBLIC_SANITY_DATASET,
    projectId:process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    useCDN:process.env.NODE_ENV === "production",
    token:process.env.NEXT_PUBLIC_SANITY_API_TOKEN
}

const client=sanityClient(config);
export default async function handler (
  req: NextApiRequest,
  res: NextApiResponse
) 
{
    const {_id,name,email,comment}=JSON.parse(req.body);
    try{
        await client.create({
            _type:'comment',
            post:{
                _type:'reference',
                _ref:_id
            },
            name,
            email,
            comment,
            approved:false
        })
        res.status(200).send({message:"done"})
    }
    catch(err)
    {
        console.log(err);
        return res.status(500).json({err});
    }
}
