export type project ={
    id:string;
    tittle: string;
    user_id: string;
    tag:string;
    published_at:Date;
    public:string;
    status:string;
    textinfo:string;
};


export type projectdb ={
    id:string;
    tittle: string;
    user_id: string;
    tag:string;
    published_at?:string | null;
    public:string;
    status:string;
    textinfo:string;
};

export type CreateprojectDto = Pick<
project,
  "tittle" | "user_id" | "tag"
>;


export type UpdateprojectDto = Partial<
  Pick<
  project,
    | "tittle"
    |"public"
    | "tag"
    | "published_at"
  >
>;