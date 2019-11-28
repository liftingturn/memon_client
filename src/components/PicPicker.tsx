import * as React from 'react';
import { Button, Image, View, Text } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import ButtonBasic from './ButtonBasic';

export interface State {
  image: any;
}
export interface Props {
  disabled: boolean;
}

export default class PicPicker extends React.Component<Props, State> {
  state = {
    image: null
  };

  render() {
    let { image } = this.state;

    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <ButtonBasic
          label="photo-camera"
          type="icon"
          onPress={this._pickImage}
          disabled={this.props.disabled}
        />
        {image && (
          <Image
            source={{ uri: image }}
            style={{ width: 100, height: 100, borderRadius: 5 }}
          />
        )}
        <Text>{this.props.disabled}</Text>
      </View>
    );
  }

  componentDidMount() {
    this.getPermissionAsync();
  }

  getPermissionAsync = async () => {
    if (Constants.platform.ios) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== 'granted') {
        alert('Sorry, we need camera roll permissions to make this work!');
      }
    }
  };

  _pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1
    });

    console.log(result);

    if (!result.cancelled) {
      this.setState({ image: result.uri });
    }
  };
}
