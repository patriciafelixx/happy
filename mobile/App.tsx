import React from 'react';
import { StyleSheet, Text, View, Dimensions, TouchableOpacity } from 'react-native';
import MapView, { Marker, Callout, PROVIDER_GOOGLE } from 'react-native-maps';
import { Feather } from '@expo/vector-icons';

import mapMarker from './src/images/map-marker.png';

export default function App() {
  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        initialRegion={{
          latitude: -23.548659628661657,
          longitude: -46.6331911308821,
          latitudeDelta: 0.008,
          longitudeDelta: 0.008
        }}
      >
        <Marker
          icon={mapMarker}
          coordinate={{
            latitude: -23.548659628661657,
            longitude: -46.6331911308821
          }}
          calloutAnchor={{
            x: 2.6,
            y: 0.8
          }}
        >
          <Callout tooltip onPress={() => { }}>
            <View style={styles.calloutContainer}>
              <Text style={styles.calloutText}>Lar da Meninas</Text>
            </View>
          </Callout>
        </Marker>
      </MapView>

      <View style={styles.footer}>
        <Text style={styles.footerText}>2 orfanatos encontrados</Text>
        <TouchableOpacity style={styles.createOrphanageButton} onPress={() => { }}>
          <Feather name="plus" size={20} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },  
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  calloutContainer: {
    width: 160,
    height: 46,
    paddingHorizontal: 6,
    backgroundColor: 'rgba(255,255, 255, 0.8)',
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center'
  },
  calloutText: {
    color: '#0089a5',
    fontSize: 14,
    fontWeight: 'bold'
  },
  footer: {
    position: 'absolute',
    left: 24,
    right: 24,
    bottom: 48,
    backgroundColor: '#fff',
    borderRadius: 20,
    height: 56,
    paddingLeft: 24,
    elevation: 3,
    
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  footerText: {
    color: '#8fa7b3'
  },
  createOrphanageButton: {
    width: 56,
    height: 56,
    backgroundColor: '#15c3d6',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center'
  }
});
