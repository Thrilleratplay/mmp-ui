import { WidgetConfig } from "@/dashboard/entities/WidgetType";
import { Select } from "@mantine/core";
import { useState } from "react";
import { useGetPrinters } from '@/apiServices/printers';

export function PrinterWidgetConfig({ config, onChange }: WidgetConfig) {
    const [cfg, setCfg] = useState(config)
    const {data} = useGetPrinters();

    const proxyOnChange = (v: string | null) => {
        const c = { ...cfg, printer: v }
        setCfg(c)
        onChange(c)
    }

    return (
        <Select
            label="Select Printer"
            value={cfg?.printer}
            onChange={proxyOnChange}
            data={data?.map(p => ({ value: p.uuid, label: p.name }))}
        />)
}