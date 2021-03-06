/**
 * Created by zhangran on 16/10/17.
 */

import {combineReducers} from 'redux'
import constants from '../../constants/'

const { article } = constants

var groupInitState = {
  status: 0  // 0: 正常状态 1: 开始保存 2: 保存成功 3: 保存失败 4: 获取成功
}

/**
 *
 * @param state
 * @param action
 */
function changed (state = groupInitState, action) {
  switch (action.type) {
    case article.CLEAR:
      return {...state, status: 0}
    case article.START_ADD:
      return {...state, status: 1}
    case article.ADD_SUCCESS:
      return {...state, status: 2}
    case article.GET_DETAIL_SUCCESS:
      return {...state, status: 4}
  }

  return state
}

/**
 *
 * @param state
 * @param action
 * @returns {*}
 */
function listData (state = {list: [], page: {}}, action) {
  switch (action.type) {
    case article.GET_LIST_SUCCESS:
      return {...state, list: action.list, page: action.page}
  }
  return state
}

/**
 *
 */
function detail (state = {_id: '', title: '', content: '', creater: '', tags: []}, action) {
  switch (action.type) {
    case article.CLEAR:
      return {_id: '', title: '', content: '', creater: '', tags: []}
    case article.GET_DETAIL_SUCCESS:
      return {
        _id: action.data._id,
        title: action.data.title,
        content: action.data.content,
        creater: action.data.creater,
        tags: action.data.tags
      }
  }
  return state
}

function view (state = {loaded: false, data: []}, action) {
  switch (action.type) {
    case article.CLEAR_DETAIL_VIEW:
      return {
        loaded: false,
        data: []
      }
    case article.GET_DETAIL_VIEW_SUCCESS:
      return {
        loaded: true,
        data: [
          ...state.data,
          action.data
        ]
      }
    case article.GET_COMMENT:
      state.data.forEach(article => {
        if (article._id === action.data.article) {
          article.comment = action.data
        }
      })

      return {
        loaded: true,
        data: [
          ...state.data
        ]
      }
  }
  return state
}

function listView (state = {loaded: false, data: {list: [], page: {pageCount: 0, pageNumber: 0}}}, action) {
  switch (action.type) {
    case article.CLEAR_LIST_VIEW:
      return {
        loaded: false,
        data: {
          list: [],
          page: {pageCount: 0, pageNumber: 0}
        }
      }
    case article.GET_LIST_VIEW_SUCCESS:
      return {
        loaded: true,
        data: action.data
      }
  }
  return state
}

function comment (state = [], action) {
  switch (action.type) {
    case article.GET_COMMENT:
      return [
        ...action.data
      ]
  }

  return state
}

export default combineReducers({
  changed,
  listData,
  detail,
  view,
  listView,
  comment
})
