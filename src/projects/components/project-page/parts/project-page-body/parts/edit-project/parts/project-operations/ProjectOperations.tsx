import { Project } from "@/projects/entities/Project";
import { ActionIcon, Autocomplete, Group, rem } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { IconHomeMove } from "@tabler/icons-react";
import { useState } from "react";
import { DeleteBtn } from "./delete-btn/DeleteBtn";
import { DiscoverBtn } from "./discover-btn/DiscoverBtn";
import { useGetPaths } from "@/apiServices/system";
import { useMoveProject } from "@/apiServices/projects";

type ProjectOperationsProps = {
    project: Project;
    onProjectChange: (p: Project) => void;
}

export function ProjectOperations({ project }: ProjectOperationsProps) {
    const [isMoving, setIsLoading] = useState(false);
    const [path, setPath] = useState(project.path);
    const moveProject = useMoveProject();

    const { 
        data: paths,
        isLoading: isLoadingPaths, 
        // error: ePaths 
    } = useGetPaths();
    const onMoveHandler = () => {
        setIsLoading(true);
        moveProject(project.uuid, path).then(({ data }) => {
            console.log(data);
            setPath(data.path);
            setIsLoading(false);
            notifications.show({
                title: 'Great Success!',
                message: 'Project moved',
                color: 'indigo',
            })
        })
            .catch((e) => {
                setIsLoading(false);
                console.log(e)
            });
    }
    return (<>
        <Autocomplete
            label="Move to"
            data={paths}
            value={path}
            onChange={setPath}
            disabled={isLoadingPaths}
            rightSection={
                <ActionIcon size={32} color={'blue'} variant="filled" onClick={onMoveHandler} loading={isMoving}>
                    <IconHomeMove style={{ width: rem(18), height: rem(18) }} stroke={1.5} />
                </ActionIcon>
            }
        />
        <Group mt='md' justify="flex-end">
            <DiscoverBtn projectUuid={project.uuid} />
            <DeleteBtn projectUuid={project.uuid} />
        </Group>

    </>)
}