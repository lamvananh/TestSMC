import React from 'react';
import PropTypes from 'prop-types';
import ListTab from 'components/ListTab';
import TabItem from './TabItem';

function TabList({ tabs }) {
  console.log("TabList",tabs);
    return <ListTab items={tabs} component={TabItem} />;
}

TabList.propTypes = {
  tabs: PropTypes.any,
};

export default TabList;
