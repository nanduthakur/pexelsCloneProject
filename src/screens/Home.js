import { View, Text, StyleSheet, Image, StatusBar } from 'react-native'
import React, { useEffect, useState } from 'react'
import { BLACK, WHITE } from '../utils/Colors'
import { SafeAreaView } from 'react-native-safe-area-context'
import { NEW_PHOTOS, POPULAR_VIDEOS, getData } from '../utils/Apis'
import { FlatList, ScrollView } from 'react-native-gesture-handler'
import PhotoItem from '../components/PhotoItem'
import VideosItem from '../components/VideosItem'

const Home = () => {

    const [photos, setPhotos] = useState([])
    const [videos, setVideos] = useState([])

    useEffect(() => {
        getPhotos()
        getVideos()
    }, [])

    const getPhotos = () => {
        getData(NEW_PHOTOS, '?per_page=10').then(res => {
            //console.log("photos ", res.photos)
            setPhotos(res.photos)
        })
    }
    const getVideos = () => {
        getData(POPULAR_VIDEOS, '?per_page=10').then(res => {
            setVideos(res.videos)

        })
    }
    return (
        <View style={styles.container}>
            <StatusBar translucent backgroundColor={'trasparent'} barStyle={'light-content'} />
            <View style={styles.topView}>
                <Image
                    source={require('../images/banner.webp')} style={styles.bannerView}
                />

                <View style={styles.transLayout}>
                    <Text style={styles.logo}>Pexels Clone</Text>
                    <View style={styles.searchBox}>
                        <Image source={require('../images/search.png')} style={styles.search} />
                        <Text style={styles.placeholder}>Search Photos Videos here ...</Text>
                    </View>
                    <Text style={styles.tagline}>Search 1000+ Photos/Videos here ...</Text>
                </View>
            </View>
            <ScrollView>
            <View style={styles.headingView}>
                <Text style={styles.heading}>New Photos</Text>
                <Text style={[styles.heading, { fontWeight: '500', textDecorationLine: "underline" }]}>View All</Text>
            </View>
            <View>
                <FlatList data={photos}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{ marginTop: 10 }}
                    renderItem={(item, index) => {

                        return (
                            <PhotoItem item={item} />
                        )
                    }
                    }
                />
            </View>
            <View style={styles.headingView}>
                <Text style={styles.heading}>New Videos</Text>
                <Text style={[styles.heading, { fontWeight: '500', textDecorationLine: "underline" }]}>View All</Text>
            </View>
            <View style={{marginBottom:100}}>
                <FlatList data={videos}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{ marginTop: 10 }}
                    renderItem={(item, index) => {

                        return (
                            <VideosItem item={item} />
                        )
                    }
                    }
                />
            </View>
            </ScrollView>
        </View>
    )
}

export default Home

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: WHITE
    },
    topView: {
        width: '100%',
        height: '40%',
    },
    bannerView: {
        width: "100%",
        height: "100%",
    },
    transLayout: {
        width: "100%",
        height: "100%",
        backgroundColor: 'rgba(0,0,0,0.7)',
        position: 'absolute'
    },
    logo: {
        fontSize: 30,
        color: WHITE,
        fontWeight: '600',
        marginTop: 50,
        marginLeft: 15
    },
    searchBox: {
        width: "90%",
        height: 60,
        backgroundColor: WHITE,
        alignSelf: 'center',
        marginTop: 50,
        borderRadius: 8,
        flexDirection: 'row',
        alignItems: "center",
        padding: 15
    },
    search: {
        width: 30,
        height: 30
    },
    placeholder: {
        fontSize: 16,
        color: '#9E9E9E',
        marginLeft: 10
    },
    tagline: {
        color: WHITE,
        alignSelf: 'center',
        fontSize: 14,
        fontWeight: '600',
        marginTop: 10
    },
    headingView: {
        width: "90%",
        alignSelf: 'center',
        marginTop: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    heading: {
        fontSize: 20,
        fontWeight: '700',
        color: BLACK
    }
})