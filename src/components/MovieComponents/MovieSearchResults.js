import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, StyleSheet } from 'react-native';
import InfoAbsoluteBlock from '../InfoAbsoluteBlock';
import MovieFetchList from './MovieFetchList';
import { getEmptySearchIcon, getInitialSearchIcon } from '../../utils/icons';
import Theme from '../../Theme';

class MovieSearchResults extends React.PureComponent {
  renderEmptyResults = () => (
    <InfoAbsoluteBlock
      Icon={getEmptySearchIcon()}
      text="No Movies Found"
      subtext="Please try different keywords"
    />
  );
    
  renderInitialMessage = () => (
    <InfoAbsoluteBlock
      Icon={getInitialSearchIcon()}
      text="Search"
      subtext="Find your favorite movies"
    />
  );
  
  renderResults() {
    const { fetchFunction } = this.props;
        
    return (
      <MovieFetchList
        withRefresh={false}
        fetchFunction={fetchFunction}
        renderEmptyComponent={this.renderEmptyResults}
      />
    );
  }
  
  render() {
    const { initialSearch } = this.props;
    
    return (
      <View style={styles.container}>
        {initialSearch ? this.renderInitialMessage() : this.renderResults() }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: Theme.colors.background
  },
  info: {
    alignSelf: 'center',
    marginTop: Theme.spacing.small
  }
});

MovieSearchResults.propTypes = {
  fetchFunction: PropTypes.func.isRequired
};
  
export default MovieSearchResults;
