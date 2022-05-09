export type Brand<T, B extends string> = T & { readonly _brand: B };

// Ids
export type CompetencyId = Brand<number, "CompetencyId">;
export type UserCompetencyId = Brand<number, "UserCompetencyId">;
export type DeveloperLevelId = Brand<number, "DeveloperLevelId">;
export type KnowledgeId = Brand<number, "KnowledgeId">;
export type UserId = Brand<number, "UserId">;
export type CompetencyPositionId = Brand<number, "CompetencyPositionId">;
export type LessonId = Brand<number, "LessonId">;
export type MaterialId = Brand<number, "MaterialId">;
export type MaterialsCollectionId = Brand<number, "MaterialsCollectionId">;
export type ImageId = Brand<number, "ImageId">;
export type Role = "admin" | "mentor" | "user";

export type P<T> = Promise<T>;
