interface CameraPoint {
    url: string;
    longitude: number;
    latitude: number;
    name: string;
}


const cameraPoints: CameraPoint[] = [
    {
        url: "https://randomurl.com",
        name: "Westfield",
        latitude: 51.5093207,
        longitude: -0.2238214,
    }
];

export default cameraPoints;