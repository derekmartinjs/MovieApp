import React from 'react';
import { withMappedNavigationProps } from 'react-navigation-props-mapper';
import { View, Text, StyleSheet } from 'react-native';
import MovieFetchList from '../../components/MovieComponents/MovieFetchList';
import withDelayedLoading from '../../components/hoc/withDelayedLoading';
import Theme from '../../Theme';

class MoviesListScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: navigation.getParam('title', '')
  });

  render() {
    const { fetchFunction } = this.props;

    return (
      <View style={styles.container}>
        <MovieFetchList
          fetchFunction={fetchFunction}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {

  }
});

 export default withDelayedLoading(MoviesListScreen);

// export default withMappedNavigationProps()(withDelayedLoading(MoviesListScreen));
