import { ActionIcon, Menu, rem } from "@mantine/core";
import { IconDotsVertical, IconDownload, IconTrash } from "@tabler/icons-react";
import { useDeleteProjectAsset } from "@/apiServices/projects";

type DropDownMenuProps = {
    assetId: string;
    projectUuid: string;
    children?: React.ReactNode;
    downloadURL?: string
    canDelete?: boolean;
    openDetails?: () => void;
}

export function DropDownMenu({ assetId, projectUuid, children, downloadURL, canDelete, openDetails }: DropDownMenuProps) {
    const callDelete = useDeleteProjectAsset();

    return (
        <Menu>
            <Menu.Target>
                <ActionIcon variant="subtle" color="gray">
                    <IconDotsVertical
                        style={{ width: rem(20), height: rem(20) }}
                        color="gray"
                        stroke={1.5}
                    />
                </ActionIcon>
            </Menu.Target>
            <Menu.Dropdown>
                {children}
                {openDetails &&
                    <Menu.Item onClick={openDetails} leftSection={<IconDownload style={{ width: rem(14), height: rem(14) }} />}>
                        Details
                    </Menu.Item>}
                {downloadURL && <Menu.Item
                    component="a"
                    href={downloadURL}
                    leftSection={<IconDownload style={{ width: rem(14), height: rem(14) }} />}
                >Download</Menu.Item>}
                {canDelete && <><Menu.Divider />
                    <Menu.Item
                        color="red"
                        onClick={() => callDelete(projectUuid, assetId)}
                        leftSection={<IconTrash style={{ width: rem(14), height: rem(14) }} />}
                    >Delete</Menu.Item></>}
            </Menu.Dropdown>
        </Menu>
    );
}
