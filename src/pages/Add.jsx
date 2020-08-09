import React from 'react';
import AddFormContainer from '../containers/AddFormContainer';
import HeadersContainer from '../containers/HeadersContainer';
import { PaddedFrame } from './Home';

export default function Add() {
  return (
    <PaddedFrame>
      <HeadersContainer />
      <AddFormContainer />
    </PaddedFrame>
  );
}
