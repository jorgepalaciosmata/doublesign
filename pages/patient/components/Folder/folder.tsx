import {View} from 'react-native';
import { style } from './style';
import { ApiService } from '../../../shared/services/apiService';
import React, { useState } from 'react';
import { IArtifact } from '../../../shared/interfaces/IArtifact';
import { AxiosResponse } from 'axios';
import { UserInfoContext } from '../../../shared/context/userInfoContext';
import EventCard, { CardType } from '../EventCard/eventCard';


export default function Folder() {
    const [artifacts, setArtifacts] = useState<IArtifact[]>([]);
    const [hcfolderId, setHcfolderId] = useState<string>("");
    const userInfo = React.useContext(UserInfoContext);

    React.useEffect(() => { 
        console.log(userInfo);
    }, [userInfo]);

    async function fetchFiles() {
        const response = await ApiService.create.get('/listartifacts')
            .catch(function (error) {
                console.log(error);
            });

        const data = (response as AxiosResponse).data as [];
        const entries = data.map((entry) => {
            return {
                name: (entry as IArtifact).name, 
                created: new Date((entry as IArtifact).created)
            };
        });

        setArtifacts(entries);
    }

    return (
        <View style={style.mainContainer}>
            <EventCard type={CardType.Note} />
            <br />
            <EventCard type={CardType.RequestToLink}/>
        </View>
    );
};
