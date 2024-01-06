import ProjectType from "./enums/ProjectType";

export default interface Project {
    name: string;
    projectType: ProjectType;
    images: string[];
}