import Geocoder from 'react-native-geocoder';
import Geolocation  from '@react-native-community/geolocation';

export const getLocation = async () => {

    return new Promise((resolve, reject) => {

        const onReceiveLocation = (geolocation) => resolve(geolocation);

        Geolocation.getCurrentPosition(onReceiveLocation, (error) => {
            console.log('MovieFilter getLocation', error);
            reject();
        });

    })

}

export const filterByCountry = async (movies, geolocation) => {
    const location = await Geocoder.geocodePosition({
        lat: geolocation.coords.latitude,
        lng: geolocation.coords.longitude
    })


    const national = movies.filter((item) => {

        console.log("filterByCountry", item.CountryCode)
        console.log("filterByCountry country current", location[0].countryCode)
        console.log('filterByCountry if', item.CountryCode.indexOf(location[0].countryCode))

        return ( 
            item.CountryCode.indexOf(location[0].CountryCode) !== -1 || 
            item.CountryCode.indexOf(location[0].countryCode) !== -1);
    })

    return national

}