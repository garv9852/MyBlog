import {
    createCurrentUserHook,
    createClient,
} from "next-sanity";

import createImageUrlBuilder from '@sanity/image-url'

export const config={
    dataset:process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
    projectId:process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    apiVERSION:"2021-03-25",
    useCDN:process.env.NODE_ENV === "production"
}

export const sanityClient=createClient(config);

export const urlFor=(source) =>{ 
    if(source===undefined) return " ";
    return createImageUrlBuilder(config).image(source).url()
};

// export const useCurrentUser=createCurrentUserHook(config);