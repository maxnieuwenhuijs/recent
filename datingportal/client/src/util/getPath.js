
export const getPath = () => {
let locationName = window.location.hostname
let setpath;

if (locationName == 'localhost') {
    return setpath = '/'
} else {
    return setpath = '/'
    }

}

export const getUserId = () => {

    let user = localStorage.getItem('user');

    
    if (user) {
            let userData = JSON.parse(user);

            let userID = userData[0].id;

            return userID
    }
}


export const getBrand = () => {
    let locationName = window.location.hostname
    let setpath;

    if (locationName == 'localhost') {
        return setpath = 'adminportal'
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
        return setpath = 'adminportal.com'
    } else {

        var dotPosition = locationName.indexOf(".") + 1;
        var domain = locationName.substring(dotPosition); 
        
        return domain
    }

}