import { ConfirmDialog } from "@/core/dialogs/confirm-dialog/ConfirmDialog";
import { Button } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { useCallback, useState } from "react";
import { useDiscoverProject } from "@/apiServices/projects";

interface DiscoverBtnProps {
    projectUuid: string;
}

export function DiscoverBtn({ projectUuid }: DiscoverBtnProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [isEnabled, setIsEnabled] = useState(false);
    const {data, isLoading} = useDiscoverProject(projectUuid, isEnabled)

    if (data) {
        notifications.show({
            title: 'Great Success!',
            message: 'Project discovery started',
            color: 'indigo',
        })
    }

    const onOk = useCallback(() => {
        setIsOpen(false);
        setIsEnabled(true);
    }, [])

    return (<>
            <Button color="blue" onClick={() => setIsOpen(true)} loading={isLoading}>Run discovery</Button>
            <ConfirmDialog opened={isOpen} onOk={onOk} onCancel={() => setIsOpen(false)} />
        </>
    )    
}