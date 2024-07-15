
import React from 'react';
import * as PatientNavigation from '../../../../patient/components/Navigation/Navigation' ;

export default function Main() {

    React.useEffect(() => { 
        console.log('load complete');
    }, []);

    return <PatientNavigation.default />;
}