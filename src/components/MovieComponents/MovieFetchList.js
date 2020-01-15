import React from 'react';
import PropTypes from 'prop-types';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import withRefetch from '../hoc/withRefetch';
import FooterLoading from '../FooterLoading';
import { filterDuplicateMovies } from '../../utils/movies';
import MovieList from './MovieList';

class MovieFetchList extends React.Component {
  state = {
    movies: [],
    isInitialLoading: false,
    isPaginationLoading: true,
    refreshing: false
  };

  componentDidMount() {
    this.page = 1;
    this.totalPages = Infinity;

    // eslint-disable-next-line
    requestAnimationFrame(() => {
      this.fetchFirstPage({ isInitial: true });
    });
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (this.props.fetchFunction !== nextProps.fetchFunction) {
      this.fetchFirstPage({ nextProps });
      return false;
    }

    if (this.state === nextState && this.props === nextProps) {
      return false;
    }

    return true;
  }

  onRefresh = () => {
    const { refreshing } = this.state;
    if (refreshing) return;

    this.fetchFirstPage();
  };

  onListEndReached = () => {
    const { isPaginationLoading, refreshing } = this.state;
    if (isPaginationLoading || refreshing || this.page >= this.totalPages) return;
    this.fetchNextPage();
  };

  async fetchFirstPage({ isInitial, nextProps} = {}) {
    const { fetchFunction, refetch } = nextProps || this.props;

    this.setState({ refreshing: true });
    const initialPage = 1;
    const refetchAction = isInitial ? refetch.fetchUntilSuccess : refetch.fetchSafe;

    try {
      const data = await refetchAction(() => fetchFunction({ page: initialPage }));
      this.page = initialPage;
      this.totalPages = data.total_pages;
      this.setState({
        movies: [...data.movies],
        isInitialLoading: false,
        refreshing: false,
      });

    } catch (error) {
      this.setState({ refreshing: false });
    }
  };

  async fetchNextPage() {
    const { fetchFunction, refetch } = nextProps || this.props;
    this.setState({ isPaginationLoading: true });

    const { movies: moviesBeforeFetch } = this.state;
    const data = await refetch.fetchUntilSuccess(() => fetchFunction({ page: this.page + 1 }));
    const { movies } = this.state;
    const moviesProps = {}

    if (movies === moviesBeforeFetch) {
      moviesProps.movies = filterDuplicateMovies([...movies, ...data.movies]);
      this.page++;
      this.totalPages = data.total_pages;
    }

    this.setState({ isPaginationLoading: false, ...moviesProps });
  };

  renderLoadingIndicator = () => (
    <ActivityIndicator
      size={Theme.specifications.activityIndicatorSize}
      color={Theme.gray.lightest}
    />
  );

  renderListFooter = () => {
    const { isPaginationLoading } = this.state;
    return isPaginationLoading ? <FooterLoading /> : null;
  };

  renderMovieList = () => {
    const { withRefresh, withPagination, ...props } = this.props;
    const { movies, refreshing, isPaginationLoading } = this.state;
    const refreshProps = withRefresh ? { refresh, onRefresh: this.onRefresh } : {};

    const paginationProps = withPagination
    ? {
      onEndReached: this.onListEndReached,
      onEndReachedThreshold: 3,
      extraData: isPaginationLoading,
     }
    : {};

    return (
      <MovieList
        movies={movies}
        ListFooterComponent={this.renderListFooter}
        {...refreshProps}
        {...paginationProps}
        {...props}
      />
    );
  };

  render() {
    const { isInitialLoading } = this.state;

    return (
      <View style={styles.container}>
        {isInitialLoading ? this.renderLoadingIndicator() : this.renderMovieList()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

MovieFetchList.propTypes = {
  fetchFunction: PropTypes.func.isRequired,
  withRefresh: PropTypes.bool,
  withPagination: PropTypes.bool
};

MovieFetchList.defaultProps = {
  withRefresh: true,
  withPagination: true
};
export default withRefetch(MovieFetchList);
