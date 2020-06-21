import React from 'react';

import styled from 'styled-components/native';
import { translate } from '../languages/utils';

const Container = styled.View`
  align-items: center;
  flex-direction: row;
  justify-content: space-between;
  padding: 25px 25px 0 25px;
  width: 100%;
`;

const Logo = styled.Image`
  width: 20px;
  height: 40px;
`;

const Label = styled.Text`
  font-size: 18px;
  color: #fff;
  letter-spacing: 0.1px;
`;

const Menu = styled.TouchableOpacity``;

const Header = () => {
  return (
    <Container>
      <Logo resizeMode="contain" source={require('../assets/logo.png')} />
      <Menu>
      <Label>{translate('series')}</Label>
      </Menu>
      <Menu>
      <Label>{translate('movies')}</Label>
      </Menu>
      <Menu>
      <Label>{translate('myList')}</Label>
      </Menu>
    </Container>
  );
};

export default Header;
