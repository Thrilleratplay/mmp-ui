import { IconPrinter } from "@tabler/icons-react";
import { Printer } from "@/printers/entities/Printer";
import { ActionIcon, Menu, rem } from "@mantine/core";
import { useState } from "react";
import { notifications } from "@mantine/notifications";
import {
    useGetPrinters,
    useSendToPrinter,
} from '@/apiServices/printers';

export function SendToPrinterBtn({ id }: { id: string }) {
    const { data: printers, isLoading } = useGetPrinters();
    const executeSendToPrinter = useSendToPrinter();
    const [isSending, setIsSending] = useState(false); 
    function sentToPrinter(p: Printer) {
        setIsSending(true);
        executeSendToPrinter(p.uuid, id)
            .then(() => {
                setIsSending(false);
                notifications.show({
                    title: 'Great Success!',
                    message: 'File sent to printer!',
                    color: 'indigo',
                })
            })
            .catch((e) => {
                console.log(e)
                setIsSending(false);
            });
    }

    return (<Menu
        transitionProps={{ transition: 'pop' }}
        withArrow
        position="bottom-end"
        withinPortal
    >
        <Menu.Target>
            <ActionIcon variant="subtle" color="gray" loading={isLoading || isSending}>
                <IconPrinter style={{ width: rem(16), height: rem(16) }} stroke={1.5} />
            </ActionIcon>
        </Menu.Target>
        <Menu.Dropdown>
            {printers?.map((p, i) => <Menu.Item key={i} onClick={() => sentToPrinter(p)}>{p.name}</Menu.Item>)}
        </Menu.Dropdown>
    </Menu>)
}