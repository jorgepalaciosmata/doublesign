import {View, Text, Image, TouchableOpacity} from 'react-native';
import { useEffect, useState } from 'react';
import { ArtifactType, IArtifact } from '../../../shared/interfaces/IArtifact';
import { ApiService } from '../../../shared/services/apiService';
import { style } from './style';

const ArtifactCard = (props: {
        artifact: IArtifact, 
        updatePreffix: Function,
        preffix: string}) => {

    const [artifactType, setArtifactType] = useState(ArtifactType.File);
    const [visible, setVisible] = useState<Boolean>(false);

    // Folder names can't contain '/' character per S3 enforcement, it
    // is safe to assume that an artifact with '/' in its name corresponds
    // to a folder.
    useEffect(() => {
        setArtifactType(
            isFolder(props.artifact.name) ? 
                ArtifactType.Folder : 
                ArtifactType.File);

        const artifactPreffix = getPreffix(props.artifact.name);

        if (artifactPreffix === props.preffix) {
            setVisible(true);
        }

    }, [props.preffix]);

    const isVisible = () => {
        const artifactPreffix = getPreffix(props.artifact.name);
        return (artifactPreffix === props.preffix);
    };

    const getPreffix = (name: string) => {
        let preffix = "";

        if (isFolder(name)) {
            const _name = name.substring(0, name.length - 1);
           
            if (_name.lastIndexOf('/') !== -1) {
                preffix = _name.substring(0, _name.lastIndexOf('/') + 1);
            }
        }
        else {
            // File
            if (name.lastIndexOf('/') !== -1) {
                preffix = name.substring(0, name.lastIndexOf('/') + 1);
            }
        }
        return preffix;
    };

    const isFolder = (name: string) => {
        return props.artifact.name.indexOf('/') === props.artifact.name.length - 1;
    };

    // If its a file, we strip the guid (36 character length) and delimiter 
    // from the artifact name. If it is a folder we remove the '/' trailing 
    // character.
    const formatArtifactName = (name: string) => {
        let _name = name;
        
        if (props.preffix) {
            _name = _name.substring(props.preffix.length);
        }

        return isFolder(_name) ? _name.substring(0, _name.length - 1) : _name.substring(37);
    };

    const formatArtifactDate = (created: Date) => {
        let hour = (created.getHours() > 12) ? created.getHours() - 12 : created.getHours();
        let meridian = (created.getHours() > 12) ? 'pm' : 'am';

        return `${created.getDate()}/${created.getMonth() + 1}/${created.getFullYear()}` + 
            ` - ${hour}:${created.getMinutes()} ${meridian}`;
    }

    const openDocument = async (documentName: string) => {
        await ApiService.create.get(
            "/artifact",
            {
              params: {
                  id: documentName
              }
            }
          )
          .then(function ({ data }) {
            window.open(data, '_blank');
          })
          .catch(function (error) {
            console.log(error);
          });
    }

    const onClick = (artifactName: string) => {
        switch(artifactType) {
            case ArtifactType.File:
                openDocument(artifactName);
                return;
            case ArtifactType.Folder:
                props.updatePreffix(artifactName);
        }
    };

    return (
        <>
        {isVisible() ?? (
            <TouchableOpacity onPress={async () => {onClick(props.artifact.name)}}>
                <View style={style.artifactCardContainer}>
                    <View style={style.artifactCardLogoContainer}>
                        <Image source={require('../../../../assets/fileExplorer/txtLogo.png')} />
                    </View>

                    <View style={style.artifactCardMetadataContainer}>
                        <Text style={style.artifactCardName}>
                            {formatArtifactName(props.artifact.name)}
                        </Text>
                        <Text style={style.artifactCardCreated}>
                            {formatArtifactDate(props.artifact.created)}
                        </Text>
                    </View>
                </View>
            </TouchableOpacity>
            )}
        </>
    );
};

export default ArtifactCard;