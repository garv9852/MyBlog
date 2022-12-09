export interface Post{
    _id:string,
    _createdAt:string,
    title:string,
    author:{
        name:string;
        image:string;
    };
    mainImage:{
        asset:{
            url:string;
        };
    };
    slug:{
        current:string;
    };
    description:[object];
}

export interface Comment{
    name:string;
    comment:string;
    email:string;
    post:[object];
}

