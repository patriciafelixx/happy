import React from 'react';
import { Link } from 'react-router-dom';
import { FiPlus, FiArrowRight } from 'react-icons/fi'
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css'

import MapMarker from '../images/map-marker.svg'
import '../styles/pages/orphanages-map.css';

import mapIcon from '../utils/mapIcon';

function OrphanagesMap() {
    return (
        <div id="page-map">
            <aside>
                <header>
                    <img src={MapMarker} alt="" />
                    <h2>Escolha um orfanato no mapa</h2>
                    <p>Muitas crianças estão esperando a sua visita :)</p>
                </header>
                <footer>
                    <strong>SP</strong>
                    <span>São Paulo</span>
                </footer>
            </aside>

            <Map center={[-23.5683422, -46.7206263]} zoom={15} style={{ width: '100%', height: '100%' }}>
                {/* <TileLayer url="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png" /> */}
                <TileLayer
                    url={`http://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}
                />

                <Marker
                    icon={mapIcon}
                    position={[-23.5683422, -46.7206263]}
                >
                    <Popup closeButton={false} minWidth={240} maxWidth={240} className="map-popup">
                        Lar das Meninas
                        <Link to="/orphanages/1">
                            <FiArrowRight size={20} color="#fff" />
                        </Link>
                    </Popup>
                </Marker>
            </Map>

            <div>
                <Link to="/orphanages/create" className="create-orphanage">
                    <FiPlus size={32} color="#fff" />
                </Link>
            </div>
        </div>
    )
}

export default OrphanagesMap;