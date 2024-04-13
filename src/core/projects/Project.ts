import ProjectType from "./enums/ProjectType";

export default interface Project {
    name: string;
    githubUrl?: string;
    nugetUrl?: string;
    url?: string;
    projectType: ProjectType;
    images: string[];
}
