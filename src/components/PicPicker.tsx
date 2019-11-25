import * as React from 'react';
import { Button, Image, View, Text } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';

export interface State {
  image: any;
  disabled: boolean;
}
export interface Props {
  disabled: boolean;
}

export default class PicPicker extends React.Component<Props, State> {
  state = {
    image: null,
    disabled: false
  };

  render() {
    let { image } = this.state;

    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Button
          title="첨부할 사진 선택"
          onPress={this._pickImage}
          disabled={this.state.disabled}
        />
        {image && (
          <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />
        )}
        <Text>{this.state.disabled}</Text>
      </View>
    );
  }

  componentDidMount() {
    console.log('픽피커 받아온 disable', this.props.disabled);
    // this.setState({ ...this.state, disabled: this.props.disabled });
    this.getPermissionAsync();
  }
  componentWillReceiveProps() {
    console.log('픽피커 받아온update disable', this.props.disabled);
    this.setState({ ...this.state, disabled: !this.props.disabled });
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
