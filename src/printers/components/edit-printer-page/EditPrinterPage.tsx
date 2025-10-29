import useAxios from "axios-hooks";
import { useParams, useNavigate } from "react-router-dom";
import { PrinterForm } from "../parts/printer-form/PrinterForm";
import { Printer } from "@/printers/entities/Printer";
import { Header } from "@/core/header/Header";
import { Container } from "@mantine/core";

export function EditPrinterPage() {
    const navigate = useNavigate();
    const { id } = useParams();

    const [{ 
        data,
        // loading, 
        // error,
     }] = useAxios<Printer>(`/printers/${id}`);
    return (<>
        <Header title={data?.name} imagePath={'https://images.unsplash.com/photo-1611117775350-ac3950990985?q=80&w=2000&h=400&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'} />
        <Container mt='md'>
            <PrinterForm printer={data} onPrinterChange={() => {
                navigate("/printers")
            }} />
        </Container>
    </>)
}