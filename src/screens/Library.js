import React from 'react';
import { View, Text} from 'react-native';

class Library extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Library</Text>
      </View>
    );
  }
}

export default Library;
