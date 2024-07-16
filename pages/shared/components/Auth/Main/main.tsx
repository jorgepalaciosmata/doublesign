
import React from 'react';
import * as PatientNavigation from '../../../../patient/components/Navigation/Navigation' ;
import axios from 'axios';
import AuthService from '../../../services/authService';

export default function Main() {
    return <PatientNavigation.default />;
}