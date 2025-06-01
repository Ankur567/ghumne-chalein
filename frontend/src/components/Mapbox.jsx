// components/MapView.jsx
import React, { useRef, useEffect } from "react";
import mapboxgl from "mapbox-gl";

mapboxgl.accessToken =
  "pk.eyJ1IjoiaWFtamVlcnkiLCJhIjoiY21iYzllcWxpMWp0NDJsczl5dDdodml1aCJ9.XIxJVzyaRvWc4jp0YxrEIA";

const MapView = () => {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const lng = 75.7873;
  const lat = 26.9124; // Jaipur
  const zoom = 10;

  useEffect(() => {
    if (map.current) return; // initialize only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [lng, lat],
      zoom: zoom,
    });

    // Add a marker
    new mapboxgl.Marker().setLngLat([lng, lat]).addTo(map.current);
  }, []);

  return (
    <div>
      <div
        ref={mapContainer}
        className="map-container"
        style={{ height: "400px", width: "100%", borderRadius: "8px" }}
      />
    </div>
  );
};

export default MapView;
