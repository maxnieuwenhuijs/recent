
export const getPath = () => {
let locationName = window.location.hostname
let setpath;

if (locationName == 'localhost') {
    return setpath = '/'
} else {
    return setpath = '/api/'
    }

}


export const getBrand = () => {
    let locationName = window.location.hostname
    let setpath;

    if (locationName == 'localhost') {
        return setpath = 'ucoursey'
    } else {

        var dotPosition = locationName.indexOf(".") + 1;
        var dotPositionLast = locationName.lastIndexOf(".");
        var domain = locationName.substring(dotPosition, dotPositionLast);
        
        return domain
    }

}

export const getBrandAndExtension = () => {
    let locationName = window.location.hostname
    let setpath;

    if (locationName == 'localhost') {
        return setpath = 'ucoursey.com'
    } else {

        var dotPosition = locationName.indexOf(".") + 1;
        var domain = locationName.substring(dotPosition); 
        
        return domain
    }

}