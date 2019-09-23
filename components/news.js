import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';

import styles from '../styles';
import { NewsIdAdd } from '../store/action/newsAction';


class News extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          year: this.props.date,
          date: this.props.date,
          shortTitle: this.props.title,
        };
     
      }
    newsDetail = () => {
        this.props.navigation.navigate('NewsDetail');
        this.props.NewsIdAdd(this.props.id);
    }

    render() {
        
        const { year, date, shortTitle } = this.state;
        return (
            <TouchableOpacity onPress={ this.newsDetail } style={ styles.news }>
                
                <View style={ styles.newsDescription }>
                    <Text style={ styles.newsTitleHeader }>{ shortTitle }</Text>
                </View>

                <View style={ styles.newsVerticalLine}/>

                <View style={ styles.newsDate }>
                    <Text style={ styles.newsDateSize }>{ year }</Text>
                </View>
                                
            </TouchableOpacity>
        )
    }
};

const mapStateToProps = (state) => {
    return {
        newsId: state.newsReducer.newsId
    }   
}
const mapDispatchToProps = {
    NewsIdAdd,
}

export default connect(mapStateToProps,mapDispatchToProps)(News);