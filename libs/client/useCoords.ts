import {useEffect, useState} from "react";

interface UseCoordState {
    latitude: number;
    longitude: number;
}

export default function useCoords() {
    const [coords, setCoords] = useState<UseCoordState>({
        latitude: 0,
        longitude: 0,
    });
    const onSuccess = ({coords: {latitude, longitude}}: GeolocationPosition) => {
        setCoords({
            latitude,
            longitude,
        });
    };
    useEffect(() => {
        navigator.geolocation.getCurrentPosition(onSuccess);
    }, []);
    return coords;
}