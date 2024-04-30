import { GeneratedType } from "@cosmjs/proto-signing";
import { MsgCreatePost } from "./types/blog/blog/tx";
import { MsgDeletePostResponse } from "./types/blog/blog/tx";
import { Post } from "./types/blog/blog/post";
import { MsgUpdatePost } from "./types/blog/blog/tx";
import { QueryShowPostRequest } from "./types/blog/blog/query";
import { MsgUpdateParams } from "./types/blog/blog/tx";
import { QueryParamsResponse } from "./types/blog/blog/query";
import { QueryListPostRequest } from "./types/blog/blog/query";
import { GenesisState } from "./types/blog/blog/genesis";
import { MsgDeletePost } from "./types/blog/blog/tx";
import { MsgUpdateParamsResponse } from "./types/blog/blog/tx";
import { MsgCreatePostResponse } from "./types/blog/blog/tx";
import { MsgUpdatePostResponse } from "./types/blog/blog/tx";
import { Params } from "./types/blog/blog/params";
import { QueryParamsRequest } from "./types/blog/blog/query";
import { QueryShowPostResponse } from "./types/blog/blog/query";
import { QueryListPostResponse } from "./types/blog/blog/query";

const msgTypes: Array<[string, GeneratedType]>  = [
    ["/blog.blog.MsgCreatePost", MsgCreatePost],
    ["/blog.blog.MsgDeletePostResponse", MsgDeletePostResponse],
    ["/blog.blog.Post", Post],
    ["/blog.blog.MsgUpdatePost", MsgUpdatePost],
    ["/blog.blog.QueryShowPostRequest", QueryShowPostRequest],
    ["/blog.blog.MsgUpdateParams", MsgUpdateParams],
    ["/blog.blog.QueryParamsResponse", QueryParamsResponse],
    ["/blog.blog.QueryListPostRequest", QueryListPostRequest],
    ["/blog.blog.GenesisState", GenesisState],
    ["/blog.blog.MsgDeletePost", MsgDeletePost],
    ["/blog.blog.MsgUpdateParamsResponse", MsgUpdateParamsResponse],
    ["/blog.blog.MsgCreatePostResponse", MsgCreatePostResponse],
    ["/blog.blog.MsgUpdatePostResponse", MsgUpdatePostResponse],
    ["/blog.blog.Params", Params],
    ["/blog.blog.QueryParamsRequest", QueryParamsRequest],
    ["/blog.blog.QueryShowPostResponse", QueryShowPostResponse],
    ["/blog.blog.QueryListPostResponse", QueryListPostResponse],
    
];

export { msgTypes }