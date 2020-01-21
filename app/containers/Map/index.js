import React, { memo, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';
import styled from 'styled-components';
import reducer from './reducer';
import saga from './saga';
import GoogleMapReact from 'google-map-react';

const key = 'mAP';
const SmcMarker = styled.div`
 width: 430px;
 height:auto;
 border: solid 1px var(--main-gray-color);
 padding:5px;
 box-shadow: 1px 1px 3px var(--main-gray-color);
 background-color: var(--main-text-light-color);
`;
const AnyReactComponent = ({ text }) => (<div>
  <SmcMarker>{text}
  <video width="400" controls>
  <source src="https://www.w3schools.com/html/mov_bbb.mp4" type="video/mp4"/>
  Your browser does not support HTML5 video.
</video></SmcMarker>
</div>);
const defaultProps = {
  center: {
    lat: 21.05000,
    lng: 105.917
  },
  zoom: 17
};
let markers =[];
for(let i = 0 ; i< 1; i++){
  markers.push({name:"text "+i, lat:21.05000 + i/1000, lng: 105.917 + i/1000});
}
export function Map({ onClickLogin, currentUser, error }) {
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });
  useEffect(() => { });

  return (
    <GoogleMapReact
      bootstrapURLKeys={{ key: "AIzaSyBSRkTVZ4wzJANlmz9bVbPeA7lfFQWrerY" }}
      defaultCenter={defaultProps.center}
      defaultZoom={defaultProps.zoom}
    >
      {markers.map(item=>{
        return  <AnyReactComponent
        key = {item.name}
        lat={item.lat}
        lng={item.lng}
        text= {item.name}
      />
      })}
    </GoogleMapReact>
  );
}

Map.propTypes = {

};

const mapStateToProps = createStructuredSelector({

});

export function mapDispatchToProps(dispatch) {
  return {

  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(Map);
