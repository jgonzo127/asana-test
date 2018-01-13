let projectId = '';
const Asana = {
    setLocation() {
        if( window.location.pathname.indexOf('asana') !== 1 ) {
            const newurl = window.location.protocol + "//" + window.location.host + window.location.pathname + `asana/${projectId}`;
            window.history.pushState({path:newurl},'',newurl);
        }
    },
    getAsanaProject() {
        return fetch( 'https://app.asana.com/api/1.0/projects/', {headers: { 'Authorization':'Bearer 0/40445f921d9d4d94d2347e271d2d109c' } } )
            .then( response => {return response.json()} )
            .then( jsonResponse => { 
                projectId = jsonResponse.data[0].id; 
                return jsonResponse.data[0].id} 
            );
    },
    getAsanaTasks() {
        if( '' !== projectId ) {
            return fetch( `https://app.asana.com/api/1.0/projects/${projectId}/tasks`, {headers: { 'Authorization': 'Bearer 0/40445f921d9d4d94d2347e271d2d109c' } } )
            .then( response => {return response.json()} )
            .then( jsonResponse => { return jsonResponse.data } );
        }

    }
}

export default Asana;