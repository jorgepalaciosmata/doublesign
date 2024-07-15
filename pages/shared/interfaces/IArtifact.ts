export interface IArtifact {
    name: string, 
    created: Date,
};

export enum ArtifactType {
    File, 
    Folder,
};