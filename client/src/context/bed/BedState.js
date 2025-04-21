import React, { useReducer } from 'react';
import axios from 'axios';
import BedContext from './bedContext';
import bedReducer from './bedReducer';
import {
  GET_BEDS,
  ADD_BED,
  DELETE_BED,
  UPDATE_BED,
  BED_ERROR,
  SET_CURRENT,
  CLEAR_CURRENT,
  FILTER_BEDS,
  CLEAR_FILTER
} from '../types';

const BedState = props => {
  const initialState = {
    beds: [],
    current: null,
    filtered: null,
    error: null,
    loading: true
  };

  const [state, dispatch] = useReducer(bedReducer, initialState);

  // 모든 병상 정보 가져오기
  const getBeds = async () => {
    try {
      const res = await axios.get('/api/beds');

      dispatch({
        type: GET_BEDS,
        payload: res.data
      });
    } catch (err) {
      dispatch({
        type: BED_ERROR,
        payload: err.response.msg
      });
    }
  };

  // 병상 추가
  const addBed = async bed => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    try {
      const res = await axios.post('/api/beds', bed, config);

      dispatch({
        type: ADD_BED,
        payload: res.data
      });
    } catch (err) {
      dispatch({
        type: BED_ERROR,
        payload: err.response.msg
      });
    }
  };

  // 병상 삭제
  const deleteBed = async id => {
    try {
      await axios.delete(`/api/beds/${id}`);

      dispatch({
        type: DELETE_BED,
        payload: id
      });
    } catch (err) {
      dispatch({
        type: BED_ERROR,
        payload: err.response.msg
      });
    }
  };

  // 병상 업데이트
  const updateBed = async bed => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    try {
      const res = await axios.put(`/api/beds/${bed._id}`, bed, config);

      dispatch({
        type: UPDATE_BED,
        payload: res.data
      });
    } catch (err) {
      dispatch({
        type: BED_ERROR,
        payload: err.response.msg
      });
    }
  };

  // 현재 병상 설정
  const setCurrent = bed => {
    dispatch({ type: SET_CURRENT, payload: bed });
  };

  // 현재 병상 초기화
  const clearCurrent = () => {
    dispatch({ type: CLEAR_CURRENT });
  };

  // 병상 필터링
  const filterBeds = text => {
    dispatch({ type: FILTER_BEDS, payload: text });
  };

  // 필터 초기화
  const clearFilter = () => {
    dispatch({ type: CLEAR_FILTER });
  };

  return (
    <BedContext.Provider
      value={{
        beds: state.beds,
        current: state.current,
        filtered: state.filtered,
        error: state.error,
        loading: state.loading,
        getBeds,
        addBed,
        deleteBed,
        updateBed,
        setCurrent,
        clearCurrent,
        filterBeds,
        clearFilter
      }}
    >
      {props.children}
    </BedContext.Provider>
  );
};

export default BedState; 