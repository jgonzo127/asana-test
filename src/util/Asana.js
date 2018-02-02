let projectId = '';
let accessToken;
const clientId = '545148568183703';
const redirect_uri = 'https://jgonzo127.github.io/asana-test';

const Asana = {
    getAuth() {
        if (accessToken) {
            return accessToken;
        }

        const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
        const expirationMatch = window.location.href.match(/expires_in=([^&]*)/);

        if (accessTokenMatch && expirationMatch) {
            accessToken = accessTokenMatch[1];
            const expiration = Number(expirationMatch[1]);
            // Set access token to expire
            window.setTimeout(() => accessToken = '', expiration * 1000);
            window.history.pushState('Access Token', null, '/asana-test/'); 
            return accessToken;
        } else {
            const callback = `https://app.asana.com/-/oauth_authorize?response_type=token&client_id=${clientId}&redirect_uri=${redirect_uri}&state=California`;
            window.location = callback;
        }

    },
    setLocation() {
        const accessToken = Asana.getAuth;
        if( window.location.pathname.indexOf('asana/') !== 1 ) {
            const newurl = window.location.protocol + "//" + window.location.host + window.location.pathname + `asana/${projectId}`;
            window.history.pushState({path:newurl},'',newurl);
        }
    },
    getAsanaProject() {
        const accessToken = Asana.getAuth();
        return fetch('https://app.asana.com/api/1.0/projects/', { headers: { Authorization: `Bearer ${accessToken}` } } )
            .then( response => {return response.json(); } )
            .then( jsonResponse => { 
                console.log(jsonResponse);
                projectId = jsonResponse.data[0].id; 
                return jsonResponse.data[0].id} 
            );
    },
    getAsanaTasks() {
        if( '' !== projectId ) {
            return fetch( `https://app.asana.com/api/1.0/projects/${projectId}/tasks`, {headers: { Authorization: `Bearer ${accessToken}` } } )
            .then( response => {return response.json()} )
            .then( jsonResponse => { return jsonResponse.data } );
        }

    }
}

export default Asana;