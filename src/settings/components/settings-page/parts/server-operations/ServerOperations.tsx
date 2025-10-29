import { ConfirmDialog } from "@/core/dialogs/confirm-dialog/ConfirmDialog";
import { Button, Fieldset } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { useState, useCallback } from "react";
import { useGetDiscovery } from "@/apiServices/system";

export function ServerOperations() {
    const [isOpen, setIsOpen] = useState(false);
    const [isEnabled, setIsEnabled] = useState(false);
    const { data, isLoading } = useGetDiscovery(isEnabled);


    if (data) {
        notifications.show({
            title: 'Great Success!',
            message: 'Global discovery started',
            color: 'indigo',
        })
    }
    const onOk = useCallback(() => {
        setIsOpen(false);
        setIsEnabled(true);
    }, [])
    return (
        <Fieldset legend="Discovery">
        <Button color="blue" onClick={() => setIsOpen(true)} loading={isLoading}>Run discovery</Button>
            <ConfirmDialog opened={isOpen} onOk={onOk} onCancel={() => setIsOpen(false)} />
        </Fieldset >
    )
}