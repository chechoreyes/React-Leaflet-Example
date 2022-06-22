import React from 'react';
import {
    MapContainer,
    TileLayer,
    useMap,
    Popup,
    Marker,
    useMapEvents,
    Polygon,
    GeoJSON,
    LayersControl,
} from 'react-leaflet';
import { useState } from 'react';
import { featureGroup, LatLng, LatLngLiteral, layerGroup } from 'leaflet';
import aye from './ayekantun.json';
import { GeoJsonObject } from 'geojson';

export const Leaflet = () => {
    const purpleOptions = { color: 'purple' };

    //GET currentpPosition and flyTo
    function LocationMarker() {
        const [position, setPosition] = useState({ latitude: 0, longitude: 0 });
        const map = useMapEvents({
            click() {
                map.locate();
            },
            locationfound(e) {
                const { lat, lng } = e.latlng;
                setPosition({
                    latitude: lat,
                    longitude: lng,
                });
                map.flyTo(e.latlng, map.getZoom());
            },
        });

        return position.latitude !== 0 ? (
            <Marker
                position={[position.latitude, position.longitude]}
                interactive={false}
            />
        ) : null;
    }

    //POPUP in each feature
    const onEach = (feature: any, layer: any) => {
        let PopupContent = `
        <Popup>
            <p>${feature.properties.name}</p>
        </Popup>`;
        layer.bindPopup(PopupContent);
    };

    return (
        <MapContainer
            center={[-39.5591554, -72.0109854]}
            zoom={13}
            scrollWheelZoom={true}
            style={{
                height: '100vh',
                width: '100vw',
            }}
        >
            {/* Default Tile */}
            <TileLayer
                attribution='&copy; <a href="#">Google Maps</a> contributors'
                url='https://mt1.google.com/vt/lyrs=r&x={x}&y={y}&z={z}'
            ></TileLayer>

            {/* LayerControl */}
            <LayersControl position='topright'>
                <LayersControl.Overlay name='OpenStreetMap'>
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
                    ></TileLayer>
                </LayersControl.Overlay>
                <LayersControl.Overlay name='Google Satelite'>
                    <TileLayer
                        attribution='&copy; <a href="#">Google Maps</a> contributors'
                        url='http://www.google.cn/maps/vt?lyrs=s@189&gl=cn&x={x}&y={y}&z={z}'
                    ></TileLayer>
                </LayersControl.Overlay>
                <LayersControl.Overlay name='Google Maps'>
                    <TileLayer
                        attribution='&copy; <a href="#">Google Maps</a> contributors'
                        url='https://mt1.google.com/vt/lyrs=r&x={x}&y={y}&z={z}'
                    ></TileLayer>
                </LayersControl.Overlay>
                <LayersControl.Overlay name='Google Roads'>
                    <TileLayer
                        attribution='&copy; <a href="#">Google Maps</a> contributors'
                        url='https://mt1.google.com/vt/lyrs=t&x={x}&y={y}&z={z}'
                    ></TileLayer>
                </LayersControl.Overlay>
                <LayersControl.Overlay name='ESRI Satelite'>
                    <TileLayer
                        attribution='&copy; <a href="#">Bing Satélite</a> contributors'
                        url='http://services.arcgisonline.com/ArcGIS/rest/services/NatGeo_World_Map/MapServer/tile/{z}/{y}/{x}'
                    ></TileLayer>
                </LayersControl.Overlay>
                <LayersControl.Overlay name='Stamen Terrain'>
                    <TileLayer
                        attribution='&copy; <a href="#">Stamen</a> contributors'
                        url='http://a.tile.stamen.com/terrain/{z}/{x}/{y}.png'
                    ></TileLayer>
                </LayersControl.Overlay>
            </LayersControl>
            <Marker position={[-39.5591554, -72.0109854]}>
                <Popup>
                    <h1>Cabanas Ayekantun</h1>
                    <p>Cabanas, departamentos y turismo</p>
                </Popup>
            </Marker>
            <LocationMarker />
            <GeoJSON
                data={aye as GeoJsonObject}
                style={{ color: 'purple' }}
                onEachFeature={onEach}
            />
        </MapContainer>
    );
};
