import userSlice from './userReducer'
import {
  getCurrentUser,
  createUser,
  loginUser,
  logoutUser,
} from '../../../api/userApi'

const { reset } = userSlice.actions
// console.log(...userApi)
export { reset, getCurrentUser, createUser, loginUser, logoutUser }
