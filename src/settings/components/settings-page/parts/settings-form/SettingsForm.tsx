import { useEffect, useState } from "react";
import { Button, Container, Fieldset, Group } from "@mantine/core";
import { FormProvider, useForm } from "./context";
import { Core } from "./parts/Core";
import { Library } from "./parts/Library";
import { Server } from "./parts/Server";
import { Render } from "./parts/Render";
import { Integrations } from "./parts/Integrations";
import { Form } from "react-router-dom";
import { AgentSettings } from "@/settings/entities/AgentSettings";
import { notifications } from "@mantine/notifications";
import { useGetSettings, usePostSettings } from "@/apiServices/system"; 

export function SettingsForm() {
    const { data, isLoading } = useGetSettings();
    const executeSave = usePostSettings();
    const [isSaving, setIsSaving] = useState(false);

    const form = useForm({
        initialValues: {
            "core": {
                "log": {
                    "enable_file": false,
                    "path": ""
                }
            },
            "server": {
                "port": 0
            },
            "library": {
                "path": "",
                "blacklist": [],
                "ignore_dot_files": false
            },
            "render": {
                "max_workers": 0,
                "model_color": "",
                "background_color": ""
            },
            "integrations": {
                "thingiverse": {
                    "token": ""
                }
            }
        }
    });

    useEffect(() => {
        if (data) {
            form.setInitialValues(data);
            form.setValues(data);
        }
    }, [data, form])

    const onSave = (settings: AgentSettings) => {
        setIsSaving(true);
        executeSave({
            data: settings
        })
            .then(() => {
                setIsSaving(false);
                notifications.show({
                    title: 'Great Success!',
                    message: 'Settings updated',
                    color: 'indigo',
                })
            })
            .catch((e) => {
                setIsSaving(false);
                console.log(e)
            });
    };

    return (
        <Container>
            <FormProvider form={form}>
                <Form onSubmit={form.onSubmit(onSave)}>
                    <Server />
                    <Core />
                    <Library />
                    <Render />
                    <Integrations />
                    <Fieldset legend="Commit">
                        <Group justify="flex-end">
                            <Button type="submit" loading={isSaving || isLoading} color="red">Save</Button>
                            <Button type="reset" onClick={form.reset}>Reset</Button>
                        </Group>
                    </Fieldset>
                </Form>
            </FormProvider>
        </Container>
    )
}