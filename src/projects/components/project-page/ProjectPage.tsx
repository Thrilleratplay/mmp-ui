import { useNavigate, useParams } from "react-router-dom";
import useAxios from "axios-hooks";
import { Project } from "../../entities/Project.ts";
import { ProjectPageBody } from "./parts/project-page-body/ProjectPageBody.tsx";
import { Header } from "@/core/header/Header.tsx";
import { Refresher } from "./parts/refresher/Refresher.tsx";
import { BACKEND_HTTP_URL_ROOT } from "@/core/utils/constants.ts";

export function ProjectPage() {
    const navigate = useNavigate();
    const { id } = useParams();

    const [{ data: project, loading, error }, refetch] = useAxios<Project>(
        `projects/${id}`
    );
    return (
        <>
            <Header
                loading={loading}
                title={project?.name}
                description={project?.description}
                tags={project?.tags}
                link={project?.external_link}
                imagePath={`${BACKEND_HTTP_URL_ROOT}/projects/${project?.uuid}/assets/${project?.default_image_id}/file`}
                onTagClick={(t) => navigate(`/projects/list?filter=${JSON.stringify({ tags: [t.value] })}`)}
            />
            {error && <p>Error!</p>}
            {id && <ProjectPageBody projectUuid={id} project={project} onProjectChange={() => {
                console.log("onProjectChange")
                refetch()
            }} />}
            <Refresher projectUUID={id ?? ''} refresh={refetch} />
        </>
    )
}