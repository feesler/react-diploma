import React from 'react';
import View from './View.jsx';
import CatalogList from '../components/CatalogList.jsx';

function CatalogView() {
  return (
    <View>
      <CatalogList search={true} />
    </View>
  );
}

CatalogView.propTypes = {
};

export default CatalogView;
