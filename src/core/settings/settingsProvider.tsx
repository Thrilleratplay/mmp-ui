// import { ExperimentalFeatures, SettingsContext } from "../settings/settingsContext";
// import { useLocalStorage } from "@mantine/hooks";
import { useGetSettings } from "@/apiServices/system";


export function SettingsProvider({ loading, children }: {loading: JSX.Element, children: JSX.Element}) {
    const { data: settings} =  useGetSettings();

    // const [experimental, setExperimental] = useLocalStorage<ExperimentalFeatures>({
    //     key: 'experimental',
    //     defaultValue: {
    //         dashboard: false
    //     }
    // })

    return (
        // <SettingsContext.Provider value={{ setExperimental }}>
        (settings) ? children : loading
        // </SettingsContext.Provider>
    )
}