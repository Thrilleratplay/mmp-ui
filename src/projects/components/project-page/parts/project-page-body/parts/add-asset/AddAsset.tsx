import { Dropzone } from "@mantine/dropzone";
import { Container, Group, rem, Text } from "@mantine/core";
import { IconPhoto, IconUpload, IconX } from "@tabler/icons-react";
import { useState } from 'react';
import { notifications } from "@mantine/notifications";
import { usePostProjectAsset } from '@/apiServices/projects.ts';

type AddAssetProps = {
    projectUuid: string
}

export function AddAsset({ projectUuid }: AddAssetProps) {
    const [isSaving, setIsSaving] = useState(false);
    const executeSave = usePostProjectAsset();

    const onDrop = (files: File[]) => {
        console.log(files);
        for (const i in files) {
            const formData = new FormData();
            formData.append("project_uuid", projectUuid);
            formData.append("files", files[i]);
            setIsSaving(true);
            executeSave(projectUuid, { data: formData })
                .then(({ data }) => {
                    console.log(data);
                    setIsSaving(false);
                    notifications.show({
                        title: 'Great Success!',
                        message: `${data.name} as added to your project!`,
                        color: 'indigo',
                    })
                })
                .catch((e) => {
                    setIsSaving(false);
                    console.log(e)
                });
        }
    };
    return (
        <>
            <Container>
                <Dropzone onDrop={onDrop} mih={220} loading={isSaving}>
                    <Group justify="center" gap="xl" mih={220} style={{ pointerEvents: 'none' }}>
                        <Dropzone.Accept>
                            <IconUpload
                                style={{ width: rem(52), height: rem(52), color: 'var(--mantine-color-blue-6)' }}
                                stroke={1.5}
                            />
                        </Dropzone.Accept>
                        <Dropzone.Reject>
                            <IconX
                                style={{ width: rem(52), height: rem(52), color: 'var(--mantine-color-red-6)' }}
                                stroke={1.5}
                            />
                        </Dropzone.Reject>
                        <Dropzone.Idle>
                            <IconPhoto
                                style={{ width: rem(52), height: rem(52), color: 'var(--mantine-color-dimmed)' }}
                                stroke={1.5}
                            />
                        </Dropzone.Idle>

                        <div>
                            <Text size="xl" inline>
                                Drag assets here or click to select files
                            </Text>
                            <Text size="sm" c="dimmed" inline mt={7}>
                                Attach as many files as you like
                            </Text>
                        </div>
                    </Group>
                </Dropzone>
            </Container>
        </>
    );
}
