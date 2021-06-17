export const inProduction = process.env.NODE_ENV === "prd";
export const inStage = process.env.NODE_ENV === "stg";

export const inStageOrProduction = inProduction || inStage;
