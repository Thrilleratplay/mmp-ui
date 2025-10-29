import { Project } from '@/projects/entities/Project';
import { IconTrash, IconFileArrowRight } from "@tabler/icons-react";
import { ActionIcon, Table, Group, Center, Skeleton } from "@mantine/core";
import { useState } from "react";
import { ProjectSelect } from "./parts/project-select/ProjectSelect";
import { Header } from "@/core/header/Header";
import { notifications } from "@mantine/notifications";
import {
  usePostTempFile,
  useDeleteTempFile,
  useGetTempFiles
} from '@/apiServices/tempFiles';
import {
    useGetProjectsList
} from '@/apiServices/projects';

export function TempFiles() {
    const [actionLoading, setActionLoading] = useState(false);
    const callSendToProject = usePostTempFile();
    const callDeleteTemp =  useDeleteTempFile();

    const { 
        data,
        isLoading,
        // error,
     } = useGetTempFiles();
    // useEffect(() => {
    //     if (!data) return;
    //     setTempFiles(data);
    // }, [data]);
    const { data: projects, isLoading: pLoading } = useGetProjectsList();

    const setProjectUUID = (i: number, p: Project) => {
        if (!data || !data[i]) {
            return;
        }
        data[i].project_uuid = p.uuid;
    }

    const sendToProject = (i: number) => {
        if (!data || !data[i]) {
            return;
        }
        setActionLoading((s) => !s)
        
        callSendToProject(data[i].uuid, data[i]).then(() => {
                notifications.show({
                    title: 'Great Success!',
                    message: 'Temporary moved do project!',
                    color: 'indigo',
                })
                setActionLoading((s) => !s)
            })
            .catch((e) => {
                console.log(e)
                setActionLoading((s) => !s)
            });

    }

    const deleteTemp = (i: number) => {
        if (!data || !data[i]) {
            return;
        }
        setActionLoading((s) => !s)
        callDeleteTemp(data[i].uuid)
            .then(() => {
                notifications.show({
                    title: 'Great Success!',
                    message: 'Temporary successfully deleted!',
                    color: 'indigo',
                })
                setActionLoading((s) => !s)
            })
            .catch((e) => {
                console.log(e)
                setActionLoading((s) => !s)
            });
    }

    return (<>
        <Header imagePath={'https://images.unsplash.com/photo-1587293852726-70cdb56c2866?q=80&w=2000&h=400&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'} />
        <Table>
            <Table.Thead>
                <Table.Tr>
                    <Table.Th>Name</Table.Th>
                    <Table.Th>Project</Table.Th>
                    <Table.Th><Center>Actions</Center></Table.Th>
                </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
                {data?.map((t, i) => <Table.Tr key={t.uuid}>
                    <Table.Td>{t.name}</Table.Td>
                    <Table.Td>
                        <ProjectSelect boosted={t.matches} projects={projects ?? []} onChange={(p) => { setProjectUUID(i, p) }} loading={pLoading} value={t.project_uuid} />
                    </Table.Td>
                    <Table.Td>
                        <Group justify="center">
                            <ActionIcon variant="filled" aria-label="Send to project" onClick={() => sendToProject(i)} loading={actionLoading}>
                                <IconFileArrowRight style={{ width: '70%', height: '70%' }} stroke={1.5} />
                            </ActionIcon>
                            <ActionIcon variant="filled" color='red' aria-label="Delete" onClick={() => deleteTemp(i)} loading={actionLoading}>
                                <IconTrash style={{ width: '70%', height: '70%' }} stroke={1.5} />
                            </ActionIcon>
                        </Group>
                    </Table.Td>
                </Table.Tr>)}
                {isLoading && Array.from(Array(10))
                    .map((_, i) => <Table.Tr key={i}>
                        <Table.Td><Skeleton height={30} radius="xl" /></Table.Td>
                        <Table.Td><Skeleton height={30} radius="xl" /></Table.Td>
                        <Table.Td><Skeleton height={30} radius="xl" /></Table.Td>
                        <Table.Td><Skeleton height={30} radius="xl" /></Table.Td>
                    </Table.Tr>)}
            </Table.Tbody>
        </Table>
    </>)
}