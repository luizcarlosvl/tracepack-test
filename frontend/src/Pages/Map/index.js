import { MapContainer, Marker, Popup, TileLayer, Polygon } from 'react-leaflet'
import Control from 'react-leaflet-custom-control'
import L from 'leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import { useHistory } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
});

L.Marker.prototype.options.icon = DefaultIcon;

let position = [51.505, -0.09]

function Map() {
  const [points, setPoints] = useState([]);
  const [polygons, setPolygons] = useState([]);
    
  const history = useHistory();

  function backMenu() {
    history.push('/menu');
  }

  useEffect(() => {
    const http = axios.create({
      baseURL: 'http://localhost:3001',
      timeout: 30000,
    });

    const { user } = JSON.parse(localStorage.getItem('user'));
    const { email } = user

    async function getData() {
      const pointsResponse = await http.get(`/points/${ email }`);
      if (pointsResponse.data) setPoints(pointsResponse.data.points)
      const polygonsResponse = await http.get(`/polygons/${ email }`);
      if (polygonsResponse.data) setPolygons(polygonsResponse.data.polygons)  
    }
    getData();
  },
  []);

  return (
    <MapContainer className='leaflet-container' center={position} zoom={6}>
      <Control position='topright'>
        <button
          className="back-menu-button"
          type="button"
          onClick={ backMenu }
        >
          Menu
        </button>
        
      </Control>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      { points.map((point, index) => {
        return (
          <Marker key={ index } position={[point.lat, point.lon]}>
            <Popup>
              { point.name }
            </Popup>
          </Marker>      
        )  
      })}
      { console.log("poligonos: ", polygons)}
      { polygons.map((polygon, index) => {
        return (
          <Polygon
            key={ index }
            pathOptions={ polygon.color }
            positions={[[polygon.latA, polygon.lonA], [polygon.latB, polygon.lonB], [polygon.latC, polygon.lonC]]}>
            <Popup>
            { polygon.name }
            </Popup>
          </Polygon>
        )
      })}
    </MapContainer>
  )
}

export default Map;