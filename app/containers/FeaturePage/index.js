/*
 * FeaturePage
 *
 * List all the features
 */
import React from 'react';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';

import H1 from 'components/H1';
import messages from './messages';
import List from './List';
import ListItem from './ListItem';
import ListItemTitle from './ListItemTitle';
import logoParking from '../../images/bai-do-xe-thong-minh.png';

export default function FeaturePage() {
  return (
    <div>
      <Helmet>
        <title>Feature Page</title>
        <meta name="description" content="Quản lý đỗ xe" />
      </Helmet>
      <img src={logoParking} alt="" style={{ width: '100%' }} />
    </div>
  );
}
