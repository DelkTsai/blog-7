/**
 * Created by zhangran on 16/10/21.
 */

import {combineReducers} from 'redux'
import constants from '../../constants/'

/**
 *
 * @param state 0: 初始状态 1: 开始登录 2: 登录成功 3: 登录失败
 * @param action
 */
function loginStatus (state = {status: 0}, action) {
  switch (action.type) {
    case constants.login.START:
      return { status: 1 }
    case constants.login.SUCCESS:
      return { status: 2 }
    case constants.login.FAIL:
      return { status: 3 }
  }
  return state
}

export default combineReducers({
  loginStatus
})
