import React from 'react';
import { GridList } from 'react-md';

import RestaurantCard from '../RestaurantCard'

export default ({items}) => (
  <GridList container="restaurants" size={1} component="section">
    {
      Array.isArray(items) && items.map(item => (
        <RestaurantCard key={item.id} item={item} />
      ))
    }
    </GridList>
);