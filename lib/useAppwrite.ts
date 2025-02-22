import { useState, useEffect } from "react"
import { Alert } from "react-native"

const useAppwrite = (fn: () => Promise<any>) => {

    const [data, setData] = useState([])
    const [isLoading, setLoading] = useState(true)

    const fetchData = async () => {
        setLoading(true)

        try {
            const response = await fn()
            setData(response)
        } catch (error) {
            Alert.alert("Error", String(error))
        } finally {
            setLoading(false)
        }
    }


    useEffect(() => {
        fetchData()
    }, [])

    const refetch = () => fetchData()


    return { data, isLoading, refetch }


}

export default useAppwrite