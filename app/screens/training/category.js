"use strict";
import React, { Component } from 'react';
import LocaleStrings from '../../resource/localeStrings';
import { StyleSheet, View, Text, ScrollView, Picker, FormInput } from 'react-native';
import { List, ListItem, Icon, Button, ButtonGroup } from 'react-native-elements';
import NavHeader from '../common/navHeader';
import { players } from '../../resource/data/players';
import * as css from '../../resource/styles';
import TrainingList from './trainingList';

const styles = StyleSheet.create({
    root: {
        /*  flex: 1,
          flexDirection: 'row',
          alignItems: 'center',
          padding: 15,*/
    }
})
export default class Category extends Component {
    get years() {
        for (let category of this.props.categories) {
            if (category.name == this.props.seletectedCategory.name) {
                let years = [];
                category.year1 && years.push(category.year1);
                category.year2 && years.push(category.year2);
                category.year3 && years.push(category.year3);
                return years;
            }
        }
    }
    onCategoryChange = (value) => {
        this.props.onCategoryChange(this.props.categories[value]);
    }
    onYearChange = (value) => {
        this.props.onYearChange(this.years[value]);
    }
    renderYears() {
        let years = this.years;
        if (years) {            
            let selectedIndex;
            for (let year of years) {
                if (year == this.props.selectedYear) {
                    selectedIndex = this.years.indexOf(year);
                    break;
                }
            }
            return <ButtonGroup
                onPress={this.onYearChange}
                selectedIndex={selectedIndex || 0}
                buttons={years} />
        }
    }
    render() {
        return <View style={styles.root}>
            <Picker
                selectedValue={this.props.categories.indexOf(this.props.seletectedCategory)}
                onValueChange={this.onCategoryChange}>
                {
                    this.props.categories.map((item, index) => <Picker.Item key={index} label={item.name} value={index} />)
                }
            </Picker>
            {this.renderYears()}
        </View >;
    }
}