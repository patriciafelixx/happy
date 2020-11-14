import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import MapView, { Marker, Callout, PROVIDER_GOOGLE } from 'react-native-maps';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { RectButton } from 'react-native-gesture-handler';

import mapMarker from '../images/map-marker.png';
import api from '../services/api';

interface Orphanage {
    id: number,
    name: string,
    latitude: number,
    longitude: number
}

export default function OrphanagesMap() {
    const [orphanages, setOrphanages] = useState<Orphanage[]>([]);
    const navigation = useNavigation();

    useEffect(() => {
        api.get('/orphanages').then(res => {
            setOrphanages(res.data);
        })
    }, [])

    function handleNavigateToOrphanageDetails(id: number) {
        navigation.navigate('OrphanageDetails', { id });
    }

    function handleNavigateToCreateOrphanage() {
        navigation.navigate('SelectMapPosition');
    }

    return (
        <View style={styles.container}>
            <MapView
                provider={PROVIDER_GOOGLE}
                style={styles.map}
                initialRegion={{
                    latitude: -23.548659628661657,
                    longitude: -46.6331911308821,
                    latitudeDelta: 0.1,
                    longitudeDelta: 0.1
                }}
            >
                {orphanages.map(orphanage => {
                    return (
                        <Marker
                            key={orphanage.id}
                            icon={mapMarker}
                            coordinate={{
                                latitude: orphanage.latitude,
                                longitude: orphanage.longitude
                            }}
                            calloutAnchor={{
                                x: 2.6,
                                y: 0.8
                            }}
                        >
                            <Callout tooltip onPress={() => handleNavigateToOrphanageDetails(orphanage.id)}>
                                <View style={styles.calloutContainer}>
                                    <Text style={styles.calloutText}>{orphanage.name}</Text>
                                </View>
                            </Callout>
                        </Marker>
                    )
                })}
            </MapView>

            <View style={styles.footer}>
                <Text style={styles.footerText}>{`${orphanages.length} orfanatos encontrados`}</Text>
                <RectButton style={styles.createOrphanageButton} onPress={handleNavigateToCreateOrphanage}>
                    <Feather name="plus" size={20} color="#fff" />
                </RectButton>
            </View>
        </View>
    )
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
        fontFamily: 'Nunito_700Bold',
        color: '#0089a5',
        fontSize: 14
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
        fontFamily: 'Nunito_700Bold',
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
