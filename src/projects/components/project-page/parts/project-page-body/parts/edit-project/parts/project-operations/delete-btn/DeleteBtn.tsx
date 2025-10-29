import { ConfirmDialog } from "@/core/dialogs/confirm-dialog/ConfirmDialog";
import { Button } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDeleteProject } from "@/apiServices/projects";

interface DeleteBtnProps {
    projectUuid: string;
}

export function DeleteBtn({ projectUuid }: DeleteBtnProps) {
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const doDelete = useDeleteProject();

    const onOk = useCallback(() => {
        setIsOpen(false);
        setIsDeleting(true);
        doDelete(projectUuid)
            .then(({ data }) => {
                console.log(data);
                setIsDeleting(false);
                notifications.show({
                    title: 'Great Success!',
                    message: 'Project deleted',
                    color: 'indigo',
                })

                navigate(`/projects?tab=list`)
            })
            .catch((e) => {
                setIsDeleting(false);
                console.log(e)
            });
    }, [doDelete, navigate, projectUuid])

    return (<>
        <Button color="red" onClick={() => setIsOpen(true)} loading={isDeleting}>Delete Project</Button>
        <ConfirmDialog opened={isOpen} onOk={onOk} onCancel={() => setIsOpen(false)} />
    </>
    )
}